# Changelog — Project History

Documentation Version: 1.0  
Last Updated: 2026-07-07  
Status: Active  
Owner: DataTello Engineering

Notable milestones and documentation changes. For granular commit history, use git log.

Format: `YYYY-MM-DD — Title — summary`

See [MED.md](./MED.md) for governance. See [roadmap.md](./roadmap.md) for phase status.

---

## 2026-07-09 — Decision Layer & Role-Aware Output (strategic repositioning)

- Product repositioned from research dashboard to **decision engine**
- Decision Layer spec: `getRecommendedOpportunity()` — top 1 + top 3 ranked per user
- Role-Aware Output System: agency/consultant (execution) vs investor/venture_studio (Asset Thesis)
- Dashboard surfaces: **Recommended for You**, **Top Opportunities This Week**
- Fields: `recommended_rank_score`, `recommended_reason[]`, `confidence_level`, `time_to_value`, `role_visibility_config`
- Recommendation guardrails documented
- Weekly Signal Brief: teaser only via `lib/newsletter-engine/`
- Builder Fit restored for agency/consultant role view
- Core engine unchanged: Pressure, Demand, Wedge, Friction, Procurement, scoring, publish guardrails, seven-section dossier
- ADR in [decisions.md](./decisions.md); Phases 18–19 added to [roadmap.md](./roadmap.md)

## 2026-07-08 — Decision engine + planning update

- Persona-aware dossier rendering shipped (`lib/dossier-content.ts`)
- Signal preferences affect scoring weights, not just feed filter
- General multi-lens output; explore mode: focus / adjacent / all
- **Builder Fit Strategy** marked removed from MVP — future optional layer; Build Strategy / Asset Strategy remains active
- Next feature locked: **Investor Watchlists + Alert Triggers** ([current-task.md](./current-task.md))

## 2026-07-08 — Layered validation architecture and ICP documentation rewrite

- Locked layered validation: five core layers form Base Opportunity Confidence; digital infrastructure amplifies only
- Elevated Complaint & Incident Signals to core Engine layer 5 (clusters; CFPB, FDA/MAUDE, NHTSA, FCC)
- Documented four guardrail rules and Digital Infrastructure Boost (0–10)
- Added Venture Studio / Product Studio as fourth ICP
- Created [onboarding.md](./onboarding.md) — shared flow, distinct default lens per ICP
- Updated dossier spec: Digital Infrastructure Evidence ratings, build difficulty in Asset Strategy
- Removed builder/vibe-coder language from all docs (homepage deferred)
- Rewrote architecture, context, vision, med-sections, admin-workflow, routes, components, ai-rules, roadmap, backlog

## 2026-07-08 — Dossier structure and scoring model alignment

- Canonical seven-section Opportunity Dossier output locked
- Asset Strategy and Competitive Differentiator Strategy defined as required sections
- Workflow Friction rule clarified: modifies Pain, Market Wedge, Buildability; not standalone decision engine
- Buildability Score + Asset Fit Decision replace Software Likelihood in docs
- ICP questions updated for agencies, consultants, investors
- Builder Fit demoted to internal admin only (not in primary dossier output)

## 2026-07-08 — Strategic repositioning and signal layer expansion

- Reframed ICP: agencies, consultants, investors
- Updated all docs to evidence-backed build opportunities using structured signals, scoring, and guardrails
- Added Complaint & Incident Signals as core Engine layer 5 (realism layer; clusters; CFPB, FDA/MAUDE, NHTSA, FCC)
- Added Emerging Digital Infrastructure Signals (four sub-modules only)
- Documented architecture rule: expansion layers are visual/analytical; scoring engine + guardrails + human review determine final opportunities
- Removed builder/indie-hacker/low-tier pricing messaging from docs and landing copy
- Reframed as premium intelligence / decision-support product

## 2026-07-07 — Phase 6 Supabase Integration and RLS cleanup

