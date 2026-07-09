import type { Opportunity } from "@/types/opportunity";
import { normalizeScore } from "@/lib/scoring";
import type {
  Role,
  SignalPreferences,
  UserPreferences,
} from "@/types/user-preferences";
import {
  BUYER_TYPE_OPTIONS,
  DEFAULT_SIGNAL_PREFERENCES,
  INDUSTRY_OPTIONS,
} from "@/types/user-preferences";

export type OpportunitySignals = {
  pressure: number;
  demand: number;
  wedge: number;
  friction: number;
  complaints: number;
  digital_infrastructure: number;
};

export type ScoredOpportunity = {
  score: number;
  pain_score: number | null;
  demand_score: number | null;
  market_score: number | null;
  buildability_score: number | null;
  asset_fit_score: number | null;
  friction_score: number | null;
  procurement_score: number | null;
  industries: string[];
  buyer_types: string[];
  signals: OpportunitySignals;
} & Record<string, unknown>;

export type ConfidenceLevel = "Low" | "Medium" | "High";
export type TimeToValue = "Fast" | "Medium" | "Slow";

export type EnrichedOpportunity<T extends ScoredOpportunity = ScoredOpportunity> =
  T & {
    recommended_rank_score: number;
    recommended_reason: string[];
    confidence_level: ConfidenceLevel;
    time_to_value: TimeToValue;
  };

export type DecisionLayerOpportunity = EnrichedOpportunity<ScoredOpportunity> &
  Opportunity;

export type DecisionLayerResult<T extends ScoredOpportunity = ScoredOpportunity> = {
  topOpportunity: EnrichedOpportunity<T> | null;
  top3: EnrichedOpportunity<T>[];
  enrichedOpportunities: EnrichedOpportunity<T>[];
};

type NormalizedUserContext = {
  role: Role;
  industries: string[];
  buyer_types: string[];
  signal_preferences: SignalPreferences;
};

type RankedCandidate<T extends ScoredOpportunity> = EnrichedOpportunity<T> & {
  _confidence_multiplier: number;
};

const MIN_BASE_SCORE = 50;
const MIN_BUILDABILITY_SCORE = 40;
const SIGNAL_STRENGTH_THRESHOLD = 50;
const PARTIAL_MATCH_PENALTY = 0.85;
const DISABLED_SIGNAL_FACTOR = 0.8;
const RANK_SCORE_TIE_EPSILON = 0.5;
const MAX_PERSONA_WEIGHT = 1.25;

const SIGNAL_IMPORTANCE: Record<keyof SignalPreferences, number> = {
  pressure: 1,
  demand: 1,
  wedge: 1,
  friction: 1.1,
  complaints: 1.1,
  digital_infrastructure: 0.9,
};

function toScale10(value: number | null | undefined): number {
  if (value == null || Number.isNaN(value)) {
    return 0;
  }

  if (value <= 10) {
    return value;
  }

  return value / 10;
}

function scoreValue(value: number | null | undefined): number {
  return normalizeScore(value);
}

function normalizeUserContext(
  userPrefs: UserPreferences | null | undefined
): NormalizedUserContext {
  if (!userPrefs || !userPrefs.onboarding_completed) {
    return {
      role: "general",
      industries: [],
      buyer_types: [],
      signal_preferences: { ...DEFAULT_SIGNAL_PREFERENCES },
    };
  }

  return {
    role: userPrefs.role,
    industries: userPrefs.industries.filter((id) => id !== "explore"),
    buyer_types: userPrefs.buyer_types.filter((id) => id !== "no_preference"),
    signal_preferences: userPrefs.signal_preferences,
  };
}

