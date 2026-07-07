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
  buildability_score: number | null;
  asset_fit_score: number | null;
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

export interface ZoneRow {
  id: string;
  title: string;
  summary: string;
  industry: string;
  buyer: string;
  created_at: string;
}

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

export type SourceInsert = Omit<
  SourceRow,
  "id" | "created_at" | "updated_at"
> & {
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
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}