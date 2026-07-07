# Project State — Current Snapshot

Documentation Version: 1.0  
Last Updated: 2026-07-07  
Status: Active  
Owner: DataTello Engineering

Living snapshot of where DataTello is right now. Update this file whenever a feature ships or status changes.

**This file explains overall project status.** For the active implementation task — objective, files, success criteria — see [current-task.md](./current-task.md).

See [MED.md](./MED.md) for workflow. See [backlog.md](./backlog.md) for remaining work. See [implementation-index.md](./implementation-index.md) for file locations.

---

## Current Phase

**Phase 6 — Supabase Integration** (in progress)

Phases 1–5 complete. See [roadmap.md](./roadmap.md).

**Active task:** See [current-task.md](./current-task.md).

---

## Runtime Mode

| Mode | Status |
|------|--------|
| Mock mode | Active when `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` are unset |
| Live Supabase | Optional; research OS tables through `workflow_friction_signals` wired with mock fallback |
| Dev port | 3001 |
| Build | Passing (`npm run build`) |

---

## Routes — Built vs Planned

### Built (MVP)

| Route | Status |
|-------|--------|
| `/` | ✅ |
| `/dashboard` | ✅ |
| `/opportunity/[id]` | ✅ |
| `/newsletter` | ✅ UI only |
| `/admin` | ✅ |
| `/admin/sources` | ✅ Source Registry (Supabase + mock) |
| `/admin/signals` | ✅ Raw Signal Explorer (Supabase + mock) |
| `/admin/problem-zones` | ✅ Problem Zone Workspace (Supabase + mock) |
| `/admin/keywords` | ✅ Keyword Intelligence (Supabase + mock) |
| `/admin/market-proof` | ✅ Market Proof Workspace (Supabase + mock) |
| `/admin/friction` | ✅ Workflow Friction Workspace (Supabase + mock) |
| `/admin/zones` | ✅ legacy redirect → `/admin/problem-zones` |
| `/admin/opportunities` | ✅ |
| `/admin/opportunities/new` | ✅ |
| `/admin/opportunities/[id]` | ✅ |
| `/admin/review` | ✅ |

### Not yet built

| Route | Planned phase |
|-------|---------------|
| `/opportunity/[id]/pdf` | Phase 10 |
| `/unsubscribe` | Phase 11 |
| `/admin/watchlist` | Phase 8 |
| `/admin/dossiers` | Phase 10 |
| `/admin/newsletter` | Phase 11 |
| `/admin/system-health` | Phase 12 |
| `/admin/settings` | Phase 8 |

Full route spec: [routes.md](./routes.md)

---

## Database — Active vs Target

### Active MVP tables (used by app today)

- `opportunities` — primary entity
- `signals` — legacy lightweight table (retained)
- `zones` — legacy lightweight table (retained; admin uses `problem_zones`)
- `sources` — Source Registry (wired)
- `raw_signals` — Raw Signal Explorer (wired, linked via `source_id`)
- `problem_zones` — Problem Zone Workspace (wired)
- `problem_zone_signals` — zone ↔ raw signal join (wired)
- `keyword_sets` — Keyword Intelligence (wired)
- `keyword_metrics` — keyword demand metrics (wired)
- `market_proof_records` — Market Proof Workspace (wired)
- `workflow_friction_signals` — Workflow Friction Workspace (wired)

### Target tables (schema defined, not wired)

Research OS tables in `supabase/schema.sql` including `opportunity_scores`, `review_queue`, etc.

Full schema: [database.md](./database.md)

---

## MED Sections — Rendered vs Planned

### Rendered on detail page (V1)

- OpportunitySnapshot
- WhyThisExists
- SignalBreakdown
- BuildStrategy
- ExecutionAngle
- CompetitiveAngle
- WhyThisMatters

### Documented but not yet rendered

Asset Strategy, Builder Fit Strategy, Competitive Differentiator Strategy (full), monetization paths, opportunity risks — see [med-sections.md](./med-sections.md) and Phase 9 in [roadmap.md](./roadmap.md).

---

## Known Gaps

- Newsletter has UI only; no backend subscriber storage
- Most target schema tables exist in SQL but are not queried by the app
- RLS policies are dev-open; need tightening for production
- Legacy ADRs in [decisions.md](./decisions.md) may omit **Consequences**

---

## Stack

Next.js 14 · TypeScript · Tailwind CSS · Supabase · Port 3001

Setup: [dev-setup.md](./dev-setup.md)