function hasArrayOverlap(a: string[], b: string[]): boolean {
  if (a.length === 0 || b.length === 0) {
    return false;
  }

  const normalize = (value: string) => value.toLowerCase().replace(/_/g, " ");
  const normalizedB = b.map(normalize);

  return a.some((item) => {
    const normalizedItem = normalize(item);
    return normalizedB.some(
      (candidate) =>
        normalizedItem === candidate ||
        normalizedItem.includes(candidate) ||
        candidate.includes(normalizedItem)
    );
  });
}

function computeIndustryMatch(
  opportunityIndustries: string[],
  userIndustries: string[]
): number {
  if (userIndustries.length === 0) {
    return 1;
  }

  return hasArrayOverlap(opportunityIndustries, userIndustries)
    ? 1
    : PARTIAL_MATCH_PENALTY;
}

function computeBuyerMatch(
  opportunityBuyers: string[],
  userBuyers: string[]
): number {
  if (userBuyers.length === 0) {
    return 1;
  }

  return hasArrayOverlap(opportunityBuyers, userBuyers)
    ? 1
    : PARTIAL_MATCH_PENALTY;
}

function computeSignalWeight(signalPreferences: SignalPreferences): number {
  const signals = Object.keys(
    DEFAULT_SIGNAL_PREFERENCES
  ) as Array<keyof SignalPreferences>;

  let weightedSum = 0;
  let totalImportance = 0;

  for (const signal of signals) {
    const importance = SIGNAL_IMPORTANCE[signal];
    const factor = signalPreferences[signal]
      ? 1
      : DISABLED_SIGNAL_FACTOR;
    weightedSum += importance * factor;
    totalImportance += importance;
  }

  return weightedSum / totalImportance;
}

function computePersonaBoost(
  role: Role,
  opportunity: ScoredOpportunity
): number {
  const friction = scoreValue(opportunity.friction_score);
  const assetFit = scoreValue(opportunity.asset_fit_score);
  const pain = scoreValue(opportunity.pain_score);
  const demand = scoreValue(opportunity.demand_score);
  const market = scoreValue(opportunity.market_score);
  const buildability = scoreValue(opportunity.buildability_score);
  const procurement = scoreValue(opportunity.procurement_score);

  switch (role) {
    case "agency":
      return friction * 0.05 + assetFit * 0.05;
    case "consultant":
      return pain * 0.05 + demand * 0.05;
    case "investor":
      return market * 0.05 + procurement * 0.05;
    case "venture_studio":
      return buildability * 0.05 + market * 0.05;
    default:
      return 0;
  }
}

function computePersonaWeight(
  role: Role,
  opportunity: ScoredOpportunity
): number {
  if (role === "general") {
    return 1;
  }

  const personaBoost = computePersonaBoost(role, opportunity);
  return Math.min(MAX_PERSONA_WEIGHT, 1 + personaBoost / 50);
}

function hasComplaintEvidence(opportunity: ScoredOpportunity): boolean {
  return scoreValue(opportunity.signals.complaints) >= SIGNAL_STRENGTH_THRESHOLD;
}

function computeConfidenceMultiplier(opportunity: ScoredOpportunity): number {
  const friction = toScale10(opportunity.friction_score);
  const procurement = toScale10(opportunity.procurement_score);

  const raw =
    (friction / 10) * 0.4 +
    (procurement / 10) * 0.4 +
    (hasComplaintEvidence(opportunity) ? 0.2 : 0);

  return Math.min(1.2, Math.max(0.5, raw));
}

function countMeaningfulSignals(signals: OpportunitySignals): number {
  return (Object.values(signals) as number[]).filter(
    (value) => scoreValue(value) >= SIGNAL_STRENGTH_THRESHOLD
  ).length;
}

function hasClearBuyer(opportunity: ScoredOpportunity): boolean {
  return opportunity.buyer_types.length > 0;
}

function hasClearBuildability(opportunity: ScoredOpportunity): boolean {
  if (opportunity.buildability_score == null) {
    return false;
  }

  return scoreValue(opportunity.buildability_score) >= MIN_BUILDABILITY_SCORE;
}

