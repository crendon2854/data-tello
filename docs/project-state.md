# Project State — Current Snapshot

Documentation Version: 1.3  
Last Updated: 2026-07-09  
Status: Active  
Owner: DataTello Engineering

Living snapshot of where DataTello is right now.

**Active task:** [current-task.md](./current-task.md)

---

## Current Phase

**Phase 5c — MVP Architecture Separation** ✅ docs locked

**Phase 7–9 — Research OS + Dossier Upgrade** ← next (MVP source stack alignment)

---

## Product Model (MVP Locked)

- **Wedge:** Environmental Compliance + Contractor Safety + Public-sector compliance workflows
- **Positioning:** Evidence-backed build opportunity intelligence — not general market intelligence
- **MVP pipeline:** Collect → Normalize → Cluster → Keyword Enrichment → Market Validation → Procurement Validation → Scoring → Asset Strategy → Human Review → Publish
- **MVP sources:** OSHA, EPA ECHO, Federal Register, DataForSEO, SAM.gov, USAspending, job postings/procurement/RFP friction, G2/Capterra
- **MVP customer:** Builders, compliance-heavy agencies, contractor/environmental consultants
- **Scoring:** Pain, Demand, Market, Freshness, Buildability, Asset Fit + Friction/Procurement modifiers
- Onboarding + preferences: `/onboarding`, `/preferences` shipped
- Guardrails: four rules locked in docs

**Future Expansion (preserved, not MVP):** Complaints (Phase 2), Healthcare (Phase 3), Onchain/x402 (Future Research), investor/enterprise segments

Full spec: [architecture.md](./architecture.md), [onboarding.md](./onboarding.md), [roadmap.md](./roadmap.md)

---

## Dossier MVP Scope

### Active (seven sections — locked)

Opportunity Snapshot → Why This Exists → Signal Breakdown → **Build Strategy** → Execution Angle → Competitive Differentiator → Why This Matters

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
