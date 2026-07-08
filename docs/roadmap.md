# Roadmap

Strategic build phases and phase-level status. For actionable tasks, see [backlog.md](./backlog.md). For current snapshot, see [project-state.md](./project-state.md).

See [MED.md](./MED.md) for the engineering workflow and Definition of Done.

## Phase 1 — Documentation Governance ✅

- [x] Create `docs/MED.md` as canonical entry point
- [x] Define documentation map and single-source-of-truth rules
- [x] Define four-phase engineering workflow (Plan → Build → Verify → Sync)
- [x] Define Definition of Done checklist
- [x] Add ADR policy to [decisions.md](./decisions.md)
- [x] De-duplicate docs and improve cross-links
- [x] Add governance layer: [ai-rules.md](./ai-rules.md), [context.md](./context.md), [project-state.md](./project-state.md), [implementation-index.md](./implementation-index.md), [backlog.md](./backlog.md), [changelog.md](./changelog.md)

## Phase 2 — Foundation ✅

- [x] Next.js + TypeScript + Tailwind scaffold
- [x] Layout (Navbar, Sidebar, PageContainer)
- [x] Types, lib, hooks, mock data
- [x] Supabase client + query layer
- [x] Docs structure

## Phase 3 — Core UX ✅

- [x] Landing page
- [x] Dashboard + FilterBar + OpportunityCard
- [x] Opportunity detail with V1 sections
- [x] Newsletter page UI

## Phase 4 — Basic Admin ✅

- [x] Admin layout + hub
- [x] Opportunity list + create/edit form
- [x] Review queue (approve / reject / publish)
- [x] Signals table
- [x] Zones CRUD

## Phase 5 — Documentation Alignment ✅

- [x] Define DataTello as evidence-backed build-opportunity intelligence
- [x] Lock output names: Weekly Signal Brief, Opportunity Dossier, Dashboard Brief View, PDF Dossier
- [x] Separate DataTello Core, Newsletter Engine, Dossier Builder, and Growth Automation Stack
- [x] Add Asset Strategy
- [x] Add Builder Fit Strategy
- [x] Add Competitive Differentiator Strategy
- [x] Add Workflow Friction Signals
- [x] Add System Health / Connector Repair
- [x] Add expanded database target schema
- [x] Add expanded admin route map

## Phase 5b — Strategic Repositioning ✅

- [x] Reframe ICP: agencies, consultants, investors
- [x] Document Complaint & Incident Signals as core expansion layer
- [x] Document Emerging Digital Infrastructure Signals (four sub-modules)
- [x] Add signal layer architecture rule (analytical only; scoring engine determines final opportunities)
- [x] Reframe as premium intelligence / decision-support product
- [x] Remove low-tier and builder-focused messaging from docs

## Phase 6 — Supabase Integration ✅

- [x] Wire Source Registry to live Supabase (mock fallback preserved)
- [x] Seed sources + raw_signals data
- [x] MVP dev RLS for wired tables (marked TEMPORARY in schema)
- [x] Evolve `/admin/signals` to Raw Signal Explorer with `source_id` linkage
- [x] Build `/admin/problem-zones` Problem Zone Workspace with raw signal linkage
- [x] Connect all MVP tables to live Supabase (`opportunities` + Research OS tables)
- [x] Document production RLS plan (dev-open policies remain until auth exists)
- [x] Confirm `opportunities`, `signals`, and `zones` tables match code
- [x] Document legacy `zones` → prefer `problem_zones` (compatibility only, no auto-migration)
- [x] Add `supabase/README.md` and Supabase verification checklist

## Phase 7 — Research OS Data Foundation

- [x] Build `sources` (wired)
- [x] Build `raw_signals` (wired)
- [x] Build `problem_zones` (wired)
- [x] Build `problem_zone_signals` (wired)
- [x] Build `keyword_sets` (wired)
- [x] Build `keyword_metrics` (wired)
- [x] Build `market_proof_records` (wired)
- [x] Build `workflow_friction_signals` (wired)
- [ ] Build `opportunity_scores`
- [ ] Build `review_queue`
- [ ] Build `watchlist_items`

