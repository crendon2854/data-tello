import type { Opportunity, PersonaScoreResult } from "@/types/opportunity";
import type { Role } from "@/types/user-preferences";
import { getPersonaConfig, type SignalScores } from "@/lib/persona-lens";

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

function applyEvidenceModifiers(
  scores: ReturnType<typeof getNormalizedSignalScores>
): SignalScores & { reasons: string[] } {
  const reasons: string[] = [];
  const frictionBoost = scores.friction / 100;
  const complaintBoost = scores.complaints / 100;

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

  if (scores.friction >= 50) {
    reasons.push(`Friction evidence (+${scores.friction}) boosts pressure, wedge, buildability`);
  }
  if (scores.complaints >= 50) {
    reasons.push(
      `Complaint/incident evidence (+${scores.complaints}) boosts pain, buyer specificity, urgency`
    );
  }

  return { pain, demand, market, buildability, assetFit, reasons };
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

  return Math.round(
    (scores.pain * weights.pain +
      scores.demand * weights.demand +
      scores.market * weights.market +
      scores.buildability * weights.buildability +
      scores.assetFit * weights.assetFit) /
      total
  );
}

export function computePersonaScore(
  opportunity: Opportunity,
  role: Role
): PersonaScoreResult {
  const truthScore = opportunity.overall_score;

  if (role === "general") {
    return {
      persona_score: truthScore,
      persona_score_delta: 0,
      persona_score_reasons: ["Balanced lens — truth-layer overall score used for ranking"],
    };
  }

  const normalized = getNormalizedSignalScores(opportunity);
  const modified = applyEvidenceModifiers(normalized);
  const config = getPersonaConfig(role);
  const personaScore = weightedPersonaScore(modified, config.scoringWeights);

  const reasons = [
    `${config.label} lens weights pain, demand, market, buildability, and asset fit`,
    ...modified.reasons,
    ...config.emphasis.map((item) => `Emphasis: ${item}`),
  ];

  return {
    persona_score: personaScore,
    persona_score_delta: personaScore - truthScore,
    persona_score_reasons: reasons,
  };
}

export function getSignalPreferenceStrength(
  opportunity: Opportunity,
  signal: keyof import("@/types/user-preferences").SignalPreferences
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
