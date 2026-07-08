import type {
  ProcurementBudgetSignal,
  ProcurementScoreBreakdown,
  ProcurementSignal,
  ProcurementUrgencyLevel,
  SamRawOpportunity,
} from "@/types/procurement";
import {
  ASSET_HINT_TERMS,
  WORKFLOW_TYPE_PATTERNS,
} from "./keywords";

const EXPLICIT_SYSTEM_PATTERNS = [
  /(?:software|system|platform|application|saas|tool)\s+(?:solution|procurement|acquisition|implementation)/i,
  /procure\s+(?:a|an)\s+(?:software|system|platform)/i,
  /implement\s+(?:a|an)\s+(?:software|system|platform)/i,
  /(?:case management|reporting|compliance|tracking)\s+(?:system|software|platform)/i,
];

const RECURRING_PATTERNS = [
  /annual/i,
  /recurring/i,
  /ongoing/i,
  /maintenance\s+and\s+support/i,
  /subscription/i,
  /multi-?year/i,
  /idiq/i,
  /indefinite\s+delivery/i,
  /blanket\s+purchase/i,
  /bpa/i,
];

const ONE_OFF_PATTERNS = [
  /one-?time/i,
  /pilot\s+only/i,
  /proof\s+of\s+concept\s+only/i,
  /single\s+event/i,
];

function combinedText(opp: SamRawOpportunity): string {
  return `${opp.title} ${opp.description}`;
}

function detectWorkflow(opp: SamRawOpportunity): {
  workflow_type: string;
  core_workflow: string;
} {
  const text = combinedText(opp).toLowerCase();

  for (const { pattern, workflow_type, core_workflow } of WORKFLOW_TYPE_PATTERNS) {
    if (pattern.test(text)) {
      return { workflow_type, core_workflow };
    }
  }

  return { workflow_type: "general_workflow", core_workflow: "operational workflow" };
}

function detectAssetHints(text: string): string[] {
  const hints = new Set<string>();
  const lower = text.toLowerCase();

  for (const { term, hint } of ASSET_HINT_TERMS) {
    if (lower.includes(term)) hints.add(hint);
  }

  return Array.from(hints);
}

function summarizeProblem(opp: SamRawOpportunity, coreWorkflow: string): string {
  const snippet = opp.description?.trim();
  if (snippet && snippet.length > 20) {
    return snippet.length > 280 ? `${snippet.slice(0, 277)}...` : snippet;
  }
  return `Agency seeks ${coreWorkflow} capabilities via ${opp.title}`;
}

function detectBudgetSignal(opp: SamRawOpportunity, text: string): ProcurementBudgetSignal {
  if (opp.estimatedValue) {
    const numeric = parseFloat(opp.estimatedValue.replace(/[^0-9.]/g, ""));
    if (!Number.isNaN(numeric) && numeric >= 250_000) return "strong";
    if (!Number.isNaN(numeric) && numeric >= 50_000) return "moderate";
  }

  if (/budget|funding|appropriat/i.test(text)) return "moderate";
  if (RECURRING_PATTERNS.some((p) => p.test(text))) return "strong";

  return "none";
}

function detectUrgency(opp: SamRawOpportunity): ProcurementUrgencyLevel {
  if (!opp.responseDeadline) return "low";

  const deadline = new Date(opp.responseDeadline);
  if (Number.isNaN(deadline.getTime())) return "medium";

  const daysLeft = (deadline.getTime() - Date.now()) / 86_400_000;
  if (daysLeft <= 14) return "high";
  if (daysLeft <= 45) return "medium";
  return "low";
}

/** Structure a filtered raw opportunity into a ProcurementSignal. */
export function structureProcurementSignal(
  opp: SamRawOpportunity & { matched_keywords?: string[] },
  keywords: string[] = opp.matched_keywords ?? []
): ProcurementSignal {
  const text = combinedText(opp);
  const { workflow_type, core_workflow } = detectWorkflow(opp);

  return {
    title: opp.title,
    problem_summary: summarizeProblem(opp, core_workflow),
    buyer: opp.agency,
    workflow_type,
    keywords_detected: keywords,
    budget_signal: detectBudgetSignal(opp, text),
    urgency_level: detectUrgency(opp),
    source: "SAM.gov",
    url: opp.url,
    core_workflow,
    asset_hints: detectAssetHints(text),
    posted_date: opp.postedDate,
    response_deadline: opp.responseDeadline,
  };
}

/** Score buyer intent strength (0–3). */
export function scoreBuyerIntentStrength(
  opp: SamRawOpportunity,
  signal: ProcurementSignal
): 0 | 1 | 2 | 3 {
  const text = combinedText(opp);

  if (EXPLICIT_SYSTEM_PATTERNS.some((p) => p.test(text))) return 3;
  if (/software|system|platform|tool|application/i.test(text) && signal.keywords_detected.length >= 2) {
    return 2;
  }
  if (/software|system|platform|tool/i.test(text)) return 1;
  return 0;
}

