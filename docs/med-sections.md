# MED Sections

See [MED.md](./MED.md) for documentation governance. **This file is the single source of truth for dossier section structure** — detail pages and admin forms must match it.

Source of truth for opportunity display, paid Opportunity Dossiers, and admin form structure.

DataTello delivers evidence-backed build opportunities using structured signals, scoring, and guardrails. Each opportunity answers: what operational pain exists, who the buyer is, why it matters now, what the market wedge is, and what the best first asset is.

## Build Opportunity Definition

A **Build Opportunity** is a validated way to create value in a market, backed by source-backed evidence and operational pain.

The same opportunity data is shown to every persona. Scores, signals, evidence, buyer context, competitive reality, and risks are the **truth layer** — they never change by persona.

Personas change only the **execution lens**: section emphasis, CTA wording, asset path labels, dashboard copy, and section ordering.

| Persona | Role label | Primary CTA | Core question |
|---------|------------|-------------|---------------|
| Agency | Sell it | Package this offer | What services or products can we offer clients? |
| Consultant | Advise it | Advise on this opportunity | What should we advise clients to do? |
| Investor | Fund or acquire | Evaluate this market | Where are new opportunities forming? |

Implementation: `lib/persona-lens.ts`, `hooks/usePersonaLens.ts`, `components/ui/PersonaSelector.tsx`.

### Persona Lens Rules

1. **Do not** generate different opportunities by persona.
2. **Do not** change scores by persona.
3. **Do not** hide core evidence.
4. **Do** reorder and spotlight sections based on persona.
5. **Do** use persona-aware labels and helper text.
6. **Do** relabel asset path steps without changing path data.

## Core Signal Layers

DataTello Core uses four signal lanes. All four are required in every scored opportunity:

1. **Pressure Discovery** — real-world operational pressure
2. **Demand Validation** — search behavior, buyer language, commercial intent
3. **Market Wedge Validation** — category gaps, competition, spend proof
4. **Workflow Friction Signals** — repeated execution failure where people struggle to operationalize workflows

### Workflow Friction Rule

Workflow Friction Signals detect repeated execution failure — where people are struggling to operationalize workflows.

- Friction **modifies scoring**: Pain/Pressure, Market Wedge, and Buildability
- Friction is an **internal modifier** — not a standalone public score
- Friction does **not** act as a standalone decision engine
- Friction does not bypass guardrails, scoring, or human review

### Expansion Signal Layers

**Complaint & Incident Signals** (core expansion)

Where real-world failures repeatedly occur. Detects repeated failures, reveals operational pain before demand spikes. Strong in regulated and operational industries.

**Emerging Digital Infrastructure Signals** (secondary expansion)

Four sub-modules only:

- Agent Commerce Signals
- Stablecoin Workflow Signals
- Onchain Developer Tool Friction
- Tokenized Data / Pay-Per-Use Data Signals

Both expansion layers are **visual signal layers** — charts, patterns, trends. They are not final decision drivers.

**Final opportunities are determined by DataTello's structured scoring engine, guardrails, and human review — not by any single signal layer.**

## Scoring Model

Software Likelihood is replaced by:

- **Buildability Score** — can something useful be created and delivered?
- **Asset Fit Decision** — what is the best first asset for this opportunity?

Public score buckets in Signal Breakdown:

- `pressure_score`
- `demand_score`
- `wedge_score`
- `freshness_score`
- `buildability_score`
- `asset_fit_score`

Internal modifier: `friction_score` (not shown as a main public score)

## Naming Rules

Use these names consistently:

- **Weekly Signal Brief** — free newsletter email for subscribers
- **Opportunity Dossier** — full paid opportunity asset inside dashboard and PDF
- **Dashboard Brief View** — in-app readable version of the dossier
- **PDF Dossier** — downloadable PDF generated from a selected/default template

Avoid using `report` as the primary user-facing term.

## V1 Paid Opportunity Dossier Structure

Render in this exact order, each inside a `Card`. This is the canonical output structure for all paid opportunities.

### 1. Opportunity Snapshot

Purpose: fast scan — premium opportunity card summary.

Fields:

- `title`
- `overall_score`
- `best_first_asset`
- `complexity`
- `freshness_label`
- `confidence_label`
- `tags`
- `short_summary`

### 2. Why This Exists

Purpose: explain the real-world reason this opportunity exists.

Fields:

