# MED — Master Engineering Document

**Canonical entry point for the DataTello project.**

Every feature is planned in the docs first, implemented second, verified third, and documented again if implementation differs. This document defines how the documentation system works and how engineering work flows through it.

---

## Project Overview

DataTello is **evidence-backed build-opportunity intelligence**. It finds public, market, and workflow-friction signals, turns them into candidate build opportunities, and recommends the best first asset to create: software, template, tracker, dashboard, workflow pack, internal tool, or service + tool hybrid.

For product positioning, principles, and constraints, see [vision.md](./vision.md).

For stack, system boundaries, signal lanes, and folder structure, see [architecture.md](./architecture.md).

---

## Product Philosophy

1. **Clarity over features** — every screen and dossier section should drive a decision.
2. **Speed over perfection** — ship usable slices; refine after validation.
3. **Section-driven, card-based UI** — one component per MED section; pages compose sections.
4. **Human review controls publish** — AI assists; humans approve buyer, asset fit, and publish-worthiness.
5. **Docs before code** — the documentation is the single source of truth; code follows the spec.

Core output names and dossier structure live in [med-sections.md](./med-sections.md). Do not invent alternate terminology here.

---

## Documentation Map

| Document | What belongs here |
|----------|-------------------|
| [vision.md](./vision.md) | Product goal, core principles, constraints, success criteria |
| [architecture.md](./architecture.md) | Stack, system boundaries, signal lanes, data flow, folder structure, non-negotiable rules |
| [database.md](./database.md) | Supabase schema, current and target tables, column definitions, query layer |
| [admin-workflow.md](./admin-workflow.md) | Research OS workflow: source → signal → zone → score → review → publish |
| [routes.md](./routes.md) | Public, dashboard, and admin route responsibilities and build priority |
| [components.md](./components.md) | Component inventory, reuse rules, section-to-component mapping |
| [design-system.md](./design-system.md) | Visual theme, colors, typography, component classes |
| [med-sections.md](./med-sections.md) | Opportunity Dossier section spec — fields, order, admin form parity |
| [roadmap.md](./roadmap.md) | Build order, phase status, what ships next |
| [decisions.md](./decisions.md) | Architecture Decision Records (ADRs) and freeze/revisit rules |
| [dev-setup.md](./dev-setup.md) | Local dev, env vars, port config, Supabase setup |

**Rule:** Each topic has exactly one home document. Other docs link to it; they do not repeat it.

---

## How to Use the Documentation

### Starting a new feature

1. Read [MED.md](./MED.md) (this file) and the relevant topic docs.
2. Update docs in **Phase 1 — Plan** before writing code.
3. Implement in **Phase 2 — Build**.
4. Verify in **Phase 3 — Verify**.
5. Sync docs in **Phase 4 — Sync** if implementation diverged from the plan.

### Finding information

| I need to know… | Read |
|-----------------|------|
| What we're building and why | [vision.md](./vision.md) |
| How systems connect | [architecture.md](./architecture.md) |
| Table/column definitions | [database.md](./database.md) |
| Admin research workflow | [admin-workflow.md](./admin-workflow.md) |
| URL structure | [routes.md](./routes.md) |
| React component inventory | [components.md](./components.md) |
| Colors, typography, UI classes | [design-system.md](./design-system.md) |
| Dossier section fields and order | [med-sections.md](./med-sections.md) |
| What's done and what's next | [roadmap.md](./roadmap.md) |
| Why we chose X over Y | [decisions.md](./decisions.md) |
| Running the app locally | [dev-setup.md](./dev-setup.md) |

### Updating documentation

- Change the **topic doc** first (the single source of truth for that subject).
- Add cross-links from related docs; do not copy content.
- If the decision is architectural, add an ADR to [decisions.md](./decisions.md).
- Update [roadmap.md](./roadmap.md) when a phase item ships or scope changes.

---

## Engineering Workflow

Every feature must follow all four phases. Skipping Phase 1 or Phase 3 is not allowed.

### Phase 1 — Plan

Update documentation before writing code:

- [ ] Relevant topic docs updated (vision, MED sections, etc.)
- [ ] [architecture.md](./architecture.md) updated if boundaries or patterns change
- [ ] [database.md](./database.md) updated if schema or queries change
- [ ] [routes.md](./routes.md) updated if URLs or route responsibilities change
- [ ] [components.md](./components.md) updated if new shared components are introduced
- [ ] ADR added to [decisions.md](./decisions.md) if the change is architectural (see ADR policy below)

### Phase 2 — Build

Implement in this order:

