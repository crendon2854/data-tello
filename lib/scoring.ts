import type { Opportunity, PersonaScoreResult } from "@/types/opportunity";
import type { Role, SignalPreferences } from "@/types/user-preferences";
import { DEFAULT_SIGNAL_PREFERENCES } from "@/types/user-preferences";
import {
  getPersonaConfig,
  ICP_PERSONA_IDS,
  type SignalScores,
} from "@/lib/persona-lens";
import { getPersonaAngle } from "@/lib/persona-angles";
import { applyProcurementBoosts } from "@/lib/procurement/integration";
import type { ProcurementEvidenceFields } from "@/types/procurement";

export type { PersonaScoreResult };

/** Normalize a subscore to 0–100. Values <= 10 are treated as a 0–10 scale. */
export function normalizeScore(
  value: number | null | undefined,
  max = 100
): number {
  if (value == null || Number.isNaN(value)) {
    return 0;
  }

  if (value <= 10 && max === 100) {
    return Math.round((value / 10) * 100);
  }

  return Math.round(Math.min(max, Math.max(0, value)));
}

export function getNormalizedSignalScores(
  opportunity: Opportunity
): SignalScores & {
  friction: number;
  complaints: number;
  freshness: number;
} {
  return {
    pain: normalizeScore(opportunity.pressure_score),
    demand: normalizeScore(opportunity.demand_score),
    market: normalizeScore(opportunity.wedge_score),
    buildability: normalizeScore(opportunity.buildability_score),
    assetFit: normalizeScore(opportunity.asset_fit_score),
    friction: normalizeScore(opportunity.friction_score),
    complaints: normalizeScore(opportunity.complaint_signal_strength),
    freshness: normalizeScore(opportunity.freshness_score),
  };
}

const DISABLED_SIGNAL_WEIGHT_FACTOR = 0.35;

const SIGNAL_DIMENSION_IMPACT: Record<
  keyof SignalPreferences,
  Partial<Record<keyof SignalScores, number>>
> = {
  pressure: { pain: 1 },
  demand: { demand: 1 },
  wedge: { market: 1 },
  friction: { pain: 0.4, market: 0.3, buildability: 0.5 },
  complaints: { pain: 0.5, demand: 0.3, assetFit: 0.4 },
  digital_infrastructure: { assetFit: 1, buildability: 0.3 },
};

export function applySignalPreferenceWeights(
  baseWeights: ReturnType<typeof getPersonaConfig>["scoringWeights"],
  signalPreferences: SignalPreferences
): ReturnType<typeof getPersonaConfig>["scoringWeights"] {
  const adjusted = { ...baseWeights };

  for (const [signal, enabled] of Object.entries(signalPreferences) as Array<
    [keyof SignalPreferences, boolean]
  >) {
    if (enabled) continue;

    const impacts = SIGNAL_DIMENSION_IMPACT[signal];
    for (const [dimension, impact] of Object.entries(impacts) as Array<
      [keyof SignalScores, number]
    >) {
      if (dimension in adjusted) {
        const key = dimension as keyof typeof adjusted;
        adjusted[key] *= 1 - impact * (1 - DISABLED_SIGNAL_WEIGHT_FACTOR);
      }
    }
  }

  return adjusted;
}

function getProcurementFields(opportunity: Opportunity): ProcurementEvidenceFields {
  return {
    procurement_score: opportunity.procurement_score,
    procurement_signal_count: opportunity.procurement_signal_count,
    procurement_evidence: opportunity.procurement_evidence,
    procurement_buyer_types: opportunity.procurement_buyer_types,
    procurement_workflow_tags: opportunity.procurement_workflow_tags,
  };
}

function hasStrongNonProcurementSignals(
  scores: ReturnType<typeof getNormalizedSignalScores>
): boolean {
  return (
    scores.pain >= 50 ||
    scores.friction >= 50 ||
    scores.market >= 50
  );
}

function applyEvidenceModifiers(
  scores: ReturnType<typeof getNormalizedSignalScores>,
  signalPreferences: SignalPreferences,
  opportunity?: Opportunity
): SignalScores & { reasons: string[] } {
  const reasons: string[] = [];
  const frictionEnabled = signalPreferences.friction;
  const complaintsEnabled = signalPreferences.complaints;

  const frictionBoost = frictionEnabled ? scores.friction / 100 : 0;
  const complaintBoost = complaintsEnabled ? scores.complaints / 100 : 0;

  const pain = Math.min(
    100,
    Math.round(scores.pain + frictionBoost * 8 + complaintBoost * 10)
  );
  const market = Math.min(100, Math.round(scores.market + frictionBoost * 6));
  const buildability = Math.min(
    100,
    Math.round(scores.buildability + frictionBoost * 10)
  );
  const assetFit = Math.min(
    100,
    Math.round(scores.assetFit + complaintBoost * 8)
  );
  const demand = Math.min(
    100,
    Math.round(scores.demand + complaintBoost * 5)
  );

  if (frictionEnabled && scores.friction >= 50) {
    reasons.push(
      `Friction evidence (+${scores.friction}) boosts pressure, wedge, buildability`
    );
  }
  if (!frictionEnabled) {
    reasons.push("Friction signal deprioritized in your preferences");
  }
  if (complaintsEnabled && scores.complaints >= 50) {
    reasons.push(
      `Complaint/incident evidence (+${scores.complaints}) boosts pain, buyer specificity, urgency`
    );
  }
  if (!complaintsEnabled) {
    reasons.push("Complaint signal deprioritized in your preferences");
  }

  let result: SignalScores = { pain, demand, market, buildability, assetFit };

  if (opportunity) {
    const procurementResult = applyProcurementBoosts(
      result,
      getProcurementFields(opportunity),
      {
        hasStrongNonProcurementSignals: hasStrongNonProcurementSignals(scores),
      }
    );
    result = procurementResult.scores;
    reasons.push(...procurementResult.reasons);
  }

  return { ...result, reasons };
}

