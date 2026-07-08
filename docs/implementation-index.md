# Implementation Index — Feature → File Map

Documentation Version: 1.1  
Last Updated: 2026-07-08  
Status: Active  
Owner: DataTello Engineering

Where shipped features live in the codebase. Update when files are added, moved, or removed.

See [MED.md](./MED.md) for workflow. See [project-state.md](./project-state.md) for current status. See [current-task.md](./current-task.md) for the active task.

---

## App Routes

| Feature | Files |
|---------|-------|
| Landing page (homepage — messaging deferred) | `app/page.tsx`, `components/landing/*` |
| Dashboard | `app/dashboard/page.tsx` |
| Opportunity detail | `app/opportunity/[id]/page.tsx` |
| Onboarding | `app/onboarding/page.tsx`, `components/onboarding/OnboardingFlow.tsx` |
| Preferences | `app/preferences/page.tsx` |
| Watchlists (planned) | `/watchlists` — see [current-task.md](./current-task.md) |
| Newsletter capture | `app/newsletter/page.tsx` |
| Root layout | `app/layout.tsx`, `styles/globals.css`, `styles/landing.css` |
| Admin layout | `app/admin/layout.tsx` |
| Admin hub | `app/admin/page.tsx` |
| Source registry | `app/admin/sources/page.tsx` |
| Raw Signal Explorer | `app/admin/signals/page.tsx` |
| Problem Zone Workspace | `app/admin/problem-zones/page.tsx` |
| Keyword Intelligence | `app/admin/keywords/page.tsx` |
| Market Proof Workspace | `app/admin/market-proof/page.tsx` |
| Workflow Friction Workspace | `app/admin/friction/page.tsx` |
| Legacy zones redirect | `app/admin/zones/page.tsx` |
| Opportunity list | `app/admin/opportunities/page.tsx` |
| Create opportunity | `app/admin/opportunities/new/page.tsx` |
| Edit opportunity | `app/admin/opportunities/[id]/page.tsx` |
| Review queue | `app/admin/review/page.tsx` |

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

### MED Sections

| Section | MED Name | File |
|---------|----------|------|
| OpportunitySnapshot | 1. Opportunity Snapshot | `components/sections/OpportunitySnapshot.tsx` |
| WhyThisExists | 2. Why This Exists | `components/sections/WhyThisExists.tsx` |
| SignalBreakdown | 3. Signal Breakdown | `components/sections/SignalBreakdown.tsx` |
| BuildStrategy | 4. Asset Strategy | `components/sections/BuildStrategy.tsx` |
| ExecutionAngle | 5. Execution Angle | `components/sections/ExecutionAngle.tsx` |
| CompetitiveAngle | 6. Competitive Differentiator Strategy | `components/sections/CompetitiveAngle.tsx` |
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

| Concern | Files |
|---------|-------|
| Supabase client | `lib/supabase.ts` |
| Queries + mock fallback | `lib/queries.ts` |
| Mock data | `lib/mock-data.ts` |
| Helpers | `lib/helpers.ts` |
| Persona execution lens | `lib/persona-lens.ts` |
| Persona dossier content | `lib/dossier-content.ts` |
| Persona angle copy | `lib/persona-angles.ts` |
| Scoring + persona scores | `lib/scoring.ts` |
| Feed filters + explore mode | `lib/feed-filters.ts` |
| User preferences client | `lib/user-preferences-client.ts` |
| User preference types | `types/user-preferences.ts` |
| DB types | `types/database.ts` |
| Opportunity types | `types/opportunity.ts` |
| Schema | `supabase/schema.sql` |
| Seed data | `supabase/seed.sql` |
| Supabase setup guide | `supabase/README.md` |

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

| Doc | File |
|-----|------|
| Master Engineering Document | `docs/MED.md` |
| AI playbook + startup procedure | `docs/ai-rules.md` |
| Architectural truths | `docs/context.md` |
| ICP onboarding spec | `docs/onboarding.md` |
| Current snapshot | `docs/project-state.md` |
| Active implementation task | `docs/current-task.md` |
| Feature → file map | `docs/implementation-index.md` |
| Remaining work | `docs/backlog.md` |
| History | `docs/changelog.md` |
