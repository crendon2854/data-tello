# MED Sections

See [MED.md](./MED.md) for documentation governance. **This file is the single source of truth for dossier section structure** — detail pages and admin forms must match it.

Source of truth for opportunity display, paid Opportunity Dossiers, and admin form structure.

DataTello does not sell generic trend ideas. It sells **evidence-backed build opportunities**. Each opportunity should tell the user what problem is forming, who the buyer is, why it matters now, and what the best first asset is.

## Naming Rules

Use these names consistently:

- **Weekly Signal Brief** — free newsletter email for subscribers
- **Opportunity Dossier** — full paid opportunity asset inside dashboard and PDF
- **Dashboard Brief View** — in-app readable version of the dossier
- **PDF Dossier** — downloadable PDF generated from a selected/default template

Avoid using `report` as the primary user-facing term.

## V1 Paid Opportunity Dossier Structure

Render in this order, each inside a `Card`.

### 1. OpportunitySnapshot

Purpose: fast scan, like the top of a premium opportunity card.

Fields:

- `title`
- `overall_score`
- `best_first_asset`
- `complexity`
- `freshness_label`
- `confidence_label`
- `tags`
- `short_summary`

### 2. WhyThisExists

Purpose: explain the real-world reason this opportunity exists.

Fields:

- `problem_summary`
- `evidence_summary`
- `key_pain_drivers`
- `source_mix_summary`
- `why_now`

Keep this tight. No essays.

### 3. SignalBreakdown

Purpose: show the system's judgment without exposing too much internal machinery.

Visible fields:

- `pressure_score`
- `demand_score`
- `wedge_score`
- `freshness_score`
- `buildability_score`
- `asset_fit_score`

Internal modifier:

- `friction_score`

Friction should not appear as a main public score. It modifies Pain/Pressure, Wedge, and Buildability when repeated workflow failure is visible.

### 4. BuildStrategy

Purpose: this is DataTello's core edge.

Fields:

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

Supported asset types:

- Full software
- Lightweight SaaS
- Internal tool
- Spreadsheet/template
- Tracker/log
- Dashboard/reporting layer
- Workflow pack
- Service + tool hybrid

### 5. BuilderFitStrategy

Purpose: recommend the right build path by builder type, not just the most powerful tool.

Builder types:

- Vibe coder
- No-code operator
- Automation builder
- Template seller
- Technical founder
- Agency/productizer
- Product studio / advanced SaaS builder

Fields:

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
- `support_risk`
- `upgrade_potential`

### 6. ExecutionAngle

Purpose: tell the user exactly how to start.

Fields:

- `target_buyer`
- `buyer_confidence`
- `core_workflow`
- `initial_wedge`
- `one_sentence_mvp`
- `time_to_value`
- `first_distribution_angle`

### 7. CompetitiveAngle

Purpose: show the realistic entry path.

Fields:

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

This section is qualitative. Do not reduce it to a fake precision score.

### 8. MonetizationPath

Purpose: compact commercial path, not a full business plan.

Fields:

- `first_paid_asset`
- `likely_price_band`
- `upgrade_path`
- `service_package_option`
- `recurring_revenue_potential`
- `affiliate_tool_monetization_option`

### 9. Risks

Purpose: keep the dossier honest.

Fields:

- `false_positive_risk`
- `competition_risk`
- `data_lag_risk`
- `buyer_uncertainty`
- `service_vs_software_risk`
- `regulatory_dependency_risk`
- `maintenance_support_burden`

### 10. WhyThisMatters

Purpose: short close.

Fields:

- `strategic_importance`
- `final_verdict`

Keep this to 2-3 lines.

## Dashboard Card (`OpportunityCard`)

| Field | DB Column |
|-------|-----------|
| Title | `title` |
| Score | `overall_score` |
| Best First Asset | `best_first_asset` |
| Complexity | `complexity` |
| Freshness | `freshness_label` |
| Short Summary | `short_summary` |
| Tags | `tags` |

## Admin Form Sections

Mirror the dossier structure. Group as:

1. **Basic** — title, score, best_first_asset, complexity, tags, status, short_summary
2. **Why This Exists** — problem, evidence, key pain drivers, why now
3. **Scores** — pressure, demand, wedge, freshness, buildability, asset fit, internal friction
4. **Build Strategy** — asset paths, format rationale, expansion ladder, revenue ceiling
5. **Builder Fit** — builder types, tool stack, avoid-first guidance, support burden
6. **Execution** — buyer, workflow, wedge, MVP, time to value
7. **Competition** — segment, competitors, complaints, differentiation, avoid, entry strategy
8. **Monetization** — first asset, pricing, upgrade path, recurring potential
9. **Risks** — false positives, lag, buyer uncertainty, competition, maintenance
10. **Final Verdict** — publish/watch/reject and reasoning

## Free Weekly Signal Brief Structure

Free newsletter output is not the full dossier.

Include only:

- 1-3 short signals
- compressed explanation
- light evidence
- teaser of best first asset
- CTA to unlock full dashboard dossier

Do not include full evidence stack, full asset strategy, full competitive differentiator strategy, or full PDF.