/** Procurement signal types for SAM.gov and similar sources. */

export type ProcurementSource = "SAM.gov" | "USAspending" | "other";

export type ProcurementUrgencyLevel = "low" | "medium" | "high";

export type ProcurementBudgetSignal = "none" | "moderate" | "strong";

export type ProcurementEvidenceStrength = "none" | "moderate" | "strong";

/** Raw opportunity from SAM.gov API before filtering. */
export type SamRawOpportunity = {
  noticeId: string;
  title: string;
  description: string;
  agency: string;
  postedDate: string;
  responseDeadline: string | null;
  estimatedValue: string | null;
  url: string;
  naicsCodes: string[];
  solicitationNumber?: string;
  active?: boolean;
};

/** Cleaned procurement signal after filtering and structuring. */
export type ProcurementSignal = {
  title: string;
  problem_summary: string;
  buyer: string;
  workflow_type: string;
  keywords_detected: string[];
  budget_signal: ProcurementBudgetSignal;
  urgency_level: ProcurementUrgencyLevel;
  source: ProcurementSource;
  url: string;
  core_workflow: string;
  asset_hints: string[];
  posted_date: string;
  response_deadline: string | null;
};

/** Internal procurement score breakdown (0–10 total, not exposed as main score). */
export type ProcurementScoreBreakdown = {
  buyer_intent_strength: 0 | 1 | 2 | 3;
  budget_signal: 0 | 1 | 2;
  workflow_clarity: 0 | 1 | 2 | 3;
  recurrence_likelihood: 0 | 1 | 2;
  total: number;
};

export type ScoredProcurementSignal = ProcurementSignal & {
  procurement_score: number;
  score_breakdown: ProcurementScoreBreakdown;
};

/** Stored on problem_zones / opportunities for integration. */
export type ProcurementEvidenceFields = {
  procurement_score: number | null;
  procurement_signal_count: number | null;
  procurement_evidence: string | null;
  procurement_buyer_types: string[] | null;
  procurement_workflow_tags: string[] | null;
};

/** SAM.gov search query configuration. */
export type SamSearchQuery = {
  id: string;
  label: string;
  /** Title search term (SAM API only supports title, not full-text). */
  titleTerm: string;
  /** Post-filter: both groups must appear in title + description. */
  requiredGroups: [string, string];
  naicsCodes: string[];
  postedFromDays: number;
  postedToDays: number;
};

export type SamSearchParams = {
  apiKey: string;
  postedFrom: string;
  postedTo: string;
  title?: string;
  ncode?: string;
  active?: "Yes" | "No";
  ptype?: string;
  limit?: number;
  offset?: number;
};

/** Dossier-facing procurement evidence summary. */
export type ProcurementDossierEvidence = {
  strength: ProcurementEvidenceStrength;
  label: "Strong" | "Moderate" | "None";
  example_requests: string[];
  signal_count: number;
  workflow_tags: string[];
};
