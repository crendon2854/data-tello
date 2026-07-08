# Routes

See [MED.md](./MED.md) for documentation governance. **This file is the single source of truth for URL structure** — update it before adding routes.

## Public / App Routes

| Route | Type | Purpose |
|-------|------|---------|
| `/` | Public | Landing — hero, CTA, sample opportunity card |
| `/dashboard` | App | Paid opportunity library with filters and cards |
| `/opportunity/[id]` | App | Full Dashboard Brief View / Opportunity Dossier |
| `/opportunity/[id]/pdf` | App | Download or regenerate PDF Dossier |
| `/newsletter` | Public | Free subscriber capture for Weekly Signal Brief |
| `/unsubscribe` | Public | Newsletter unsubscribe handling |

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
| `/admin/newsletter` | Admin | Newsletter Engine — subscribers, Signal Briefs, events |
| `/admin/system-health` | Admin | Connector status, failed syncs, repair logs |
| `/admin/settings` | Admin | Rules, thresholds, defaults, affiliate settings |

## Existing Legacy Aliases

These may exist during transition:

| Route | Replace With |
|-------|--------------|
| `/admin/zones` | `/admin/problem-zones` |
| `/admin/signals` | keep, but evolve to Raw Signal Explorer |

## Layout Rules

- **Root layout** — Navbar on public pages
- **Dashboard layout** — Sidebar/filter panel for paid user workspace
- **Admin layout** — Admin sidebar on all `/admin/*` routes
- **Dossier pages** — Section-driven cards matching `docs/med-sections.md`

## Route Build Priority

### Already built / current MVP

- `/`
- `/dashboard`
- `/opportunity/[id]`
- `/newsletter`
- `/admin`
- `/admin/sources`
- `/admin/opportunities`
- `/admin/opportunities/new`
- `/admin/opportunities/[id]`
- `/admin/review`
- `/admin/signals`
- `/admin/problem-zones`
- `/admin/zones` (redirect alias)

### Next admin routes to add

1. `/admin/complaint-incidents`
2. `/admin/digital-infrastructure`
3. `/admin/dossiers`
4. `/admin/newsletter`
5. `/admin/system-health`
6. `/admin/settings`

## Route Rules

1. Newsletter routes do not generate full paid dossiers.
2. Dossier routes do not manage subscribers.
3. Admin routes preserve source traceability.
4. Public dashboard routes show simplified decision-ready output, not every internal field.
5. PDF export route uses a selected/default template and structured data, not manually assembled PDFs.