1. **Schema** — `supabase/schema.sql` and migrations
2. **Types** — `types/database.ts`, `types/opportunity.ts`
3. **Queries** — `lib/queries.ts` (preserve mock fallback)
4. **UI** — pages and layouts per [routes.md](./routes.md)
5. **Components** — section components per [med-sections.md](./med-sections.md) and [components.md](./components.md)

### Phase 3 — Verify

Before marking a feature complete:

- [ ] `npm run build` passes
- [ ] No TypeScript errors
- [ ] Existing routes still work
- [ ] Mock mode still works (app runs without Supabase env vars)

### Phase 4 — Sync

If implementation differed from the plan:

- [ ] Update the relevant topic docs to match shipped behavior
- [ ] Update [roadmap.md](./roadmap.md) checkboxes
- [ ] Add or amend ADR in [decisions.md](./decisions.md) if the divergence was intentional

---

## Documentation Governance Rules

1. **Single source of truth** — one document owns each topic; link, don't duplicate.
2. **Plan before build** — no feature code without updated docs in Phase 1.
3. **Sync after divergence** — if code and docs disagree, fix the docs (or revert the code).
4. **ADRs for architectural choices** — significant decisions get a dated record in [decisions.md](./decisions.md).
5. **Roadmap reflects reality** — [roadmap.md](./roadmap.md) tracks what shipped and what's next.
6. **MED sections drive UI** — dossier and admin form structure follow [med-sections.md](./med-sections.md).
7. **Preserve mock mode** — `lib/queries.ts` must fall back to mock data when env vars are unset.
8. **Build must pass** — `npm run build` is required before any feature is considered done.

---

## Feature Lifecycle

```text
Plan (docs) → Build (schema → types → queries → UI → components) → Verify (build + mock mode) → Sync (docs if needed)
```

A feature enters the lifecycle when it appears on [roadmap.md](./roadmap.md). It exits when the Definition of Done checklist is complete.

---

## Definition of Done

A feature is **not complete** until all of the following are true:

- [ ] Docs updated (relevant topic docs reflect the shipped behavior)
- [ ] Schema updated (`supabase/schema.sql` if tables/columns changed)
- [ ] Types updated (`types/` matches schema and MED sections)
- [ ] Queries updated (`lib/queries.ts` including mock fallback)
- [ ] UI implemented (pages per [routes.md](./routes.md))
- [ ] Build passes (`npm run build`)
- [ ] Mock mode works (no Supabase env vars required for dev)
- [ ] Roadmap updated if necessary ([roadmap.md](./roadmap.md))
- [ ] Decisions updated if architecture changed ([decisions.md](./decisions.md))

---

## ADR Policy

Architecture Decision Records live in [decisions.md](./decisions.md). See that file for the full ADR format and existing records.

**Add an ADR when:**

- Introducing a new workflow or lifecycle stage
- Changing scoring logic or guardrail rules
- Adopting a new database pattern or table design
- Adding a new external dependency or integration
- Making a major UX or information-architecture change
- Changing security, auth, or data-access patterns

**Each ADR must contain:**

| Field | Purpose |
|-------|---------|
| **Context** | Why the decision came up |
| **Decision** | What was chosen |
| **Alternatives** | What was rejected and why |
| **Consequences** | Trade-offs, follow-up work, things to watch |
| **Date** | When the decision was made |

Do not log trivial choices (naming a variable, fixing a typo). Do log anything that would surprise a future contributor or change how features are built.

---

## Cursor Development Rules

When using Cursor (or any AI-assisted editor) on this project:

1. **Never implement before planning** — update docs in Phase 1 first.
2. **Never duplicate documentation** — link to the topic doc; edit the source of truth.
3. **Never invent database fields** without updating [database.md](./database.md).
4. **Never add routes** without updating [routes.md](./routes.md).
5. **Never change architecture** without updating [architecture.md](./architecture.md).
6. **Never modify business logic** without documenting it in the appropriate topic doc.
7. **Always preserve mock mode** — queries must work without Supabase env vars.
8. **Always run `npm run build`** before marking work complete.
9. **Always summarize files changed** at the end of each task.

---

## Appendix Index

| Document | Notes |
|----------|-------|
| [missing-med-implementation-plan.md](./missing-med-implementation-plan.md) | Historical gap plan used to merge missing MED concepts into the docs; reference only |
| [README.md](./README.md) | Lightweight docs folder index; points here |

---

## Quick Links

- [Dev setup](./dev-setup.md) — `npm install && npm run dev` → http://localhost:3001
- [Roadmap](./roadmap.md) — current build status
- [Decision log](./decisions.md) — ADRs and freeze rules
