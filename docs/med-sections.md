# MED Sections

See [MED.md](./MED.md) for documentation governance. **This file is the single source of truth for dossier section structure** — detail pages and admin forms must match it.

DataTello validates opportunities through layered evidence. Each opportunity answers: what operational pain exists, who the buyer is, why it matters now, what the market wedge is, what complaint clusters confirm it, and what the best first asset is.

## Build Opportunity Definition

A **Build Opportunity** is a validated way to create value in a market, backed by layered source-backed evidence and operational pain.

The same opportunity data is shown to every ICP. Scores, signals, evidence, buyer context, competitive reality, and risks are the **truth layer** — they never change by persona or ICP lens.

Personas change only the **execution lens**: section emphasis, CTA wording, asset path labels, dashboard copy, and section ordering.

| ICP | Role label | Primary CTA | Core question |
|-----|------------|-------------|---------------|
| Agency | Package it | Package this offer | What can we sell, implement, or productize for clients? |
| Consultant | Advise it | Advise on this opportunity | What should we recommend or turn into a client memo? |
| Investor | Evaluate it | Evaluate this market | What should we fund, validate, monitor, or compare? |
| Venture Studio / Product Studio | Validate it | Prioritize this bet | What is worth validating, matching to operators, and prioritizing across repeated bets? |

Implementation: `lib/persona-lens.ts` (`venture_studio`; legacy `product_studio` alias), `hooks/usePersonaLens.ts`, `components/ui/PersonaSelector.tsx`. Onboarding defaults: [onboarding.md](./onboarding.md).

### Persona Lens Rules

1. **Do not** generate different opportunities by persona.
2. **Do not** change scores by persona.
3. **Do not** hide core evidence.
4. **Do** reorder and spotlight sections based on ICP lens.
5. **Do** use persona-aware labels and helper text.
6. **Do** relabel asset path steps without changing path data.

---

## Layered Validation Architecture

DataTello does not discover opportunities from a single signal.

### MVP validation layers

| Layer | Question | MVP sources |
|-------|----------|-------------|
| Pressure | Is the problem forming? | OSHA, EPA ECHO, Federal Register |
| Demand | Are people looking for it? | DataForSEO |
| Wedge | Can you sell into it? | Manual research, G2, Capterra |
| Friction | Are people failing to solve it? | Job postings, procurement/RFP language |
| Procurement | Is buyer intent and budget real? | SAM.gov, USAspending |

### Long-term layers (preserved, not MVP)

| Layer | Phase |
|-------|-------|
| Complaint & Incident Signals | Phase 2 |
| Healthcare vertical | Phase 3 |
| Digital Infrastructure amplifiers | Future Research |

Steps 1–5 (Pressure through Complaints) form **Base Opportunity Confidence** in the long-term model. MVP forms confidence from Pressure, Demand, Wedge, Friction, and Procurement Validation.

### Long-term confidence amplification (Step 6)

| Amplifier | Question | Phase |
|-----------|----------|-------|
| Digital Infrastructure | Does emerging infrastructure strengthen confidence? | Future Research |

Step 6 amplifies confidence after base validation — it does **not** discover or create opportunities on its own. **Not in MVP scoring or ingestion.**

**Final opportunities are determined by DataTello's structured scoring engine, guardrails, and human review — not by any single signal layer.**

Full expansion: [architecture.md](./architecture.md) § Future Expansion.

---

## Scoring Model

Software Likelihood is replaced by:

- **Buildability Score** — can something useful be created and delivered?
- **Asset Fit Decision** — what is the best first asset for this opportunity?

### Public score buckets (Signal Breakdown)

| Display name | DB field | Layer |
|--------------|----------|-------|
| Pain | `pressure_score` | Pressure (+ friction modifier) |
| Demand | `demand_score` | Demand Validation |
| Market | `wedge_score` | Market Wedge Validation |
| Freshness | `freshness_score` | Timing label |
| Buildability | `buildability_score` | Delivery feasibility |
| Asset Fit | `asset_fit_score` | Asset Fit Decision |

### Internal modifiers

| Modifier | Role | MVP |
|----------|------|-----|
| `friction_score` | Modifies Pain, Market, Buildability — not shown as primary public score | ✅ |
| `procurement_score` | Strengthens buyer intent, budget, workflow clarity, recurrence | ✅ |
| `digital_infrastructure_boost` (0–10) | Future Research only — not MVP | ❌ |

---

## Naming Rules

- **Weekly Signal Brief** — free newsletter email
- **Opportunity Dossier** — full paid opportunity asset
- **Dashboard Brief View** — in-app readable dossier
- **PDF Dossier** — downloadable PDF from template

