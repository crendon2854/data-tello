export type OpportunityStatus = "draft" | "published" | "rejected";

export type WorkflowLane =
  | "pressure_discovery"
  | "demand_validation"
  | "market_wedge_validation"
  | "workflow_friction";

export type SourceType =
  | "structural"
  | "trigger"
  | "market_proof"
  | "friction";

export type ApiStatus = "automated" | "semi_manual" | "manual";

export type Cadence =
  | "daily"
  | "weekly"
  | "monthly"
  | "quarterly"
  | "annual"
  | "manual";

export interface OpportunityRow {
  id: string;
  title: string;
  short_summary: string | null;
  overall_score: number;
  best_first_asset: string | null;
  complexity: string | null;
  tags: string[] | null;
  status: OpportunityStatus;
  problem_summary: string | null;
  evidence_summary: string | null;
  key_pain_drivers: string[] | null;
  pressure_score: number | null;
  demand_score: number | null;
  wedge_score: number | null;
  freshness_score: number | null;
  buildability_score: number | null;
  asset_fit_score: number | null;
  friction_score: number | null;
  complaint_signal_strength: number | null;
  primary_buyer: string | null;
  secondary_buyers: string[] | null;
  buyer_tags: string[] | null;
  industry_tags: string[] | null;
  asset_strategy: string | null;
  asset_path_1: string | null;
  asset_path_2: string | null;
  asset_path_3: string | null;
  asset_reason: string | null;
  expansion_ladder: string | null;
  target_buyer: string | null;
  core_workflow: string | null;
  initial_wedge: string | null;
  time_to_value: string | null;
  underserved_segment: string | null;
  competitor_summary: string | null;
  avoid: string | null;
  differentiation: string | null;
  entry_strategy: string | null;
  strategic_importance: string | null;

  /** Procurement validation (supporting evidence only). */
  procurement_score: number | null;
  procurement_signal_count: number | null;
  procurement_evidence: string | null;
  procurement_buyer_types: string[] | null;
  procurement_workflow_tags: string[] | null;

  created_at: string;
  updated_at: string;
}

export interface SignalRow {
  id: string;
  title: string;
  source: string;
  type: string;
  processed: boolean;
  created_at: string;
}

export interface RawSignalRow {
  id: string;
  source_id: string | null;
  title: string;
  summary: string | null;
  raw_text: string | null;
  source_url: string | null;
  published_at: string | null;
  observed_at: string;
  workflow_lane: WorkflowLane | null;
  source_type: SourceType | null;
  cadence_class: string | null;
  freshness_label: string | null;
  geography: string | null;
  state: string | null;
  metro: string | null;
  industry_tags: string[];
  buyer_tags: string[];
  regulation_tags: string[];
  keyword_tags: string[];
  dedup_hash: string | null;
  clustered: boolean;
  raw_importance_score: number | null;
  needs_review: boolean;
  created_at: string;
}

export type RawSignalWithSource = RawSignalRow & {
  source_name: string | null;
};

export type ProblemZoneStatus =
  | "new"
  | "reviewing"
  | "enriching"
  | "ready_for_market_proof"
  | "ready_for_scoring"
  | "watchlist"
  | "rejected"
  | "promoted";

export type TimingLabel = "trigger_driven" | "structural" | "mixed";

