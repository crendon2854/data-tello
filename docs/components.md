# Components

See [MED.md](./MED.md) for documentation governance. Section components follow [med-sections.md](./med-sections.md). Visual patterns follow [design-system.md](./design-system.md).

## UI (`/components/ui`)

| Component | Purpose |
|-----------|---------|
| `Card` | Section wrapper — rounded, padding, shadow, optional title |
| `FilterBar` | Asset type, min score, tag filters |
| `PersonaSelector` | Execution lens picker (agency, consultant, investor) |

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

One component per MED section. See [med-sections.md](./med-sections.md) for the seven-section dossier order.

| Component | MED Section | Used On |
|-----------|-------------|---------|
| `OpportunitySnapshot` | 1. Opportunity Snapshot | Detail page |
| `WhyThisExists` | 2. Why This Exists | Detail page |
| `SignalBreakdown` | 3. Signal Breakdown | Detail page |
| `BuildStrategy` | 4. Asset Strategy | Detail page |
| `ExecutionAngle` | 5. Execution Angle | Detail page |
| `CompetitiveAngle` | 6. Competitive Differentiator Strategy | Detail page |
| `WhyThisMatters` | 7. Why This Matters | Detail page |
| `DashboardContent` | — | Dashboard page (client wrapper) |
| `OpportunityDetailContent` | — | Detail page (client wrapper — persona lens, section order) |

Component names (`BuildStrategy`, `CompetitiveAngle`) predate the canonical MED section names. Docs use **Asset Strategy** and **Competitive Differentiator Strategy**.

## Admin (`/components/admin`)

| Component | Purpose |
|-----------|---------|
| `OpportunityForm` | Create/edit — mirrors seven-section dossier groups |
| `ReviewActions` | Approve / reject / publish buttons |

## Typography & Spacing

See [design-system.md](./design-system.md) for typography classes and visual rules. Component layout defaults:

- Section gap: 24px (`gap-6`)
- Card padding: 16–20px (`p-5`)
