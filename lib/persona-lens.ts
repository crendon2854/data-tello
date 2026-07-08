export type PersonaId =
  | "agency"
  | "consultant"
  | "investor"
  | "venture_studio";

export type SectionId =
  | "snapshot"
  | "whyThisExists"
  | "signalBreakdown"
  | "buildStrategy"
  | "executionAngle"
  | "competitiveAngle"
  | "whyThisMatters";

export interface PersonaLens {
  id: PersonaId;
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

const DEFAULT_SECTION_TITLES: Record<SectionId, string> = {
  snapshot: "Opportunity",
  whyThisExists: "Is this real?",
  signalBreakdown: "Signal Check",
  buildStrategy: "What to Build",
  executionAngle: "How to Launch",
  competitiveAngle: "How to Win",
  whyThisMatters: "Why Now",
};

export const DEFAULT_PERSONA_ID: PersonaId = "agency";

const LEGACY_PERSONA_ALIASES: Record<string, PersonaId> = {
  product_studio: "venture_studio",
  builder: "agency",
  operator: "agency",
  automation_builder: "agency",
};

export const PERSONA_LENSES: Record<PersonaId, PersonaLens> = {
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
      "Validate concepts, match operators, and prioritize repeated venture bets — distinct from investor deal evaluation.",
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
};

export const ICP_PERSONA_IDS: PersonaId[] = [
  "agency",
  "consultant",
  "investor",
  "venture_studio",
];

export const PERSONA_LIST = ICP_PERSONA_IDS.map((id) => PERSONA_LENSES[id]);

/** @deprecated Use PERSONA_LIST */
export const ICP_PERSONA_LIST = PERSONA_LIST;

export function normalizePersonaId(
  value: string | null | undefined
): PersonaId {
  if (!value) {
    return DEFAULT_PERSONA_ID;
  }

  if (value in PERSONA_LENSES) {
    return value as PersonaId;
  }

  return LEGACY_PERSONA_ALIASES[value] ?? DEFAULT_PERSONA_ID;
}

export function getPersonaLens(id: PersonaId): PersonaLens {
  return PERSONA_LENSES[id] ?? PERSONA_LENSES[DEFAULT_PERSONA_ID];
}

export function isPersonaId(value: string): value is PersonaId {
  return value in PERSONA_LENSES;
}

export function isSectionEmphasized(
  lens: PersonaLens,
  sectionId: SectionId
): boolean {
  return lens.emphasizedSections.includes(sectionId);
}