- `problem_summary`
- `evidence_summary`
- `key_pain_drivers`
- `source_mix_summary`
- `why_now`

Keep this tight. No essays.

### 3. Signal Breakdown

Purpose: show structured scoring judgment without exposing internal machinery.

Visible scores:

- `pressure_score` (Pressure Discovery)
- `demand_score` (Demand Validation)
- `wedge_score` (Market Wedge Validation)
- `freshness_score`
- `buildability_score` (Buildability Score)
- `asset_fit_score` (Asset Fit Decision)

Internal modifier:

- `friction_score` (Workflow Friction Signals — modifies Pain, Market Wedge, Buildability; not a standalone public score)

Analytical panels (non-scoring, when in scope):

- Complaint & Incident Signals summary
- Emerging Digital Infrastructure Signals summary

### 4. Asset Strategy

Purpose: define what to create first and how to expand. **Not all opportunities should start as software.**

Required fields:

- `best_first_asset` — Best First Asset
- `top_asset_path_1` — Top 3 Asset Paths (path 1)
- `top_asset_path_2` — Top 3 Asset Paths (path 2)
- `top_asset_path_3` — Top 3 Asset Paths (path 3)
- `why_this_format_wins_first` — Why This Format Wins First
- `expansion_ladder` — Expansion Path (Template → Tool → SaaS)
- `zip_ready_fit` — Zip-Ready Fit
- `revenue_ceiling` — Revenue Ceiling

Supported asset types:

- Full software
- Lightweight product
- Internal tool
- Spreadsheet/template
- Tracker/log
- Dashboard/reporting layer
- Workflow pack
- Service + tool hybrid

Component mapping: `BuildStrategy` (`components/sections/BuildStrategy.tsx`) renders this section until renamed in code.

### 5. Execution Angle

Purpose: how to act on this opportunity — buyer, wedge, and entry path.

Fields:

- `target_buyer`
- `buyer_confidence`
- `core_workflow`
- `initial_wedge`
- `one_sentence_mvp`
- `time_to_value`
- `first_distribution_angle`

### 6. Competitive Differentiator Strategy

Purpose: qualitative competitive entry analysis. Not a fake precision score.

Required fields:

- `competitor_landscape` — Competitor Landscape
- `review_complaint_themes` — Review Complaint Patterns
- `underserved_segment` — Underserved Segment
- `differentiation_angle` — Differentiation Angle
- `what_not_to_compete_on` — What NOT to Build
- `competitive_entry_path` — Competitive Entry Path

Additional fields (admin/detail):

- `visible_competitor_count`
- `competitor_type`
- `best_vertical_entry_point`
- `avoided_verticals`
- `feature_gap`
- `pricing_gap`
- `ux_gap`
- `distribution_gap`
- `service_gap`

Component mapping: `CompetitiveAngle` (`components/sections/CompetitiveAngle.tsx`) renders this section until renamed in code.

### 7. Why This Matters

Purpose: short strategic close.

Fields:

- `strategic_importance`
- `final_verdict`

Keep this to 2–3 lines.

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

Mirror the seven-section dossier structure. Group as:

1. **Basic** — title, score, best_first_asset, complexity, tags, status, short_summary
2. **Why This Exists** — problem, evidence, key pain drivers, why now
3. **Scores** — pressure, demand, wedge, freshness, buildability, asset fit, internal friction
4. **Asset Strategy** — best first asset, top 3 paths, why format wins, expansion path, zip-ready fit, revenue ceiling
5. **Execution** — buyer, workflow, wedge, MVP, time to value, distribution
6. **Competitive Differentiator** — landscape, complaint patterns, underserved segment, differentiation, what not to build, entry path
7. **Final Verdict** — strategic importance, publish/watch/reject reasoning

## Internal Admin Fields (not in primary dossier output)

These exist in the database and admin tooling but are not part of the seven-section paid dossier:

- Monetization paths (`monetization_paths`)
- Opportunity risks (`opportunity_risks`)
- Builder fit / delivery fit (`builder_fit_strategy`) — internal admin only

## Free Weekly Signal Brief Structure

Free newsletter output is not the full dossier.

Include only:

- 1–3 short signals
- compressed explanation
- light evidence
- teaser of best first asset
- CTA to unlock full dashboard dossier

Do not include full evidence stack, full asset strategy, full competitive differentiator strategy, or full PDF.
