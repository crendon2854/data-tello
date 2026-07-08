# Database

See [MED.md](./MED.md) for documentation governance. **This file is the single source of truth for schema and table definitions** — do not invent fields elsewhere.

## Provider

Supabase (Postgres). Schema lives in `supabase/schema.sql`.

The database should support the full research operating system, not just the public dashboard.

## Current MVP Tables

### `opportunities`

Primary paid dashboard entity.

Status values:

- `draft`
- `in_review`
- `watchlist`
- `published`
- `rejected`
- `archived`

Key columns map to the paid Opportunity Dossier sections in [med-sections.md](./med-sections.md).

Wired in `lib/queries.ts` (`getOpportunities`, `getOpportunityById`, `getAllOpportunities`, `getDraftOpportunities`, `createOpportunity`, `updateOpportunity`, `updateOpportunityStatus`) with mock fallback when Supabase env vars are unset.

RLS: `Public read published opportunities` (keep for production) + `MVP dev all opportunities` (TEMPORARY dev-open; replace before production).

Seed data: not included in `supabase/seed.sql` — create opportunities via `/admin/opportunities` when using live Supabase, or use mock mode for demo data.

### `signals`

Legacy lightweight incoming signal table.

**Compatibility only — do not expand.** Retained for backward compatibility. The admin Raw Signal Explorer reads from `raw_signals` instead.

RLS: `MVP dev all signals` (TEMPORARY dev-open; replace before production).

### `sources`

Source Registry — tracks ingestion sources with workflow lane, type, cadence, and reliability metadata.

Wired in `lib/queries.ts` (`getSources`, `createSource`, `updateSource`) with mock fallback when Supabase env vars are unset.

RLS: `MVP dev all sources` (TEMPORARY dev-open; replace before production).

Seed data: `supabase/seed.sql`.

### `raw_signals`

Normalized warehouse for ingested records, linked to `sources` via `source_id`.

Wired in `lib/queries.ts` (`getRawSignals`, `toggleRawSignalNeedsReview`) with mock fallback.

RLS: `MVP dev all raw_signals` (TEMPORARY dev-open; replace before production).

Unique index on `dedup_hash` (where not null) for idempotent ingestion.

Seed data: `supabase/seed.sql` (references sources by name).

### `zones`

Legacy lightweight market/problem zone table.

**Compatibility only — do not expand.** Retained for backward compatibility in `lib/queries.ts` (`getZones`, `upsertZone`). No admin UI reads this table; `/admin/zones` redirects to `/admin/problem-zones`. Prefer `problem_zones` for all new work.

RLS: `MVP dev all zones` (TEMPORARY dev-open; replace before production).

Migration note: legacy `zones` data is not auto-migrated to `problem_zones`. New zones belong in `problem_zones`.

### `problem_zones`

Grouped pain patterns before they become opportunities.

Wired in `lib/queries.ts` (`getProblemZones`, `getProblemZoneById`, `createProblemZone`, `updateProblemZone`, `linkRawSignalToProblemZone`, `unlinkRawSignalFromProblemZone`) with mock fallback.

RLS: `MVP dev all problem_zones` (TEMPORARY dev-open; replace before production).

Unique constraint on `name` for idempotent seeding.

Seed data: `supabase/seed.sql`.

### `problem_zone_signals`

Join table between `problem_zones` and `raw_signals`.

RLS: `MVP dev all problem_zone_signals` (TEMPORARY dev-open; replace before production).

Link/unlink operations recalculate `source_count` and `source_diversity_count` on the parent zone.

### `keyword_sets`

Keyword families tied to problem zones for Demand Validation.

Wired in `lib/queries.ts` (`getKeywordSets`, `getKeywordSetById`, `createKeywordSet`, `updateKeywordSet`) with mock fallback.

RLS: `MVP dev all keyword_sets` (TEMPORARY dev-open; replace before production).

Seed data: `supabase/seed.sql` (linked to problem zones by name).

### `keyword_metrics`

Child records for individual keyword demand metrics.

Wired in `lib/queries.ts` (`createKeywordMetric`, `updateKeywordMetric`, `deleteKeywordMetric`) with mock fallback.