/** Score budget signal (0–2). */
export function scoreBudgetComponent(signal: ProcurementSignal): 0 | 1 | 2 {
  switch (signal.budget_signal) {
    case "strong":
      return 2;
    case "moderate":
      return 1;
    default:
      return 0;
  }
}

/** Score workflow clarity (0–3). */
export function scoreWorkflowClarity(
  opp: SamRawOpportunity,
  signal: ProcurementSignal
): 0 | 1 | 2 | 3 {
  const text = combinedText(opp).toLowerCase();

  const structuredIndicators = [
    "workflow",
    "process",
    "step",
    "approval",
    "submission",
    "tracking",
    "reporting",
    "audit trail",
    "case",
    "inspection",
  ];
  const hits = structuredIndicators.filter((term) => text.includes(term)).length;

  if (signal.workflow_type !== "general_workflow" && hits >= 4) return 3;
  if (signal.workflow_type !== "general_workflow" && hits >= 2) return 2;
  if (hits >= 1 || signal.asset_hints.length > 0) return 1;
  return 0;
}

/** Score recurrence likelihood (0–2). */
export function scoreRecurrenceLikelihood(opp: SamRawOpportunity): 0 | 1 | 2 {
  const text = combinedText(opp);

  if (RECURRING_PATTERNS.some((p) => p.test(text))) return 2;
  if (ONE_OFF_PATTERNS.some((p) => p.test(text))) return 0;

  if (/support|maintenance|operations|annual report/i.test(text)) return 1;
  return 0;
}

/** Compute internal procurement score (0–10). Not exposed as main opportunity score. */
export function computeProcurementScore(
  opp: SamRawOpportunity,
  signal: ProcurementSignal
): ProcurementScoreBreakdown {
  const buyer_intent_strength = scoreBuyerIntentStrength(opp, signal);
  const budget_signal = scoreBudgetComponent(signal);
  const workflow_clarity = scoreWorkflowClarity(opp, signal);
  const recurrence_likelihood = scoreRecurrenceLikelihood(opp);

  const total = Math.min(
    10,
    buyer_intent_strength + budget_signal + workflow_clarity + recurrence_likelihood
  );

  return {
    buyer_intent_strength,
    budget_signal,
    workflow_clarity,
    recurrence_likelihood,
    total,
  };
}

export function scoreProcurementSignal(
  opp: SamRawOpportunity & { matched_keywords?: string[] }
): import("@/types/procurement").ScoredProcurementSignal {
  const signal = structureProcurementSignal(opp);
  const score_breakdown = computeProcurementScore(opp, signal);

  return {
    ...signal,
    procurement_score: score_breakdown.total,
    score_breakdown,
  };
}

/** Aggregate scores across a cluster of signals (requires repetition). */
export function aggregateProcurementCluster(
  signals: import("@/types/procurement").ScoredProcurementSignal[]
): {
  procurement_score: number;
  procurement_signal_count: number;
  procurement_evidence: string;
  procurement_buyer_types: string[];
  procurement_workflow_tags: string[];
} {
  if (signals.length === 0) {
    return {
      procurement_score: 0,
      procurement_signal_count: 0,
      procurement_evidence: "",
      procurement_buyer_types: [],
      procurement_workflow_tags: [],
    };
  }

  const avgScore =
    signals.reduce((sum, s) => sum + s.procurement_score, 0) / signals.length;

  // Cluster bonus: repeated buyer requests increase confidence (max +1)
  const uniqueBuyers = new Set(signals.map((s) => s.buyer)).size;
  const clusterBonus = signals.length >= 2 && uniqueBuyers >= 1 ? Math.min(1, signals.length * 0.25) : 0;

  const procurement_score = Math.min(10, Math.round(avgScore + clusterBonus));

  const buyerTypes = Array.from(new Set(signals.map((s) => s.buyer)));
  const workflowTags = Array.from(new Set(signals.map((s) => s.workflow_type)));

  const topExamples = signals
    .sort((a, b) => b.procurement_score - a.procurement_score)
    .slice(0, 2)
    .map((s) => `${s.buyer}: ${s.title}`);

  const procurement_evidence = [
    `${signals.length} SAM.gov signal(s), avg score ${avgScore.toFixed(1)}`,
    ...topExamples,
  ].join(" | ");

  return {
    procurement_score,
    procurement_signal_count: signals.length,
    procurement_evidence,
    procurement_buyer_types: buyerTypes,
    procurement_workflow_tags: workflowTags,
  };
}
