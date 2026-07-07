# Roadmap

Build order and status. Update checkboxes as work ships.

See [MED.md](./MED.md) for the engineering workflow and Definition of Done.

## Phase 1 — Documentation Governance ✅

- [x] Create `docs/MED.md` as canonical entry point
- [x] Define documentation map and single-source-of-truth rules
- [x] Define four-phase engineering workflow (Plan → Build → Verify → Sync)
- [x] Define Definition of Done checklist
- [x] Add ADR policy to [decisions.md](./decisions.md)
- [x] De-duplicate docs and improve cross-links

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

## Phase 6 — Supabase Integration

- [ ] Connect live Supabase project
- [ ] Seed production data
- [ ] Tighten RLS policies (replace dev-open policies)
- [ ] Confirm current `opportunities`, `signals`, and `zones` tables match code
- [ ] Add migration plan from `signals` → `raw_signals`
- [ ] Add migration plan from `zones` → `problem_zones`

## Phase 7 — Research OS Data Foundation

- [ ] Build `sources`
- [ ] Build `raw_signals`
- [ ] Build `problem_zones`
- [ ] Build `problem_zone_signals`
- [ ] Build `keyword_sets`
- [ ] Build `keyword_metrics`
- [ ] Build `market_proof_records`
- [ ] Build `workflow_friction_signals`
- [ ] Build `opportunity_scores`
- [ ] Build `review_queue`
- [ ] Build `watchlist_items`

## Phase 8 — Admin Research OS UI

- [ ] `/admin/sources`
- [ ] `/admin/signals` as Raw Signal Explorer
- [ ] `/admin/problem-zones`
- [ ] `/admin/keywords`
- [ ] `/admin/market-proof`
- [ ] `/admin/friction`
- [ ] `/admin/review` upgraded with full human checklist
- [ ] `/admin/watchlist`
- [ ] `/admin/settings`

## Phase 9 — Opportunity Dossier Upgrade

- [ ] Expand `opportunities` schema to full dossier fields
- [ ] Add `asset_strategy`
- [ ] Add `builder_fit_strategy`
- [ ] Add `competitive_strategy`
- [ ] Add `monetization_paths`
- [ ] Add `opportunity_risks`
- [ ] Update mock data to include all dossier sections
- [ ] Update detail page to render new sections
- [ ] Update admin form to edit new sections

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