export interface ProblemZoneRow {
  id: string;
  name: string;
  summary: string | null;
  primary_industry: string | null;
  sub_industry: string | null;
  primary_buyer: string | null;
  secondary_buyer: string | null;
  buyer_confidence: string | null;
  geography_scope: string | null;
  timing_label: TimingLabel | null;
  pain_theme: string | null;
  source_count: number;
  source_diversity_count: number;
  pressure_strength_score: number | null;
  freshness_score: number | null;
  friction_score: number | null;
  signal_mix: string | null;
  status: ProblemZoneStatus;
  owner: string | null;
  notes: string | null;
  procurement_score: number | null;
  procurement_signal_count: number | null;
  procurement_evidence: string | null;
  procurement_buyer_types: string[] | null;
  procurement_workflow_tags: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface ProblemZoneSignalRow {
  problem_zone_id: string;
  raw_signal_id: string;
  created_at: string;
}

export type ProblemZoneWithSignals = ProblemZoneRow & {
  linked_signals: RawSignalWithSource[];
};

export type ProblemZoneInsert = {
  name: string;
  summary?: string | null;
  primary_industry?: string | null;
  sub_industry?: string | null;
  primary_buyer?: string | null;
  secondary_buyer?: string | null;
  buyer_confidence?: string | null;
  geography_scope?: string | null;
  timing_label?: TimingLabel | null;
  pain_theme?: string | null;
  source_count?: number;
  source_diversity_count?: number;
  pressure_strength_score?: number | null;
  freshness_score?: number | null;
  friction_score?: number | null;
  signal_mix?: string | null;
  status?: ProblemZoneStatus;
  owner?: string | null;
  notes?: string | null;
  procurement_score?: number | null;
  procurement_signal_count?: number | null;
  procurement_evidence?: string | null;
  procurement_buyer_types?: string[] | null;
  procurement_workflow_tags?: string[] | null;
  id?: string;
  created_at?: string;
  updated_at?: string;
};

export type ProblemZoneUpdate = Partial<
  Omit<ProblemZoneRow, "id" | "created_at" | "updated_at">
>;

export type IntentType = "informational" | "commercial" | "mixed";

export interface KeywordSetRow {
  id: string;
  problem_zone_id: string | null;
  name: string;
  topic_layer: string | null;
  workflow_layer: string | null;
  product_layer: string | null;
  buyer_layer: string | null;
  seed_keywords: string[];
  expanded_keywords: string[];
  rejected_keywords: string[];
  geo_target: string | null;
  dataforseo_pulled: boolean;
  last_enriched_at: string | null;
  notes: string | null;
  created_at: string;
}

export interface KeywordMetricRow {
  id: string;
  keyword_set_id: string;
  keyword: string;
  search_volume: number | null;
  trend_direction: string | null;
  cpc: number | null;
  competition: number | null;
  related_keyword_density: number | null;
  geo_signal: string | null;
  intent_type: IntentType | null;
  kept_for_scoring: boolean;
  created_at: string;
}

export type KeywordSetWithMetrics = KeywordSetRow & {
  problem_zone_name: string | null;
  metrics: KeywordMetricRow[];
};

export type KeywordSetInsert = {
  problem_zone_id?: string | null;
  name: string;
  topic_layer?: string | null;
  workflow_layer?: string | null;
  product_layer?: string | null;
  buyer_layer?: string | null;
  seed_keywords?: string[];
  expanded_keywords?: string[];
  rejected_keywords?: string[];
  geo_target?: string | null;
  dataforseo_pulled?: boolean;
  last_enriched_at?: string | null;
  notes?: string | null;
  id?: string;
  created_at?: string;
};

export type KeywordSetUpdate = Partial<
  Omit<KeywordSetRow, "id" | "created_at">
>;

export type KeywordMetricInsert = {
  keyword_set_id: string;
  keyword: string;
  search_volume?: number | null;
  trend_direction?: string | null;
  cpc?: number | null;
  competition?: number | null;
  related_keyword_density?: number | null;
  geo_signal?: string | null;
  intent_type?: IntentType | null;
  kept_for_scoring?: boolean;
  id?: string;
  created_at?: string;
};

export type KeywordMetricUpdate = Partial<
  Omit<KeywordMetricRow, "id" | "keyword_set_id" | "created_at">
>;

export type HiddenMarketRisk = "low" | "medium" | "high";

export interface MarketProofRecordRow {
  id: string;
  problem_zone_id: string | null;
  core_search_phrase: string | null;
  category_exists: boolean | null;
  visible_competitor_count: number | null;
  hidden_market_risk: HiddenMarketRisk | null;
  review_sites_found: string | null;
  pricing_visibility: string | null;
  job_posting_evidence: string | null;
  spend_evidence: string | null;
  sec_evidence: string | null;
  usaspending_evidence: string | null;
  segment_wedge: string | null;
  competition_notes: string | null;
  manual_reviewer_notes: string | null;
  market_proof_score: number | null;
  created_at: string;
}

export type MarketProofRecordWithProblemZone = MarketProofRecordRow & {
  problem_zone_name: string | null;
};

export type MarketProofRecordInsert = {
  problem_zone_id?: string | null;
  core_search_phrase?: string | null;
  category_exists?: boolean | null;
  visible_competitor_count?: number | null;
  hidden_market_risk?: HiddenMarketRisk | null;
  review_sites_found?: string | null;
  pricing_visibility?: string | null;
  job_posting_evidence?: string | null;
  spend_evidence?: string | null;
  sec_evidence?: string | null;
  usaspending_evidence?: string | null;
  segment_wedge?: string | null;
  competition_notes?: string | null;
  manual_reviewer_notes?: string | null;
  market_proof_score?: number | null;
  id?: string;
  created_at?: string;
};

export type MarketProofRecordUpdate = Partial<
  Omit<MarketProofRecordRow, "id" | "created_at">
>;

export interface WorkflowFrictionSignalRow {
  id: string;
  problem_zone_id: string | null;
  source: string;
  source_url: string | null;
  title: string | null;
  summary: string | null;
  friction_type: string | null;
  friction_score: number | null;
  repetition_score: number | null;
  source_diversity_score: number | null;
  workflow_specificity_score: number | null;
  manual_workaround_score: number | null;
  manual_workaround_detected: boolean;
  evidence_count: number;
  accepted_for_scoring: boolean;
  created_at: string;
}

export type WorkflowFrictionSignalWithProblemZone = WorkflowFrictionSignalRow & {
  problem_zone_name: string | null;
};

export type WorkflowFrictionSignalInsert = {
  problem_zone_id?: string | null;
  source: string;
  source_url?: string | null;
  title?: string | null;
  summary?: string | null;
  friction_type?: string | null;
  friction_score?: number | null;
  repetition_score?: number | null;
  source_diversity_score?: number | null;
  workflow_specificity_score?: number | null;
  manual_workaround_score?: number | null;
  manual_workaround_detected?: boolean;
  evidence_count?: number;
  accepted_for_scoring?: boolean;
  id?: string;
  created_at?: string;
};

export type WorkflowFrictionSignalUpdate = Partial<
  Omit<WorkflowFrictionSignalRow, "id" | "created_at">
>;

export interface ZoneRow {
  id: string;
  title: string;
  summary: string;
  industry: string;
  buyer: string;
  created_at: string;
}

export type UserPreferenceRole =
  | "agency"
  | "consultant"
  | "investor"
  | "venture_studio"
  | "general";

export interface UserPreferenceSignalPreferences {
  pressure: boolean;
  demand: boolean;
  wedge: boolean;
  friction: boolean;
  complaints: boolean;
  digital_infrastructure: boolean;
}

export interface UserPreferencesRow {
  user_id: string;
  role: UserPreferenceRole;
  industries: string[];
  buyer_types: string[];
  signal_preferences: UserPreferenceSignalPreferences;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

export type UserPreferencesInsert = Omit<
  UserPreferencesRow,
  "created_at" | "updated_at"
> & {
  created_at?: string;
  updated_at?: string;
};

export type UserPreferencesUpdate = Partial<
  Omit<UserPreferencesRow, "user_id" | "created_at">
>;

export type WatchlistSignalId =
  | "pressure"
  | "demand"
  | "wedge"
  | "friction"
  | "complaints"
  | "digital_infrastructure";

export interface WatchlistRow {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  industries: string[];
  buyer_types: string[];
  asset_types: string[];
  min_overall_score: number;
  min_persona_score: number;
  required_signals: string[];
  created_at: string;
  updated_at: string;
}

export type WatchlistInsert = {
  user_id: string;
  name: string;
  description?: string | null;
  industries?: string[];
  buyer_types?: string[];
  asset_types?: string[];
  min_overall_score?: number;
  min_persona_score?: number;
  required_signals?: string[];
  id?: string;
  created_at?: string;
  updated_at?: string;
};

export type WatchlistUpdate = Partial<
  Omit<WatchlistRow, "id" | "user_id" | "created_at">
>;

export interface WatchlistMatchRow {
  id: string;
  watchlist_id: string;
  opportunity_id: string;
  match_score: number;
  match_reasons: string[];
  created_at: string;
  dismissed: boolean;
}

export type WatchlistMatchInsert = {
  watchlist_id: string;
  opportunity_id: string;
  match_score: number;
  match_reasons: string[];
  dismissed?: boolean;
  id?: string;
  created_at?: string;
};

export type WatchlistMatchUpdate = Partial<
  Omit<WatchlistMatchRow, "id" | "watchlist_id" | "opportunity_id" | "created_at">
>;

export type WatchlistMatchWithOpportunity = WatchlistMatchRow & {
  opportunity: OpportunityRow;
};

export interface SourceRow {
  id: string;
  name: string;
  workflow_lane: WorkflowLane;
  source_type: SourceType;
  category: string | null;
  api_status: ApiStatus;
  cadence: Cadence | null;
  geography_scope: string | null;
  reliability_score: number | null;
  freshness_window_days: number | null;
  active: boolean;
  last_sync_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export type SourceInsert = {
  name: string;
  workflow_lane: WorkflowLane;
  source_type: SourceType;
  category?: string | null;
  api_status?: ApiStatus;
  cadence?: Cadence | null;
  geography_scope?: string | null;
  reliability_score?: number | null;
  freshness_window_days?: number | null;
  active?: boolean;
  last_sync_at?: string | null;
  notes?: string | null;
  id?: string;
  created_at?: string;
  updated_at?: string;
};

export type SourceUpdate = Partial<
  Omit<SourceRow, "id" | "created_at" | "updated_at">
>;

export interface Database {
  public: {
    Tables: {
      opportunities: {
        Row: OpportunityRow;
        Insert: Omit<OpportunityRow, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<OpportunityRow>;
        Relationships: [];
      };
      signals: {
        Row: SignalRow;
        Insert: Omit<SignalRow, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<SignalRow>;
        Relationships: [];
      };
      zones: {
        Row: ZoneRow;
        Insert: Omit<ZoneRow, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<ZoneRow>;
        Relationships: [];
      };
      sources: {
        Row: SourceRow;
        Insert: SourceInsert;
        Update: SourceUpdate;
        Relationships: [];
      };
      raw_signals: {
        Row: RawSignalRow;
        Insert: Omit<RawSignalRow, "id" | "observed_at" | "created_at"> & {
          id?: string;
          observed_at?: string;
          created_at?: string;
        };
        Update: Partial<RawSignalRow>;
        Relationships: [];
      };
      problem_zones: {
        Row: ProblemZoneRow;
        Insert: ProblemZoneInsert;
        Update: ProblemZoneUpdate;
        Relationships: [];
      };
      problem_zone_signals: {
        Row: ProblemZoneSignalRow;
        Insert: Omit<ProblemZoneSignalRow, "created_at"> & {
          created_at?: string;
        };
        Update: Partial<ProblemZoneSignalRow>;
        Relationships: [];
      };
      keyword_sets: {
        Row: KeywordSetRow;
        Insert: KeywordSetInsert;
        Update: KeywordSetUpdate;
        Relationships: [];
      };
      keyword_metrics: {
        Row: KeywordMetricRow;
        Insert: KeywordMetricInsert;
        Update: KeywordMetricUpdate;
        Relationships: [];
      };
      market_proof_records: {
        Row: MarketProofRecordRow;
        Insert: MarketProofRecordInsert;
        Update: MarketProofRecordUpdate;
        Relationships: [];
      };
      workflow_friction_signals: {
        Row: WorkflowFrictionSignalRow;
        Insert: WorkflowFrictionSignalInsert;
        Update: WorkflowFrictionSignalUpdate;
        Relationships: [];
      };
      user_preferences: {
        Row: UserPreferencesRow;
        Insert: UserPreferencesInsert;
        Update: UserPreferencesUpdate;
        Relationships: [];
      };
      watchlists: {
        Row: WatchlistRow;
        Insert: WatchlistInsert;
        Update: WatchlistUpdate;
        Relationships: [];
      };
      watchlist_matches: {
        Row: WatchlistMatchRow;
        Insert: WatchlistMatchInsert;
        Update: WatchlistMatchUpdate;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}