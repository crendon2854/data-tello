import type { SectionId } from "@/lib/persona-lens";
import type { Role } from "@/types/user-preferences";

export type SectionFieldConfig = {
  key: string;
  label: string;
};

export type SectionContentConfig = {
  intro?: string;
  fieldOrder?: string[];
  fieldLabels?: Record<string, string>;
  leadFields?: string[];
};

export type DossierContentMap = Record<SectionId, SectionContentConfig>;

const DEFAULT_WHY_FIELDS: SectionFieldConfig[] = [
  { key: "problem_summary", label: "Problem" },
  { key: "evidence_summary", label: "Evidence" },
  { key: "key_pain_drivers", label: "Key Pain Drivers" },
];

const DEFAULT_EXECUTION_FIELDS: SectionFieldConfig[] = [
  { key: "target_buyer", label: "Target buyer" },
  { key: "core_workflow", label: "Core workflow" },
  { key: "initial_wedge", label: "Initial wedge" },
  { key: "time_to_value", label: "Time to value" },
];

const DEFAULT_COMPETITIVE_FIELDS: SectionFieldConfig[] = [
  { key: "underserved_segment", label: "Underserved segment" },
  { key: "competitor_summary", label: "Market reality" },
  { key: "differentiation", label: "Do this" },
  { key: "avoid", label: "Avoid" },
  { key: "entry_strategy", label: "Entry strategy" },
];

export const SIGNAL_DISPLAY_ORDER: Record<
  Role,
  Array<
    | "pressure_score"
    | "demand_score"
    | "wedge_score"
    | "buildability_score"
    | "asset_fit_score"
    | "friction_score"
    | "complaint_signal_strength"
  >
> = {
  agency: [
    "buildability_score",
    "asset_fit_score",
    "friction_score",
    "pressure_score",
    "complaint_signal_strength",
    "demand_score",
    "wedge_score",
  ],
  consultant: [
    "pressure_score",
    "demand_score",
    "wedge_score",
    "friction_score",
    "complaint_signal_strength",
    "buildability_score",
    "asset_fit_score",
  ],
  investor: [
    "wedge_score",
    "demand_score",
    "pressure_score",
    "buildability_score",
    "asset_fit_score",
    "friction_score",
    "complaint_signal_strength",
  ],
  venture_studio: [
    "pressure_score",
    "wedge_score",
    "demand_score",
    "buildability_score",
    "asset_fit_score",
    "friction_score",
    "complaint_signal_strength",
  ],
  general: [
    "pressure_score",
    "demand_score",
    "wedge_score",
    "buildability_score",
    "asset_fit_score",
    "friction_score",
    "complaint_signal_strength",
  ],
};

export const SIGNAL_LABELS: Record<string, string> = {
  pressure_score: "Pressure",
  demand_score: "Demand",
  wedge_score: "Wedge",
  buildability_score: "Buildability",
  asset_fit_score: "Asset Fit",
  friction_score: "Workflow Friction",
  complaint_signal_strength: "Complaints & Incidents",
};

function fieldsToConfig(
  fields: SectionFieldConfig[],
  overrides: Partial<SectionContentConfig> = {}
): SectionContentConfig {
  return {
    fieldOrder: fields.map((f) => f.key),
    fieldLabels: Object.fromEntries(fields.map((f) => [f.key, f.label])),
    ...overrides,
  };
}