function passesBaseGuardrails(opportunity: ScoredOpportunity): boolean {
  if (!hasClearBuyer(opportunity)) {
    return false;
  }

  if (!hasClearBuildability(opportunity)) {
    return false;
  }

  if (opportunity.score < MIN_BASE_SCORE) {
    return false;
  }

  if (countMeaningfulSignals(opportunity.signals) < 2) {
    return false;
  }

  return true;
}

function computeConfidenceLevel(confidenceMultiplier: number): ConfidenceLevel {
  if (confidenceMultiplier > 1) {
    return "High";
  }

  if (confidenceMultiplier >= 0.7) {
    return "Medium";
  }

  return "Low";
}

function computeTimeToValue(opportunity: ScoredOpportunity): TimeToValue {
  const buildability = scoreValue(opportunity.buildability_score);
  const assetFit = scoreValue(opportunity.asset_fit_score);
  const combined = Math.round((buildability + assetFit) / 2);

  if (combined >= 70) {
    return "Fast";
  }

  if (combined >= 45) {
    return "Medium";
  }

  return "Slow";
}

function getFreshnessScore(opportunity: ScoredOpportunity): number {
  const raw = opportunity.freshness_score;
  if (typeof raw === "number") {
    return scoreValue(raw);
  }

  const updatedAt = opportunity.updated_at;
  if (typeof updatedAt === "string") {
    const ageMs = Date.now() - new Date(updatedAt).getTime();
    const ageDays = ageMs / (1000 * 60 * 60 * 24);
    return Math.max(0, Math.round(100 - ageDays * 2));
  }

  return 0;
}

function formatIndustryLabel(industryId: string): string {
  return (
    INDUSTRY_OPTIONS.find((option) => option.id === industryId)?.label ??
    industryId.replace(/_/g, " ")
  );
}

function formatBuyerLabel(buyerId: string): string {
  return (
    BUYER_TYPE_OPTIONS.find((option) => option.id === buyerId)?.label ??
    buyerId.replace(/_/g, " ")
  );
}

function strongestEnabledSignal(
  opportunity: ScoredOpportunity,
  signalPreferences: SignalPreferences
): { key: keyof OpportunitySignals; strength: number } | null {
  const preferenceMap: Record<keyof OpportunitySignals, keyof SignalPreferences> =
    {
      pressure: "pressure",
      demand: "demand",
      wedge: "wedge",
      friction: "friction",
      complaints: "complaints",
      digital_infrastructure: "digital_infrastructure",
    };

  let best: { key: keyof OpportunitySignals; weightedStrength: number; strength: number } | null = null;

  for (const key of Object.keys(preferenceMap) as Array<keyof OpportunitySignals>) {
    if (!signalPreferences[preferenceMap[key]]) {
      continue;
    }

    const strength = scoreValue(opportunity.signals[key]);
    const weightedStrength = strength * SIGNAL_IMPORTANCE[preferenceMap[key]];

    if (!best || weightedStrength > best.weightedStrength) {
      best = { key, weightedStrength, strength };
    }
  }

  return best ? { key: best.key, strength: best.strength } : null;
}

const SIGNAL_REASON_LABELS: Record<keyof OpportunitySignals, string> = {
  pressure: "regulatory and compliance pressure",
  demand: "validated buyer demand",
  wedge: "clear market wedge",
  friction: "workflow friction",
  complaints: "complaint and incident patterns",
  digital_infrastructure: "digital infrastructure readiness",
};

