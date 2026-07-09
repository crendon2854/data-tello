# Backlog — Remaining Work

Documentation Version: 1.2  
Last Updated: 2026-07-09  
Status: Active  
Owner: DataTello Engineering

Actionable items not yet shipped. See [roadmap.md](./roadmap.md).

**Active task:** [current-task.md](./current-task.md) — MVP Source Stack Code Alignment (Phases 7–9)

When an item ships: update [backlog.md](./backlog.md), [project-state.md](./project-state.md), [implementation-index.md](./implementation-index.md), [changelog.md](./changelog.md).

---

## Phase 7–9 — MVP Source Stack Code Alignment (active)

Align code with locked MVP architecture. Spec: [architecture.md](./architecture.md), [current-task.md](./current-task.md).

### Phase 7 — Data foundation

- [x] sources, raw_signals, problem_zones, keyword_sets, market_proof, friction tables
- [ ] `procurement_score` on opportunities / `opportunity_scores`
- [ ] SAM.gov registered in `sources` table
- [ ] MVP seed data (`supabase/seed.sql`) — OSHA, EPA ECHO, Federal Register, DataForSEO, SAM.gov, USAspending
- [ ] `lib/mock-data.ts` aligned to compliance wedge (no GitHub as active friction)
- [ ] `review_queue` table

### Phase 8 — Admin Research OS UI

- [x] sources, signals, problem-zones, keywords, market-proof, friction pages
- [ ] Friction admin — job postings, procurement language, RFP language (remove GitHub/Stack Exchange as MVP active sources)
- [ ] Source registry phase labels (MVP / Phase 2 / Future)
- [ ] Procurement validation workspace (SAM.gov + USAspending evidence)
- [ ] Upgrade `/admin/review` with full human checklist + guardrail display
- [ ] `/admin/settings`

### Phase 9 — Dossier + scoring upgrade

- [ ] `procurement_score` hidden modifier in `lib/scoring.ts`
- [ ] Gate complaint / digital infrastructure modifiers off MVP scoring path
- [ ] SignalBreakdown procurement evidence panel
- [ ] `build_difficulty` field parity in admin + dossier
- [ ] Build Strategy + Competitive Differentiator full render
- [ ] Admin form seven-section parity per [med-sections.md](./med-sections.md)
- [ ] Onboarding: Builder user type + MVP ICP defaults

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
- [ ] DataForSEO connector (demand validation — MVP dependency)

---

## Phase 13 — ICP Onboarding & Targeting (partial ✅)

- [x] `user_preferences` table + types + queries
- [x] `/onboarding` flow
- [x] `/preferences` edit page
- [x] Default dashboard filters from onboarding
- [x] Explore Mode — focus / adjacent / all industries
- [x] Persona-aware dossier rendering (`lib/dossier-content.ts`)
- [x] Signal preferences → scoring weights
- [x] General multi-lens output
- [ ] Builder user type in onboarding (MVP primary ICP)
- [ ] MVP signal preferences only (complaint/digital infra → "coming soon")
- [ ] “Why you’re seeing this” feed transparency

Spec: [onboarding.md](./onboarding.md)

---

## Phase 17 — Investor Watchlists + Alert Triggers (future segment)

**Not MVP.** Serves investors, VCs, venture studios — future customer segments per [architecture.md](./architecture.md).

- [ ] `watchlists` + `watchlist_matches` tables
- [ ] Types in `types/database.ts`
- [ ] Query helpers + `lib/watchlist-matching.ts`
- [ ] `/watchlists` page + sidebar link
- [ ] Create Watchlist form + match reasons
- [ ] “Save to Watchlist” on opportunity detail
- [ ] Role-specific defaults (investor, venture_studio, agency)

---

## Future Expansion (architecture phases — not MVP)

### Phase 2 — Complaint & Incident Signals

- [ ] `complaint_incident_signals` table
- [ ] `/admin/complaint-incidents` workspace
- [ ] Source connectors: CFPB, openFDA/MAUDE, NHTSA, FCC
- [ ] Complaint summary in Signal Breakdown

### Phase 2 — Developer Friction

- [ ] GitHub, GitLab, Stack Exchange connectors
- [ ] Re-enable in friction admin when Phase 2 activates

### Phase 2 — Additional Government Agencies (deferred, not removed)

- [ ] **BLS** — employment trends, labor pressure
- [ ] **Census** — construction permits, structural indicators
- [ ] CMS, Grants.gov, CISA KEV, Regulations.gov

Activate after MVP consistently produces paid-quality opportunities.

### Phase 2 — Market Wedge Expansion

- [ ] SEC EDGAR, broad review scraping, startup marketplaces

### Phase 3 — Healthcare

- [ ] Entire healthcare vertical — no ingestion in MVP

### Roadmap — Procurement Expansion

- [ ] State, city, county portals; utilities; global tenders

### Future Research Layers

- [ ] Emerging Digital Infrastructure Signals (`emerging_digital_infrastructure_signals`)
- [ ] `/admin/digital-infrastructure` — four modules only
- [ ] Onchain / x402 — not in MVP architecture
- [ ] Investor intelligence, enterprise intelligence, white-label features

Full inventory: [architecture.md](./architecture.md) § Future Expansion.

---

## Phase 16 — Growth Automation Stack

- [ ] n8n suite, prospecting for MVP ICPs (builders, agencies, consultants)

---

## Out of Scope for MVP

- Complaint signal ingestion
- Healthcare ingestion
- Onchain / x402 in any form
- Digital Infrastructure Boost in scoring
- GitHub / Stack Exchange as active friction sources
- SEC EDGAR, broad review scraping, startup marketplaces
- BLS, Census (deferred — not removed), CMS, Grants.gov
- State/local/global procurement expansion
- Investor, VC, HoldCo, Product Studio, Enterprise positioning
- **Builder Fit Strategy** — future optional layer; Build Strategy remains active
- DAO, grants, standalone onchain compliance modules
- Full workflow builder, AI autopilot publishing, full CRM
- Advanced BI, multi-admin permissions
