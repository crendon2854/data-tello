# Backlog — Remaining Work

Documentation Version: 1.1  
Last Updated: 2026-07-08  
Status: Active  
Owner: DataTello Engineering

Actionable items not yet shipped. See [roadmap.md](./roadmap.md).

When an item ships: update [backlog.md](./backlog.md), [project-state.md](./project-state.md), [implementation-index.md](./implementation-index.md), [changelog.md](./changelog.md).

---

## Phase 7 — Research OS Data Foundation

- [x] sources, raw_signals, problem_zones, keyword_sets, market_proof, friction
- [ ] `opportunity_scores` with `digital_infrastructure_boost`
- [ ] `review_queue`
- [ ] `watchlist_items`

---

## Phase 8 — Admin Research OS UI

- [x] problem-zones, keywords, market-proof, friction
- [ ] Upgrade `/admin/review` with full human checklist + guardrail display
- [ ] `/admin/watchlist`
- [ ] `/admin/settings`

---

## Phase 9 — Opportunity Dossier Upgrade

- [ ] Full dossier schema per [med-sections.md](./med-sections.md)
- [ ] `build_difficulty`, digital infrastructure evidence ratings
- [ ] Asset Strategy + Competitive Differentiator full render
- [ ] Admin form seven-section parity

---

## Phase 10 — Dossier Builder

- [ ] `dossier_templates`, `dossier_exports`
- [ ] `/admin/dossiers`, `/opportunity/[id]/pdf`

---

## Phase 11 — Newsletter Engine

- [ ] Subscribers, events, composer, autoresponder, tracking

---

## Phase 12 — System Health

- [ ] Connector adapters, `/admin/system-health`, repair approval queue

---

## Phase 13 — ICP Onboarding & Targeting (partial ✅)

- [x] `user_preferences` table + types + queries
- [x] `/onboarding` flow
- [x] `/preferences` edit page
- [x] Default dashboard filters from onboarding
- [x] Explore Mode — focus / adjacent / all industries
- [x] Venture studio persona in `lib/persona-lens.ts`
- [x] Persona-aware dossier rendering (`lib/dossier-content.ts`)
- [x] Signal preferences → scoring weights
- [x] General multi-lens output
- [ ] “Why you’re seeing this” feed transparency

Spec: [onboarding.md](./onboarding.md)

---

## Phase 17 — Investor Watchlists + Alert Triggers (next)

Highest-retention feature for micro-VCs, venture studios, holdcos.

- [ ] `watchlists` + `watchlist_matches` tables
- [ ] Types in `types/database.ts`
- [ ] Query helpers + `computeWatchlistMatches()`
- [ ] `/watchlists` page + sidebar link
- [ ] Create Watchlist form
- [ ] Matched opportunities with `match_reasons`
- [ ] “Save to Watchlist” on opportunity detail
- [ ] Role-specific defaults (investor, venture_studio, agency)

Spec: [current-task.md](./current-task.md)

---

## Phase 14 — Complaint & Incident Signals

- [ ] `complaint_incident_signals` table
- [ ] `/admin/complaint-incidents` workspace
- [ ] Source connectors: CFPB, FDA/MAUDE, NHTSA, FCC
- [ ] Cluster-based linkage to problem zones
- [ ] Complaint summary in Signal Breakdown

---

## Phase 15 — Emerging Digital Infrastructure Signals

- [ ] `emerging_digital_infrastructure_signals` table
- [ ] `/admin/digital-infrastructure` — four modules only
- [ ] Weak/Moderate/Strong ratings in Signal Breakdown
- [ ] Digital Infrastructure Boost in scoring admin

---

## Phase 16 — Growth Automation Stack

- [ ] n8n suite, prospecting for agencies/consultants/investors/venture studios

---

## Out of Scope (V1)

- DAO, grants, standalone onchain compliance modules
- **Builder Fit Strategy** — removed from MVP; future optional layer (Build Strategy / Asset Strategy stays)
- Builder/vibe-coder positioning (homepage exempt until updated)
- Full workflow builder, AI autopilot publishing, full CRM
- Advanced BI, multi-admin permissions
