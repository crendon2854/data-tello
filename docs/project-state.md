# Project State — Current Snapshot

Documentation Version: 1.4  
Last Updated: 2026-07-09  
Status: Active  
Owner: DataTello Engineering

Living snapshot of where DataTello is right now.

**Active task:** [current-task.md](./current-task.md)

---

## Current Phase

**Phase 5d — Decision Layer & Role-Aware Output** ✅ docs locked

**Phase 18–19 — Decision Layer + Role-Aware Output Implementation** ← next

**Phase 7–9 — Research OS + Dossier Upgrade** — in parallel where not blocked

---

## Product Model (Locked)

- **Positioning:** Evidence-backed **decision engine** — not a research dashboard
- **Core question:** For this user → what should they build or act on first?
- **Wedge:** Environmental Compliance + Contractor Safety + Public-sector compliance workflows
- **Roles:** agency, consultant, investor, venture_studio, general
- **MVP pipeline:** Collect → … → Scoring → Asset Strategy → Human Review → Publish (unchanged)
- **Decision Layer:** `getRecommendedOpportunity()` — top 1 + top 3 ranked (spec locked, implementation pending)
- **Dashboard:** Recommended for You → Top Opportunities This Week → filtered grid
- **Role output:** agency/consultant = execution detail; investor/venture_studio = Asset Thesis
- **Scoring:** Pain, Demand, Market, Freshness, Buildability, Asset Fit + Friction/Procurement modifiers (unchanged)
- Onboarding + preferences: `/onboarding`, `/preferences` shipped
- Guardrails: four publish rules + recommendation guardrails locked in docs

Full spec: [architecture.md](./architecture.md), [onboarding.md](./onboarding.md), [roadmap.md](./roadmap.md)

---

## Dossier MVP Scope

### Active (seven sections — locked, unchanged)

Opportunity Snapshot → Why This Exists → Signal Breakdown → **Build Strategy** → Execution Angle → Competitive Differentiator → Why This Matters

Role-aware visibility: Build Strategy renders as full execution (agency/consultant) or **Asset Thesis** (investor/venture_studio).

### Role-specific additions

- **Agency / Consultant:** Builder Fit Strategy, Recommended Tool Stack, "How to build this"
- **Investor / Venture Studio:** Asset Thesis fields; hide tool stack and build paths

---

## Runtime Mode

| Mode | Status |
|------|--------|
| Mock mode | Active when Supabase env vars unset |
| Live Supabase | MVP tables wired via `lib/queries.ts` |
| Persona execution lens | Active — agency, consultant, investor, venture_studio, general |
| Persona dossier interpretation | Active — `lib/dossier-content.ts` |
| Decision Layer | ❌ spec only — `lib/decision-layer.ts` not shipped |
| Recommended for You card | ❌ not shipped |
| Top Opportunities This Week | ❌ not shipped |
| Signal preference scoring | Active — weights + feed filter |
| Onboarding targeting | Active — `/onboarding`, `/preferences`, feed filters |
| Explore mode | Active — focus / adjacent / all |
| Dev port | 3001 |
| Build | Passing |

---

## Scoring Model (Shipped — unchanged)

| Layer | Field | Role |
|-------|-------|------|
| Truth | `overall_score` | Never mutated by persona or watchlists |
| Persona | `persona_score` | Feed sort; persona-specific weights + signal prefs |
| Modifiers | friction, procurement | Evidence boosts in scoring path |

### Decision Layer fields (planned)

| Field | Status |
|-------|--------|
| `recommended_rank_score` | Documented, not in schema |
| `recommended_reason[]` | Documented, not in schema |
| `confidence_level` | Documented, not in schema |
| `time_to_value` | Partial — exists as free text on opportunities |
| `role_visibility_config` | Documented, not in schema |

---

## Routes — Built vs Planned

### Built

`/`, `/dashboard`, `/opportunity/[id]`, `/onboarding`, `/preferences`, `/newsletter`, `/admin/*`

### Planned (next — Phase 18–19)

Decision Layer dashboard components, `lib/decision-layer.ts`, `lib/newsletter-engine/`, schema migration

### Planned (later)

`/watchlists`, `/admin/complaint-incidents`, `/admin/digital-infrastructure`, `/admin/dossiers`, `/admin/newsletter`, `/admin/system-health`

Full spec: [routes.md](./routes.md)

---

## Known Gaps

- Decision Layer not implemented in code
- Recommended for You + Top Opportunities dashboard sections not built
- Asset Thesis component not built; Builder Fit not role-gated
- `confidence_level` calculation not shipped
- Newsletter backend / Weekly Signal Brief composer not wired
- Complaint & Incident and Digital Infrastructure admin workspaces not built
- Production RLS not locked

---

## Stack

Next.js 14 · TypeScript · Tailwind CSS · Supabase · Port 3001

Setup: [dev-setup.md](./dev-setup.md)
