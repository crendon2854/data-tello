# Roadmap

Strategic build phases. Tasks: [backlog.md](./backlog.md). Snapshot: [project-state.md](./project-state.md).

See [MED.md](./MED.md) for engineering workflow.

## Phase 1 — Documentation Governance ✅

- [x] MED.md, governance layer, ADR policy, cross-links

## Phase 2 — Foundation ✅

- [x] Next.js + TypeScript + Tailwind scaffold
- [x] Layout, types, lib, hooks, mock data, Supabase client

## Phase 3 — Core UX ✅

- [x] Landing page (homepage — messaging update deferred)
- [x] Dashboard + FilterBar + OpportunityCard
- [x] Opportunity detail with V1 sections
- [x] Newsletter page UI

## Phase 4 — Basic Admin ✅

- [x] Admin layout, hub, opportunity CRUD, review queue, signals, zones

## Phase 5 — Documentation Alignment ✅

- [x] Evidence-backed opportunity intelligence positioning
- [x] Output names locked
- [x] System boundaries (Core, Newsletter, Dossier Builder, Growth)
- [x] Asset Strategy, Competitive Differentiator Strategy
- [x] Workflow Friction Signals
- [x] Expanded database target schema

## Phase 5b — Strategic Repositioning ✅

- [x] ICP: agencies, consultants, investors, venture studios / product studios
- [x] Complaint & Incident and Digital Infrastructure documented
- [x] Signal layer architecture rules
- [x] Premium intelligence positioning

## Phase 5c — Layered Validation & ICP Expansion (docs) ✅

- [x] Layered validation architecture (five core layers + four amplifiers)
- [x] Complaint & Incident as core Engine layer 5
- [x] Guardrail system (four rules)
- [x] Digital Infrastructure Boost scoring
- [x] Venture Studio / Product Studio ICP
- [x] Onboarding flow and ICP default lens docs
- [x] Dossier Signal Breakdown: Digital Infrastructure Evidence ratings
- [x] Asset Strategy: build difficulty field

## Phase 6 — Supabase Integration ✅

- [x] All MVP tables wired with mock fallback
- [x] Production RLS plan documented
- [x] supabase/README.md

## Phase 7 — Research OS Data Foundation

- [x] sources, raw_signals, problem_zones, keyword_sets, market_proof, friction
- [ ] opportunity_scores (with digital_infrastructure_boost)
- [ ] review_queue
- [ ] watchlist_items

## Phase 8 — Admin Research OS UI

- [x] sources, signals, problem-zones, keywords, market-proof, friction
- [ ] review queue upgrade
- [ ] watchlist, settings

## Phase 9 — Opportunity Dossier Upgrade

- [ ] Full dossier schema (asset strategy, competitive strategy, digital infra ratings)
- [ ] build_difficulty, digital_infrastructure_boost fields
- [ ] Admin form for seven-section structure
- [ ] SignalBreakdown Digital Infrastructure Evidence panel

## Phase 10 — Dossier Builder

- [ ] Templates, exports, PDF generation, section toggles

## Phase 11 — Newsletter Engine

- [ ] Subscribers, events, composer, tracking

## Phase 12 — System Health

- [ ] Connector adapters, repair logs, approval queue

## Phase 13 — ICP Onboarding & Targeting

- [ ] `user_preferences` table
- [ ] `/onboarding` flow (3–5 steps)
- [ ] `/preferences` page
- [ ] Default dashboard filters from onboarding
- [ ] Explore Mode toggle
- [ ] ICP default lens in persona-lens (venture studio)

## Phase 14 — Complaint & Incident Signals

- [ ] `complaint_incident_signals` table
- [ ] `/admin/complaint-incidents` workspace
- [ ] CFPB, FDA/MAUDE, NHTSA, FCC source connectors
- [ ] Cluster linkage to problem zones
- [ ] Dossier complaint summary in Signal Breakdown

## Phase 15 — Emerging Digital Infrastructure Signals

- [ ] `emerging_digital_infrastructure_signals` table
- [ ] `/admin/digital-infrastructure` workspace
- [ ] Four sub-modules only (no DAO, grants, standalone compliance)
- [ ] Weak/Moderate/Strong ratings in dossier

## Phase 16 — Growth Automation Stack

Separate from Core.

- [ ] n8n marketing automation, prospecting, outreach
- [ ] ICP-aware prospect finder (agencies, consultants, investors, venture studios)

## Explicitly Out of Scope for V1

- Full visual workflow builder
- Newsletter workflow inside Dossier Builder
- Manual PDF creation per signal
- Public-facing detailed internal scoring
- Full social-listening engine
- DAO / grants / standalone onchain compliance modules
- Full AI autopilot publishing
- Complex user personalization beyond onboarding targeting
- Full CRM, affiliate marketplace, advanced BI, multi-admin permissions