export const DOSSIER_CONTENT: Record<Role, DossierContentMap> = {
  agency: {
    snapshot: {
      intro: "Lead with the offer you can sell — asset path and buyer fit first.",
      fieldLabels: {
        overall_score: "Offer strength",
        best_first_asset: "Best first offer",
        time_to_value: "Time to first revenue",
      },
      leadFields: ["best_first_asset", "asset_path_1"],
    },
    whyThisExists: fieldsToConfig(DEFAULT_WHY_FIELDS, {
      intro: "Client pain and proof — what makes this pitchable now.",
      fieldOrder: ["key_pain_drivers", "problem_summary", "evidence_summary"],
      fieldLabels: {
        problem_summary: "Client pain",
        evidence_summary: "Proof points",
        key_pain_drivers: "Pitchable pain drivers",
      },
    }),
    signalBreakdown: {
      intro: "Friction and fit signals — validate before you package this offer.",
    },
    buildStrategy: {
      intro: "Package paths — what to sell first, upsell next, retain long-term.",
      fieldLabels: {
        asset_reason: "Why this offer path",
        expansion_ladder: "Upsell ladder",
      },
    },
    executionAngle: fieldsToConfig(DEFAULT_EXECUTION_FIELDS, {
      intro: "Who buys this and how you deliver it.",
      fieldOrder: ["target_buyer", "initial_wedge", "core_workflow", "time_to_value"],
      fieldLabels: {
        target_buyer: "Who to sell",
        initial_wedge: "Door-opener wedge",
        core_workflow: "Delivery workflow",
        time_to_value: "Time to first win",
      },
    }),
    competitiveAngle: fieldsToConfig(DEFAULT_COMPETITIVE_FIELDS, {
      intro: "Position against incumbents — what to claim and what to avoid.",
      fieldOrder: [
        "differentiation",
        "underserved_segment",
        "competitor_summary",
        "avoid",
        "entry_strategy",
      ],
      fieldLabels: {
        underserved_segment: "Underserved buyer",
        competitor_summary: "Incumbent weakness",
        differentiation: "Positioning claim",
        avoid: "Don't pitch this",
        entry_strategy: "Go-to-market angle",
      },
    }),
    whyThisMatters: {
      intro: "Why this offer is timely for your clients.",
    },
  },
  consultant: {
    snapshot: {
      intro: "Advisory snapshot — problem clarity and recommendation strength.",
      fieldLabels: {
        overall_score: "Advisory confidence",
        best_first_asset: "Recommended first move",
      },
    },
    whyThisExists: fieldsToConfig(DEFAULT_WHY_FIELDS, {
      intro: "Diagnosis layer — what's happening and why it matters to the client.",
      fieldLabels: {
        problem_summary: "What's happening",
        evidence_summary: "Supporting evidence",
        key_pain_drivers: "Root causes",
      },
    }),
    signalBreakdown: {
      intro: "Evidence stack — use these to support your recommendation.",
    },
    buildStrategy: {
      intro: "Advisory scope paths — assess, advise, hand off implementation.",
      fieldLabels: {
        asset_reason: "Recommendation rationale",
        expansion_ladder: "Engagement expansion",
      },
    },
    executionAngle: fieldsToConfig(DEFAULT_EXECUTION_FIELDS, {
      intro: "Client entry point and engagement framing.",
      fieldLabels: {
        target_buyer: "Client profile",
        core_workflow: "Affected workflow",
        initial_wedge: "Advisory entry point",
        time_to_value: "Time to insight",
      },
    }),
    competitiveAngle: fieldsToConfig(DEFAULT_COMPETITIVE_FIELDS, {
      intro: "Market context for your client narrative.",
      fieldLabels: {
        competitor_summary: "Market landscape",
        underserved_segment: "Client gap",
        entry_strategy: "Advisory angle",
      },
    }),
    whyThisMatters: {
      intro: "Strategic importance for the client's business.",
    },
  },
  investor: {
    snapshot: {
      intro: "Market thesis snapshot — wedge, timing, and capital efficiency.",
      fieldLabels: {
        overall_score: "Market confidence",
        best_first_asset: "Capital entry point",
        time_to_value: "Capital efficiency",
        complexity: "Execution risk",
      },
      leadFields: ["initial_wedge", "wedge_score"],
    },
    whyThisExists: fieldsToConfig(DEFAULT_WHY_FIELDS, {
      intro: "Market gap and pressure — why this space deserves capital attention.",
      fieldOrder: ["evidence_summary", "problem_summary", "key_pain_drivers"],
      fieldLabels: {
        problem_summary: "Market gap",
        evidence_summary: "Market evidence",
        key_pain_drivers: "Pressure drivers",
      },
    }),
    signalBreakdown: {
      intro: "Market signals — wedge strength, demand pull, and timing indicators.",
    },
    buildStrategy: {
      intro: "Value creation paths — entry, scale thesis, exit angle.",
      fieldLabels: {
        asset_reason: "Thesis rationale",
        expansion_ladder: "Value creation ladder",
      },
    },
    executionAngle: fieldsToConfig(DEFAULT_EXECUTION_FIELDS, {
      intro: "Go-to-market wedge and buyer economics.",
      fieldOrder: ["initial_wedge", "target_buyer", "time_to_value", "core_workflow"],
      fieldLabels: {
        target_buyer: "Buyer segment",
        initial_wedge: "Capital entry wedge",
        core_workflow: "Value chain",
        time_to_value: "Time to traction",
      },
    }),
    competitiveAngle: fieldsToConfig(DEFAULT_COMPETITIVE_FIELDS, {
      intro: "Competitive reality — moat, gaps, and entry risk.",
      fieldOrder: [
        "competitor_summary",
        "underserved_segment",
        "entry_strategy",
        "differentiation",
        "avoid",
      ],
      fieldLabels: {
        underserved_segment: "White space",
        competitor_summary: "Competitive landscape",
        differentiation: "Differentiation thesis",
        avoid: "Thesis risk",
        entry_strategy: "Entry strategy",
      },
    }),
    whyThisMatters: {
      intro: "Why now — timing, macro pressure, and strategic importance.",
    },
  },
  venture_studio: {
    snapshot: {
      intro: "Venture bet snapshot — validation strength and operator fit.",
      fieldLabels: {
        overall_score: "Bet confidence",
        best_first_asset: "Validation target",
      },
    },
    whyThisExists: fieldsToConfig(DEFAULT_WHY_FIELDS, {
      intro: "Validation case — is the problem real and repeatable?",
      fieldLabels: {
        problem_summary: "Problem hypothesis",
        evidence_summary: "Validation signals",
        key_pain_drivers: "Repeatable pain",
      },
    }),
    signalBreakdown: {
      intro: "Validation signals — compare against other bets in your portfolio.",
    },
    buildStrategy: {
      intro: "Bet paths — validate, match operator, scale venture.",
      fieldLabels: {
        asset_reason: "Bet rationale",
        expansion_ladder: "Venture ladder",
      },
    },
    executionAngle: fieldsToConfig(DEFAULT_EXECUTION_FIELDS, {
      intro: "Operator fit and venture entry point.",
      fieldLabels: {
        target_buyer: "Initial market",
        core_workflow: "Core workflow",
        initial_wedge: "Venture wedge",
        time_to_value: "Time to validation",
      },
    }),
    competitiveAngle: fieldsToConfig(DEFAULT_COMPETITIVE_FIELDS, {
      intro: "Bet comparison — how this stacks against alternatives.",
      fieldLabels: {
        competitor_summary: "Competitive set",
        underserved_segment: "Bet differentiation",
        entry_strategy: "Venture entry",
      },
    }),
    whyThisMatters: {
      intro: "Portfolio timing — why prioritize this bet now.",
    },
  },
  general: {
    snapshot: {
      intro: "Balanced view — see how each role would read this opportunity.",
    },
    whyThisExists: fieldsToConfig(DEFAULT_WHY_FIELDS),
    signalBreakdown: {
      intro: "Full signal stack across all validation layers.",
    },
    buildStrategy: fieldsToConfig(
      [
        { key: "asset_path_1", label: "First asset" },
        { key: "asset_path_2", label: "Expand" },
        { key: "asset_path_3", label: "Scale" },
      ],
      {
        fieldLabels: {
          asset_reason: "Why this path",
          expansion_ladder: "Expansion ladder",
        },
      }
    ),
    executionAngle: fieldsToConfig(DEFAULT_EXECUTION_FIELDS),
    competitiveAngle: fieldsToConfig(DEFAULT_COMPETITIVE_FIELDS),
    whyThisMatters: {},
  },
};

export function getSectionContent(
  role: Role,
  sectionId: SectionId
): SectionContentConfig {
  return DOSSIER_CONTENT[role]?.[sectionId] ?? {};
}
