# Implementation Index — Feature → File Map

Documentation Version: 1.3  
Last Updated: 2026-07-09  
Status: Active  
Owner: DataTello Engineering

Where shipped features live in the codebase. Update when files are added, moved, or removed.

See [MED.md](./MED.md) for workflow. See [project-state.md](./project-state.md) for current status. See [current-task.md](./current-task.md) for the active task.

---

## Active Task → Files

**Milestone:** Phase 18 — Decision Layer Implementation  
**Spec:** [current-task.md](./current-task.md), [architecture.md](./architecture.md) § Decision Layer

| Task area | Primary files | Status |
|-----------|---------------|--------|
| Decision Layer | `lib/decision-layer.ts` (planned) | ❌ not shipped |
| Recommended card | `components/dashboard/RecommendedCard.tsx` (planned) | ❌ |
| Top opportunities | `components/dashboard/TopOpportunities.tsx` (planned) | ❌ |
| Dashboard wiring | `components/sections/DashboardContent.tsx`, `components/dashboard/DashboardClient.tsx` | ⚠️ no Recommended section |
| Asset Thesis | `components/sections/AssetThesis.tsx` (planned) | ❌ |
| Builder Fit (role-gated) | `components/sections/BuilderFitStrategy.tsx` (planned) | ❌ |
| Role visibility | `lib/dossier-content.ts`, `role_visibility_config` | ⚠️ partial |
| Newsletter engine | `lib/newsletter-engine/` (planned) | ❌ |
| Schema fields | `supabase/schema.sql`, `types/database.ts` | ⚠️ Decision Layer fields documented only |

---

## Active Task → Files (Phase 7–9 parallel)

**Milestone:** Phase 7–9 — MVP Source Stack Code Alignment  
**Spec:** [architecture.md](./architecture.md)

| Task area | Primary files | MVP gap |
|-----------|---------------|---------|
| Source registry | `app/admin/sources/page.tsx`, `supabase/seed.sql` | SAM.gov not in registry; no phase labels |
| Mock data | `lib/mock-data.ts`, `lib/mock-opportunities.ts` | GitHub friction still active |
| Friction admin | `app/admin/friction/page.tsx` | Shows GitHub/Stack Exchange — MVP wants job postings, procurement/RFP |
| Procurement pipeline | `lib/procurement/*` | Not wired to scoring or admin workspace |
| Scoring | `lib/scoring.ts` | Complaint modifiers active; procurement modifier missing |
| Dossier UI | `components/sections/SignalBreakdown.tsx` | No procurement panel; complaint/digital infra may show |
| Admin scoring form | `components/admin/OpportunityForm.tsx` | digital_infrastructure_boost may still appear |
| Onboarding ICP | `components/onboarding/OnboardingFlow.tsx`, `lib/persona-lens.ts` | No Builder type; investor/studio still primary |
| Types | `types/database.ts`, `types/opportunity.ts`, `types/user-preferences.ts` | `procurement_score` parity TBD |

---

## App Routes