RLS: `MVP dev all keyword_metrics` (TEMPORARY dev-open; replace before production).

Seed data: `supabase/seed.sql`.

### `market_proof_records`

Market Wedge Validation records tied to problem zones.

Wired in `lib/queries.ts` (`getMarketProofRecords`, `getMarketProofRecordById`, `createMarketProofRecord`, `updateMarketProofRecord`, `deleteMarketProofRecord`) with mock fallback.

RLS: `MVP dev all market_proof_records` (TEMPORARY dev-open; replace before production).

Seed data: `supabase/seed.sql` (linked to problem zones by name).

### `workflow_friction_signals`

Workflow Friction Signals tied to problem zones.

Wired in `lib/queries.ts` (`getWorkflowFrictionSignals`, `getWorkflowFrictionSignalById`, `createWorkflowFrictionSignal`, `updateWorkflowFrictionSignal`, `deleteWorkflowFrictionSignal`) with mock fallback.

RLS: `MVP dev all workflow_friction_signals` (TEMPORARY dev-open; replace before production).

Seed data: `supabase/seed.sql` (linked to problem zones by name).

### Complaint & Incident Signals (target)

Core expansion layer. Where real users repeatedly experience failure.

Fields (target):

- `id`
- `problem_zone_id`
- `incident_type`
- `title`
- `summary`
- `source`
- `source_url`
- `recurrence_score`
- `geography`
- `industry`
- `buyer_impact`
- `source_diversity_score`
- `accepted_for_scoring_context`
- `notes`

Visual and analytical in dashboard. Does not alone determine final opportunity scores.

Not yet wired. Planned: `/admin/complaint-incidents`.

### Emerging Digital Infrastructure Signals (target)

Secondary expansion. Four sub-modules only:

- `agent_commerce`
- `stablecoin_workflow`
- `onchain_dev_tool_friction`
- `tokenized_data_pay_per_use`

Fields (target):

- `id`
- `sub_module`
- `title`
- `summary`
- `pattern_type`
- `trend_direction`
- `evidence_count`
- `chart_data`
- `notes`

Visual and analytical only. Does not determine final opportunities.

Not yet wired. Planned: `/admin/digital-infrastructure`.

## Live Table Support (Phase 6)

All MVP tables below are wired in `lib/queries.ts` with Supabase + mock fallback via `getSupabase()` / `isSupabaseConfigured`.

| Table | Live queries | Admin route | Seed in `seed.sql` |
|-------|--------------|-------------|------------------|
| `opportunities` | ✅ read/write | `/admin/opportunities` | ❌ create via admin |
| `sources` | ✅ read/write | `/admin/sources` | ✅ |
| `raw_signals` | ✅ read/update | `/admin/signals` | ✅ |
| `problem_zones` | ✅ read/write | `/admin/problem-zones` | ✅ |
| `problem_zone_signals` | ✅ link/unlink | `/admin/problem-zones` | ✅ |
| `keyword_sets` | ✅ read/write | `/admin/keywords` | ✅ |
| `keyword_metrics` | ✅ read/write/delete | `/admin/keywords` | ✅ |
| `market_proof_records` | ✅ read/write/delete | `/admin/market-proof` | ✅ |
| `workflow_friction_signals` | ✅ read/write/delete | `/admin/friction` | ✅ |
| `signals` | ✅ legacy read/update | — (use `raw_signals`) | ❌ |
| `zones` | ✅ legacy read/upsert | — (redirect only) | ❌ |

Setup guide: [supabase/README.md](../supabase/README.md).

## Production RLS Plan

**Current state:** MVP dev-open policies allow unrestricted anon access on wired tables. This is intentional for development only. Do **not** deploy to production with these policies active.

**Prerequisite:** Supabase Auth with an `admin` role (or equivalent JWT claim) before locking RLS.

### Policies to keep

| Policy | Table | Purpose |
|--------|-------|---------|
| `Public read published opportunities` | `opportunities` | Dashboard and detail pages read `status = 'published'` only |

### Policies to drop (before production)

All `MVP dev all *` policies listed in `supabase/schema.sql` RLS header.

