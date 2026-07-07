# AI Development Playbook

Documentation Version: 1.0  
Last Updated: 2026-07-07  
Status: Active  
Owner: DataTello Engineering

Rules for Cursor and other AI-assisted development on DataTello.

See [MED.md](./MED.md) for the full engineering workflow and Definition of Done. See [context.md](./context.md) for architectural truths that must never be violated.

---

# Mandatory Startup Procedure

Before implementing **ANY** feature, Cursor or any AI coding assistant **MUST** complete this sequence.

## STEP 1

Read, in order:

1. [docs/ai-rules.md](./ai-rules.md)
2. [docs/context.md](./context.md)
3. [docs/project-state.md](./project-state.md)
4. [docs/current-task.md](./current-task.md)
5. [docs/implementation-index.md](./implementation-index.md)
6. [docs/MED.md](./MED.md)

## STEP 2

Read **ONLY** the feature-specific documentation that applies.

Examples:

- Database work → [docs/database.md](./database.md)
- Admin work → [docs/admin-workflow.md](./admin-workflow.md)
- Architecture work → [docs/architecture.md](./architecture.md)
- Route work → [docs/routes.md](./routes.md)
- Component work → [docs/components.md](./components.md)
- Design/styling work → [docs/design-system.md](./design-system.md)

## STEP 3

Summarize current understanding before making changes.

Summary must include:

- Current milestone
- Current task
- Files likely to change
- Risks
- Dependencies

## STEP 4

Only then begin implementation.

**Never skip this startup sequence.**

---

# Repository Scanning Rules

Cursor should minimize repository scanning.

Always prefer:

1. [docs/implementation-index.md](./implementation-index.md)
2. [docs/project-state.md](./project-state.md)
3. [docs/current-task.md](./current-task.md)
4. Feature-specific documentation

before searching the repository.

Only scan code when implementation details are required.

Never scan the repository simply to understand project structure if the documentation already answers the question.

Treat documentation as the primary source of truth.  
Treat code as the implementation of that truth.

If documentation conflicts with code, stop and report the conflict before making changes.

---

## Before You Write Code

Follow the [Mandatory Startup Procedure](#mandatory-startup-procedure) first. Then:

1. Complete **Phase 1 — Plan** before touching code.
2. Confirm the feature exists in [backlog.md](./backlog.md) or [roadmap.md](./roadmap.md).
3. Confirm [current-task.md](./current-task.md) reflects the work about to begin.

---

## Hard Rules

1. **Never implement before planning** — update docs in Phase 1 first.
2. **Never duplicate documentation** — link to the topic doc; edit the source of truth.
3. **Never invent database fields** without updating [database.md](./database.md).
4. **Never add routes** without updating [routes.md](./routes.md).
5. **Never change architecture** without updating [architecture.md](./architecture.md) and [context.md](./context.md) if a long-term truth changed.
6. **Never modify business logic** without documenting it in the appropriate topic doc.
7. **Always preserve mock mode** — `lib/queries.ts` must work without Supabase env vars.
8. **Always run `npm run build`** before marking work complete.
9. **Always summarize files changed** at the end of each task.

---

## Build Order

When implementing a feature, follow this sequence:

```text
Schema → Types → Queries → UI → Components
```

| Step | Files |
|------|-------|
| Schema | `supabase/schema.sql` |
| Types | `types/database.ts`, `types/opportunity.ts` |
| Queries | `lib/queries.ts`, `lib/mock-data.ts` |
| UI | `app/**/page.tsx`, layouts |
| Components | `components/**` |

---

## After You Ship

Update these docs when behavior changes:

| Doc | When to update |
|-----|----------------|
| [current-task.md](./current-task.md) | Task completed or new task started |
| [project-state.md](./project-state.md) | Any shipped feature or status change |
| [implementation-index.md](./implementation-index.md) | New or moved files |
| [backlog.md](./backlog.md) | Item completed or scope changed |
| [changelog.md](./changelog.md) | Milestone or notable release |
| [roadmap.md](./roadmap.md) | Phase checkbox completed |
| [decisions.md](./decisions.md) | Architectural choice made |

---

## What Not to Do

- Do not build features marked out of scope in [roadmap.md](./roadmap.md).
- Do not add charts, AI generation, analytics, or complex auth (see [vision.md](./vision.md) constraints).
- Do not use n8n for core ingestion, scoring, or dashboard logic (see [context.md](./context.md)).
- Do not merge Newsletter Engine and Dossier Builder responsibilities.
- Do not skip mock data updates when schema or queries change.

---

## Prompt Checklist

When starting an AI session, provide or confirm:

- [ ] Mandatory Startup Procedure completed
- [ ] [current-task.md](./current-task.md) read and aligned
- [ ] Target feature from [backlog.md](./backlog.md)
- [ ] Relevant topic docs read
- [ ] Phase 1 doc updates planned
- [ ] Understanding summarized before implementation
- [ ] No product behavior change unless explicitly requested
