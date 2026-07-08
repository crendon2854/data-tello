# Current Task

Documentation Version: 1.1  
Last Updated: 2026-07-08  
Status: Active  
Owner: DataTello Engineering

Single source of truth for the active implementation task.

Overall status: [project-state.md](./project-state.md)

---

## Current Phase

Phase 7 — Research OS Data Foundation (next)

## Current Objective

Build remaining Research OS decision-layer tables: `opportunity_scores` (including `digital_infrastructure_boost`), `review_queue`, `watchlist_items`.

## Recently Completed

Phase 5c — Layered validation & ICP documentation rewrite:

- Layered validation architecture across all docs
- Complaint & Incident as core Engine layer 5
- Guardrail system, Digital Infrastructure Boost, onboarding docs
- Venture Studio ICP, dossier spec updates
- New [onboarding.md](./onboarding.md)

Phase 6 — Supabase Integration ✅

## Files Expected to Change (Phase 7)

- `supabase/schema.sql`
- `lib/queries.ts`, `types/database.ts`, `lib/mock-data.ts`
- docs as needed

## Success Criteria (Phase 7)

- `opportunity_scores`, `review_queue`, `watchlist_items` queryable with mock fallback
- `digital_infrastructure_boost` field documented and typed
- `npm run build` passes

## Dependencies

- Phase 6 complete
- Layered validation docs aligned ([architecture.md](./architecture.md))

## Risks

- RLS on new tables must follow production plan
- Schema drift between SQL and TypeScript types

## After Completion

Update project-state, implementation-index, changelog, roadmap, current-task.

## Next Recommended Task

Phase 13 — ICP onboarding (`user_preferences`, `/onboarding`, default dashboard filters) after Phase 7–9 foundation tables ship.