| Feature | Files | MVP status |
|---------|-------|------------|
| Landing page | `app/page.tsx`, `components/landing/*` | ✅ messaging aligned |
| Dashboard | `app/dashboard/page.tsx` | ✅ |
| Opportunity detail | `app/opportunity/[id]/page.tsx` | ⚠️ dossier may show non-MVP signal panels |
| Onboarding | `app/onboarding/page.tsx`, `components/onboarding/OnboardingFlow.tsx` | ⚠️ needs Builder type |
| Preferences | `app/preferences/page.tsx` | ⚠️ signal prefs include Phase 2 layers |
| Watchlists | `/watchlists` — **Phase 17, not MVP** | planned |
| Newsletter capture | `app/newsletter/page.tsx` | ✅ UI only |
| Root layout | `app/layout.tsx`, `styles/globals.css`, `styles/landing.css` | ✅ |
| Admin layout | `app/admin/layout.tsx` | ✅ |
| Admin hub | `app/admin/page.tsx` | ⚠️ may link future workspaces |
| Source registry | `app/admin/sources/page.tsx` | ⚠️ needs MVP phase labels |
| Raw Signal Explorer | `app/admin/signals/page.tsx` | ✅ |
| Problem Zone Workspace | `app/admin/problem-zones/page.tsx` | ✅ |
| Keyword Intelligence | `app/admin/keywords/page.tsx` | ⚠️ DataForSEO placeholder |
| Market Proof Workspace | `app/admin/market-proof/page.tsx` | ✅ |
| Workflow Friction Workspace | `app/admin/friction/page.tsx` | ⚠️ non-MVP sources active |
| Procurement Validation | — | ❌ no dedicated admin route yet |
| Complaint Incidents | `/admin/complaint-incidents` — **Phase 2** | planned |
| Digital Infrastructure | `/admin/digital-infrastructure` — **Future Research** | planned |
| Legacy zones redirect | `app/admin/zones/page.tsx` | ✅ |
| Opportunity list | `app/admin/opportunities/page.tsx` | ✅ |
| Create opportunity | `app/admin/opportunities/new/page.tsx` | ✅ |
| Edit opportunity | `app/admin/opportunities/[id]/page.tsx` | ✅ |
| Review queue | `app/admin/review/page.tsx` | ⚠️ guardrail display incomplete |

---

## Components

### Layout

| Component | File |
|-----------|------|
| Navbar | `components/layout/Navbar.tsx` |
| Sidebar | `components/layout/Sidebar.tsx` |
| PageContainer | `components/layout/PageContainer.tsx` |

### UI

| Component | File |
|-----------|------|
| Card | `components/ui/Card.tsx` |
| FilterBar | `components/ui/FilterBar.tsx` |
| PersonaSelector | `components/ui/PersonaSelector.tsx` |

### Cards

| Component | File |
|-----------|------|
| OpportunityCard | `components/cards/OpportunityCard.tsx` |

### MED Sections (seven-section output — locked)

| Section | MED Name | File |
|---------|----------|------|
| OpportunitySnapshot | 1. Opportunity Snapshot | `components/sections/OpportunitySnapshot.tsx` |
| WhyThisExists | 2. Why This Exists | `components/sections/WhyThisExists.tsx` |
| SignalBreakdown | 3. Signal Breakdown | `components/sections/SignalBreakdown.tsx` |
| BuildStrategy | 4. Build Strategy | `components/sections/BuildStrategy.tsx` |
| ExecutionAngle | 5. Execution Angle | `components/sections/ExecutionAngle.tsx` |
| CompetitiveAngle | 6. Competitive Differentiator | `components/sections/CompetitiveAngle.tsx` |
| WhyThisMatters | 7. Why This Matters | `components/sections/WhyThisMatters.tsx` |
| GeneralMultiLens | — (general role only) | `components/sections/GeneralMultiLens.tsx` |
| DashboardContent | — | `components/sections/DashboardContent.tsx` |
| OpportunityDetailContent | — | `components/sections/OpportunityDetailContent.tsx` |

Section spec: [med-sections.md](./med-sections.md)

### Admin

| Component | File |
|-----------|------|
| OpportunityForm | `components/admin/OpportunityForm.tsx` |
| SimpleOpportunityForm | `components/admin/SimpleOpportunityForm.tsx` |
| ReviewActions | `components/admin/ReviewActions.tsx` |

Full inventory: [components.md](./components.md)

---

## Data Layer

