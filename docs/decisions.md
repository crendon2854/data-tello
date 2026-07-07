# Decision Log

Record significant choices so the team stays aligned.

## Format

```
### [DATE] Title
**Context:** Why this came up
**Decision:** What we chose
**Alternatives:** What we rejected
```

---

### 2026-07-07 Port 3001 for local dev
**Context:** Another project occupies port 3000.
**Decision:** Run dev and start scripts on port 3001 (`next dev -p 3001`).
**Alternatives:** Use env var `PORT=3001` — rejected for explicit script clarity.

### 2026-07-07 Mock data fallback
**Context:** Need to develop UI before Supabase is connected.
**Decision:** `lib/queries.ts` falls back to `lib/mock-data.ts` when env vars are unset.
**Alternatives:** Require Supabase from day one — rejected for slower iteration.

### 2026-07-07 Section-driven architecture
**Context:** Opportunity detail must match MED spec exactly.
**Decision:** One React component per MED section; pages compose them inside `Card`.
**Alternatives:** Single monolithic detail component — rejected for reuse in admin forms.

### 2026-07-07 Docs in /docs
**Context:** Need alignment layer as the app grows.
**Decision:** Living markdown docs indexed from `docs/README.md`.
**Alternatives:** Wiki or Notion — rejected for co-location with code.