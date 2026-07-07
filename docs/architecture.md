# Architecture

## Stack

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Supabase (`@supabase/supabase-js`)

## Folder Structure

```
/app                    # Routes (App Router)
/components
  /ui                   # Card, FilterBar, primitives
  /layout               # Navbar, Sidebar, PageContainer
  /cards                # OpportunityCard
  /sections             # MED section components
  /admin                # Admin forms and actions
/lib                    # supabase.ts, queries.ts, helpers.ts
/types                  # database.ts, opportunity.ts
/hooks                  # useOpportunities, useFilters
/styles                 # globals.css
/docs                   # This documentation
/supabase               # schema.sql
```

## Data Flow

1. **Server components** fetch via `lib/queries.ts` on initial load
2. **Client components** use hooks for interactive lists/filters
3. **Mock fallback** when Supabase env vars are not set

## Design Patterns

- `PageContainer` wraps all page content (max-width, padding)
- `Card` wraps every section on detail and admin pages
- Section components accept typed `opportunity` slices — no prop drilling beyond one level