function weightedPersonaScore(
  scores: SignalScores,
  weights: ReturnType<typeof getPersonaConfig>["scoringWeights"]
): number {
  const total =
    weights.pain +
    weights.demand +
    weights.market +
    weights.buildability +
    weights.assetFit;

  if (total === 0) {
    return 0;
  }

  return Math.round(
    (scores.pain * weights.pain +
      scores.demand * weights.demand +
      scores.market * weights.market +
      scores.buildability * weights.buildability +
      scores.assetFit * weights.assetFit) /
      total
  );
}

function computeICPPersonaScore(
  opportunity: Opportunity,
  role: Role,
  signalPreferences: SignalPreferences
): { score: number; reasons: string[] } {
  const normalized = getNormalizedSignalScores(opportunity);
  const modified = applyEvidenceModifiers(
    normalized,
    signalPreferences,
    opportunity
  );
  const config = getPersonaConfig(role);
  const weights = applySignalPreferenceWeights(
    config.scoringWeights,
    signalPreferences
  );
  const personaScore = weightedPersonaScore(modified, weights);

  const reasons = [
    `${config.label} lens weights pain, demand, market, buildability, and asset fit`,
    ...modified.reasons,
    ...config.emphasis.map((item) => `Emphasis: ${item}`),
  ];

  return { score: personaScore, reasons };
}

function signalPreferenceReasons(
  signalPreferences: SignalPreferences
): string[] {
  const disabled = (
    Object.entries(signalPreferences) as Array<[keyof SignalPreferences, boolean]>
  )
    .filter(([, enabled]) => !enabled)
    .map(([signal]) => signal.replace(/_/g, " "));

  if (disabled.length === 0) {
    return [];
  }

  return [`Deprioritized signals: ${disabled.join(", ")}`];
}

export function computePersonaScore(
  opportunity: Opportunity,
  role: Role,
  signalPreferences: SignalPreferences = DEFAULT_SIGNAL_PREFERENCES
): PersonaScoreResult {
  const truthScore = opportunity.overall_score;

  if (role === "general") {
    const icpResults = ICP_PERSONA_IDS.map((icpRole) =>
      computeICPPersonaScore(opportunity, icpRole, signalPreferences)
    );
    const blendedScore = Math.round(
      icpResults.reduce((sum, result) => sum + result.score, 0) /
        icpResults.length
    );
    const personaAngles = ICP_PERSONA_IDS.map((icpRole) => ({
      role: icpRole,
      label: getPersonaConfig(icpRole).label,
      angle: getPersonaAngle(opportunity, icpRole),
      score: computeICPPersonaScore(opportunity, icpRole, signalPreferences)
        .score,
    }));

    return {
      persona_score: blendedScore,
      persona_score_delta: blendedScore - truthScore,
      persona_score_reasons: [
        "Multi-lens blend across agency, consultant, investor, and venture studio",
        ...signalPreferenceReasons(signalPreferences),
      ],
      persona_angles: personaAngles,
    };
  }

  const { score: personaScore, reasons } = computeICPPersonaScore(
    opportunity,
    role,
    signalPreferences
  );

  return {
    persona_score: personaScore,
    persona_score_delta: personaScore - truthScore,
    persona_score_reasons: [
      ...reasons,
      ...signalPreferenceReasons(signalPreferences),
    ],
  };
}

export function getSignalPreferenceStrength(
  opportunity: Opportunity,
  signal: keyof SignalPreferences
): number {
  const scores = getNormalizedSignalScores(opportunity);

  switch (signal) {
    case "pressure":
      return scores.pain;
    case "demand":
      return scores.demand;
    case "wedge":
      return scores.market;
    case "friction":
      return Math.round(
        (scores.friction + scores.pain + scores.market + scores.buildability) / 4
      );
    case "complaints":
      return Math.round(
        (scores.complaints + scores.pain + scores.assetFit + scores.freshness) / 4
      );
    case "digital_infrastructure":
      return scores.assetFit;
    default:
      return 0;
  }
}
