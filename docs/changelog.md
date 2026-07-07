# Changelog — Project History

Documentation Version: 1.0  
Last Updated: 2026-07-07  
Status: Active  
Owner: DataTello Engineering

Notable milestones and documentation changes. For granular commit history, use git log.

Format: `YYYY-MM-DD — Title — summary`

See [MED.md](./MED.md) for governance. See [roadmap.md](./roadmap.md) for phase status.

---

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
- Added `lib/persona-lens.ts` with 7 personas (builder, agency, consultant, investor, operator, automation_builder, product_studio)
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
