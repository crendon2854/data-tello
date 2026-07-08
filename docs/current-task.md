# Current Task

Documentation Version: 1.2  
Last Updated: 2026-07-08  
Status: Active  
Owner: DataTello Engineering

Single source of truth for the active implementation task.

Overall status: [project-state.md](./project-state.md)

---

## Current Phase

Phase 17 — Investor Watchlists + Alert Triggers (next)

## Current Objective

Turn DataTello from “browse dossiers” into “track my thesis.” Let users save opportunity theses and get dashboard-visible matches when new opportunities fit their focus.

Highest-retention feature for micro-VCs, venture studios, and holdcos.

---

## Repo Re-check (2026-07-08)

### Builder Fit Strategy — removed from MVP

**Builder Fit Strategy = removed from MVP / future optional layer.**

- **Not active** as its own feature in the app.
- **Build Strategy / Asset Strategy remains active** — section 4 in the seven-section dossier.
- `BuildStrategy` component uses only: `asset_path_1/2/3`, `asset_reason`, `expansion_ladder` — no builder-fit or tool-stack logic.
- `builder_fit_strategy` table may exist in schema docs but is **not rendered** in user-facing dossier output.

### Active dossier sections (V1)

| # | Section | Component |
|---|---------|-----------|
| 1 | Opportunity Snapshot | `OpportunitySnapshot` |
| 2 | Why This Exists | `WhyThisExists` |
| 3 | Signal Breakdown | `SignalBreakdown` |
| 4 | Build Strategy / Asset Strategy | `BuildStrategy` |
| 5 | Execution Angle | `ExecutionAngle` |
| 6 | Competitive Angle | `CompetitiveAngle` |
| 7 | Why This Matters | `WhyThisMatters` |

Orchestrator: `OpportunityDetailContent` — persona-aware section order, titles, labels, and emphasis via `lib/dossier-content.ts` + `lib/persona-lens.ts`.

### Scoring & preferences (shipped)

- **Truth layer:** `overall_score` on cards and snapshot (never mutated by persona or watchlists).
- **Persona layer:** `persona_score` computed separately in `lib/scoring.ts`; feed sorted by `persona_score`.
- **Friction / complaint modifiers** wired in `applyEvidenceModifiers()`.
- **Signal preferences** affect scoring weights (not just UI filter) via `applySignalPreferenceWeights()`.
- **General mode:** multi-lens blend + `GeneralMultiLens` dossier card.
- **Explore mode:** focus / adjacent / all industries on dashboard.

### Feed filtering

- Industry match uses `industry_tags` + trusted keyword haystack — not competitor copy.
- Buyer match uses `buyer_tags`, `primary_buyer`, `target_buyer` — not competitor fields.
- Signal preferences filter feed inclusion (≥50 strength threshold) and adjust persona scoring weights.

---

## Recently Completed

**Phase 13 (partial) — ICP onboarding & decision engine**

- `user_preferences` table + `/onboarding`, `/preferences`
- Persona-aware dossier rendering (section order, labels, field order, signal display order)
- Signal preferences → scoring integration
- General multi-lens output
- Explore mode: My industries / Adjacent / All

**Phase 5c — Layered validation & ICP documentation rewrite** ✅

**Phase 6 — Supabase Integration** ✅

---

## Next Build: Investor Watchlists + Alert Triggers

### Goal

Let users save opportunity theses and get dashboard-visible matches when new opportunities fit their focus.

### 1. Supabase tables

**`watchlists`**

| Column | Type |
|--------|------|
| id | uuid PK |
| user_id | text |
| name | text |
| description | text |
| industries | text[] |
| buyer_types | text[] |
| asset_types | text[] |
| min_overall_score | int |
| min_persona_score | int |
| required_signals | text[] |
| created_at | timestamptz |
| updated_at | timestamptz |

**`watchlist_matches`**

| Column | Type |
|--------|------|
| id | uuid PK |
| watchlist_id | uuid FK |
| opportunity_id | uuid FK |
| match_score | int |
| match_reasons | text[] |
| created_at | timestamptz |
| dismissed | boolean default false |

### 2. TypeScript types

Add to `types/database.ts`.

### 3. Query helpers (`lib/queries.ts`)

- `getWatchlists(userId)`
- `createWatchlist(input)`
- `updateWatchlist(id, input)`
- `deleteWatchlist(id)`
- `getWatchlistMatches(userId)`
- `computeWatchlistMatches(watchlist, opportunities)`

### 4. Matching logic

Score matches using:

- `industry_tags` overlap
- `buyer_tags` overlap
- `best_first_asset` / `asset_strategy` match
- `overall_score` threshold
- `persona_score` threshold
- Required signal strength: pressure, demand, wedge, friction, complaints, digital_infrastructure

**Do not mutate `overall_score`.** Watchlist sorting may use `persona_score` without changing truth-layer scores.

### 5. UI

- Sidebar link: `/watchlists`
- `/watchlists` page — saved watchlists + matched opportunities per watchlist
- “Create Watchlist” form
- Match reasons displayed under each match
- “Save to Watchlist” action on opportunity detail page

### 6. Role-specific defaults

| Role | Defaults |
|------|----------|
| `investor` | min overall score 70; prioritize market/wedge, competitive angle, buildability |
| `venture_studio` | prioritize buildability, asset paths, validation strength |
| `agency` | prioritize asset fit, execution angle, friction/complaints |

### Files Expected to Change

- `supabase/schema.sql`
- `types/database.ts`
- `lib/queries.ts`
- `lib/watchlist-matching.ts` (new)
- `app/watchlists/page.tsx` (new)
- `components/sections/WatchlistsContent.tsx` (new)
- `components/layout/Sidebar.tsx`
- `components/sections/OpportunityDetailContent.tsx`
- `docs/*` as needed

### Acceptance Criteria

- [ ] User can create a watchlist
- [ ] Matching opportunities appear under that watchlist
- [ ] Matches explain why they matched (`match_reasons`)
- [ ] Dashboard scores remain truth-layer scores (`overall_score` unchanged)
- [ ] Watchlist sorting can use `persona_score` without changing `overall_score`
- [ ] `npm run build` passes

---

## Cursor Prompt (copy-paste)

```text
Implement Investor Watchlists + Alert Triggers for DataTello.

Goal:
Let users save opportunity theses and get dashboard-visible matches when new opportunities fit their focus.

Build:
1. Add Supabase tables:
- watchlists
  - id
  - user_id
  - name
  - description
  - industries text[]
  - buyer_types text[]
  - asset_types text[]
  - min_overall_score int
  - min_persona_score int
  - required_signals text[]
  - created_at
  - updated_at

- watchlist_matches
  - id
  - watchlist_id
  - opportunity_id
  - match_score int
  - match_reasons text[]
  - created_at
  - dismissed boolean default false

2. Add TypeScript types in `types/database.ts`.

3. Add query helpers:
- getWatchlists(userId)
- createWatchlist(input)
- updateWatchlist(id, input)
- deleteWatchlist(id)
- getWatchlistMatches(userId)
- computeWatchlistMatches(watchlist, opportunities)

4. Matching logic:
Score matches using:
- industry_tags overlap
- buyer_tags overlap
- best_first_asset / asset_strategy match
- overall_score threshold
- persona_score threshold
- required signal strength:
  - pressure
  - demand
  - wedge
  - friction
  - complaints
  - digital_infrastructure

Do not mutate `overall_score`.

5. UI:
- Add sidebar link: `/watchlists`
- Create `/watchlists` page
- Show saved watchlists
- Add “Create Watchlist” form
- Show matched opportunities under each watchlist
- Add “Save to Watchlist” action on opportunity detail page

6. Investor-specific defaults:
For role `investor`:
- default min overall score: 70
- prioritize market/wedge, competitive angle, buildability
For role `venture_studio`:
- prioritize buildability, asset paths, validation strength
For role `agency`:
- prioritize asset fit, execution angle, friction/complaints

Acceptance criteria:
- User can create a watchlist.
- Matching opportunities appear under that watchlist.
- Matches explain why they matched.
- Dashboard scores remain truth-layer scores.
- Watchlist sorting can use persona_score without changing overall_score.
- Build passes.
```

---

## Dependencies

- Phase 6 complete (Supabase + mock fallback)
- Persona scoring + preferences shipped (`lib/scoring.ts`, `lib/feed-filters.ts`)
- `user_preferences` with role field for role-specific watchlist defaults

## Risks

- RLS on `watchlists` / `watchlist_matches` must scope by `user_id`
- Match computation should run client-side or via server action until background jobs exist
- Schema drift between SQL and TypeScript types

## After Completion

Update project-state, implementation-index, changelog, roadmap, backlog, current-task.

## Deferred (not urgent)

- “Why you’re seeing this” transparency on feed cards (`persona_score_reasons` computed but not surfaced)
- Builder Fit Strategy as future optional layer (tool-stack / org-type delivery fit)
