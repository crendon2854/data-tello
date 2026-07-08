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

**Phase 6 — Supabase Integration** ✅ complete

Phases 1–6 complete. See [roadmap.md](./roadmap.md).

**Active task:** See [current-task.md](./current-task.md).

---

## Runtime Mode

| Mode | Status |
|------|--------|
| Mock mode | Active when `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` are unset |
| Live Supabase | All MVP wired tables read/write via `lib/queries.ts` with mock fallback |
| Persona execution lens | Active on dashboard and opportunity detail (agency, consultant, investor primary; presentation only) |
| Dev port | 3001 |
| Build | Passing (`npm run build`) |

Setup: [supabase/README.md](../supabase/README.md)

---

## Supabase Verification Checklist

Use after applying schema + seed and setting env vars. Full steps: [supabase/README.md](../supabase/README.md).

- [ ] `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` set in `.env.local`
- [ ] `supabase/schema.sql` applied without errors
- [ ] `supabase/seed.sql` applied without errors
- [ ] Dev server restarted after env change
- [ ] `/admin/sources` loads source registry rows
- [ ] `/admin/signals` loads raw signals with source linkage
- [ ] `/admin/problem-zones` loads problem zones with linked raw signals
- [ ] `/admin/keywords` loads keyword sets and metrics
- [ ] `/admin/market-proof` loads market proof records (optional but wired)
- [ ] `/admin/friction` loads workflow friction signals (optional but wired)
- [ ] `/admin/opportunities` — create and publish an opportunity
- [ ] `/dashboard` shows published opportunities from Supabase

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
| `/admin/opportunities` | ✅ Supabase + mock |
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

### Active MVP tables (wired to Supabase + mock fallback)

- `opportunities` — primary entity (no seed; create via admin)
- `sources` — Source Registry
- `raw_signals` — Raw Signal Explorer
- `problem_zones` — Problem Zone Workspace
- `problem_zone_signals` — zone ↔ raw signal join
- `keyword_sets` — Keyword Intelligence
- `keyword_metrics` — keyword demand metrics
- `market_proof_records` — Market Proof Workspace
- `workflow_friction_signals` — Workflow Friction Workspace

### Legacy (compatibility only — do not expand)

- `signals` — legacy lightweight table; admin uses `raw_signals`
- `zones` — legacy lightweight table; `/admin/zones` redirects to `problem_zones`

Full live-table matrix: [database.md](./database.md) § Live Table Support

### Target tables (schema defined, not wired)

Research OS tables in `supabase/schema.sql` including `opportunity_scores`, `review_queue`, `complaint_incident_signals`, `emerging_digital_infrastructure_signals`, etc.

Full schema: [database.md](./database.md)

---

## RLS Status

| Policy type | Status |
|-------------|--------|
| `Public read published opportunities` | Active — keep for production |
| `MVP dev all *` (11 policies) | TEMPORARY — dev-open; drop before production |
| Target tables (no policies) | Closed until routes + auth ship |

Production RLS plan: [database.md](./database.md) § Production RLS Plan

---

## MED Sections — Rendered vs Planned

### Rendered on detail page (V1 — seven-section dossier)

1. Opportunity Snapshot (persona-aware labels)
2. Why This Exists
3. Signal Breakdown (persona-aware helper text; Buildability + Asset Fit scores)
4. Asset Strategy — via `BuildStrategy` component (persona-aware asset path labels)
5. Execution Angle
6. Competitive Differentiator Strategy — via `CompetitiveAngle` component
7. Why This Matters

Persona selector + section reorder/emphasis via `OpportunityDetailContent`

### Documented but not yet fully rendered

Full Asset Strategy fields (expansion path, zip-ready fit, revenue ceiling), full Competitive Differentiator Strategy fields, monetization paths, opportunity risks — see [med-sections.md](./med-sections.md) and Phase 9 in [roadmap.md](./roadmap.md).

---

## Known Gaps

- Newsletter has UI only; no backend subscriber storage
- Most target schema tables exist in SQL but are not queried by the app
- Production RLS not locked — auth roles do not exist yet; dev-open policies remain
- Legacy ADRs in [decisions.md](./decisions.md) may omit **Consequences**

---

## Stack

Next.js 14 · TypeScript · Tailwind CSS · Supabase · Port 3001

Setup: [dev-setup.md](./dev-setup.md) · Supabase: [supabase/README.md](../supabase/README.md)
