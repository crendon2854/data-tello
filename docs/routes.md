# Routes

See [MED.md](./MED.md) for documentation governance. **This file is the single source of truth for URL structure** — update it before adding routes.

## Public / App Routes

| Route | Type | Purpose |
|-------|------|---------|
| `/` | Public | Landing — hero, CTA, sample opportunity card |
| `/onboarding` | App | ICP targeting flow (3–5 steps) — planned |
| `/preferences` | App | Edit user_type, industries, buyer_types, signal_types — planned |
| `/dashboard` | App | Decision engine home — **Recommended for You**, **Top Opportunities This Week**, filtered library |
| `/opportunity/[id]` | App | Full Dashboard Brief View / Opportunity Dossier |
| `/opportunity/[id]/pdf` | App | Download or regenerate PDF Dossier |
| `/newsletter` | Public | Free subscriber capture for Weekly Signal Brief |
| `/unsubscribe` | Public | Newsletter unsubscribe handling |

## Onboarding Routes (Planned)

Onboarding spec: [onboarding.md](./onboarding.md).

| Step | Route (proposed) | Captures |
|------|------------------|----------|
| 1 | `/onboarding/type` | `user_type` (role: agency, consultant, investor, venture_studio, general) |
| 2 | `/onboarding/industries` | `industries[]` |
| 3 | `/onboarding/buyer` | `buyer_types[]` |
| 4 | `/onboarding/signals` | `signal_types[]` |
| 5 | `/onboarding/confirm` | Summary + save |

After completion, redirect to `/dashboard` with default filters applied.

`/preferences` allows editing targeting without repeating full onboarding.

## Admin Routes

| Route | Type | Purpose |
|-------|------|---------|
| `/admin` | Admin | Admin hub / operating dashboard |
| `/admin/sources` | Admin | Source Registry |
| `/admin/signals` | Admin | Raw Signal Explorer |
| `/admin/problem-zones` | Admin | Problem Zone Workspace |
| `/admin/keywords` | Admin | Keyword Intelligence / DataForSEO enrichment |
| `/admin/market-proof` | Admin | Market Wedge Validation workspace |
| `/admin/friction` | Admin | Workflow Friction Signals workspace |
| `/admin/complaint-incidents` | Admin | Complaint & Incident Signals workspace |
| `/admin/digital-infrastructure` | Admin | Emerging Digital Infrastructure Signals workspace |
| `/admin/opportunities` | Admin | Candidate and published opportunities list |
| `/admin/opportunities/new` | Admin | Create opportunity manually |
| `/admin/opportunities/[id]` | Admin | Edit full Opportunity Dossier form |
| `/admin/review` | Admin | Human Review Queue |
| `/admin/watchlist` | Admin | Watchlist Admin |
| `/admin/dossiers` | Admin | Dossier Builder / PDF templates / export history |
| `/admin/newsletter` | Admin | Newsletter Engine — Weekly Signal Brief composer |
| `/admin/system-health` | Admin | Connector status, failed syncs, repair logs |
| `/admin/settings` | Admin | Rules, thresholds, defaults, affiliate settings |

## Legacy Aliases

| Route | Replace With |
|-------|--------------|
| `/admin/zones` | `/admin/problem-zones` |

## Layout Rules

- **Root layout** — Navbar on public pages
- **Dashboard layout** — Sidebar/filter panel; default filters from onboarding preferences (when implemented)
- **Admin layout** — Admin sidebar on all `/admin/*` routes
- **Dossier pages** — Section-driven cards matching [med-sections.md](./med-sections.md)

## Dashboard Layout Rules

Dashboard renders in this order:

1. **Recommended for You** — Decision Layer top pick
2. **Top Opportunities This Week** — ranked secondary list
3. Filtered opportunity grid — default filters from onboarding
4. FilterBar — manual override always available

**Start Here** CTA anchor-scrolls to Build Strategy (agency/consultant) or Asset Thesis (investor/venture_studio) on detail page.

## Dashboard Filter Rules

Default opportunity queries apply:

- `industries[]` from onboarding
- `buyer_types[]` from onboarding
- `signal_types[]` from onboarding

Always allow manual override. **Explore Mode** — show opportunities outside selected industries — especially for Investors, Agencies, Venture Studios.

## Route Build Priority

### Built (MVP)

- `/`, `/dashboard`, `/opportunity/[id]`, `/newsletter`
- `/admin`, `/admin/sources`, `/admin/signals`, `/admin/problem-zones`
- `/admin/keywords`, `/admin/market-proof`, `/admin/friction`
- `/admin/opportunities`, `/admin/opportunities/new`, `/admin/opportunities/[id]`
- `/admin/review`, `/admin/zones` (redirect)

### Next routes

1. `/onboarding` + `/preferences`
2. `/admin/complaint-incidents`
3. `/admin/digital-infrastructure`
4. `/admin/dossiers`, `/admin/newsletter`, `/admin/system-health`, `/admin/settings`
5. `/opportunity/[id]/pdf`, `/unsubscribe`

## Route Rules

1. Newsletter routes do not generate full paid dossiers.
2. Dossier routes do not manage subscribers.
3. Admin routes preserve source traceability.
4. Public dashboard shows decision-ready output, not every internal field.
5. PDF export uses templates and structured data.
6. Onboarding preferences act as default query filters on dashboard views.