### Policies to add (when auth exists)

| Role | Tables | Access |
|------|--------|--------|
| `anon` | `opportunities` | SELECT where `status = 'published'` |
| `authenticated` (admin) | All wired MVP + Research OS tables | SELECT, INSERT, UPDATE, DELETE |
| `service_role` (ingestion) | `sources`, `raw_signals`, join tables | INSERT/UPDATE for automated ingestion (future) |

### Target tables (no policies yet)

Tables with RLS enabled but no policies remain closed: `opportunity_scores`, `asset_strategy`, `review_queue`, `dossier_*`, `newsletter_*`, etc. Add policies when those routes ship.

### Migration checklist (production RLS)

1. Implement Supabase Auth + admin role assignment.
2. Drop all `MVP dev all *` policies.
3. Verify `Public read published opportunities` still works for dashboard.
4. Add admin-only policies for Research OS tables.
5. Test admin CRUD and public dashboard with anon key.
6. Document service-role ingestion policies when ingestion automation ships.

## Target Tables

### Research Core

#### `sources`

Tracks source registry.

Fields:

- `id`
- `name`
- `workflow_lane`
- `source_type`
- `category`
- `api_status`
- `cadence`
- `geography_scope`
- `reliability_score`
- `freshness_window_days`
- `active`
- `last_sync_at`
- `notes`

#### `raw_signals`

Normalized warehouse for ingested records.

Fields:

- `id`
- `source_id`
- `title`
- `summary`
- `raw_text`
- `source_url`
- `published_at`
- `observed_at`
- `workflow_lane`
- `source_type`
- `cadence_class`
- `freshness_label`
- `geography`
- `state`
- `metro`
- `industry_tags`
- `buyer_tags`
- `regulation_tags`
- `keyword_tags`
- `dedup_hash`
- `clustered`
- `raw_importance_score`
- `needs_review`

#### `problem_zones`

Grouped pain patterns before they become opportunities.

Fields:

- `id`
- `name`
- `summary`
- `primary_industry`
- `sub_industry`
- `primary_buyer`
- `secondary_buyer`
- `buyer_confidence`
- `geography_scope`
- `timing_label`
- `pain_theme`
- `source_count`
- `source_diversity_count`
- `pressure_strength_score`
- `freshness_score`
- `friction_score`
- `signal_mix`
- `status`
- `owner`
- `notes`

#### `problem_zone_signals`

Join table between `problem_zones` and `raw_signals`.

Fields:

- `problem_zone_id`
- `raw_signal_id`
- `created_at`

### Demand Validation

#### `keyword_sets`

Keyword families tied to problem zones.

Fields:

- `id`
- `problem_zone_id`
- `name`
- `topic_layer`
- `workflow_layer`
- `product_layer`
- `buyer_layer`
- `seed_keywords`
- `expanded_keywords`
- `rejected_keywords`
- `geo_target`
- `dataforseo_pulled`
- `last_enriched_at`
- `notes`

#### `keyword_metrics`

Child records for individual keywords.

Fields:

- `id`
- `keyword_set_id`
- `keyword`
- `search_volume`
- `trend_direction`
- `cpc`
- `competition`
- `related_keyword_density`
- `geo_signal`
- `intent_type`
- `kept_for_scoring`

### Market & Friction Proof

#### `market_proof_records`

Market Wedge Validation records.

Fields:

- `id`
- `problem_zone_id`
- `core_search_phrase`
- `category_exists`
- `visible_competitor_count`
- `hidden_market_risk`
- `review_sites_found`
- `pricing_visibility`
- `job_posting_evidence`
- `spend_evidence`
- `sec_evidence`
- `usaspending_evidence`
- `segment_wedge`
- `competition_notes`
- `manual_reviewer_notes`
- `market_proof_score`

#### `workflow_friction_signals`

Workflow Friction Signals.

Fields:

- `id`
- `problem_zone_id`
- `source`
- `source_url`
- `title`
- `summary`
- `friction_type`
- `friction_score`
- `repetition_score`
- `source_diversity_score`
- `workflow_specificity_score`
- `manual_workaround_score`
- `manual_workaround_detected`
- `evidence_count`
- `accepted_for_scoring`

