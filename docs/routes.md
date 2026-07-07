# Routes

| Route | Type | Purpose |
|-------|------|---------|
| `/` | Public | Landing — hero, CTA, sample card |
| `/dashboard` | App | Sidebar + filters + opportunity list |
| `/opportunity/[id]` | App | Full MED detail (all 7 sections) |
| `/newsletter` | Public | Email subscribe (UI only) |
| `/admin` | Admin | Admin hub links |
| `/admin/opportunities` | Admin | List all opportunities |
| `/admin/opportunities/new` | Admin | Create form |
| `/admin/opportunities/[id]` | Admin | Edit form (most important admin page) |
| `/admin/review` | Admin | Draft queue — approve / reject / publish |
| `/admin/signals` | Admin | Signals table |
| `/admin/zones` | Admin | Zones list + create/edit form |

## Layout Rules

- **Root layout** — Navbar on all pages
- **Admin layout** — Sidebar (admin variant) on all `/admin/*` routes
- **Dashboard** — Sidebar (dashboard variant) inline on page