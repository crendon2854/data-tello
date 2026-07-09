import {
  matchesBuyerType,
  matchesIndustry,
} from "@/lib/feed-filters";
import { computePersonaScore, getSignalPreferenceStrength } from "@/lib/scoring";
import type { WatchlistRow } from "@/types/database";
import type { Opportunity } from "@/types/opportunity";
import type {
  Role,
  SignalPreferences,
  UserPreferences,
} from "@/types/user-preferences";
import {
  DEFAULT_SIGNAL_PREFERENCES,
  INDUSTRY_OPTIONS,
} from "@/types/user-preferences";

export const ASSET_TYPE_OPTIONS = [
  { id: "template", label: "Template / spreadsheet" },
  { id: "software", label: "Software / dashboard" },
  { id: "service", label: "Service / advisory" },
  { id: "form", label: "Form / intake" },
  { id: "workbook", label: "Workbook / audit" },
] as const;

const ASSET_TYPE_KEYWORDS: Record<string, string[]> = {
  template: ["template", "spreadsheet", "pack", "canvas"],
  software: ["software", "dashboard", "saas", "app", "platform", "api", "board"],
  service: ["service", "consulting", "advisory", "brief", "audit"],
  form: ["form", "intake", "scorecard", "checklist"],
  workbook: ["workbook", "audit", "assessment"],
};

const SIGNAL_THRESHOLD = 50;

export type WatchlistMatchResult = {
  opportunity_id: string;
  match_score: number;
  match_reasons: string[];
  persona_score: number;
  opportunity: Opportunity;
};

export type WatchlistMatchOptions = {
  role?: Role;
  signalPreferences?: SignalPreferences;
};