### Opportunity Decision Layer

#### `opportunities`

Should expand to include the dossier fields.

Core fields:

- `id`
- `slug`
- `title`
- `status`
- `overall_score`
- `short_summary`
- `tags`
- `complexity`
- `freshness_label`
- `confidence_label`
- `problem_zone_id`

Dossier fields:

- `problem_summary`
- `evidence_summary`
- `key_pain_drivers`
- `source_mix_summary`
- `why_now`
- `target_buyer`
- `buyer_confidence`
- `core_workflow`
- `initial_wedge`
- `one_sentence_mvp`
- `time_to_value`
- `first_distribution_angle`
- `strategic_importance`
- `final_verdict`

#### `opportunity_scores`

Fields:

- `id`
- `opportunity_id`
- `pressure_score`
- `demand_score`
- `wedge_score`
- `freshness_score`
- `buildability_score`
- `asset_fit_score`
- `friction_score_internal`
- `total_score`
- `hard_gates_passed`
- `score_notes`

#### `asset_strategy`

Required dossier section. Maps to MED **Asset Strategy** (component: `BuildStrategy`).

Fields:

- `id`
- `opportunity_id`
- `best_first_asset`
- `top_asset_path_1`
- `top_asset_path_2`
- `top_asset_path_3`
- `why_this_format_wins_first`
- `expansion_ladder` — Expansion Path (Template → Tool → SaaS)
- `zip_ready_fit`
- `revenue_ceiling`

Not all opportunities should start as software.

#### `builder_fit_strategy`

Internal admin only — not part of the seven-section paid dossier output.

Fields:

- `id`
- `opportunity_id`
- `primary_builder_type`
- `secondary_builder_types`
- `recommended_tool_stack`
- `tool_fit_by_user_type`
- `avoid_first`
- `skill_fit`
- `build_speed`
- `setup_complexity`
- `maintenance_burden`
- `packaging_ease`
- `revenue_ceiling`
- `support_risk`
- `upgrade_potential`

#### `competitive_strategy`

Required dossier section. Maps to MED **Competitive Differentiator Strategy** (component: `CompetitiveAngle`).

Fields:

- `id`
- `opportunity_id`
- `competitor_landscape`
- `review_complaint_themes` — Review Complaint Patterns
- `underserved_segment`
- `differentiation_angle`
- `what_not_to_compete_on` — What NOT to Build
- `competitive_entry_path`
- `feature_gap`
- `pricing_gap`
- `ux_gap`
- `distribution_gap`
- `service_gap`
- `small_operator_right_to_win`

#### `monetization_paths`

Fields:

- `id`
- `opportunity_id`
- `first_paid_asset`
- `likely_price_band`
- `upgrade_path`
- `service_package_option`
- `recurring_revenue_potential`
- `affiliate_tool_monetization_option`

#### `opportunity_risks`

Fields:

- `id`
- `opportunity_id`
- `false_positive_risk`
- `competition_risk`
- `data_lag_risk`
- `buyer_uncertainty`
- `service_vs_software_risk`
- `regulatory_dependency_risk`
- `maintenance_support_burden`

### Review / Publishing

#### `review_queue`

Human review checkpoint.

Fields:

- `id`
- `opportunity_id`
- `reviewer`
- `review_status`
- `painful_workflow_identified`
- `buyer_clearly_identified`
- `asset_fit_approved`
- `software_timing_approved`
- `mvp_clear_in_one_sentence`
- `timing_label_honest`
- `publish_worthy`
- `reviewer_notes`
- `reviewed_at`

#### `watchlist_items`

Fields:

- `id`
- `problem_zone_id`
- `opportunity_id`
- `reason_for_watchlist`
- `next_review_date`
- `recheck_trigger`
- `notes`
- `status`

#### `dossier_templates`

Fields:

- `id`
- `name`
- `is_default`
- `sections_enabled`
- `branding_config`
- `chart_config`
- `affiliate_link_config`
- `version`

#### `dossier_exports`

Fields:

- `id`
- `opportunity_id`
- `template_id`
- `export_url`
- `export_status`
- `created_at`
- `created_by`
- `version_snapshot`

