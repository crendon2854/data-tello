# Project State — Current Snapshot

Documentation Version: 1.2  
Last Updated: 2026-07-08  
Status: Active  
Owner: DataTello Engineering

Living snapshot of where DataTello is right now.

**Active task:** [current-task.md](./current-task.md)

---

## Current Phase

**Phase 13 (partial) — ICP Onboarding & Decision Engine** ✅ core shipped

**Phase 17 — Investor Watchlists + Alert Triggers** ← next

---

## Product Model (Documented + Partially Shipped)

- Layered validation: Pressure → Demand → Wedge → Friction → Complaints → Base Opportunity → Digital Infrastructure amplification
- ICPs: agencies, consultants, investors, venture studios
- Onboarding + preferences: `/onboarding`, `/preferences` shipped
- Persona decision engine: scoring + dossier interpretation (not just ranking)
- Guardrails: four rules locked in docs

Full spec: [architecture.md](./architecture.md), [onboarding.md](./onboarding.md)

---

## Dossier MVP Scope

### Active (seven sections)

Snapshot → Why This Exists → Signal Breakdown → **Build Strategy / Asset Strategy** → Execution Angle → Competitive Angle → Why This Matters

`BuildStrategy` renders asset paths, asset reason, expansion ladder only.

### Removed from MVP

**Builder Fit Strategy** — not active; future optional layer. No builder-fit / tool-stack logic in user-facing output. Schema reference (`builder_fit_strategy`) may remain in docs/database for future use.

---

## Runtime Mode

| Mode | Status |
|------|--------|
| Mock mode | Active when Supabase env vars unset |
| Live Supabase | MVP tables wired via `lib/queries.ts` |
| Persona execution lens | Active — agency, consultant, investor, venture_studio, general (multi-lens) |
| Persona dossier interpretation | Active — `lib/dossier-content.ts`, section order/labels/emphasis |
| Signal preference scoring | Active — weights + feed filter |
| Onboarding targeting | Active — `/onboarding`, `/preferences`, feed filters |
| Explore mode | Active — focus / adjacent / all |
| Dev port | 3001 |
| Build | Passing |

---

## Scoring Model (Shipped)

| Layer | Field | Role |
|-------|-------|------|
| Truth | `overall_score` | Never mutated by persona or watchlists |
| Persona | `persona_score` | Feed sort; persona-specific weights + signal prefs |
| Modifiers | friction, complaints | Evidence boosts in `applyEvidenceModifiers()` |

Feed filtering uses trusted `industry_tags` / `buyer_tags` — not competitor copy fields.

---

## Routes — Built vs Planned

### Built

`/`, `/dashboard`, `/opportunity/[id]`, `/onboarding`, `/preferences`, `/newsletter`, `/admin/*`

### Planned (next)

`/watchlists`

### Planned (later)

`/admin/complaint-incidents`, `/admin/digital-infrastructure`, `/admin/dossiers`, `/admin/newsletter`, `/admin/system-health`

Full spec: [routes.md](./routes.md)

---

## Known Gaps

- Investor Watchlists + Alert Triggers not built
- “Why you’re seeing this” transparency on feed cards (deferred)
- Complaint & Incident and Digital Infrastructure admin workspaces not built
- Newsletter backend not wired
- Digital Infrastructure Evidence ratings not in Signal Breakdown UI
- `build_difficulty`, full competitive differentiator field parity in admin
- Production RLS not locked

---

## Stack

Next.js 14 · TypeScript · Tailwind CSS · Supabase · Port 3001

Setup: [dev-setup.md](./dev-setup.md)
