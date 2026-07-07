export type PersonaId =
  | "builder"
  | "agency"
  | "consultant"
  | "investor"
  | "operator"
  | "automation_builder"
  | "product_studio";

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

const DEFAULT_SECTION_ORDER: SectionId[] = [
  "snapshot",
  "whyThisExists",
  "signalBreakdown",
  "buildStrategy",
  "executionAngle",
  "competitiveAngle",
  "whyThisMatters",
];

const DEFAULT_SECTION_TITLES: Record<SectionId, string> = {
  snapshot: "Opportunity",
  whyThisExists: "Is this real?",
  signalBreakdown: "Signal Check",
  buildStrategy: "What to Build",
  executionAngle: "How to Launch",
  competitiveAngle: "How to Win",
  whyThisMatters: "Why Now",
};

export const DEFAULT_PERSONA_ID: PersonaId = "builder";

export const PERSONA_LENSES: Record<PersonaId, PersonaLens> = {
  builder: {
    id: "builder",
    label: "Builder",
    roleLabel: "Build it",
    description: "Ship the best first asset and iterate from there.",
    primaryCta: "Start building",
    snapshotAssetLabel: "Start building",
    cardAssetLabel: "Start with",
    dashboardSubtitle:
      "Pick an opportunity — click through for the full build decision brief.",
    detailIntro:
      "Decision brief — everything you need to decide what to build and how to enter.",
    signalHelperText:
      "Higher scores mean stronger signal. Use these to sanity-check whether the opportunity is worth building now.",
    sectionOrder: DEFAULT_SECTION_ORDER,
    emphasizedSections: ["buildStrategy", "executionAngle"],
    sectionTitles: DEFAULT_SECTION_TITLES,
    assetPathLabels: ["Start here", "Next step", "Long-term play"],
  },
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
      "Higher scores mean stronger market pull. Use these to validate demand before pitching.",
    sectionOrder: [
      "snapshot",
      "executionAngle",
      "buildStrategy",
      "competitiveAngle",
      "signalBreakdown",
      "whyThisExists",
      "whyThisMatters",
    ],
    emphasizedSections: ["executionAngle", "buildStrategy", "competitiveAngle"],
    sectionTitles: {
      ...DEFAULT_SECTION_TITLES,
      buildStrategy: "What to Package",
      executionAngle: "Who to Sell",
      competitiveAngle: "How to Position",
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
      "Higher scores mean stronger underlying pressure. Use these to support your recommendation.",
    sectionOrder: [
      "snapshot",
      "whyThisExists",
      "competitiveAngle",
      "executionAngle",
      "signalBreakdown",
      "buildStrategy",
      "whyThisMatters",
    ],
    emphasizedSections: ["whyThisExists", "competitiveAngle", "executionAngle"],
    sectionTitles: {
      ...DEFAULT_SECTION_TITLES,
      whyThisExists: "What's Happening",
      competitiveAngle: "Market Context",
      executionAngle: "Client Entry Point",
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
      "Higher scores mean stronger market signal. Use these alongside competitive and risk context.",
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
  operator: {
    id: "operator",
    label: "Operator",
    roleLabel: "Implement it",
    description: "Focus on workflow deployment, rollout, and operational execution.",
    primaryCta: "Implement this workflow",
    snapshotAssetLabel: "Implement this workflow",
    cardAssetLabel: "Deploy first",
    dashboardSubtitle:
      "Pick an opportunity — each dossier highlights workflow deployment and rollout paths.",
    detailIntro:
      "Execution brief — same evidence, organized for rollout, workflow, and time-to-value.",
    signalHelperText:
      "Higher scores mean stronger operational pull. Use these to prioritize implementation effort.",
    sectionOrder: [
      "snapshot",
      "buildStrategy",
      "executionAngle",
      "signalBreakdown",
      "whyThisExists",
      "competitiveAngle",
      "whyThisMatters",
    ],
    emphasizedSections: ["buildStrategy", "executionAngle"],
    sectionTitles: {
      ...DEFAULT_SECTION_TITLES,
      buildStrategy: "What to Deploy",
      executionAngle: "Rollout Plan",
    },
    assetPathLabels: ["Deploy first", "Standardize", "Scale ops"],
  },
  automation_builder: {
    id: "automation_builder",
    label: "Automation Builder",
    roleLabel: "Automate it",
    description: "Prioritize workflow automation, integrations, and repeatable systems.",
    primaryCta: "Automate this process",
    snapshotAssetLabel: "Automate this process",
    cardAssetLabel: "Automate first",
    dashboardSubtitle:
      "Pick an opportunity — each dossier highlights automation and integration paths.",
    detailIntro:
      "Automation brief — same evidence, organized for workflow design and system leverage.",
    signalHelperText:
      "Higher scores mean stronger friction signal. Use these to prioritize automatable workflows.",
    sectionOrder: [
      "snapshot",
      "buildStrategy",
      "executionAngle",
      "signalBreakdown",
      "whyThisExists",
      "competitiveAngle",
      "whyThisMatters",
    ],
    emphasizedSections: ["buildStrategy", "executionAngle", "signalBreakdown"],
    sectionTitles: {
      ...DEFAULT_SECTION_TITLES,
      buildStrategy: "What to Automate",
      executionAngle: "Workflow Entry",
    },
    assetPathLabels: ["Automate first", "Integrate", "Orchestrate"],
  },
  product_studio: {
    id: "product_studio",
    label: "Product Studio",
    roleLabel: "Prioritize it",
    description: "Compare bets, asset paths, and competitive entry for portfolio decisions.",
    primaryCta: "Prioritize this bet",
    snapshotAssetLabel: "Prioritize this bet",
    cardAssetLabel: "Best bet",
    dashboardSubtitle:
      "Pick an opportunity — each dossier supports portfolio prioritization and bet sizing.",
    detailIntro:
      "Portfolio brief — same evidence, organized for bet comparison and strategic prioritization.",
    signalHelperText:
      "Higher scores mean stronger opportunity signal. Use these to rank bets against your portfolio.",
    sectionOrder: [
      "snapshot",
      "signalBreakdown",
      "buildStrategy",
      "competitiveAngle",
      "executionAngle",
      "whyThisExists",
      "whyThisMatters",
    ],
    emphasizedSections: ["signalBreakdown", "buildStrategy", "competitiveAngle"],
    sectionTitles: {
      ...DEFAULT_SECTION_TITLES,
      buildStrategy: "Asset Bet Paths",
      competitiveAngle: "Right to Win",
    },
    assetPathLabels: ["MVP bet", "Growth path", "Platform play"],
  },
};

export const PERSONA_LIST = Object.values(PERSONA_LENSES);

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
