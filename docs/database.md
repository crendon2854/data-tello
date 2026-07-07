# Database

## Provider

Supabase (Postgres). Schema lives in `supabase/schema.sql`.

## Tables

### `opportunities`
Primary entity. Status: `draft` | `published` | `rejected`.

Key columns map 1:1 to MED sections — see [med-sections.md](./med-sections.md).

### `signals`
Incoming market signals. Columns: `title`, `source`, `type`, `processed`.

### `zones`
Market zones. Columns: `title`, `summary`, `industry`, `buyer`.

## Query Layer (`lib/queries.ts`)

| Function | Purpose |
|----------|---------|
| `getOpportunities()` | Published only, sorted by score |
| `getOpportunityById(id)` | Single opportunity |
| `getAllOpportunities()` | All statuses (admin) |
| `getDraftOpportunities()` | Review queue |
| `createOpportunity(data)` | Insert new |
| `updateOpportunity(id, data)` | Full update |
| `updateOpportunityStatus(id, status)` | Approve / reject / publish |
| `getSignals()` | List signals |
| `toggleSignalProcessed(id, bool)` | Mark processed |
| `getZones()` | List zones |
| `upsertZone(zone)` | Create or update zone |

## Mock Mode

When `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are unset, queries use in-memory mock data from `lib/mock-data.ts`.