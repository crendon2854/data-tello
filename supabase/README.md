# Supabase Setup

DataTello uses Supabase (Postgres) for live data. The app falls back to in-memory mock data when env vars are unset.

Full schema reference: [docs/database.md](../docs/database.md)

---

## Required Environment Variables

Copy `.env.local.example` to `.env.local` at the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Both must be set for live Supabase mode. Restart the dev server after changing env vars.

---

## Schema Apply Order

Run in the Supabase SQL editor (or via Supabase CLI migration):

1. **`schema.sql`** — creates all tables, indexes, and RLS policies
2. **`seed.sql`** — inserts demo data for Research OS tables (sources through workflow friction)

Do not run seed before schema. Schema is idempotent (`create table if not exists`, `drop policy if exists`).

### What seed covers

| Seeded | Not seeded |
|--------|------------|
| `sources` | `opportunities` |
| `raw_signals` | `signals` (legacy) |
| `problem_zones` | `zones` (legacy) |
| `problem_zone_signals` | |
| `keyword_sets` / `keyword_metrics` | |
| `market_proof_records` | |
| `workflow_friction_signals` | |

Create opportunities via `/admin/opportunities` when using live Supabase.

---

## Mock Mode Behavior

When `NEXT_PUBLIC_SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_ANON_KEY` is missing:

- `lib/supabase.ts` sets `isSupabaseConfigured = false`
- `lib/queries.ts` returns data from `lib/mock-data.ts`
- All admin and dashboard routes work without a Supabase project

Mock mode is required for UI development and CI builds without credentials.

---

## RLS Warning

**MVP dev-open policies are TEMPORARY.** They allow unrestricted anon read/write on wired tables for local development.

Before production:

1. Implement Supabase Auth with an admin role
2. Drop all `MVP dev all *` policies (see `schema.sql` RLS header)
3. Keep `Public read published opportunities` for the public dashboard
4. Follow the production RLS plan in [docs/database.md](../docs/database.md)

Do not expose a production Supabase project with dev-open policies.

---

## How to Verify Live Supabase Mode

Use this checklist after applying schema + seed and setting env vars:

- [ ] `.env.local` has both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Dev server restarted after env change
- [ ] `schema.sql` applied without errors
- [ ] `seed.sql` applied without errors
- [ ] `/admin/sources` loads source registry rows (not mock-only names if you changed seed)
- [ ] `/admin/signals` loads raw signals with source linkage
- [ ] `/admin/problem-zones` loads problem zones with linked raw signals
- [ ] `/admin/keywords` loads keyword sets and metrics
- [ ] `/admin/market-proof` loads market proof records
- [ ] `/admin/friction` loads workflow friction signals
- [ ] `/admin/opportunities` — create/publish an opportunity; verify it appears on `/dashboard`
- [ ] `/dashboard` shows published opportunities from Supabase (after creating at least one)

Quick signal: if Research OS admin pages show seeded sources (OSHA, EPA ECHO, Federal Register, etc.), live mode is likely working.

Also documented in [docs/project-state.md](../docs/project-state.md) § Supabase Verification Checklist.

---

## Legacy Tables

| Table | Status |
|-------|--------|
| `zones` | Compatibility only. `/admin/zones` redirects to `/admin/problem-zones`. Do not add new zone data here. |
| `signals` | Compatibility only. Admin uses `raw_signals`. Do not expand. |

Prefer `problem_zones` and `raw_signals` for all new work.

---

## Files

| File | Purpose |
|------|---------|
| `schema.sql` | Full schema + RLS |
| `seed.sql` | Research OS demo data |

Query layer: `lib/queries.ts` · Types: `types/database.ts`
