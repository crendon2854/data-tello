import { applyPersonaScoring } from "@/lib/persona-lens";
import type { Opportunity } from "@/types/opportunity";
import type {
  SignalPreferences,
  UserPreferences,
} from "@/types/user-preferences";
import { createDefaultUserPreferences } from "@/types/user-preferences";

const SIGNAL_SCORE_THRESHOLD = 50;

const BUYER_KEYWORDS: Record<string, string[]> = {
  smb: ["small", "smb", "local", "contractor", "5–50", "5-50", "startup"],
  mid_market: ["mid-market", "mid market", "regional", "growing"],
  enterprise: ["enterprise", "director", "vp", "fortune", "large"],
  public_sector: ["government", "public sector", "municipal", "federal", "agency"],
};

const INDUSTRY_KEYWORDS: Record<string, string[]> = {
  healthcare: ["healthcare", "hospital", "clinical", "medical", "health"],
  financial_services: ["financial", "fintech", "banking", "crypto", "finance"],
  compliance: ["compliance", "regulatory", "osha", "audit", "risk"],
  hr: ["hr", "people", "policy", "hiring", "workforce"],
  construction: ["construction", "contractor", "trades", "safety", "osha"],
  developer_tools: ["developer", "devops", "api", "engineering", "saas"],
  logistics: ["logistics", "supply chain", "shipping", "warehouse", "freight"],
  public_sector: ["government", "public sector", "municipal", "federal"],
};

export type FeedFilterOptions = {
  exploreOutsideFocus?: boolean;
};

export function getEffectivePreferences(
  preferences: UserPreferences | null
): UserPreferences {
  if (!preferences) {
    return createDefaultUserPreferences("anonymous");
  }

  if (!preferences.onboarding_completed) {
    return {
      ...preferences,
      role: "general",
      industries: [],
      buyer_types: [],
      signal_preferences: {
        pressure: true,
        demand: true,
        wedge: true,
        friction: true,
        complaints: true,
        digital_infrastructure: true,
      },
    };
  }

  return preferences;
}

function opportunityHaystack(opportunity: Opportunity): string {
  return [
    opportunity.title,
    opportunity.short_summary,
    opportunity.target_buyer,
    opportunity.underserved_segment,
    opportunity.problem_summary,
    ...(opportunity.tags ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function matchesIndustry(
  opportunity: Opportunity,
  industries: string[],
  exploreOutsideFocus: boolean
): boolean {
  if (exploreOutsideFocus || industries.length === 0) {
    return true;
  }

  if (industries.includes("explore")) {
    return true;
  }

  const haystack = opportunityHaystack(opportunity);

  return industries.some((industry) => {
    const keywords = INDUSTRY_KEYWORDS[industry] ?? [industry.replace(/_/g, " ")];
    return keywords.some((keyword) => haystack.includes(keyword));
  });
}

export function matchesBuyerType(
  opportunity: Opportunity,
  buyerTypes: string[]
): boolean {
  if (buyerTypes.length === 0 || buyerTypes.includes("no_preference")) {
    return true;
  }

  const haystack = opportunityHaystack(opportunity);

  return buyerTypes.some((buyerType) => {
    const keywords = BUYER_KEYWORDS[buyerType] ?? [buyerType.replace(/_/g, " ")];
    return keywords.some((keyword) => haystack.includes(keyword));
  });
}

function signalScore(
  opportunity: Opportunity,
  signal: keyof SignalPreferences
): number | null {
  switch (signal) {
    case "pressure":
      return opportunity.pressure_score;
    case "demand":
      return opportunity.demand_score;
    case "wedge":
      return opportunity.wedge_score;
    case "friction":
      return opportunity.buildability_score;
    case "complaints":
      return opportunity.pressure_score;
    case "digital_infrastructure":
      return opportunity.asset_fit_score;
    default:
      return null;
  }
}

export function matchesSignalPreferences(
  opportunity: Opportunity,
  signalPreferences: SignalPreferences
): boolean {
  const enabledSignals = (
    Object.entries(signalPreferences) as Array<[keyof SignalPreferences, boolean]>
  ).filter(([, enabled]) => enabled);

  if (enabledSignals.length === 0) {
    return true;
  }

  if (enabledSignals.length === Object.keys(signalPreferences).length) {
    return true;
  }

  return enabledSignals.some(([signal]) => {
    const score = signalScore(opportunity, signal);
    return score != null && score >= SIGNAL_SCORE_THRESHOLD;
  });
}

export function filterOpportunitiesByPreferences(
  opportunities: Opportunity[],
  preferences: UserPreferences | null,
  options: FeedFilterOptions = {}
): Opportunity[] {
  const effective = getEffectivePreferences(preferences);
  const exploreOutsideFocus = options.exploreOutsideFocus ?? false;

  return opportunities
    .filter((opportunity) =>
      matchesIndustry(opportunity, effective.industries, exploreOutsideFocus)
    )
    .filter((opportunity) =>
      matchesBuyerType(opportunity, effective.buyer_types)
    )
    .filter((opportunity) =>
      matchesSignalPreferences(opportunity, effective.signal_preferences)
    )
    .map((opportunity) => ({
      ...opportunity,
      overall_score: applyPersonaScoring(
        opportunity.overall_score,
        effective.role,
        {
          pain: opportunity.pressure_score ?? 0,
          demand: opportunity.demand_score ?? 0,
          market: opportunity.wedge_score ?? 0,
          buildability: opportunity.buildability_score ?? 0,
          assetFit: opportunity.asset_fit_score ?? 0,
        }
      ),
    }))
    .sort((a, b) => b.overall_score - a.overall_score);
}