## Phase 8 — Admin Research OS UI

- [x] `/admin/sources`
- [x] `/admin/signals` as Raw Signal Explorer
- [x] `/admin/problem-zones`
- [x] `/admin/keywords`
- [x] `/admin/market-proof`
- [x] `/admin/friction`
- [ ] `/admin/review` upgraded with full human checklist
- [ ] `/admin/watchlist`
- [ ] `/admin/settings`

## Phase 9 — Opportunity Dossier Upgrade

- [ ] Expand `opportunities` schema to full dossier fields
- [ ] Add `asset_strategy` (seven-section dossier section 4)
- [ ] Add `competitive_strategy` (seven-section dossier section 6)
- [ ] Add monetization_paths, opportunity_risks (internal admin)
- [ ] Update mock data for all dossier sections
- [ ] Render full Asset Strategy and Competitive Differentiator fields on detail page
- [ ] Update admin form for seven-section dossier structure

## Phase 10 — Dossier Builder

- [ ] Build `dossier_templates`
- [ ] Build `dossier_exports`
- [ ] Add default PDF template setting
- [ ] Add section toggles
- [ ] Add chart/graphic suggestion fields
- [ ] Add evidence table rendering
- [ ] Add affiliate link placement
- [ ] Add branding controls
- [ ] Add PDF export history

## Phase 11 — Newsletter Engine

- [ ] Build `newsletter_subscribers`
- [ ] Build `newsletter_events`
- [ ] Add subscribe/unsubscribe backend
- [ ] Add weekly Signal Brief composer
- [ ] Add basic autoresponder functionality
- [ ] Add open/click/CTA tracking
- [ ] Keep free brief watered down and separate from paid dossiers

## Phase 12 — System Health

- [ ] Add source connector adapter model
- [ ] Build `/admin/system-health`
- [ ] Track connector status
- [ ] Track failed syncs
- [ ] Track schema changes
- [ ] Add auto-repair logs
- [ ] Add human approval queue for repair decisions
- [ ] Add source reliability dashboard

## Phase 13 — Growth Automation Stack

This is separate from DataTello Core.

- [ ] Define Oracle VPS/cloud setup
- [ ] Define n8n marketing automation suite
- [ ] Build `growth_prospects`
- [ ] Build `outreach_runs`
- [ ] Add ICP/prospect finder flow
- [ ] Add lead enrichment flow
- [ ] Add outbound sequence drafting
- [ ] Add reply classification
- [ ] Add suppression/unsubscribe handling
- [ ] Require human approval before outbound sending

## Phase 14 — Complaint & Incident Signals

- [ ] Build `complaint_incident_signals` table
- [ ] Build `/admin/complaint-incidents` workspace
- [ ] Add analytical panels to dossier SignalBreakdown
- [ ] Wire incident clustering to problem zones
- [ ] Document source connectors for regulated/operational industries

## Phase 15 — Emerging Digital Infrastructure Signals

- [ ] Build `emerging_digital_infrastructure_signals` table
- [ ] Build `/admin/digital-infrastructure` workspace
- [ ] Implement four sub-modules only:
  - Agent Commerce Signals
  - Stablecoin Workflow Signals
  - Onchain Developer Tool Friction
  - Tokenized Data / Pay-Per-Use Data Signals
- [ ] Add analytical chart panels (visual only; no scoring override)

## Explicitly Out of Scope for V1

- Full visual workflow builder
- Newsletter workflow builder inside Dossier Builder
- Manual PDF creation per signal
- Public-facing detailed internal scoring
- Full social-listening engine
- Acquire/Flippa as core proof
- Full AI autopilot publishing
- Complex user personalization engine
- Full customer CRM
- Full affiliate marketplace
- Advanced BI dashboards
- Multi-admin team permissions