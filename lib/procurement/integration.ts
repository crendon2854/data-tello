import type {
  ProcurementDossierEvidence,
  ProcurementEvidenceFields,
  ProcurementEvidenceStrength,
  SamRawOpportunity,
  ScoredProcurementSignal,
} from "@/types/procurement";
import type { ProblemZoneStatus } from "@/types/database";
import type { SignalScores } from "@/lib/persona-lens";
import { filterProcurementOpportunities } from "./filter";
import {
  aggregateProcurementCluster,
  scoreProcurementSignal,
} from "./scoring";

export type ProcurementBoostResult = {
  scores: SignalScores;
  reasons: string[];
  buyer_confidence_upgrade: string | null;
  watchlist_recommended: boolean;
};

const MIN_CLUSTER_FOR_FULL_BOOST = 2;

/**
 * Apply procurement evidence as supporting boosts — never a standalone discovery signal.
 * Does NOT add a new scoring category; modifies market and buildability only.
 */
export function applyProcurementBoosts(
  scores: SignalScores,
  procurement: ProcurementEvidenceFields,
  options?: {
    /** Non-procurement signals suggest strength (pressure/friction). */
    hasStrongNonProcurementSignals?: boolean;
    currentBuyerConfidence?: string | null;
  }
): ProcurementBoostResult {
  const reasons: string[] = [];
  let market = scores.market;
  let buildability = scores.buildability;

  const score = procurement.procurement_score ?? 0;
  const count = procurement.procurement_signal_count ?? 0;
  const workflowTags = procurement.procurement_workflow_tags ?? [];

  // Rejection rule: strong non-procurement signals but zero procurement → watchlist
  const watchlist_recommended =
    Boolean(options?.hasStrongNonProcurementSignals) &&
    score === 0 &&
    count === 0;

  if (watchlist_recommended) {
    reasons.push(
      "Strong workflow signals exist but no procurement validation — recommend watchlist"
    );
  }

  if (score < 6 || count === 0) {
    return {
      scores: { ...scores, market, buildability },
      reasons,
      buyer_confidence_upgrade: null,
      watchlist_recommended,
    };
  }

  // Single RFP dampener — require clustering for full boost
  const clusterFactor =
    count >= MIN_CLUSTER_FOR_FULL_BOOST ? 1 : 0.5;

  // Market boost: +3 to +6 when score >= 6
  const marketBoost = Math.round(
    ((score - 6) / 4) * 3 * clusterFactor + 3 * clusterFactor
  );
  market = Math.min(100, market + Math.max(3, Math.min(6, marketBoost)));

  if (count < MIN_CLUSTER_FOR_FULL_BOOST) {
    reasons.push(
      `Procurement score ${score} from single signal — partial market boost applied`
    );
  } else {
    reasons.push(
      `Procurement cluster (${count} signals, score ${score}) boosts market +${Math.max(3, Math.min(6, marketBoost))}`
    );
  }

  // Buildability boost: +3 to +5 when workflow clearly defined
  if (workflowTags.length > 0 && workflowTags[0] !== "general_workflow") {
    const clarityFactor = Math.min(workflowTags.length, 3) / 3;
    const buildBoost = Math.round(3 + clarityFactor * 2);
    buildability = Math.min(100, buildability + buildBoost);
    reasons.push(
      `Defined procurement workflows (${workflowTags.join(", ")}) boost buildability +${buildBoost}`
    );
  }

  const buyer_confidence_upgrade = upgradeBuyerConfidence(
    options?.currentBuyerConfidence ?? null,
    procurement
  );

  if (buyer_confidence_upgrade) {
    reasons.push(`Buyer confidence upgraded to ${buyer_confidence_upgrade}`);
  }

  return {
    scores: { ...scores, market, buildability },
    reasons,
    buyer_confidence_upgrade,
    watchlist_recommended,
  };
}

/** Upgrade buyer clarity based on procurement buyer types. */
export function upgradeBuyerConfidence(
  current: string | null,
  procurement: ProcurementEvidenceFields
): string | null {
  const buyers = procurement.procurement_buyer_types ?? [];
  if (buyers.length === 0) return null;

  const normalized = (current ?? "").toLowerCase();

  if (buyers.length >= 2 || procurement.procurement_signal_count >= 2) {
    if (normalized.includes("high")) return null;
    return "high";
  }

  if (buyers.length >= 1) {
    if (normalized.includes("high") || normalized.includes("medium")) return null;
    return "medium";
  }

  return null;
}

/** Recommend zone status downgrade when procurement validation is absent. */
export function evaluateZoneWatchlistRule(
  status: ProblemZoneStatus,
  procurement: ProcurementEvidenceFields,
  hasStrongNonProcurementSignals: boolean
): ProblemZoneStatus {
  if (status === "promoted" || status === "rejected") return status;

  const score = procurement.procurement_score ?? 0;
  const count = procurement.procurement_signal_count ?? 0;

  if (hasStrongNonProcurementSignals && score === 0 && count === 0) {
    return "watchlist";
  }

  return status;
}

function strengthFromScore(
  score: number | null,
  count: number | null
): ProcurementEvidenceStrength {
  const s = score ?? 0;
  const c = count ?? 0;

  if (s >= 7 && c >= 2) return "strong";
  if (s >= 5 && c >= 1) return "moderate";
  return "none";
}

/** Format dossier-facing procurement evidence (supporting only). */
export function formatProcurementDossierEvidence(
  procurement: ProcurementEvidenceFields
): ProcurementDossierEvidence {
  const strength = strengthFromScore(
    procurement.procurement_score,
    procurement.procurement_signal_count
  );

  const label: ProcurementDossierEvidence["label"] =
    strength === "strong"
      ? "Strong"
      : strength === "moderate"
        ? "Moderate"
        : "None";

  const evidence = procurement.procurement_evidence ?? "";
  const example_requests = evidence
    .split("|")
    .map((part) => part.trim())
    .filter((part) => part.includes(":"))
    .slice(0, 2);

  return {
    strength,
    label,
    example_requests,
    signal_count: procurement.procurement_signal_count ?? 0,
    workflow_tags: procurement.procurement_workflow_tags ?? [],
  };
}

/** Build stored evidence text from scored signals. */
export function buildProcurementEvidenceFields(
  signals: ScoredProcurementSignal[]
): ProcurementEvidenceFields {
  const aggregated = aggregateProcurementCluster(signals);

  return {
    procurement_score: aggregated.procurement_score,
    procurement_signal_count: aggregated.procurement_signal_count,
    procurement_evidence: aggregated.procurement_evidence,
    procurement_buyer_types: aggregated.procurement_buyer_types,
    procurement_workflow_tags: aggregated.procurement_workflow_tags,
  };
}

/** Full pipeline: raw SAM → filtered → scored → aggregated evidence fields. */
export function runProcurementPipeline(rawOpportunities: SamRawOpportunity[]): {
  signals: ScoredProcurementSignal[];
  evidence: ProcurementEvidenceFields;
} {
  const filtered = filterProcurementOpportunities(rawOpportunities);
  const signals = filtered.map((opp) => scoreProcurementSignal(opp));
  const aggregated = aggregateProcurementCluster(signals);

  return {
    signals,
    evidence: {
      procurement_score: aggregated.procurement_score,
      procurement_signal_count: aggregated.procurement_signal_count,
      procurement_evidence: aggregated.procurement_evidence,
      procurement_buyer_types: aggregated.procurement_buyer_types,
      procurement_workflow_tags: aggregated.procurement_workflow_tags,
    },
  };
}