| Concern | Files | MVP notes |
|---------|-------|-----------|
| Supabase client | `lib/supabase.ts` | |
| Queries + mock fallback | `lib/queries.ts` | |
| Mock data | `lib/mock-data.ts` | ⚠️ align to MVP wedge |
| Mock opportunities | `lib/mock-opportunities.ts` | ⚠️ align to MVP wedge |
| Helpers | `lib/helpers.ts` | |
| Persona execution lens | `lib/persona-lens.ts` | ⚠️ MVP ICP defaults |
| Persona dossier content | `lib/dossier-content.ts` | |
| Persona angle copy | `lib/persona-angles.ts` | |
| Scoring + persona scores | `lib/scoring.ts` | ⚠️ procurement modifier; gate complaint path |
| Feed filters + explore mode | `lib/feed-filters.ts` | |
| User preferences client | `lib/user-preferences-client.ts` | |
| User preference types | `types/user-preferences.ts` | ⚠️ add `builder` type |
| DB types | `types/database.ts` | ⚠️ `procurement_score` |
| Opportunity types | `types/opportunity.ts` | ⚠️ `procurement_score` |
| Procurement types | `types/procurement.ts` | ✅ |
| Schema | `supabase/schema.sql` | |
| Seed data | `supabase/seed.sql` | ⚠️ MVP sources only |
| Supabase setup guide | `supabase/README.md` | |

### Procurement pipeline (MVP — partial)

| Concern | Files | Status |
|---------|-------|--------|
| SAM.gov fetch/normalize | `lib/procurement/queries.ts` | ✅ |
| Keyword groups | `lib/procurement/keywords.ts` | ✅ |
| Low-signal filter | `lib/procurement/filter.ts` | ✅ |
| Procurement scoring | `lib/procurement/scoring.ts` | ✅ |
| Pipeline integration | `lib/procurement/integration.ts` | ⚠️ not wired to main scoring |
| Dossier evidence | `lib/procurement/dossier.ts` | ⚠️ not in SignalBreakdown UI |
| Examples/mocks | `lib/procurement/examples.ts` | ✅ |
| Barrel export | `lib/procurement/index.ts` | ✅ |

---

## Hooks

| Hook | File |
|------|------|
| useOpportunities | `hooks/useOpportunities.ts` |
| useFilters | `hooks/useFilters.ts` |
| usePersonaLens | `hooks/usePersonaLens.ts` |
| useUserPreferences | `hooks/useUserPreferences.ts` |

---

## Styling

| Concern | Files |
|---------|-------|
| Tailwind config | `tailwind.config.ts` |
| Global styles + component classes | `styles/globals.css`, `styles/landing.css` |
| Fonts | `app/layout.tsx` |

Design tokens: [design-system.md](./design-system.md)

---

## Documentation Governance / Project Memory

| Doc | File | Role |
|-----|------|------|
| Master Engineering Document | `docs/MED.md` | Governance entry |
| AI playbook + startup procedure | `docs/ai-rules.md` | Dev rules |
| Architectural truths | `docs/context.md` | Long-term + MVP freeze |
| MVP architecture | `docs/architecture.md` | Source stack, pipeline, Future Expansion |
| ICP onboarding spec | `docs/onboarding.md` | MVP customer focus |
| Current snapshot | `docs/project-state.md` | Living status |
| **Active implementation task** | `docs/current-task.md` | Milestone, task, files, risks, deps |
| Feature → file map | `docs/implementation-index.md` | This file |
| Remaining work | `docs/backlog.md` | Phased backlog |
| Strategic phases | `docs/roadmap.md` | Roadmap + Future Expansion |
| ADRs | `docs/decisions.md` | Architecture decisions |
| History | `docs/changelog.md` | Changelog |

---

## Dependencies (implementation order)

```text
1. types/database.ts + supabase/schema.sql  (procurement_score)
2. supabase/seed.sql + lib/mock-data.ts     (MVP sources)
3. lib/scoring.ts                           (procurement modifier, gate complaint path)
4. lib/procurement/integration.ts           (wire to main scoring)
5. app/admin/*                              (friction, sources, procurement workspace)
6. components/sections/SignalBreakdown.tsx  (procurement panel)
7. components/onboarding/* + lib/persona-lens.ts  (Builder ICP)
```

## Risks (tracked)

| Risk | Where it surfaces |
|------|-------------------|
| Doc vs code drift | Any file marked ⚠️ above |
| Mock mode breakage | `lib/mock-data.ts`, `lib/queries.ts` |
| Scoring regression | `lib/scoring.ts`, `overall_score` truth layer |
| Over-scoping to Phase 2 | Friction admin, SignalBreakdown, onboarding prefs |