- Verified all MVP tables wired in `lib/queries.ts` with Supabase + mock fallback
- Documented live-table support matrix and legacy table compatibility rules in [database.md](./database.md)
- Marked all 11 `MVP dev all *` RLS policies as TEMPORARY in `supabase/schema.sql`
- Added production RLS plan to [database.md](./database.md) (dev-open policies remain until auth exists)
- Added [supabase/README.md](../supabase/README.md) with schema/seed order, env vars, mock mode, RLS warning, verification steps
- Added Supabase verification checklist to [project-state.md](./project-state.md)
- Legacy `zones` and `signals` documented as compatibility only; prefer `problem_zones` and `raw_signals`
- Phase 6 marked complete in [roadmap.md](./roadmap.md) and [backlog.md](./backlog.md)

## 2026-07-07 — Persona execution lens for Build Opportunities

- Defined Build Opportunity as a validated way to create value in a market
- Added persona execution lens model: same truth layer, different presentation by persona
- Added persona execution lens model (agency, consultant, investor primary; venture studio pending; legacy personas in code to be aligned)
- Added `hooks/usePersonaLens.ts` and `components/ui/PersonaSelector.tsx`
- Updated dashboard and opportunity detail with persona-aware CTAs, labels, section ordering, and emphasis
- Persona lens does not alter opportunity data, scores, signals, or evidence

## 2026-07-07 — Workflow Friction Workspace with friction signals

- Wired `workflow_friction_signals` to live Supabase with mock fallback
- Added MVP dev RLS policy for `workflow_friction_signals` in `supabase/schema.sql`
- Added seed data: 3 friction signals tied to existing problem zones in `supabase/seed.sql`
- Added types: `WorkflowFrictionSignalRow`, `WorkflowFrictionSignalWithProblemZone`
- Added query helpers: `getWorkflowFrictionSignals`, `getWorkflowFrictionSignalById`, `createWorkflowFrictionSignal`, `updateWorkflowFrictionSignal`, `deleteWorkflowFrictionSignal`
- Built `/admin/friction` UI with create/edit/delete, problem zone linkage, friction scoring fields, and ingestion placeholder note
- Updated admin sidebar navigation

## 2026-07-07 — Market Proof Workspace with market proof records

- Wired `market_proof_records` to live Supabase with mock fallback
- Added MVP dev RLS policy for `market_proof_records` in `supabase/schema.sql`
- Added seed data: 3 market proof records tied to existing problem zones in `supabase/seed.sql`
- Added types: `MarketProofRecordRow`, `MarketProofRecordWithProblemZone`
- Added query helpers: `getMarketProofRecords`, `getMarketProofRecordById`, `createMarketProofRecord`, `updateMarketProofRecord`, `deleteMarketProofRecord`
- Built `/admin/market-proof` UI with create/edit/delete, problem zone linkage, evidence fields, and automation placeholder note
- Updated admin sidebar navigation

## 2026-07-07 — Keyword Intelligence with keyword sets and metrics

- Wired `keyword_sets` and `keyword_metrics` to live Supabase with mock fallback
- Added MVP dev RLS policies for both tables in `supabase/schema.sql`
- Added seed data: 3 keyword sets and 3 metrics tied to existing problem zones in `supabase/seed.sql`
- Added types: `KeywordSetRow`, `KeywordMetricRow`, `KeywordSetWithMetrics`
- Added query helpers: `getKeywordSets`, `getKeywordSetById`, `createKeywordSet`, `updateKeywordSet`, `createKeywordMetric`, `updateKeywordMetric`, `deleteKeywordMetric`
- Built `/admin/keywords` Keyword Intelligence UI with create/edit sets, metric CRUD, and DataForSEO placeholder button
- Updated admin sidebar navigation

## 2026-07-07 — Problem Zone Workspace with raw signal linkage

