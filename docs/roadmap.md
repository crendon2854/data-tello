# Roadmap

Strategic build phases. Tasks: [backlog.md](./backlog.md). Snapshot: [project-state.md](./project-state.md).

See [MED.md](./MED.md) for engineering workflow. Architecture phases: [architecture.md](./architecture.md).

## MVP Launch Focus (Locked)

DataTello launches as an **extremely focused** build opportunity intelligence platform for:

**Environmental Compliance** + **Contractor Safety** + **Public-sector compliance workflows**

Target customer: **Builders**, **agencies serving compliance-heavy industries**, **consultants serving contractor/environmental businesses**.

MVP pipeline:

```text
Collect → Normalize → Cluster → Keyword Enrichment → Market Validation → Procurement Validation
→ Scoring → Asset Strategy → Human Review → Opportunity Brief → Publish
```

Expansion into additional industries and evidence layers happens **only after** the MVP consistently produces high-quality opportunities.

---

## Implementation Phases

## Phase 1 — Documentation Governance ✅

- [x] MED.md, governance layer, ADR policy, cross-links

## Phase 2 — Foundation ✅

- [x] Next.js + TypeScript + Tailwind scaffold
- [x] Layout, types, lib, hooks, mock data, Supabase client

## Phase 3 — Core UX ✅

- [x] Landing page (homepage — messaging update in progress)
- [x] Dashboard + FilterBar + OpportunityCard
- [x] Opportunity detail with V1 sections
- [x] Newsletter page UI

## Phase 4 — Basic Admin ✅

- [x] Admin layout, hub, opportunity CRUD, review queue, signals, zones

## Phase 5 — Documentation Alignment ✅

- [x] Evidence-backed opportunity intelligence positioning
- [x] Output names locked
- [x] System boundaries (Core, Newsletter, Dossier Builder, Growth)
- [x] Build Strategy, Competitive Differentiator
- [x] Workflow Friction Signals
- [x] Expanded database target schema

## Phase 5b — Strategic Repositioning ✅

- [x] MVP wedge: compliance + contractor + public-sector
- [x] MVP vs long-term architecture separation
- [x] Future Expansion documentation
- [x] Build opportunity positioning (not intelligence platform)

## Phase 5c — Layered Validation & Architecture Phases (docs) ✅

- [x] MVP source stack locked
- [x] MVP pipeline locked
- [x] Guardrail system (four rules)
- [x] Procurement as MVP validation step and hidden modifier
- [x] Onboarding flow and ICP default lens docs
- [x] Build Strategy: build difficulty field

## Phase 6 — Supabase Integration ✅

- [x] All MVP tables wired with mock fallback
- [x] Production RLS plan documented
- [x] supabase/README.md

## Phase 7 — Research OS Data Foundation

- [x] sources, raw_signals, problem_zones, keyword_sets, market_proof, friction
- [ ] opportunity_scores (with procurement modifier)
- [ ] review_queue
- [ ] watchlist_items (future segment)

## Phase 8 — Admin Research OS UI

- [x] sources, signals, problem-zones, keywords, market-proof, friction
- [ ] procurement validation workspace upgrade
- [ ] review queue upgrade
- [ ] watchlist, settings (future segment)

## Phase 9 — Opportunity Dossier Upgrade

- [ ] Full dossier schema (build strategy, competitive differentiator, procurement evidence)
- [ ] build_difficulty, procurement_score fields
- [ ] Admin form for seven-section structure
- [ ] SignalBreakdown procurement evidence panel

## Phase 10 — Dossier Builder

- [ ] Templates, exports, PDF generation, section toggles

## Phase 11 — Newsletter Engine

- [ ] Subscribers, events, composer, tracking

## Phase 12 — System Health

- [ ] Connector adapters, repair logs, approval queue

## Phase 13 — ICP Onboarding & Targeting (partial ✅)

- [x] `user_preferences` table
- [x] `/onboarding` flow (3–5 steps)
- [x] `/preferences` page
- [x] Default dashboard filters from onboarding
- [x] Explore Mode — focus / adjacent / all industries
- [ ] MVP ICP defaults (builder, agency, consultant)
- [ ] Feed “why you’re seeing this” transparency

## Phase 17 — Investor Watchlists + Alert Triggers — Future Segment

