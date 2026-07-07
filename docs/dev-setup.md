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
3. Add env vars to `.env.local`
4. Restart dev server

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server on :3001 |
| `npm run build` | Production build |
| `npm run start` | Production server on :3001 |
| `npm run lint` | ESLint |