- Wired `problem_zones` and `problem_zone_signals` to live Supabase with mock fallback
- Added MVP dev RLS policies for both tables in `supabase/schema.sql`
- Added seed data: 3 problem zones linked to existing raw signals in `supabase/seed.sql`
- Added types: `ProblemZoneRow`, `ProblemZoneWithSignals`, `ProblemZoneSignalRow`
- Added query helpers: `getProblemZones`, `getProblemZoneById`, `createProblemZone`, `updateProblemZone`, `linkRawSignalToProblemZone`, `unlinkRawSignalFromProblemZone`
- Built `/admin/problem-zones` Problem Zone Workspace UI with link/unlink raw signals
- `/admin/zones` now redirects to `/admin/problem-zones`

## 2026-07-07 — Source Registry + Raw Signal Explorer Supabase wiring

- Wired Source Registry (`sources`) to live Supabase with mock fallback in `lib/queries.ts`
- Added MVP dev RLS policies for `sources` and `raw_signals` in `supabase/schema.sql`
- Added seed data for sources and raw_signals in `supabase/seed.sql`
- Evolved `/admin/signals` to Raw Signal Explorer with `source_id` linkage via `getRawSignals()`
- Added `RawSignalRow` types, mock data, and `toggleRawSignalNeedsReview()` query
- Updated [database.md](./database.md), [project-state.md](./project-state.md), [current-task.md](./current-task.md)

## 2026-07-07 — Mandatory AI startup procedure + current-task tracking

- Added Mandatory Startup Procedure and Repository Scanning Rules to [ai-rules.md](./ai-rules.md)
- Created [current-task.md](./current-task.md) as SSOT for active implementation task
- Added documentation version headers to core governance docs
- Updated [MED.md](./MED.md), [README.md](./README.md), [project-state.md](./project-state.md), [implementation-index.md](./implementation-index.md)

## 2026-07-07 — Documentation governance layer

- Created `docs/MED.md` as canonical entry point
- Defined four-phase workflow (Plan → Build → Verify → Sync)
- Added Definition of Done, ADR policy, documentation map
- De-duplicated `docs/README.md`; added cross-links across topic docs
- Renumbered roadmap phases; added Phase 1 Documentation Governance

## 2026-07-07 — Expanded documentation architecture

- Added `ai-rules.md`, `context.md`, `project-state.md`
- Added `implementation-index.md`, `backlog.md`, `changelog.md`
- Moved AI/Cursor rules from MED to `ai-rules.md`
- Split strategic roadmap from tactical backlog

## 2026-07-07 — Documentation alignment (Phase 5)

- Defined DataTello as evidence-backed build-opportunity intelligence
- Locked output names: Weekly Signal Brief, Opportunity Dossier, PDF Dossier
- Separated Core, Newsletter Engine, Dossier Builder, Growth Automation Stack
- Added Asset Strategy, Builder Fit Strategy, Competitive Differentiator Strategy
- Added Workflow Friction Signals, System Health / Connector Repair
- Expanded database target schema and admin route map

## 2026-07-07 — Basic admin (Phase 4)

- Admin layout, hub, opportunity CRUD, review queue
- Signals table, zones CRUD

## 2026-07-07 — Core UX (Phase 3)

- Landing page, dashboard with filters, opportunity detail (V1 sections)
- Newsletter page UI

## 2026-07-07 — Foundation (Phase 2)

- Next.js 14 + TypeScript + Tailwind scaffold
- Layout components, types, lib, hooks, mock data
- Supabase client + query layer with mock fallback
- Initial docs structure

## 2026-07-07 — Initial ADRs

Key decisions recorded in [decisions.md](./decisions.md):

- Port 3001, mock data fallback, section-driven architecture
- Docs co-located in `/docs`
- Build-opportunity positioning, output naming
- System boundary separation (Core / Newsletter / Dossier / Growth)
- Signal lane naming, friction as internal modifier
- Buildability + Asset Fit scoring model
- Human review as publish gate