- [ ] `watchlists`, `watchlist_matches` tables
- [ ] `/watchlists` page, sidebar link, Save to Watchlist action
- [ ] Match scoring + `match_reasons` display

Not MVP positioning. Serves future investor/studio segments.

## Phase 14 — Complaint & Incident Signals — Architecture Phase 2

- [ ] `complaint_incident_signals` table
- [ ] `/admin/complaint-incidents` workspace
- [ ] CFPB, openFDA/MAUDE, NHTSA, FCC source connectors
- [ ] Cluster linkage to problem zones
- [ ] Dossier complaint summary in Signal Breakdown

## Phase 15 — Emerging Digital Infrastructure Signals — Future Research

- [ ] `emerging_digital_infrastructure_signals` table
- [ ] `/admin/digital-infrastructure` workspace
- [ ] Four sub-modules only (no DAO, grants, standalone compliance)
- [ ] Weak/Moderate/Strong ratings in dossier

Not in MVP scoring, ingestion, or architecture.

## Phase 16 — Growth Automation Stack

Separate from Core.

- [ ] n8n marketing automation, prospecting, outreach
- [ ] ICP-aware prospect finder (MVP: builders, agencies, consultants)

---

## Future Expansion

All capabilities below are **preserved in the long-term architecture**. They are explicitly **out of MVP scope** until the wedge consistently produces high-quality opportunities.

### Phase 2 — Complaint & Incident Signals

| Source | Domain |
|--------|--------|
| CFPB | Consumer financial complaints |
| openFDA / MAUDE | Medical device adverse events |
| NHTSA | Vehicle safety incidents |
| FCC | Telecom / communications complaints |

### Phase 2 — Developer Friction

GitHub, GitLab, Stack Exchange, developer ecosystems.

Reason: construction and environmental workflows are validated through hiring and procurement, not GitHub issues.

### Phase 2 — Additional Government Agencies

**Deferred from MVP — not permanently removed.** BLS employment trends and Census construction data are strong future additions for the contractor and environmental wedge, but they add connector and interpretation complexity before the core engine has proven it consistently produces opportunities people will pay for.

| Source | Use |
|--------|-----|
| **BLS** | Employment trends, labor pressure, occupational staffing signals |
| **Census** | Construction permits, housing starts, structural industry indicators |
| CMS | Healthcare-adjacent pressure (full healthcare is Phase 3) |
| Grants.gov | Funding signal |
| CISA KEV | Security pressure |
| Regulations.gov | Rulemaking signal |

### Phase 2 — Market Wedge Expansion

SEC EDGAR, broad review scraping, startup marketplaces, broad ecosystem scraping.

### Phase 3 — Healthcare

Entire healthcare vertical. No healthcare ingestion in MVP.

### Roadmap — Procurement Expansion

State, city, county procurement portals; utilities; global tenders.

### Future Research Layers

| Capability | Notes |
|------------|-------|
| Onchain / x402 | Not in MVP architecture, scoring, or ingestion |
| Agent Commerce Signals | Confidence amplifier |
| Stablecoin Workflow Signals | Confidence amplifier |
| Onchain Developer Tool Friction | Confidence amplifier |
| Tokenized Data / Pay-Per-Use Data | Confidence amplifier |
| Investor intelligence | Future customer segment |
| Enterprise intelligence | Future customer segment |
| White-label enterprise features | Future product tier |
| Additional verticals | After wedge proven |

Full detail: [architecture.md](./architecture.md) § Future Expansion.

---

## Explicitly Out of Scope for MVP

- Complaint signal ingestion
- Healthcare ingestion
- Onchain / x402 in any form
- Digital Infrastructure Boost in scoring
- GitHub / Stack Exchange friction sources
- SEC EDGAR, broad review scraping, startup marketplaces
- BLS, Census (deferred — not removed), CMS, Grants.gov, other agencies
- State/local/global procurement expansion
- Investor, VC, HoldCo, Product Studio, Enterprise positioning
- Full visual workflow builder
- Newsletter workflow inside Dossier Builder
- Manual PDF creation per signal
- Public-facing detailed internal scoring
- Full social-listening engine
- DAO / grants / standalone onchain compliance modules
- Full AI autopilot publishing
- Complex user personalization beyond onboarding targeting
- Full CRM, affiliate marketplace, advanced BI, multi-admin permissions
- **Builder Fit Strategy** — removed from MVP; Build Strategy remains active