### Newsletter Engine

#### `newsletter_subscribers`

Fields:

- `id`
- `email`
- `status`
- `source`
- `subscribed_at`
- `unsubscribed_at`
- `tags`

#### `newsletter_events`

Fields:

- `id`
- `subscriber_id`
- `event_type`
- `campaign_id`
- `opportunity_id`
- `created_at`
- `metadata`

### System Health

#### `system_health_events`

Fields:

- `id`
- `source_id`
- `event_type`
- `severity`
- `message`
- `repair_status`
- `requires_human_approval`
- `created_at`
- `resolved_at`

### Growth Automation Stack

This can be added later and kept separate from core intelligence.

#### `growth_prospects`

Fields:

- `id`
- `company_name`
- `contact_name`
- `email`
- `icp_segment`
- `source`
- `enrichment_status`
- `outreach_status`
- `notes`

#### `outreach_runs`

Fields:

- `id`
- `name`
- `icp_segment`
- `n8n_workflow_id`
- `status`
- `human_approved`
- `started_at`
- `completed_at`

## Query Layer (`lib/queries.ts`)

Existing functions:

| Function | Purpose |
|----------|---------|
| `getOpportunities()` | Published only, sorted by score |
| `getOpportunityById(id)` | Single opportunity |
| `getAllOpportunities()` | All statuses (admin) |
| `getDraftOpportunities()` | Review queue |
| `createOpportunity(data)` | Insert new |
| `updateOpportunity(id, data)` | Full update |
| `updateOpportunityStatus(id, status)` | Approve / reject / publish |
| `getSignals()` | List signals |
| `toggleSignalProcessed(id, bool)` | Mark processed |
| `getZones()` | List zones |
| `upsertZone(zone)` | Create or update zone |
| `getSources()` | List source registry entries |
| `createSource(data)` | Insert new source |
| `updateSource(id, data)` | Update source fields |
| `getRawSignals()` | List raw signals with source name join |
| `toggleRawSignalNeedsReview(id, bool)` | Flag signal for triage |
| `getProblemZones()` | List problem zones with linked raw signals |
| `getProblemZoneById(id)` | Single problem zone with linked signals |
| `createProblemZone(data)` | Insert new problem zone |
| `updateProblemZone(id, data)` | Update problem zone fields |
| `linkRawSignalToProblemZone(zoneId, signalId)` | Link raw signal; recalculates counts |
| `unlinkRawSignalFromProblemZone(zoneId, signalId)` | Unlink raw signal; recalculates counts |
| `getKeywordSets()` | List keyword sets with problem zone name and metrics |
| `getKeywordSetById(id)` | Single keyword set with metrics |
| `createKeywordSet(data)` | Insert new keyword set |
| `updateKeywordSet(id, data)` | Update keyword set fields |
| `createKeywordMetric(data)` | Insert keyword metric row |
| `updateKeywordMetric(id, data)` | Update keyword metric row |
| `deleteKeywordMetric(id)` | Delete keyword metric row |
| `getMarketProofRecords()` | List market proof records with problem zone name |
| `getMarketProofRecordById(id)` | Single market proof record |
| `createMarketProofRecord(data)` | Insert market proof record |
| `updateMarketProofRecord(id, data)` | Update market proof record |
| `deleteMarketProofRecord(id)` | Delete market proof record |
| `getWorkflowFrictionSignals()` | List friction signals with problem zone name |
| `getWorkflowFrictionSignalById(id)` | Single friction signal |
| `createWorkflowFrictionSignal(data)` | Insert friction signal |
| `updateWorkflowFrictionSignal(id, data)` | Update friction signal |
| `deleteWorkflowFrictionSignal(id)` | Delete friction signal |

Future query groups should be organized by module:

- problem zones
- keyword sets
- market proof
- friction signals
- complaint incident signals
- emerging digital infrastructure signals
- scoring
- review queue
- dossiers
- newsletter
- system health

## Mock Mode

When `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are unset, queries use in-memory mock data from `lib/mock-data.ts`.

Mock data must reflect the paid Opportunity Dossier shape, not just simple cards.