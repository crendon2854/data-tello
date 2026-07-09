# Current Task

Documentation Version: 1.4  
Last Updated: 2026-07-09  
Status: Active  
Owner: DataTello Engineering

Single source of truth for the active implementation task.

Overall status: [project-state.md](./project-state.md)

---

## Milestone

**Phase 5d — Decision Layer & Role-Aware Output** ✅ complete (docs locked)

**Phase 18 — Decision Layer Implementation** ← active now

Implement the Decision Layer and dashboard surfaces documented in [architecture.md](./architecture.md). Core validation engine (Pressure, Demand, Wedge, Friction, Procurement, scoring, guardrails, dossier structure) stays **unchanged**.

---

## Current Objective

Ship `getRecommendedOpportunity()` and dashboard UI so DataTello answers:

> For **this** user → what should they build or act on **first**?

Success = dashboard leads with **Recommended for You**, shows **Top Opportunities This Week**, and generates 3 "why this fits" bullets per recommendation.

---

## Task Breakdown

### 1. Decision Layer core

- [ ] `lib/decision-layer.ts` — `getRecommendedOpportunity(userPreferences, opportunities[])`
- [ ] Ranking: role + industries + buyer types + signal prefs + scores + friction/procurement modifiers
- [ ] Return `{ topRecommendation, rankedTop3 }`
- [ ] Recommendation guardrails: skip if buildability unclear, buyer unclear, <2 evidence layers, confidence Low
- [ ] Generate `recommended_reason[]` — 3 personalization bullets

### 2. Confidence + speed metrics

- [ ] Calculate `confidence_level` (Low / Medium / High) from evidence layers, buyer clarity, buildability
- [ ] Calculate `time_to_value` (Fast / Medium / Slow) from friction, procurement, asset type, build complexity
- [ ] Schema + types: `recommended_rank_score`, `recommended_reason`, `confidence_level`, `role_visibility_config`

### 3. Dashboard UI

- [ ] `components/dashboard/RecommendedCard.tsx` — title, asset, 3 bullets, confidence, TTV, CTAs
- [ ] `components/dashboard/TopOpportunities.tsx` — sort by score, freshness, procurement strength
- [ ] Wire into `components/sections/DashboardContent.tsx` — Recommended → Top Opportunities → grid
- [ ] "View Opportunity" + "Start Here" (anchor to Build Strategy / Asset Thesis)

### 4. Role-Aware Output (Phase 19 — may follow Phase 18)

- [ ] `components/sections/AssetThesis.tsx` — investor / venture_studio
- [ ] `components/sections/BuilderFitStrategy.tsx` — agency / consultant only
- [ ] `lib/dossier-content.ts` — `role_visibility_config` gating
- [ ] Hide tool stack / build paths for investor / venture_studio

### 5. Newsletter engine (Phase 11 overlap)

- [ ] `lib/newsletter-engine/` — Weekly Signal Brief composer
- [ ] 3 signals, 1 featured opportunity, asset teaser, dashboard CTA — no full dossier

---

## Files Expected to Change

| Area | Files |
|------|-------|
| Decision Layer | `lib/decision-layer.ts` (new) |
| Schema + types | `supabase/schema.sql`, `types/database.ts`, `types/opportunity.ts`, `types/user-preferences.ts` |
| Dashboard UI | `components/dashboard/RecommendedCard.tsx`, `TopOpportunities.tsx`, `components/sections/DashboardContent.tsx` |
| Dossier role output | `lib/dossier-content.ts`, `components/sections/AssetThesis.tsx`, `BuilderFitStrategy.tsx` |
| Newsletter | `lib/newsletter-engine/*` (new) |
| Mock data | `lib/mock-opportunities.ts` — sample `recommended_reason`, `confidence_level` |
| Docs (on completion) | `project-state.md`, `backlog.md`, `implementation-index.md`, `changelog.md` |

---

## Dependencies

| Dependency | Status | Notes |
|------------|--------|-------|
| Phase 5d docs locked | ✅ | [architecture.md](./architecture.md), [med-sections.md](./med-sections.md), [onboarding.md](./onboarding.md) |
| Onboarding + preferences | ✅ | Feeds Decision Layer inputs |
| Scoring + guardrails | ✅ | Unchanged — ranking consumes existing scores |
| Seven-section dossier | ✅ | Unchanged — role visibility is presentation layer |

---

## Acceptance Criteria

- [ ] `getRecommendedOpportunity()` returns defensible top 1 + top 3 per user preferences
- [ ] Dashboard shows **Recommended for You** at top — not a flat opportunity list
- [ ] 3 "why this fits" bullets render on Recommended card
- [ ] Recommendation guardrails exclude low-confidence / unclear-buyer opportunities
- [ ] `confidence_level` and `time_to_value` display on Recommended card and snapshot
- [ ] Mock mode works without Supabase env vars
- [ ] `npm run build` passes
- [ ] Core validation pipeline untouched (no changes to Pressure/Demand/Wedge scoring logic)

---

## Deferred (not this task)

| Item | Phase | Why deferred |
|------|-------|--------------|
| MVP source stack code alignment | 7–9 | Parallel track — does not block Decision Layer |
| Investor Watchlists | 17 | Enhancement after Decision Layer ships |
| Complaint & Incident Signals | 14 | Phase 2 |
| Digital Infrastructure | 15 | Future Research |

---

## After Completion

Update: `project-state.md`, `implementation-index.md`, `changelog.md`, `backlog.md`, and this file with Phase 19 or next task.