Avoid `report` as the primary user-facing term.

---

## V1 Paid Opportunity Dossier Structure

Render in this exact order, each inside a `Card`.

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

### 3. Signal Breakdown

Purpose: show structured scoring judgment without exposing internal machinery.

Visible scores: Pain, Demand, Market, Freshness, Buildability, Asset Fit.

Internal modifiers (MVP): friction, procurement — not shown as primary public scores.

**Complaint & Incident realism layer** (Phase 2 — not MVP):

- cluster patterns and recurrence
- buyer / user impact
- operational breakdown confirmation
- source mix (CFPB, openFDA/MAUDE, NHTSA, FCC)

When activated, this is a first-class realism layer. Not rendered in MVP dossiers.

**Digital Infrastructure Evidence** (Future Research — not MVP):

| Module | Rating |
|--------|--------|
| Agent Commerce | Weak / Moderate / Strong |
| Stablecoin Workflow | Weak / Moderate / Strong |
| Onchain Developer Tool Friction | Weak / Moderate / Strong |
| Tokenized Data | Weak / Moderate / Strong |

Not in MVP dossier output.

### 4. Build Strategy

Purpose: define what to create first and how to expand. **Do not default to SaaS.**

Required fields:

- `best_first_asset` — Best First Asset
- `top_asset_path_1` — Top 3 Asset Paths (path 1)
- `top_asset_path_2` — Top 3 Asset Paths (path 2)
- `top_asset_path_3` — Top 3 Asset Paths (path 3)
- `why_this_format_wins_first` — Why This Wins First
- `expansion_ladder` — Expansion Ladder
- `revenue_ceiling` — Revenue Ceiling
- `build_difficulty` — Build Difficulty

Supported asset types:

- Full software
- Lightweight product
- Internal tool
- Spreadsheet/template
- Tracker/log
- Dashboard/reporting layer
- Workflow pack
- Service + tool hybrid

Component mapping: `BuildStrategy` until renamed in code.

### 5. Execution Angle

Purpose: how to act — buyer, wedge, and entry path.

Fields:

- `target_buyer`
- `buyer_confidence`
- `core_workflow`
- `initial_wedge`
- `one_sentence_mvp`
- `time_to_value`
- `first_distribution_angle`

### 6. Competitive Differentiator

Purpose: qualitative competitive entry analysis. Required for every opportunity.

Required fields:

- `competitor_landscape` — Competitor Landscape
- `review_complaint_themes` — Review Complaint Patterns
- `underserved_segment` — Underserved Segment
- `differentiation_angle` — Differentiation Angle
- `what_not_to_compete_on` — What NOT to Compete On
- `competitive_entry_path` — Entry Strategy

Additional admin/detail fields: `visible_competitor_count`, `competitor_type`, `best_vertical_entry_point`, `avoided_verticals`, feature/pricing/ux/distribution/service gaps.

Component mapping: `CompetitiveAngle` until renamed in code.

### 7. Why This Matters

Purpose: short strategic close.

Fields:

- `strategic_importance`
- `final_verdict`

Keep to 2–3 lines.

---

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

---

## Admin Form Sections

Mirror the seven-section dossier structure:

1. **Basic** — title, score, best_first_asset, complexity, tags, status, short_summary
2. **Why This Exists** — problem, evidence, key pain drivers, why now
3. **Scores** — pain, demand, market, freshness, buildability, asset fit, internal friction, procurement
4. **Build Strategy** — best first asset, top 3 paths, why wins first, expansion ladder, revenue ceiling, build difficulty
5. **Execution** — buyer, workflow, wedge, MVP, time to value, distribution
6. **Competitive Differentiator** — landscape, complaint patterns, underserved segment, differentiation, what not to compete on, entry strategy
7. **Final Verdict** — strategic importance, publish/watch/reject reasoning

---

## Internal Admin Fields (not in primary dossier output)

- Monetization paths (`monetization_paths`)
- Opportunity risks (`opportunity_risks`)

## Removed from MVP — Future Optional Layer

**Builder Fit Strategy** (`builder_fit_strategy` / delivery fit by organization type and tool stack):

- **Removed from MVP** — not active as its own feature in the app.
- **Not rendered** in the seven-section paid dossier or dashboard brief.
- **Build Strategy / Asset Strategy remains active** (section 4) — asset paths, reason, expansion ladder.
- May return as an optional admin/research layer when org-type delivery fit is prioritized.

---

## Free Weekly Signal Brief Structure

Include only:

- 1–3 short signals
- compressed explanation
- light evidence
- teaser of best first asset
- CTA to unlock full dashboard dossier

Do not include full evidence stack, full asset strategy, full competitive differentiator strategy, or full PDF.
