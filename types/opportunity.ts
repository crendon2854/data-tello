import type { OpportunityRow } from "./database";

export type Opportunity = OpportunityRow;

export type PersonaAngleResult = {
  role: string;
  label: string;
  angle: string;
  score: number;
};

export type PersonaScoreResult = {
  persona_score: number;
  persona_score_delta: number;
  persona_score_reasons: string[];
  persona_angles?: PersonaAngleResult[];
};

export type OpportunityFeedItem = Opportunity & PersonaScoreResult;

export interface OpportunityFormData {
  title: string;
  overall_score: number;
  best_first_asset: string;
  short_summary: string;
  complexity: string;
  tags: string;
  status: Opportunity["status"];
  problem_summary: string;
  evidence_summary: string;
  key_pain_drivers: string;
  pressure_score: number;
  demand_score: number;
  wedge_score: number;
  buildability_score: number;
  asset_fit_score: number;
  asset_path_1: string;
  asset_path_2: string;
  asset_path_3: string;
  asset_reason: string;
  expansion_ladder: string;
  target_buyer: string;
  core_workflow: string;
  initial_wedge: string;
  time_to_value: string;
  underserved_segment: string;
  competitor_summary: string;
  avoid: string;
  differentiation: string;
  entry_strategy: string;
  strategic_importance: string;
}

export interface OpportunityFilters {
  assetType: string;
  minScore: number;
  tag: string;
}

export const DEFAULT_FILTERS: OpportunityFilters = {
  assetType: "",
  minScore: 0,
  tag: "",
};