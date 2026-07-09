# Current Task

Documentation Version: 1.3  
Last Updated: 2026-07-09  
Status: Active  
Owner: DataTello Engineering

Single source of truth for the active implementation task.

Overall status: [project-state.md](./project-state.md)

---

## Milestone

**Phase 5c — MVP Architecture Separation** ✅ complete (docs locked)

**Phase 7–9 — MVP Source Stack Code Alignment** ← active now

Align runtime code, admin UI, seed data, and scoring with the locked MVP architecture in [architecture.md](./architecture.md). Prove the compliance + contractor + public-sector wedge in software — not just in docs.

---

## Current Objective

Close the gap between **documented MVP** and **shipped code**. The app still references GitHub friction, investor ICPs, complaint modifiers, and digital infrastructure scoring that are explicitly out of MVP scope.

Success = admin, mock data, scoring, and onboarding all reflect the MVP source stack and target customer (builders, agencies, consultants).

---

## Task Breakdown

### 1. Source registry + seed alignment

- [ ] `supabase/seed.sql` — MVP sources only: OSHA, EPA ECHO, Federal Register, DataForSEO, SAM.gov, USAspending
- [ ] `lib/mock-data.ts` — mock sources and signals match MVP wedge (no GitHub as active friction source)
- [ ] `app/admin/sources/page.tsx` — phase labels on sources (MVP vs Phase 2 vs Future)
- [ ] Register SAM.gov in `sources` table (currently lives only in `lib/procurement/*`)

### 2. Workflow friction admin (MVP sources)

- [ ] `app/admin/friction/page.tsx` — replace GitHub/Stack Exchange/Greenhouse/Lever with:
  - Targeted job postings
  - Procurement language
  - RFP language
- [ ] Mark developer friction sources as Phase 2 (disabled or labeled, not removed from architecture)

### 3. Procurement validation (first-class MVP step)

- [ ] Admin workspace for procurement validation (upgrade market-proof or dedicated route)
- [ ] Wire `lib/procurement/*` into opportunity scoring path
- [ ] `procurement_score` as hidden modifier in `lib/scoring.ts` (alongside friction)
- [ ] Remove or gate complaint / digital infrastructure modifiers from MVP scoring path

### 4. Scoring + dossier UI

- [ ] `components/sections/SignalBreakdown.tsx` — procurement evidence panel (MVP)
- [ ] Do not render complaint or digital infrastructure panels in MVP dossiers
- [ ] `components/admin/OpportunityForm.tsx` — procurement_score field; remove digital_infrastructure_boost from MVP admin
- [ ] `types/opportunity.ts` / `types/database.ts` — `procurement_score` field parity

### 5. Onboarding + ICP (MVP customer)

- [ ] `app/onboarding/page.tsx` / `components/onboarding/OnboardingFlow.tsx` — Builder as primary user type
- [ ] `lib/persona-lens.ts` — MVP defaults for builder, agency, consultant; investor/studio deprioritized (future segment)
- [ ] `types/user-preferences.ts` — `builder` user type if missing
- [ ] Signal preferences — MVP layers only (hide complaint/digital infra as "coming soon")

### 6. Landing + messaging verification

- [ ] Confirm `components/landing/landing-data.ts` matches [vision.md](./vision.md) (done in prior pass — verify only)

---

## Files Expected to Change

| Area | Files |
|------|-------|
| Schema + seed | `supabase/schema.sql`, `supabase/seed.sql` |
| Types | `types/database.ts`, `types/opportunity.ts`, `types/user-preferences.ts`, `types/procurement.ts` |
| Data + queries | `lib/mock-data.ts`, `lib/mock-opportunities.ts`, `lib/queries.ts` |
| Scoring | `lib/scoring.ts`, `lib/procurement/scoring.ts`, `lib/procurement/integration.ts` |
| Admin UI | `app/admin/sources/page.tsx`, `app/admin/friction/page.tsx`, `app/admin/market-proof/page.tsx`, `components/admin/OpportunityForm.tsx` |
| Dossier UI | `components/sections/SignalBreakdown.tsx`, `lib/dossier-content.ts` |
| Onboarding | `app/onboarding/page.tsx`, `components/onboarding/OnboardingFlow.tsx`, `lib/persona-lens.ts` |
| Docs (on completion) | `docs/project-state.md`, `docs/backlog.md`, `docs/implementation-index.md`, `docs/changelog.md` |