function assetHaystack(opportunity: Opportunity): string {
  return [
    opportunity.best_first_asset,
    opportunity.asset_strategy,
    opportunity.asset_path_1,
    opportunity.asset_path_2,
    opportunity.asset_path_3,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function matchesAssetTypes(
  opportunity: Opportunity,
  assetTypes: string[]
): boolean {
  if (assetTypes.length === 0) {
    return true;
  }

  const haystack = assetHaystack(opportunity);

  return assetTypes.some((assetType) => {
    const keywords =
      ASSET_TYPE_KEYWORDS[assetType] ?? [assetType.replace(/_/g, " ")];
    return keywords.some((keyword) => haystack.includes(keyword));
  });
}

function scoreAssetMatch(
  opportunity: Opportunity,
  assetTypes: string[]
): { score: number; reasons: string[] } {
  if (assetTypes.length === 0) {
    return { score: 100, reasons: [] };
  }

  const haystack = assetHaystack(opportunity);
  const matched = assetTypes.filter((assetType) => {
    const keywords =
      ASSET_TYPE_KEYWORDS[assetType] ?? [assetType.replace(/_/g, " ")];
    return keywords.some((keyword) => haystack.includes(keyword));
  });

  if (matched.length === 0) {
    return { score: 0, reasons: [] };
  }

  const labels = matched
    .map(
      (id) => ASSET_TYPE_OPTIONS.find((opt) => opt.id === id)?.label ?? id
    )
    .join(", ");

  return {
    score: Math.round((matched.length / assetTypes.length) * 100),
    reasons: [`Asset path matches: ${labels}`],
  };
}

function scoreIndustryMatch(
  opportunity: Opportunity,
  industries: string[]
): { score: number; reasons: string[] } {
  if (industries.length === 0) {
    return { score: 100, reasons: [] };
  }

  if (!matchesIndustry(opportunity, industries, "focus")) {
    return { score: 0, reasons: [] };
  }

  const overlap = (opportunity.industry_tags ?? []).filter((tag) =>
    industries.some((ind) => tag.toLowerCase().includes(ind.replace(/_/g, " ")))
  );

  const reason =
    overlap.length > 0
      ? `Industry overlap: ${overlap.join(", ")}`
      : `Industry focus match (${industries.join(", ")})`;

  return { score: overlap.length > 0 ? 100 : 80, reasons: [reason] };
}

function scoreBuyerMatch(
  opportunity: Opportunity,
  buyerTypes: string[]
): { score: number; reasons: string[] } {
  if (buyerTypes.length === 0) {
    return { score: 100, reasons: [] };
  }

  if (!matchesBuyerType(opportunity, buyerTypes)) {
    return { score: 0, reasons: [] };
  }

  const overlap = (opportunity.buyer_tags ?? []).filter((tag) =>
    buyerTypes.some((buyer) => tag.toLowerCase().includes(buyer.replace(/_/g, " ")))
  );

  const reason =
    overlap.length > 0
      ? `Buyer overlap: ${overlap.join(", ")}`
      : `Buyer type match (${buyerTypes.join(", ")})`;

  return { score: overlap.length > 0 ? 100 : 80, reasons: [reason] };
}

function scoreRequiredSignals(
  opportunity: Opportunity,
  requiredSignals: string[],
  signalPreferences: SignalPreferences
): { score: number; reasons: string[]; passed: boolean } {
  if (requiredSignals.length === 0) {
    return { score: 100, reasons: [], passed: true };
  }

  const reasons: string[] = [];
  let totalStrength = 0;
  let allPassed = true;

  for (const signal of requiredSignals) {
    const key = signal as keyof SignalPreferences;
    const strength = getSignalPreferenceStrength(opportunity, key);
    totalStrength += strength;

    if (strength >= SIGNAL_THRESHOLD) {
      reasons.push(
        `${signal.replace(/_/g, " ")} signal strong (${strength}/100)`
      );
    } else {
      allPassed = false;
    }
  }

  const avgStrength = Math.round(totalStrength / requiredSignals.length);

  if (!allPassed) {
    return { score: avgStrength, reasons, passed: false };
  }

  const deprioritized = requiredSignals.filter(
    (signal) => !signalPreferences[signal as keyof SignalPreferences]
  );
  if (deprioritized.length > 0) {
    reasons.push(
      `Note: ${deprioritized.join(", ")} deprioritized in preferences but required by watchlist`
    );
  }

  return { score: avgStrength, reasons, passed: true };
}

function roleMatchBonus(
  opportunity: Opportunity,
  role: Role,
  signalPreferences: SignalPreferences
): { bonus: number; reasons: string[] } {
  const reasons: string[] = [];
  let bonus = 0;

  switch (role) {
    case "investor": {
      const wedge = getSignalPreferenceStrength(opportunity, "wedge");
      const demand = getSignalPreferenceStrength(opportunity, "demand");
      if (wedge >= SIGNAL_THRESHOLD) {
        bonus += 8;
        reasons.push("Investor lens: strong market wedge");
      }
      if (demand >= SIGNAL_THRESHOLD) {
        bonus += 5;
        reasons.push("Investor lens: validated demand");
      }
      if (opportunity.competitor_summary || opportunity.differentiation) {
        bonus += 4;
        reasons.push("Investor lens: competitive angle documented");
      }
      break;
    }
    case "venture_studio": {
      const buildability = getSignalPreferenceStrength(
        opportunity,
        "digital_infrastructure"
      );
      const demand = getSignalPreferenceStrength(opportunity, "demand");
      if (buildability >= SIGNAL_THRESHOLD) {
        bonus += 7;
        reasons.push("Studio lens: buildable asset path");
      }
      if (demand >= SIGNAL_THRESHOLD) {
        bonus += 5;
        reasons.push("Studio lens: validation strength");
      }
      if (opportunity.asset_path_1 || opportunity.asset_path_2) {
        bonus += 4;
        reasons.push("Studio lens: multiple asset paths defined");
      }
      break;
    }
    case "agency": {
      const friction = getSignalPreferenceStrength(opportunity, "friction");
      const complaints = getSignalPreferenceStrength(opportunity, "complaints");
      if (friction >= SIGNAL_THRESHOLD) {
        bonus += 7;
        reasons.push("Agency lens: workflow friction evidence");
      }
      if (complaints >= SIGNAL_THRESHOLD) {
        bonus += 5;
        reasons.push("Agency lens: complaint patterns");
      }
      if (opportunity.best_first_asset) {
        bonus += 4;
        reasons.push("Agency lens: clear first asset to package");
      }
      break;
    }
    default:
      break;
  }

  void signalPreferences;
  return { bonus, reasons };
}

export function getWatchlistDefaults(
  role: Role,
  preferences?: UserPreferences | null
): Partial<WatchlistRow> {
  const industries =
    preferences?.industries?.filter((id) => id !== "explore") ?? [];
  const buyerTypes =
    preferences?.buyer_types?.filter((id) => id !== "no_preference") ?? [];

  const base: Partial<WatchlistRow> = {
    industries,
    buyer_types: buyerTypes,
    asset_types: [],
    min_overall_score: 0,
    min_persona_score: 0,
    required_signals: [],
  };

  switch (role) {
    case "investor":
      return {
        ...base,
        min_overall_score: 70,
        min_persona_score: 60,
        required_signals: ["wedge", "demand"],
      };
    case "venture_studio":
      return {
        ...base,
        min_persona_score: 55,
        required_signals: ["demand", "pressure"],
        asset_types: ["template", "software"],
      };
    case "agency":
      return {
        ...base,
        min_persona_score: 50,
        required_signals: ["friction", "complaints"],
        asset_types: ["template", "service"],
      };
    default:
      return base;
  }
}

export function watchlistFromOpportunity(
  opportunity: Opportunity,
  name?: string
): Partial<WatchlistRow> {
  const industries = (opportunity.industry_tags ?? []).filter((tag) =>
    INDUSTRY_OPTIONS.some((opt) => opt.id === tag || tag.includes(opt.id))
  );

  return {
    name: name ?? `Thesis: ${opportunity.title.slice(0, 48)}`,
    description: opportunity.short_summary ?? undefined,
    industries: industries.length > 0 ? industries : [],
    buyer_types: opportunity.buyer_tags ?? [],
    asset_types: [],
    min_overall_score: Math.max(0, opportunity.overall_score - 10),
    min_persona_score: 0,
    required_signals: [],
  };
}

export function computeWatchlistMatches(
  watchlist: WatchlistRow,
  opportunities: Opportunity[],
  options: WatchlistMatchOptions = {}
): WatchlistMatchResult[] {
  const role = options.role ?? "general";
  const signalPreferences =
    options.signalPreferences ?? DEFAULT_SIGNAL_PREFERENCES;

  const results: WatchlistMatchResult[] = [];

  for (const opportunity of opportunities) {
    if (opportunity.status !== "published") {
      continue;
    }

    if (opportunity.overall_score < watchlist.min_overall_score) {
      continue;
    }

    const personaResult = computePersonaScore(
      opportunity,
      role,
      signalPreferences
    );

    if (personaResult.persona_score < watchlist.min_persona_score) {
      continue;
    }

    if (
      watchlist.industries.length > 0 &&
      !matchesIndustry(opportunity, watchlist.industries, "focus")
    ) {
      continue;
    }

    if (
      watchlist.buyer_types.length > 0 &&
      !matchesBuyerType(opportunity, watchlist.buyer_types)
    ) {
      continue;
    }

    if (
      watchlist.asset_types.length > 0 &&
      !matchesAssetTypes(opportunity, watchlist.asset_types)
    ) {
      continue;
    }

    const signalResult = scoreRequiredSignals(
      opportunity,
      watchlist.required_signals,
      signalPreferences
    );

    if (!signalResult.passed) {
      continue;
    }

    const industryResult = scoreIndustryMatch(opportunity, watchlist.industries);
    const buyerResult = scoreBuyerMatch(opportunity, watchlist.buyer_types);
    const assetResult = scoreAssetMatch(opportunity, watchlist.asset_types);
    const roleBonus = roleMatchBonus(opportunity, role, signalPreferences);

    const matchScore = Math.min(
      100,
      Math.round(
        industryResult.score * 0.22 +
          buyerResult.score * 0.18 +
          assetResult.score * 0.18 +
          signalResult.score * 0.22 +
          personaResult.persona_score * 0.2 +
          roleBonus.bonus
      )
    );

    const matchReasons = [
      `Truth score ${opportunity.overall_score} (unchanged)`,
      `Persona rank ${personaResult.persona_score} for ${role} lens`,
      ...industryResult.reasons,
      ...buyerResult.reasons,
      ...assetResult.reasons,
      ...signalResult.reasons,
      ...roleBonus.reasons,
    ].filter(Boolean);

    results.push({
      opportunity_id: opportunity.id,
      match_score: matchScore,
      match_reasons: matchReasons,
      persona_score: personaResult.persona_score,
      opportunity,
    });
  }

  return results.sort((a, b) => {
    if (b.match_score !== a.match_score) {
      return b.match_score - a.match_score;
    }
    return b.persona_score - a.persona_score;
  });
}
