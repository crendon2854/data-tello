-- DataTello Supabase schema
-- Run in the Supabase SQL editor or as a migration.
-- This file is intentionally UTF-8. Do not save as UTF-16.

create extension if not exists pgcrypto;

-- -----------------------------------------------------------------------------
-- Current MVP tables used by the app today
-- -----------------------------------------------------------------------------

create table if not exists opportunities (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  short_summary text,
  overall_score integer not null default 0,
  best_first_asset text,
  complexity text,
  tags text[] default '{}',
  status text not null default 'draft' check (status in ('draft', 'published', 'rejected')),

  -- Why this exists
  problem_summary text,
  evidence_summary text,
  key_pain_drivers text[] default '{}',

  -- Signal breakdown
  pressure_score integer,
  demand_score integer,
  wedge_score integer,
  buildability_score integer,
  asset_fit_score integer,

  -- Build strategy
  asset_path_1 text,
  asset_path_2 text,
  asset_path_3 text,
  asset_reason text,
  expansion_ladder text,

  -- Execution angle
  target_buyer text,
  core_workflow text,
  initial_wedge text,
  time_to_value text,

  -- Competitive angle
  underserved_segment text,
  competitor_summary text,
  avoid text,
  differentiation text,
  entry_strategy text,

  -- Close
  strategic_importance text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists signals (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  source text not null,
  type text not null,
  processed boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists zones (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text not null,
  industry text not null,
  buyer text not null,
  created_at timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- Research OS target tables. These can be wired incrementally.
-- -----------------------------------------------------------------------------

create table if not exists sources (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  workflow_lane text not null check (workflow_lane in ('pressure_discovery', 'demand_validation', 'market_wedge_validation', 'workflow_friction')),
  source_type text not null check (source_type in ('structural', 'trigger', 'market_proof', 'friction')),
  category text,
  api_status text not null default 'manual' check (api_status in ('automated', 'semi_manual', 'manual')),
  cadence text check (cadence in ('daily', 'weekly', 'monthly', 'quarterly', 'annual', 'manual')),
  geography_scope text,
  reliability_score integer check (reliability_score between 1 and 5),
  freshness_window_days integer,
  active boolean not null default true,
  last_sync_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists raw_signals (
  id uuid primary key default gen_random_uuid(),
  source_id uuid references sources(id) on delete set null,
  title text not null,
  summary text,
  raw_text text,
  source_url text,
  published_at timestamptz,
  observed_at timestamptz not null default now(),
  workflow_lane text,
  source_type text,
  cadence_class text,
  freshness_label text,
  geography text,
  state text,
  metro text,
  industry_tags text[] default '{}',
  buyer_tags text[] default '{}',
  regulation_tags text[] default '{}',
  keyword_tags text[] default '{}',
  dedup_hash text,
  clustered boolean not null default false,
  raw_importance_score integer,
  needs_review boolean not null default false,
  created_at timestamptz not null default now()
);

create unique index if not exists raw_signals_dedup_hash_idx on raw_signals (dedup_hash)
  where dedup_hash is not null;

create table if not exists problem_zones (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  summary text,
  primary_industry text,
  sub_industry text,
  primary_buyer text,
  secondary_buyer text,
  buyer_confidence text,
  geography_scope text,
  timing_label text check (timing_label in ('trigger_driven', 'structural', 'mixed')),
  pain_theme text,
  source_count integer not null default 0,
  source_diversity_count integer not null default 0,
  pressure_strength_score integer,
  freshness_score integer,
  friction_score integer,
  signal_mix text,
  status text not null default 'new' check (status in ('new', 'reviewing', 'enriching', 'ready_for_market_proof', 'ready_for_scoring', 'watchlist', 'rejected', 'promoted')),
  owner text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists problem_zone_signals (
  problem_zone_id uuid not null references problem_zones(id) on delete cascade,
  raw_signal_id uuid not null references raw_signals(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (problem_zone_id, raw_signal_id)
);

create table if not exists keyword_sets (
  id uuid primary key default gen_random_uuid(),
  problem_zone_id uuid references problem_zones(id) on delete cascade,
  name text not null,
  topic_layer text,
  workflow_layer text,
  product_layer text,
  buyer_layer text,
  seed_keywords text[] default '{}',
  expanded_keywords text[] default '{}',
  rejected_keywords text[] default '{}',
  geo_target text,
  dataforseo_pulled boolean not null default false,
  last_enriched_at timestamptz,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists keyword_metrics (
  id uuid primary key default gen_random_uuid(),
  keyword_set_id uuid references keyword_sets(id) on delete cascade,
  keyword text not null,
  search_volume integer,
  trend_direction text,
  cpc numeric,
  competition numeric,
  related_keyword_density integer,
  geo_signal text,
  intent_type text check (intent_type in ('informational', 'commercial', 'mixed')),
  kept_for_scoring boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists market_proof_records (
  id uuid primary key default gen_random_uuid(),
  problem_zone_id uuid references problem_zones(id) on delete cascade,
  core_search_phrase text,
  category_exists boolean,
  visible_competitor_count integer,
  hidden_market_risk text check (hidden_market_risk in ('low', 'medium', 'high')),
  review_sites_found text,
  pricing_visibility text,
  job_posting_evidence text,
  spend_evidence text,
  sec_evidence text,
  usaspending_evidence text,
  segment_wedge text,
  competition_notes text,
  manual_reviewer_notes text,
  market_proof_score integer,
  created_at timestamptz not null default now()
);

create table if not exists workflow_friction_signals (
  id uuid primary key default gen_random_uuid(),
  problem_zone_id uuid references problem_zones(id) on delete cascade,
  source text not null,
  source_url text,
  title text,
  summary text,
  friction_type text,
  friction_score integer check (friction_score between 0 and 10),
  repetition_score integer check (repetition_score between 0 and 3),
  source_diversity_score integer check (source_diversity_score between 0 and 2),
  workflow_specificity_score integer check (workflow_specificity_score between 0 and 3),
  manual_workaround_score integer check (manual_workaround_score between 0 and 2),
  manual_workaround_detected boolean not null default false,
  evidence_count integer not null default 0,
  accepted_for_scoring boolean not null default false,
  created_at timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- Opportunity strategy and publishing support tables
-- -----------------------------------------------------------------------------

create table if not exists opportunity_scores (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid references opportunities(id) on delete cascade,
  pressure_score integer,
  demand_score integer,
  wedge_score integer,
  freshness_score integer,
  buildability_score integer,
  asset_fit_score integer,
  friction_score_internal integer,
  total_score integer,
  hard_gates_passed boolean not null default false,
  score_notes text,
  created_at timestamptz not null default now()
);

create table if not exists asset_strategy (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid references opportunities(id) on delete cascade,
  best_first_asset text,
  top_asset_path_1 text,
  top_asset_path_2 text,
  top_asset_path_3 text,
  why_this_format_wins_first text,
  expansion_ladder text,
  zip_ready_fit integer check (zip_ready_fit between 1 and 5),
  build_difficulty text,
  revenue_ceiling text,
  recommended_ai_build_stack text,
  why_not_full_software_yet text,
  when_to_upgrade_to_saas text,
  maintenance_burden text,
  support_burden text,
  created_at timestamptz not null default now()
);

create table if not exists builder_fit_strategy (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid references opportunities(id) on delete cascade,
  primary_builder_type text,
  secondary_builder_types text[] default '{}',
  recommended_tool_stack text,
  tool_fit_by_user_type jsonb default '{}'::jsonb,
  avoid_first text,
  skill_fit integer,
  build_speed integer,
  setup_complexity integer,
  maintenance_burden integer,
  packaging_ease integer,
  revenue_ceiling integer,
  support_risk integer,
  upgrade_potential integer,
  created_at timestamptz not null default now()
);

create table if not exists competitive_strategy (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid references opportunities(id) on delete cascade,
  competitor_landscape text,
  visible_competitor_count integer,
  competitor_type text,
  review_complaint_themes text[] default '{}',
  underserved_segment text,
  best_vertical_entry_point text,
  avoided_verticals text[] default '{}',
  differentiation_angle text,
  what_not_to_compete_on text,
  competitive_entry_path text,
  feature_gap text,
  pricing_gap text,
  ux_gap text,
  distribution_gap text,
  service_gap text,
  small_builder_right_to_win text,
  created_at timestamptz not null default now()
);

create table if not exists monetization_paths (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid references opportunities(id) on delete cascade,
  first_paid_asset text,
  likely_price_band text,
  upgrade_path text,
  service_package_option text,
  recurring_revenue_potential text,
  affiliate_tool_monetization_option text,
  created_at timestamptz not null default now()
);

create table if not exists opportunity_risks (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid references opportunities(id) on delete cascade,
  false_positive_risk text,
  competition_risk text,
  data_lag_risk text,
  buyer_uncertainty text,
  service_vs_software_risk text,
  regulatory_dependency_risk text,
  maintenance_support_burden text,
  created_at timestamptz not null default now()
);

create table if not exists review_queue (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid references opportunities(id) on delete cascade,
  reviewer text,
  review_status text not null default 'pending' check (review_status in ('pending', 'in_review', 'approved', 'rework', 'rejected')),
  painful_workflow_identified boolean,
  buyer_clearly_identified boolean,
  asset_fit_approved boolean,
  software_timing_approved boolean,
  mvp_clear_in_one_sentence boolean,
  timing_label_honest boolean,
  publish_worthy boolean,
  reviewer_notes text,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists watchlist_items (
  id uuid primary key default gen_random_uuid(),
  problem_zone_id uuid references problem_zones(id) on delete set null,
  opportunity_id uuid references opportunities(id) on delete set null,
  reason_for_watchlist text,
  next_review_date date,
  recheck_trigger text,
  notes text,
  status text not null default 'active' check (status in ('active', 'promoted', 'closed')),
  created_at timestamptz not null default now()
);

create table if not exists dossier_templates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  is_default boolean not null default false,
  sections_enabled jsonb not null default '{}'::jsonb,
  branding_config jsonb not null default '{}'::jsonb,
  chart_config jsonb not null default '{}'::jsonb,
  affiliate_link_config jsonb not null default '{}'::jsonb,
  version integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists dossier_exports (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid references opportunities(id) on delete cascade,
  template_id uuid references dossier_templates(id) on delete set null,
  export_url text,
  export_status text not null default 'pending' check (export_status in ('pending', 'generated', 'failed')),
  created_by text,
  version_snapshot jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- Newsletter Engine
-- -----------------------------------------------------------------------------

create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  status text not null default 'subscribed' check (status in ('subscribed', 'unsubscribed', 'bounced')),
  source text,
  subscribed_at timestamptz not null default now(),
  unsubscribed_at timestamptz,
  tags text[] default '{}'
);

create table if not exists newsletter_events (
  id uuid primary key default gen_random_uuid(),
  subscriber_id uuid references newsletter_subscribers(id) on delete cascade,
  event_type text not null,
  campaign_id text,
  opportunity_id uuid references opportunities(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- System Health and separate Growth Automation Stack
-- -----------------------------------------------------------------------------

create table if not exists system_health_events (
  id uuid primary key default gen_random_uuid(),
  source_id uuid references sources(id) on delete set null,
  event_type text not null,
  severity text not null default 'info' check (severity in ('info', 'warning', 'error', 'critical')),
  message text not null,
  repair_status text default 'none' check (repair_status in ('none', 'proposed', 'applied', 'failed', 'requires_human')),
  requires_human_approval boolean not null default false,
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create table if not exists growth_prospects (
  id uuid primary key default gen_random_uuid(),
  company_name text,
  contact_name text,
  email text,
  icp_segment text,
  source text,
  enrichment_status text,
  outreach_status text,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists outreach_runs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  icp_segment text,
  n8n_workflow_id text,
  status text not null default 'draft' check (status in ('draft', 'approved', 'running', 'completed', 'paused', 'failed')),
  human_approved boolean not null default false,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- RLS
-- -----------------------------------------------------------------------------

alter table opportunities enable row level security;
alter table signals enable row level security;
alter table zones enable row level security;
alter table sources enable row level security;
alter table raw_signals enable row level security;
alter table problem_zones enable row level security;
alter table problem_zone_signals enable row level security;
alter table keyword_sets enable row level security;
alter table keyword_metrics enable row level security;
alter table market_proof_records enable row level security;
alter table workflow_friction_signals enable row level security;
alter table opportunity_scores enable row level security;
alter table asset_strategy enable row level security;
alter table builder_fit_strategy enable row level security;
alter table competitive_strategy enable row level security;
alter table monetization_paths enable row level security;
alter table opportunity_risks enable row level security;
alter table review_queue enable row level security;
alter table watchlist_items enable row level security;
alter table dossier_templates enable row level security;
alter table dossier_exports enable row level security;
alter table newsletter_subscribers enable row level security;
alter table newsletter_events enable row level security;
alter table system_health_events enable row level security;
alter table growth_prospects enable row level security;
alter table outreach_runs enable row level security;

-- Public app read: only published opportunities.
drop policy if exists "Public read published opportunities" on opportunities;
create policy "Public read published opportunities"
  on opportunities for select
  using (status = 'published');

-- MVP admin/dev policies. Replace these with authenticated admin-only policies before production.
drop policy if exists "MVP dev all opportunities" on opportunities;
create policy "MVP dev all opportunities" on opportunities for all using (true) with check (true);

drop policy if exists "MVP dev all signals" on signals;
create policy "MVP dev all signals" on signals for all using (true) with check (true);

drop policy if exists "MVP dev all zones" on zones;
create policy "MVP dev all zones" on zones for all using (true) with check (true);

-- MVP admin/dev policy for sources. Replace with authenticated admin-only policy before production.
drop policy if exists "MVP dev all sources" on sources;
create policy "MVP dev all sources" on sources for all using (true) with check (true);

-- MVP admin/dev policy for raw_signals. Replace with authenticated admin-only policy before production.
drop policy if exists "MVP dev all raw_signals" on raw_signals;
create policy "MVP dev all raw_signals" on raw_signals for all using (true) with check (true);

-- MVP admin/dev policies for problem zones. Replace with authenticated admin-only policies before production.
drop policy if exists "MVP dev all problem_zones" on problem_zones;
create policy "MVP dev all problem_zones" on problem_zones for all using (true) with check (true);

drop policy if exists "MVP dev all problem_zone_signals" on problem_zone_signals;
create policy "MVP dev all problem_zone_signals" on problem_zone_signals for all using (true) with check (true);

-- MVP admin/dev policies for keyword intelligence. Replace with authenticated admin-only policies before production.
drop policy if exists "MVP dev all keyword_sets" on keyword_sets;
create policy "MVP dev all keyword_sets" on keyword_sets for all using (true) with check (true);

drop policy if exists "MVP dev all keyword_metrics" on keyword_metrics;
create policy "MVP dev all keyword_metrics" on keyword_metrics for all using (true) with check (true);

-- MVP admin/dev policy for market proof. Replace with authenticated admin-only policy before production.
drop policy if exists "MVP dev all market_proof_records" on market_proof_records;
create policy "MVP dev all market_proof_records" on market_proof_records for all using (true) with check (true);

-- MVP admin/dev policy for workflow friction. Replace with authenticated admin-only policy before production.
drop policy if exists "MVP dev all workflow_friction_signals" on workflow_friction_signals;
create policy "MVP dev all workflow_friction_signals" on workflow_friction_signals for all using (true) with check (true);

-- Keep other target tables closed until their routes and auth model are implemented.