function getPersonaAlignmentReason(
  role: Role,
  opportunity: ScoredOpportunity
): string | null {
  switch (role) {
    case "agency": {
      const friction = scoreValue(opportunity.friction_score);
      const assetFit = scoreValue(opportunity.asset_fit_score);
      if (
        friction >= SIGNAL_STRENGTH_THRESHOLD ||
        assetFit >= SIGNAL_STRENGTH_THRESHOLD
      ) {
        return "Workflow friction and asset fit align with your agency lens";
      }
      break;
    }
    case "consultant": {
      const pain = scoreValue(opportunity.pain_score);
      const demand = scoreValue(opportunity.demand_score);
      if (
        pain >= SIGNAL_STRENGTH_THRESHOLD ||
        demand >= SIGNAL_STRENGTH_THRESHOLD
      ) {
        return "Pain and demand signals fit your advisory lens";
      }
      break;
    }
    case "investor": {
      const market = scoreValue(opportunity.market_score);
      const procurement = scoreValue(opportunity.procurement_score);
      if (
        market >= SIGNAL_STRENGTH_THRESHOLD ||
        procurement >= SIGNAL_STRENGTH_THRESHOLD
      ) {
        return "Market and procurement signals fit your investment lens";
      }
      break;
    }
    case "venture_studio": {
      const buildability = scoreValue(opportunity.buildability_score);
      const market = scoreValue(opportunity.market_score);
      if (
        buildability >= SIGNAL_STRENGTH_THRESHOLD ||
        market >= SIGNAL_STRENGTH_THRESHOLD
      ) {
        return "Buildability and market fit your venture validation lens";
      }
      break;
    }
  }

  return null;
}

function generateRecommendedReasons(
  opportunity: ScoredOpportunity,
  context: NormalizedUserContext,
  industryMatch: number
): string[] {
  type ReasonCandidate = { priority: number; text: string };

  const candidates: ReasonCandidate[] = [];

  const procurementStrength = scoreValue(opportunity.procurement_score);
  const frictionStrength = scoreValue(opportunity.friction_score);
  const strongestSignal = strongestEnabledSignal(
    opportunity,
    context.signal_preferences
  );

  if (procurementStrength >= SIGNAL_STRENGTH_THRESHOLD) {
    const buyerHint =
      opportunity.buyer_types.length > 0
        ? ` from ${formatBuyerLabel(opportunity.buyer_types[0]).toLowerCase()} buyers`
        : "";
    candidates.push({
      priority: 1,
      text: `Strong procurement signals${buyerHint}`,
    });
  } else if (
    strongestSignal &&
    strongestSignal.strength >= SIGNAL_STRENGTH_THRESHOLD
  ) {
    candidates.push({
      priority: 1,
      text: `Strong ${SIGNAL_REASON_LABELS[strongestSignal.key]} signals (${strongestSignal.strength}/100)`,
    });
  }

  const personaReason = getPersonaAlignmentReason(context.role, opportunity);
  if (personaReason) {
    candidates.push({ priority: 2, text: personaReason });
  }

  if (context.industries.length > 0 && industryMatch === 1) {
    const matchedIndustry =
      opportunity.industries.find((industry) =>
        context.industries.includes(industry)
      ) ?? context.industries[0];
    candidates.push({
      priority: 3,
      text: `Matches your selected industry: ${formatIndustryLabel(matchedIndustry)}`,
    });
  } else if (context.industries.length > 0) {
    candidates.push({
      priority: 3,
      text: `Adjacent to your industry focus (${context.industries
        .map(formatIndustryLabel)
        .join(", ")})`,
    });
  }

  if (
    frictionStrength >= SIGNAL_STRENGTH_THRESHOLD &&
    procurementStrength < SIGNAL_STRENGTH_THRESHOLD
  ) {
    candidates.push({
      priority: 4,
      text: "High workflow friction → fast monetization potential",
    });
  }

  return candidates
    .sort((a, b) => a.priority - b.priority)
    .map((candidate) => candidate.text)
    .slice(0, 3);
}