Full map: [implementation-index.md](./implementation-index.md)

---

## Dependencies

| Dependency | Status | Notes |
|------------|--------|-------|
| Phase 5c docs locked | ✅ | [architecture.md](./architecture.md), [roadmap.md](./roadmap.md) |
| Phase 6 Supabase + mock fallback | ✅ | `lib/queries.ts` |
| SAM.gov procurement pipeline | ✅ partial | `lib/procurement/*` exists — needs registry + admin + scoring wire-up |
| DataForSEO connector | ⚠️ partial | Admin keywords page is placeholder |
| Persona scoring + preferences | ✅ | `lib/scoring.ts`, `lib/feed-filters.ts` |
| Seven-section dossier components | ✅ | `components/sections/*` |
| Human review queue | ✅ basic | `/admin/review` — upgrade guardrail display in Phase 8 |

---

## Risks

| Risk | Mitigation |
|------|------------|
| **Doc vs code drift persists** | Treat `architecture.md` as acceptance spec; check each file against MVP source table |
| **Breaking mock mode** | Every schema/type change must keep `lib/mock-data.ts` fallback working |
| **Over-scoping into Phase 2** | Do not build complaint connectors or GitHub friction — label as future only |
| **Scoring regression** | Keep `overall_score` truth layer; procurement modifier is hidden, not a new public score |
| **Onboarding breakage** | Add `builder` type without removing existing types (investor/studio stay for future) |
| **SAM.gov API dependency** | Procurement admin should work with mock data when API key absent |

---

## Acceptance Criteria

- [ ] Source registry and seed reflect MVP stack only (future sources labeled, not deleted)
- [ ] Friction admin shows job postings / procurement / RFP — not GitHub/Stack Exchange as active MVP sources
- [ ] Procurement validation visible in admin and dossier Signal Breakdown
- [ ] `procurement_score` wired as hidden modifier; complaint/digital infra modifiers gated off MVP path
- [ ] Onboarding offers Builder, Agency, Consultant as primary types
- [ ] Mock mode works without Supabase env vars
- [ ] `npm run build` passes
- [ ] No MVP UI promotes investor, healthcare, onchain, or complaint layers as active features

---

## Recently Completed

**Phase 5c — MVP Architecture Separation** ✅

- Product positioning locked (build opportunities, not intelligence platform)
- MVP wedge, pipeline, source stack, scoring, ICP documented
- Future Expansion section preserves complaints, healthcare, onchain, BLS/Census (deferred)
- Landing page messaging aligned
- ADR in [decisions.md](./decisions.md)

**Phase 13 (partial) — ICP onboarding & decision engine** ✅

- `/onboarding`, `/preferences`, persona scoring, explore mode

**Phase 6 — Supabase Integration** ✅

---

## Deferred (not this task)

| Item | Phase | Why deferred |
|------|-------|--------------|
| Investor Watchlists | 17 | Future customer segment — not MVP positioning |
| Complaint & Incident Signals | 14 | Phase 2 — after MVP quality bar |
| Digital Infrastructure | 15 | Future Research — not in MVP |
| BLS, Census | 2 | Deferred — valuable later, adds complexity before core engine proven |
| Healthcare ingestion | 3 | Entire vertical post-MVP |
| “Why you’re seeing this” feed transparency | 13 | Nice-to-have |
| Builder Fit Strategy | Future | Optional layer |

Watchlists spec preserved in [backlog.md](./backlog.md) § Phase 17.

---

## After Completion

Update: `project-state.md`, `implementation-index.md`, `changelog.md`, `backlog.md`, and this file with next task.
