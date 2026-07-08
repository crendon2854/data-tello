import type { Role } from "@/types/user-preferences";
import type { OpportunityFilters } from "@/types/opportunity";
import { DEFAULT_FILTERS } from "@/types/opportunity";

export type { Role };
export type PersonaId = Role;

export type SectionId =
  | "snapshot"
  | "whyThisExists"
  | "signalBreakdown"
  | "buildStrategy"
  | "executionAngle"
  | "competitiveAngle"
  | "whyThisMatters";

export type PersonaConfig = {
  id: Role;
  label: string;
  description: string;
  scoringWeights: {
    pain: number;
    demand: number;
    market: number;
    buildability: number;
    assetFit: number;
  };
  emphasis: string[];
};

export interface PersonaLens {
  id: Role;
  label: string;
  roleLabel: string;
  description: string;
  primaryCta: string;
  snapshotAssetLabel: string;
  cardAssetLabel: string;
  dashboardSubtitle: string;
  detailIntro: string;
  signalHelperText: string;
  sectionOrder: SectionId[];
  emphasizedSections: SectionId[];
  sectionTitles: Record<SectionId, string>;
  assetPathLabels: [string, string, string];
}

export type SignalScores = {
  pain: number;
  demand: number;
  market: number;
  buildability: number;
  assetFit: number;
};

const DEFAULT_SECTION_TITLES: Record<SectionId, string> = {
  snapshot: "Opportunity",
  whyThisExists: "Is this real?",
  signalBreakdown: "Signal Check",
  buildStrategy: "What to Build",
  executionAngle: "How to Launch",
  competitiveAngle: "How to Win",
  whyThisMatters: "Why Now",
};

export const DEFAULT_PERSONA_ID: Role = "general";

const LEGACY_ROLE_ALIASES: Record<string, Role> = {
  product_studio: "venture_studio",
  builder: "general",
  operator: "general",
  automation_builder: "general",
};

const BALANCED_WEIGHTS = {
  pain: 1,
  demand: 1,
  market: 1,
  buildability: 1,
  assetFit: 1,
};

export const PERSONA_CONFIGS: Record<Role, PersonaConfig> = {
  agency: {
    id: "agency",
    label: "Agency",
    description:
      "Execution, selling, and delivery — asset strategy, workflow friction, and client complaints.",
    scoringWeights: {
      pain: 0.8,
      demand: 1,
      market: 0.7,
      buildability: 1.2,
      assetFit: 1.3,
    },
    emphasis: [
      "asset strategy",
      "execution angle",
      "workflow + complaints",
    ],
  },
  consultant: {
    id: "consultant",
    label: "Consultant",
    description:
      "Advising and recommending — full dossier, reasoning, and buyer clarity.",
    scoringWeights: {
      pain: 1.1,
      demand: 1,
      market: 1.1,
      buildability: 0.8,
      assetFit: 0.9,
    },
    emphasis: ["full dossier", "reasoning", "buyer clarity"],
  },
  investor: {
    id: "investor",
    label: "Investor",
    description:
      "Capital allocation — wedge, confidence, scoring, and why this matters.",
    scoringWeights: {
      pain: 0.9,
      demand: 1,
      market: 1.3,
      buildability: 0.7,
      assetFit: 0.8,
    },
    emphasis: ["wedge", "confidence", "scoring", "why this matters"],
  },
  venture_studio: {
    id: "venture_studio",
    label: "Venture Studio",
    description:
      "Repeated bets and operator matching — validation, comparison, portfolio thinking.",
    scoringWeights: {
      pain: 1,
      demand: 1.1,
      market: 1.1,
      buildability: 1.1,
      assetFit: 1,
    },
    emphasis: ["validation", "comparison", "portfolio thinking"],
  },
  general: {
    id: "general",
    label: "General",
    description: "Multi-lens view — see agency, consultant, investor, and venture studio angles.",
    scoringWeights: BALANCED_WEIGHTS,
    emphasis: ["multi-perspective", "all decision angles"],
  },
};

