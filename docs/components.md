# Components

See [MED.md](./MED.md) for documentation governance. Section components follow [med-sections.md](./med-sections.md). Visual patterns follow [design-system.md](./design-system.md).

## UI (`/components/ui`)

| Component | Purpose |
|-----------|---------|
| `Card` | Section wrapper — rounded, padding, shadow, optional title |
| `FilterBar` | Asset type, min score, tag filters |
| `PersonaSelector` | Execution lens picker (7 personas) |

## Layout (`/components/layout`)

| Component | Purpose |
|-----------|---------|
| `Navbar` | Logo + Dashboard / Newsletter / Admin links |
| `Sidebar` | Dashboard or admin nav items |
| `PageContainer` | Max-width page wrapper |

## Cards (`/components/cards`)

| Component | Purpose |
|-----------|---------|
| `OpportunityCard` | Dashboard list item |

## Sections (`/components/sections`)

One component per MED section. See [med-sections.md](./med-sections.md).

| Component | Used On |
|-----------|---------|
| `OpportunitySnapshot` | Detail page |
| `WhyThisExists` | Detail page |
| `SignalBreakdown` | Detail page |
| `BuildStrategy` | Detail page |
| `ExecutionAngle` | Detail page |
| `CompetitiveAngle` | Detail page |
| `WhyThisMatters` | Detail page |
| `DashboardContent` | Dashboard page (client wrapper) |
| `OpportunityDetailContent` | Detail page (client wrapper — persona lens, section order) |

## Admin (`/components/admin`)

| Component | Purpose |
|-----------|---------|
| `OpportunityForm` | Create/edit — 6 section groups |
| `ReviewActions` | Approve / reject / publish buttons |

## Typography & Spacing

See [design-system.md](./design-system.md) for typography classes and visual rules. Component layout defaults:

- Section gap: 24px (`gap-6`)
- Card padding: 16–20px (`p-5`)