# Backlog — Remaining Work

Documentation Version: 1.0  
Last Updated: 2026-07-07  
Status: Active  
Owner: DataTello Engineering

Actionable items not yet shipped. Derived from [roadmap.md](./roadmap.md) phases 6–13.

When an item ships: check it off here, update [roadmap.md](./roadmap.md), [project-state.md](./project-state.md), [implementation-index.md](./implementation-index.md), and [changelog.md](./changelog.md).

See [MED.md](./MED.md) for the engineering workflow.

---

## Phase 6 — Supabase Integration ✅

- [x] Wire Source Registry to live Supabase (mock fallback preserved)
- [x] Seed sources + raw_signals data
- [x] MVP dev RLS for wired tables (marked TEMPORARY)
- [x] Evolve `/admin/signals` to Raw Signal Explorer with `source_id` linkage
- [x] Build `/admin/problem-zones` Problem Zone Workspace with raw signal linkage
- [x] Connect all MVP tables to live Supabase
- [x] Document production RLS plan (lock policies when auth exists)
- [x] Confirm `opportunities`, `signals`, and `zones` match code
- [x] Document legacy `zones` as compatibility only (prefer `problem_zones`)
- [x] Add `supabase/README.md` + verification checklist

---

## Phase 7 — Research OS Data Foundation

- [x] Build `sources` table wiring
- [x] Build `raw_signals` wiring
- [x] Build `problem_zones` wiring
- [x] Build `problem_zone_signals` wiring
- [x] Build `keyword_sets` wiring
- [x] Build `keyword_metrics` wiring
- [x] Build `market_proof_records` wiring
- [x] Build `workflow_friction_signals` wiring
- [ ] Build `opportunity_scores`
- [ ] Build `review_queue`
- [ ] Build `watchlist_items`

---

## Phase 8 — Admin Research OS UI

- [x] `/admin/problem-zones` (replaces `/admin/zones`)
- [x] `/admin/keywords`
- [x] `/admin/market-proof`
- [x] `/admin/friction`
- [ ] Upgrade `/admin/review` with full human checklist
- [ ] `/admin/watchlist`
- [ ] `/admin/settings`

---

## Phase 9 — Opportunity Dossier Upgrade

- [ ] Expand `opportunities` schema to full dossier fields
- [ ] Add asset_strategy, builder_fit_strategy, competitive_strategy
- [ ] Add monetization_paths, opportunity_risks
- [ ] Update mock data for all dossier sections
- [ ] Render new sections on detail page
- [ ] Update admin form for new sections

---

## Phase 10 — Dossier Builder

- [ ] `dossier_templates`, `dossier_exports` tables
- [ ] `/admin/dossiers` route
- [ ] `/opportunity/[id]/pdf` route
- [ ] Default PDF template, section toggles, branding
- [ ] Evidence tables, affiliate links, export history

---

## Phase 11 — Newsletter Engine

- [ ] `newsletter_subscribers`, `newsletter_events` tables
- [ ] Subscribe/unsubscribe backend + `/unsubscribe` route
- [ ] `/admin/newsletter` route
- [ ] Weekly Signal Brief composer
- [ ] Autoresponder, open/click/CTA tracking

---

## Phase 12 — System Health

- [ ] Source connector adapter model
- [ ] `/admin/system-health` route
- [ ] Connector status, failed syncs, schema change tracking
- [ ] Auto-repair logs + human approval queue

---

## Phase 13 — Growth Automation Stack

Separate from DataTello Core.

- [ ] Oracle VPS / cloud setup
- [ ] n8n marketing automation suite
- [ ] `growth_prospects`, `outreach_runs` tables
- [ ] ICP finder (agencies, consultants, investors)
- [ ] Lead enrichment, outbound sequences
- [ ] Reply classification, suppression handling
- [ ] Human approval before outbound sending

---

## Phase 14 — Complaint & Incident Signals

- [ ] `complaint_incident_signals` table
- [ ] `/admin/complaint-incidents` workspace
- [ ] Analytical panels in dossier SignalBreakdown
- [ ] Incident clustering linked to problem zones

---

## Phase 15 — Emerging Digital Infrastructure Signals

- [ ] `emerging_digital_infrastructure_signals` table
- [ ] `/admin/digital-infrastructure` workspace
- [ ] Four sub-modules: Agent Commerce, Stablecoin Workflow, Onchain Developer Tool Friction, Tokenized Data / Pay-Per-Use Data
- [ ] Analytical chart panels (visual only)

---

## Out of Scope (V1)

Do not add to backlog without an ADR and roadmap update:

- Full visual workflow builder
- Newsletter builder inside Dossier Builder
- Manual PDF creation per signal
- Public-facing detailed internal scoring
- Full social-listening engine
- Full AI autopilot publishing
- Complex user personalization, full CRM, affiliate marketplace
- Advanced BI dashboards, multi-admin permissions
