# Admin Workflow

## Opportunity Lifecycle

```
Create (draft) → Review → Approve/Reject → Publish
```

## Steps

### 1. Create
- Go to `/admin/opportunities/new`
- Fill all 6 form sections
- Save as `draft` (default) or `published`

### 2. Review
- Drafts appear on `/admin/review`
- Actions: **Approve** (→ published), **Reject** (→ rejected), **Publish**

### 3. Edit
- `/admin/opportunities/[id]` — full form, same sections as create

### 4. Signals (parallel track)
- `/admin/signals` — toggle `processed` on incoming signals
- Future: signals feed opportunity creation

### 5. Zones (parallel track)
- `/admin/zones` — define market zones (title, summary, industry, buyer)
- Future: zones group opportunities

## Status Values

| Status | Visible on Dashboard | In Review Queue |
|--------|---------------------|-----------------|
| `draft` | No | Yes |
| `published` | Yes | No |
| `rejected` | No | No |