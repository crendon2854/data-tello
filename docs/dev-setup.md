# Dev Setup

See [MED.md](./MED.md) for engineering workflow and Definition of Done.

## Prerequisites

- Node.js 18+
- npm

## Install & Run

```bash
cd datatello
npm install
npm run dev
```

App runs at **http://localhost:3001** (port 3001 to avoid conflicts with other projects on 3000).

Production start also uses port 3001: `npm run start`

## Environment Variables

Copy `.env.local.example` to `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Without these, the app uses mock data — fine for UI development.

## Supabase Setup

1. Create a Supabase project
2. Run `supabase/schema.sql` in the SQL editor
3. Run `supabase/seed.sql` in the SQL editor
4. Add env vars to `.env.local`
5. Restart dev server
6. Verify with checklist in [supabase/README.md](../supabase/README.md) or [project-state.md](./project-state.md)

Full guide: [supabase/README.md](../supabase/README.md)

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server on :3001 |
| `npm run build` | Production build |
| `npm run start` | Production server on :3001 |
| `npm run lint` | ESLint |

## Troubleshooting

### Styles missing (white page, black text)

Usually a stale dev server or corrupted `.next` cache — Tailwind CSS never loads, so custom classes like `bg-bg-primary` do nothing.

**Quick fix:**

```powershell
npm run dev:clean
```

Then hard-refresh the browser (`Ctrl+Shift+R`).

**Manual fix (PowerShell):**

```powershell
# Find and kill whatever is holding port 3001
netstat -ano | findstr :3001
taskkill /PID <pid_from_above> /F

# Clear Next cache and restart
Remove-Item -Recurse -Force .next
npm run dev
```

### Style guardrails (prevent regressions)

| Command | Purpose |
|---------|---------|
| `npm run check:styles:config` | Verify layout imports, Tailwind directives, CSS fallbacks |
| `npm run check:styles` | After build — confirm compiled CSS contains theme tokens |
| `npm run dev:clean` | Clear `.next` cache and restart dev server |

`npm run build` runs both checks automatically. CI runs the same on every push/PR.

**Root cause notes:**
- Never create `app/globals.css` — use `styles/globals.css` only
- Never `@apply` custom component classes inside other component rules (breaks Tailwind HMR)
- `:root` CSS variables in `styles/globals.css` provide a dark-theme fallback even if utilities fail

### `EADDRINUSE` on port 3001

`npm run dev` failed but something is still listening on 3001. Kill the old process with `taskkill` (see above) before restarting.