function computeRecommendedRankScore(
  opportunity: ScoredOpportunity,
  context: NormalizedUserContext
): {
  recommended_rank_score: number;
  industryMatch: number;
  confidenceMultiplier: number;
} {
  const baseScore = opportunity.score;
  const industryMatch = computeIndustryMatch(
    opportunity.industries,
    context.industries
  );
  const buyerMatch = computeBuyerMatch(
    opportunity.buyer_types,
    context.buyer_types
  );
  const signalWeight = computeSignalWeight(context.signal_preferences);
  const personaWeight = computePersonaWeight(context.role, opportunity);
  const confidenceMultiplier = computeConfidenceMultiplier(opportunity);

  const recommended_rank_score =
    baseScore *
    industryMatch *
    buyerMatch *
    signalWeight *
    personaWeight *
    confidenceMultiplier;

  return {
    recommended_rank_score: Math.round(recommended_rank_score * 100) / 100,
    industryMatch,
    confidenceMultiplier,
  };
}

function compareRankedOpportunities<T extends ScoredOpportunity>(
  a: RankedCandidate<T>,
  b: RankedCandidate<T>
): number {
  const scoreDiff = b.recommended_rank_score - a.recommended_rank_score;
  if (Math.abs(scoreDiff) >= RANK_SCORE_TIE_EPSILON) {
    return scoreDiff;
  }

  const confidenceDiff =
    b._confidence_multiplier - a._confidence_multiplier;
  if (confidenceDiff !== 0) {
    return confidenceDiff;
  }

  const procurementDiff =
    scoreValue(b.procurement_score) - scoreValue(a.procurement_score);
  if (procurementDiff !== 0) {
    return procurementDiff;
  }

  const frictionDiff =
    scoreValue(b.friction_score) - scoreValue(a.friction_score);
  if (frictionDiff !== 0) {
    return frictionDiff;
  }

  return getFreshnessScore(b) - getFreshnessScore(a);
}

export function toScoredOpportunity(opportunity: Opportunity): ScoredOpportunity {
  return {
    ...opportunity,
    score: opportunity.overall_score,
    pain_score: opportunity.pressure_score,
    market_score: opportunity.wedge_score,
    industries: opportunity.industry_tags ?? [],
    buyer_types: opportunity.buyer_tags ?? [],
    signals: {
      pressure: scoreValue(opportunity.pressure_score),
      demand: scoreValue(opportunity.demand_score),
      wedge: scoreValue(opportunity.wedge_score),
      friction: scoreValue(opportunity.friction_score),
      complaints: scoreValue(opportunity.complaint_signal_strength),
      digital_infrastructure: scoreValue(opportunity.asset_fit_score),
    },
  };
}

export function getRecommendedOpportunities<T extends ScoredOpportunity>(
  userPrefs: UserPreferences | null | undefined,
  opportunities: T[]
): DecisionLayerResult<T> {
  const context = normalizeUserContext(userPrefs);

  const ranked: RankedCandidate<T>[] = opportunities
    .map((opportunity) => {
      const { recommended_rank_score, industryMatch, confidenceMultiplier } =
        computeRecommendedRankScore(opportunity, context);
      const confidence_level = computeConfidenceLevel(confidenceMultiplier);

      return {
        ...opportunity,
        recommended_rank_score,
        recommended_reason: generateRecommendedReasons(
          opportunity,
          context,
          industryMatch
        ),
        confidence_level,
        time_to_value: computeTimeToValue(opportunity),
        _confidence_multiplier: confidenceMultiplier,
      };
    })
    .filter((opportunity) => passesBaseGuardrails(opportunity))
    .sort(compareRankedOpportunities);

  const enriched: EnrichedOpportunity<T>[] = ranked.map((item) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- strip internal rank tie-breaker
    const { _confidence_multiplier, ...rest } = item;
    return rest as EnrichedOpportunity<T>;
  });

  const topOpportunity =
    enriched.find((opportunity) => opportunity.confidence_level !== "Low") ??
    null;

  return {
    topOpportunity,
    top3: enriched.slice(0, 3),
    enrichedOpportunities: enriched,
  };
}