export const PERSONA_LENSES: Record<Role, PersonaLens> = {
  agency: {
    id: "agency",
    label: "Agency",
    roleLabel: "Sell it",
    description: "Package the opportunity as a client offer or productized service.",
    primaryCta: "Package this offer",
    snapshotAssetLabel: "Package this offer",
    cardAssetLabel: "Offer angle",
    dashboardSubtitle:
      "Pick an opportunity — each dossier shows how to package and sell the offer.",
    detailIntro:
      "Offer brief — same evidence, framed for packaging, positioning, and client delivery.",
    signalHelperText:
      "Higher scores mean stronger market pull and workflow friction. Use these to validate demand and asset fit before pitching.",
    sectionOrder: [
      "snapshot",
      "executionAngle",
      "buildStrategy",
      "signalBreakdown",
      "competitiveAngle",
      "whyThisExists",
      "whyThisMatters",
    ],
    emphasizedSections: ["executionAngle", "buildStrategy", "signalBreakdown"],
    sectionTitles: {
      ...DEFAULT_SECTION_TITLES,
      buildStrategy: "What to Package",
      executionAngle: "Who to Sell",
      competitiveAngle: "How to Position",
      signalBreakdown: "Friction & Signals",
    },
    assetPathLabels: ["Lead offer", "Upsell path", "Retainer play"],
  },
  consultant: {
    id: "consultant",
    label: "Consultant",
    roleLabel: "Advise it",
    description: "Frame the opportunity for advisory engagements and client strategy.",
    primaryCta: "Advise on this opportunity",
    snapshotAssetLabel: "Advise on this",
    cardAssetLabel: "Advisory angle",
    dashboardSubtitle:
      "Pick an opportunity — each dossier supports client advisory and strategy work.",
    detailIntro:
      "Advisory brief — same evidence, organized for diagnosis, recommendation, and client narrative.",
    signalHelperText:
      "Higher scores mean stronger underlying pressure. Use the full dossier to support your recommendation and buyer framing.",
    sectionOrder: [
      "snapshot",
      "whyThisExists",
      "signalBreakdown",
      "competitiveAngle",
      "executionAngle",
      "buildStrategy",
      "whyThisMatters",
    ],
    emphasizedSections: [
      "whyThisExists",
      "signalBreakdown",
      "competitiveAngle",
      "executionAngle",
    ],
    sectionTitles: {
      ...DEFAULT_SECTION_TITLES,
      whyThisExists: "What's Happening",
      competitiveAngle: "Market Context",
      executionAngle: "Client Entry Point",
      signalBreakdown: "Evidence & Reasoning",
    },
    assetPathLabels: ["Assess first", "Advisory scope", "Implementation handoff"],
  },
  investor: {
    id: "investor",
    label: "Investor",
    roleLabel: "Fund or acquire",
    description: "Evaluate market quality, timing, and competitive entry for capital decisions.",
    primaryCta: "Evaluate this market",
    snapshotAssetLabel: "Evaluate this market",
    cardAssetLabel: "Market angle",
    dashboardSubtitle:
      "Pick an opportunity — each dossier supports market evaluation and thesis work.",
    detailIntro:
      "Market brief — same evidence, organized for timing, wedge, and competitive reality.",
    signalHelperText:
      "Higher scores mean stronger market signal and wedge confidence. Use these alongside competitive and risk context.",
    sectionOrder: [
      "snapshot",
      "signalBreakdown",
      "competitiveAngle",
      "whyThisExists",
      "buildStrategy",
      "executionAngle",
      "whyThisMatters",
    ],
    emphasizedSections: ["signalBreakdown", "competitiveAngle", "whyThisExists"],
    sectionTitles: {
      ...DEFAULT_SECTION_TITLES,
      signalBreakdown: "Market Signals",
      competitiveAngle: "Competitive Reality",
      buildStrategy: "Value Creation Paths",
    },
    assetPathLabels: ["Market entry", "Scale thesis", "Exit angle"],
  },
  venture_studio: {
    id: "venture_studio",
    label: "Venture Studio",
    roleLabel: "Validate it",
    description:
      "Validate concepts, match operators, and prioritize repeated venture bets.",
    primaryCta: "Prioritize this bet",
    snapshotAssetLabel: "Prioritize this bet",
    cardAssetLabel: "Venture bet",
    dashboardSubtitle:
      "Pick an opportunity — each dossier supports venture validation and repeated-bet prioritization.",
    detailIntro:
      "Venture brief — same evidence, organized for validation, operator fit, and bet comparison.",
    signalHelperText:
      "Higher scores mean stronger underlying validation. Use these to compare and rank bets across your studio portfolio.",
    sectionOrder: [
      "snapshot",
      "whyThisExists",
      "competitiveAngle",
      "executionAngle",
      "buildStrategy",
      "signalBreakdown",
      "whyThisMatters",
    ],
    emphasizedSections: ["whyThisExists", "competitiveAngle", "buildStrategy"],
    sectionTitles: {
      ...DEFAULT_SECTION_TITLES,
      whyThisExists: "Validation Case",
      executionAngle: "Operator / Venture Fit",
      buildStrategy: "Asset Bet Paths",
      competitiveAngle: "Bet Comparison",
    },
    assetPathLabels: ["Validate first", "Operator match", "Scale venture"],
  },
  general: {
    id: "general",
    label: "General",
    roleLabel: "Multi-lens",
    description: "See all four decision angles — agency, consultant, investor, venture studio.",
    primaryCta: "View opportunity",
    snapshotAssetLabel: "View opportunity",
    cardAssetLabel: "Opportunity",
    dashboardSubtitle:
      "Browse evidence-backed opportunities — each dossier shows how every role would read it.",
    detailIntro:
      "Multi-lens brief — same evidence, interpreted through agency, consultant, investor, and venture studio angles.",
    signalHelperText:
      "Scores reflect layered validation across pressure, demand, wedge, friction, and fit.",
    sectionOrder: [
      "snapshot",
      "whyThisExists",
      "signalBreakdown",
      "buildStrategy",
      "executionAngle",
      "competitiveAngle",
      "whyThisMatters",
    ],
    emphasizedSections: [],
    sectionTitles: DEFAULT_SECTION_TITLES,
    assetPathLabels: ["First asset", "Expand", "Scale"],
  },
};

