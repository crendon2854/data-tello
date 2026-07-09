# Components

See [MED.md](./MED.md) for documentation governance. Section components follow [med-sections.md](./med-sections.md). Visual patterns follow [design-system.md](./design-system.md).

## UI (`/components/ui`)

| Component | Purpose |
|-----------|---------|
| `Card` | Section wrapper — rounded, padding, shadow, optional title |
| `FilterBar` | Industry, buyer, signal type, asset type, min score, tag filters |
| `PersonaSelector` | ICP execution lens picker (agency, consultant, investor, venture studio) — uses `ICP_PERSONA_LIST` |

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
| `RecommendedCard` | Top-of-dashboard "Recommended for You" — Decision Layer output |
| `TopOpportunities` | "Top Opportunities This Week" ranked list |

## Sections (`/components/sections`)

One component per MED section. Seven-section dossier order per [med-sections.md](./med-sections.md).

| Component | MED Section | Used On |
|-----------|-------------|---------|
| `OpportunitySnapshot` | 1. Opportunity Snapshot | Detail page |
| `WhyThisExists` | 2. Why This Exists | Detail page |
| `SignalBreakdown` | 3. Signal Breakdown (+ Digital Infrastructure Evidence) | Detail page |
| `BuildStrategy` | 4. Build Strategy (agency/consultant) | Detail page |
| `AssetThesis` | 4. Asset Thesis (investor/venture_studio) | Detail page — planned |
| `BuilderFitStrategy` | Builder Fit + tool stack (agency/consultant only) | Detail page — planned |
| `ExecutionAngle` | 5. Execution Angle | Detail page |
| `CompetitiveAngle` | 6. Competitive Differentiator Strategy | Detail page |
| `WhyThisMatters` | 7. Why This Matters | Detail page |
| `DashboardContent` | — | Dashboard page — Recommended for You, Top Opportunities, filters |
| `OpportunityDetailContent` | — | Detail page (ICP lens, section order) |

Component names (`BuildStrategy`, `CompetitiveAngle`) predate canonical MED section names.

## Admin (`/components/admin`)

| Component | Purpose |
|-----------|---------|
| `OpportunityForm` | Create/edit — mirrors seven-section dossier groups |
| `ReviewActions` | Approve / reject / publish buttons |

## Dashboard (`/components/dashboard`)

| Component | Purpose |
|-----------|---------|
| `DashboardClient` | Dashboard shell + filter state |
| `RecommendedCard` | "Recommended for You" — title, asset, 3 bullets, confidence, TTV, CTAs |
| `TopOpportunities` | Weekly ranked list — score, asset, buyer, summary |

## Planned Components

| Component | Purpose |
|-----------|---------|
| `OnboardingFlow` | 3–5 step ICP targeting capture |
| `PreferencesForm` | Edit industries, buyer focus, signal preferences |
| `ExploreModeToggle` | Show opportunities outside selected industries |
| `DigitalInfrastructurePanel` | Weak/Moderate/Strong ratings in Signal Breakdown |

## Typography & Spacing

See [design-system.md](./design-system.md). Defaults: section gap 24px (`gap-6`), card padding 16–20px (`p-5`).
