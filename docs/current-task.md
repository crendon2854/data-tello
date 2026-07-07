# Current Task

Documentation Version: 1.0  
Last Updated: 2026-07-07  
Status: Active  
Owner: DataTello Engineering

Track exactly what is being built right now. This is the **single source of truth for the active implementation task**.

For overall project status, see [project-state.md](./project-state.md). For workflow rules, see [MED.md](./MED.md) and [ai-rules.md](./ai-rules.md).

---

## Current Phase

Phase 6 — Supabase Integration (in progress)

## Current Objective

Wire remaining MVP tables to live Supabase (`opportunities`, `zones`) and tighten RLS for production readiness.

## Files Expected to Change

- docs/project-state.md
- docs/current-task.md
- docs/changelog.md
- lib/queries.ts (opportunities/zones confirmation)
- supabase/schema.sql (production RLS)

## Success Criteria

- All MVP tables read from Supabase when env vars are configured.
- Mock fallback preserved when env vars are missing.
- Migration notes documented for legacy `signals` and `zones` tables.
- npm run build passes.
- documentation is updated.

## Dependencies

- Supabase project configured.
- Source Registry through Workflow Friction Workspace wired (complete).

## Risks

- RLS may block reads when policies are tightened.
- Schema drift between SQL and TypeScript types.

## After Completion

Update:

- docs/project-state.md
- docs/current-task.md
- docs/implementation-index.md if files move or new files are added
- docs/changelog.md
- docs/roadmap.md if milestone status changes

## Next Recommended Task

Wire `opportunities` and legacy `zones` to live Supabase, then tighten RLS for production readiness.