export const ICP_PERSONA_IDS: Role[] = [
  "agency",
  "consultant",
  "investor",
  "venture_studio",
];

export const SELECTABLE_PERSONA_IDS: Role[] = [...ICP_PERSONA_IDS, "general"];

export const PERSONA_LIST = SELECTABLE_PERSONA_IDS.map((id) => PERSONA_LENSES[id]);

/** @deprecated Use PERSONA_LIST */
export const ICP_PERSONA_LIST = PERSONA_LIST;

export function normalizeRole(value: string | null | undefined): Role {
  if (!value) {
    return DEFAULT_PERSONA_ID;
  }

  if (value in PERSONA_CONFIGS) {
    return value as Role;
  }

  return LEGACY_ROLE_ALIASES[value] ?? DEFAULT_PERSONA_ID;
}

/** @deprecated Use normalizeRole */
export const normalizePersonaId = normalizeRole;

export function getPersonaConfig(role: Role): PersonaConfig {
  return PERSONA_CONFIGS[role] ?? PERSONA_CONFIGS.general;
}

export function getPersonaLens(id: Role): PersonaLens {
  return PERSONA_LENSES[id] ?? PERSONA_LENSES.general;
}

export function isRole(value: string): value is Role {
  return value in PERSONA_CONFIGS;
}

/** @deprecated Use isRole */
export const isPersonaId = isRole;

export function isSectionEmphasized(
  lens: PersonaLens,
  sectionId: SectionId
): boolean {
  return lens.emphasizedSections.includes(sectionId);
}

function weightedScore(scores: SignalScores, weights: PersonaConfig["scoringWeights"]): number {
  const total =
    weights.pain +
    weights.demand +
    weights.market +
    weights.buildability +
    weights.assetFit;

  return Math.round(
    (scores.pain * weights.pain +
      scores.demand * weights.demand +
      scores.market * weights.market +
      scores.buildability * weights.buildability +
      scores.assetFit * weights.assetFit) /
      total
  );
}

export function applyPersonaScoring(
  baseScore: number,
  role: Role,
  scores?: SignalScores
): number {
  if (role === "general") {
    return baseScore;
  }

  if (scores) {
    return weightedScore(scores, getPersonaConfig(role).scoringWeights);
  }

  return baseScore;
}

export function getDefaultFilters(role: Role): OpportunityFilters {
  if (role === "general") {
    return { ...DEFAULT_FILTERS };
  }

  return { ...DEFAULT_FILTERS };
}
