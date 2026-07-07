# Implementation Index — Feature → File Map

Documentation Version: 1.0  
Last Updated: 2026-07-07  
Status: Active  
Owner: DataTello Engineering

Where shipped features live in the codebase. Update when files are added, moved, or removed.

See [MED.md](./MED.md) for workflow. See [project-state.md](./project-state.md) for current status. See [current-task.md](./current-task.md) for the active task.

---

## App Routes

| Feature | Files |
|---------|-------|
| Landing page | `app/page.tsx` |
| Dashboard | `app/dashboard/page.tsx` |
| Opportunity detail | `app/opportunity/[id]/page.tsx` |
| Newsletter capture | `app/newsletter/page.tsx` |
| Root layout | `app/layout.tsx`, `app/globals.css` |
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

Route spec: [routes.md](./routes.md)

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

| Section | File |
|---------|------|
| OpportunitySnapshot | `components/sections/OpportunitySnapshot.tsx` |
| WhyThisExists | `components/sections/WhyThisExists.tsx` |
| SignalBreakdown | `components/sections/SignalBreakdown.tsx` |
| BuildStrategy | `components/sections/BuildStrategy.tsx` |
| ExecutionAngle | `components/sections/ExecutionAngle.tsx` |
| CompetitiveAngle | `components/sections/CompetitiveAngle.tsx` |
| WhyThisMatters | `components/sections/WhyThisMatters.tsx` |
| DashboardContent | `components/sections/DashboardContent.tsx` |
| OpportunityDetailContent | `components/sections/OpportunityDetailContent.tsx` |

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

---

## Styling

| Concern | Files |
|---------|-------|
| Tailwind config | `tailwind.config.ts` |
| Global styles + component classes | `app/globals.css` |
| Fonts | `app/layout.tsx` |

Design tokens: [design-system.md](./design-system.md)

---

## Documentation Governance / Project Memory

| Doc | File |
|-----|------|
| Master Engineering Document | `docs/MED.md` |
| AI playbook + startup procedure | `docs/ai-rules.md` |
| Architectural truths | `docs/context.md` |
| Current snapshot | `docs/project-state.md` |
| Active implementation task | `docs/current-task.md` |
| Feature → file map | `docs/implementation-index.md` |
| Remaining work | `docs/backlog.md` |
| History | `docs/changelog.md` |
