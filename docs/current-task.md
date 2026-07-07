# Current Task

Documentation Version: 1.0  
Last Updated: 2026-07-07  
Status: Active  
Owner: DataTello Engineering

Track exactly what is being built right now. This is the **single source of truth for the active implementation task**.

For overall project status, see [project-state.md](./project-state.md). For workflow rules, see [MED.md](./MED.md) and [ai-rules.md](./ai-rules.md).

---

## Current Phase

Phase 7 — Research OS Data Foundation (next)

## Current Objective

Build remaining Research OS decision-layer tables: `opportunity_scores`, `review_queue`, `watchlist_items`.

## Recently Completed

Phase 6 — Supabase Integration and RLS cleanup:

- Verified all MVP tables wired in `lib/queries.ts` with mock fallback
- Documented legacy `zones` and `signals` as compatibility only
- Marked all MVP dev-open RLS policies as TEMPORARY in `supabase/schema.sql`
- Added production RLS plan to [database.md](./database.md)
- Added [supabase/README.md](../supabase/README.md) with setup and verification steps
- Added Supabase verification checklist to [project-state.md](./project-state.md)

## Files Expected to Change (Phase 7)

- `supabase/schema.sql` (if schema adjustments needed)
- `lib/queries.ts`
- `types/database.ts`
- `lib/mock-data.ts`
- docs as needed

## Success Criteria (Phase 7)

- `opportunity_scores`, `review_queue`, `watchlist_items` queryable with mock fallback
- npm run build passes
- Documentation updated

## Dependencies

- Phase 6 complete (Supabase wiring + docs)
- Supabase project configured for live testing

## Risks

- RLS on new tables must follow production plan when wired
- Schema drift between SQL and TypeScript types

## After Completion

Update:

- docs/project-state.md
- docs/current-task.md
- docs/implementation-index.md if files move or new files are added
- docs/changelog.md
- docs/roadmap.md if milestone status changes

## Next Recommended Task

Build `opportunity_scores`, `review_queue`, and `watchlist_items` query layer with mock fallback (Phase 7).
