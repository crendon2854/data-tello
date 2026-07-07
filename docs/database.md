# Database

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

### `signals`

Current lightweight incoming signal table.

Should evolve into `raw_signals` or be renamed when the ingestion layer becomes real.

### `zones`

Current lightweight market/problem zone table.

Should evolve into `problem_zones`.

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

Fields:

- `id`
- `opportunity_id`
- `best_first_asset`
- `top_asset_path_1`
- `top_asset_path_2`
- `top_asset_path_3`
- `why_this_format_wins_first`
- `expansion_ladder`
- `zip_ready_fit`
- `build_difficulty`
- `revenue_ceiling`
- `recommended_ai_build_stack`
- `why_not_full_software_yet`
- `when_to_upgrade_to_saas`
- `maintenance_burden`
- `support_burden`

#### `builder_fit_strategy`

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

Fields:

- `id`
- `opportunity_id`
- `competitor_landscape`
- `visible_competitor_count`
- `competitor_type`
- `review_complaint_themes`
- `underserved_segment`
- `best_vertical_entry_point`
- `avoided_verticals`
- `differentiation_angle`
- `what_not_to_compete_on`
- `competitive_entry_path`
- `feature_gap`
- `pricing_gap`
- `ux_gap`
- `distribution_gap`
- `service_gap`
- `small_builder_right_to_win`

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

Future query groups should be organized by module:

- raw signals (beyond MVP `signals`)
- raw signals
- problem zones
- keyword sets
- market proof
- friction signals
- scoring
- review queue
- dossiers
- newsletter
- system health

## Mock Mode

When `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are unset, queries use in-memory mock data from `lib/mock-data.ts`.

Mock data must reflect the paid Opportunity Dossier shape, not just simple cards.