# Project State — Current Snapshot

Documentation Version: 1.1  
Last Updated: 2026-07-08  
Status: Active  
Owner: DataTello Engineering

Living snapshot of where DataTello is right now.

**Active task:** [current-task.md](./current-task.md)

---

## Current Phase

**Phase 6 — Supabase Integration** ✅ complete

**Phase 5c — Layered Validation & ICP Expansion (docs)** ✅ complete

**Next:** Phase 7 — Research OS Data Foundation (`opportunity_scores`, `review_queue`, `watchlist_items`)

---

## Product Model (Documented)

- Layered validation: Pressure → Demand → Wedge → Friction → Complaints → Base Opportunity → Digital Infrastructure amplification
- ICPs: agencies, consultants, investors, venture studios / product studios
- Onboarding flow documented; implementation planned Phase 13
- Guardrails: four rules locked in docs

Full spec: [architecture.md](./architecture.md), [onboarding.md](./onboarding.md)

---

## Runtime Mode

| Mode | Status |
|------|--------|
| Mock mode | Active when Supabase env vars unset |
| Live Supabase | MVP tables wired via `lib/queries.ts` |
| Persona execution lens | Active (agency, consultant, investor; venture_studio lens in code as `product_studio` — rename/align pending) |
| Onboarding targeting | Documented only — not yet implemented |
| Dev port | 3001 |
| Build | Passing |

---

## Routes — Built vs Planned

### Built

`/`, `/dashboard`, `/opportunity/[id]`, `/newsletter`, `/admin/*` (sources, signals, problem-zones, keywords, market-proof, friction, opportunities, review)

### Planned

`/onboarding`, `/preferences`, `/admin/complaint-incidents`, `/admin/digital-infrastructure`, `/admin/dossiers`, `/admin/newsletter`, `/admin/system-health`

Full spec: [routes.md](./routes.md)

---

## MED Sections — Rendered vs Planned

### Rendered (V1)

Seven-section dossier with persona lens on dashboard and detail.

### Documented, not fully rendered

- Digital Infrastructure Evidence ratings in Signal Breakdown
- `build_difficulty` in Asset Strategy
- `digital_infrastructure_boost` in scoring
- Full competitive differentiator fields

Spec: [med-sections.md](./med-sections.md)

---

## Known Gaps

- Onboarding and default feed filters not implemented
- Complaint & Incident and Digital Infrastructure workspaces not built
- Newsletter backend not wired
- Venture studio persona lens not in code
- Homepage/landing messaging not updated (deferred)
- Production RLS not locked

---

## Stack

Next.js 14 · TypeScript · Tailwind CSS · Supabase · Port 3001

Setup: [dev-setup.md](./dev-setup.md)
