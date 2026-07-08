# MED — Master Engineering Document

Documentation Version: 1.2  
Last Updated: 2026-07-08  
Status: Active  
Owner: DataTello Engineering

**Canonical entry point for the DataTello project.**

Every feature is planned in the docs first, implemented second, verified third, and documented again if implementation differs. This document defines how the documentation system works and how engineering work flows through it.

---

## Documentation Structure

```text
docs/
│
├── MED.md                        ← Master engineering document (you are here)
├── ai-rules.md                   ← AI development playbook
├── context.md                    ← Long-term architectural truths
├── project-state.md              ← Current project snapshot
├── current-task.md               ← Active implementation task
├── implementation-index.md       ← Feature → file map
├── backlog.md                    ← Remaining work
├── changelog.md                  ← Project history
│
├── vision.md
├── architecture.md
├── database.md
├── admin-workflow.md
├── routes.md
├── components.md
├── design-system.md
├── roadmap.md
├── med-sections.md
├── decisions.md
└── dev-setup.md
```

---

## Project Overview

DataTello delivers **evidence-backed build opportunities** using structured signals, scoring, and guardrails.

It is a premium opportunity intelligence platform and decision-support system for agencies, consultants, and investors. DataTello applies four core signal lanes — Pressure Discovery, Demand Validation, Market Wedge Validation, and Workflow Friction Signals — plus structured scoring, guardrails, and human review to produce evidence-backed build opportunities with Asset Strategy and Competitive Differentiator Strategy in every dossier.

Product structure:

1. **Core Engine** — Pressure Discovery, Demand Validation, Market Wedge Validation, Workflow Friction Signals, scoring, guardrails, human review
2. **Complaint & Incident Signals** — where real users repeatedly experience failure (core expansion)
3. **Emerging Digital Infrastructure Signals** — four analytical sub-modules (secondary expansion)

Final opportunities are determined by DataTello's structured scoring engine, guardrails, and human review — not by any single signal layer.

Paid dossiers follow seven sections: Opportunity Snapshot, Why This Exists, Signal Breakdown, Asset Strategy, Execution Angle, Competitive Differentiator Strategy, Why This Matters.

For product positioning, principles, and constraints, see [vision.md](./vision.md).

For stack, system boundaries, signal lanes, and folder structure, see [architecture.md](./architecture.md).

For stable truths that rarely change, see [context.md](./context.md).

---

## Product Philosophy

1. **Clarity over features** — every screen and dossier section should drive a strategic decision.
2. **Evidence over hype** — source-backed signals, operational pain, and market wedge beat attention metrics.
3. **Section-driven, card-based UI** — one component per MED section; pages compose sections.
4. **Human review controls publish** — AI assists; humans approve buyer, asset fit, and publish-worthiness.
5. **Docs before code** — the documentation is the single source of truth; code follows the spec.

Core output names and dossier structure live in [med-sections.md](./med-sections.md). Do not invent alternate terminology here.

---

## Documentation Map

### Governance layer

| Document | What belongs here |
|----------|-------------------|
| [MED.md](./MED.md) | Governance, workflow, DoD, ADR policy (this file) |
| [ai-rules.md](./ai-rules.md) | AI/Cursor development playbook, mandatory startup procedure |
| [context.md](./context.md) | Long-term architectural truths that rarely change |
| [project-state.md](./project-state.md) | Current snapshot: phase, routes built, tables active, known gaps |
| [current-task.md](./current-task.md) | **Single source of truth for what is being built right now** |
| [implementation-index.md](./implementation-index.md) | Feature → file map for shipped code |
| [backlog.md](./backlog.md) | Actionable remaining work items |
| [changelog.md](./changelog.md) | Project history and milestones |

### Topic docs

| Document | What belongs here |
|----------|-------------------|
| [vision.md](./vision.md) | Product goal, core principles, constraints, success criteria |
| [architecture.md](./architecture.md) | Stack, system boundaries, signal lanes, data flow, folder structure |
| [database.md](./database.md) | Supabase schema, current and target tables, column definitions |
| [admin-workflow.md](./admin-workflow.md) | Research OS workflow: source → signal → zone → score → review → publish |
| [routes.md](./routes.md) | Public, dashboard, and admin route responsibilities |
| [components.md](./components.md) | Component inventory, reuse rules, section-to-component mapping |
| [design-system.md](./design-system.md) | Visual theme, colors, typography, component classes |
| [med-sections.md](./med-sections.md) | Opportunity Dossier section spec — fields, order, admin form parity |
| [roadmap.md](./roadmap.md) | Strategic build phases and phase-level status |
| [decisions.md](./decisions.md) | Architecture Decision Records (ADRs) and freeze/revisit rules |
| [dev-setup.md](./dev-setup.md) | Local dev, env vars, port config, Supabase setup |

**Rule:** Each topic has exactly one home document. Other docs link to it; they do not repeat it.

---

## How to Use the Documentation

### Recommended read order (AI and humans)

Before starting work, read in order:

1. [ai-rules.md](./ai-rules.md)
2. [context.md](./context.md)
3. [project-state.md](./project-state.md)
4. [current-task.md](./current-task.md)
5. [implementation-index.md](./implementation-index.md)
6. [MED.md](./MED.md) (this file)

Then read only the feature-specific topic docs that apply.

**[current-task.md](./current-task.md)** is the single source of truth for the active implementation task — objective, expected files, success criteria, risks, and dependencies. **[project-state.md](./project-state.md)** describes overall project status; **current-task.md** describes the task in flight.

### Starting a new feature

1. Complete the recommended read order above.
2. Confirm the feature is in [backlog.md](./backlog.md) or [roadmap.md](./roadmap.md).
3. Update [current-task.md](./current-task.md) with the new objective before coding.
4. Update docs in **Phase 1 — Plan** before writing code.
5. Implement in **Phase 2 — Build**.
6. Verify in **Phase 3 — Verify**.
7. Sync in **Phase 4 — Sync** if implementation diverged from the plan.

### Finding information

| I need to know… | Read |
|-----------------|------|
| What we're building and why | [vision.md](./vision.md) |
| Architectural truths that never change | [context.md](./context.md) |
| How systems connect | [architecture.md](./architecture.md) |
| Where we are right now | [project-state.md](./project-state.md) |
| What is being built right now | [current-task.md](./current-task.md) |
| Where code lives | [implementation-index.md](./implementation-index.md) |
| What's left to build | [backlog.md](./backlog.md) |
| Table/column definitions | [database.md](./database.md) |
| Admin research workflow | [admin-workflow.md](./admin-workflow.md) |
| URL structure | [routes.md](./routes.md) |
| React component inventory | [components.md](./components.md) |
| Colors, typography, UI classes | [design-system.md](./design-system.md) |
| Dossier section fields and order | [med-sections.md](./med-sections.md) |
| Strategic build phases | [roadmap.md](./roadmap.md) |
| Why we chose X over Y | [decisions.md](./decisions.md) |
| What shipped when | [changelog.md](./changelog.md) |
| AI development rules | [ai-rules.md](./ai-rules.md) |
| Running the app locally | [dev-setup.md](./dev-setup.md) |

### Updating documentation

- Change the **topic doc** first (the single source of truth for that subject).
- Update [current-task.md](./current-task.md) when starting or completing a task.
- Update [project-state.md](./project-state.md) when status changes.
- Update [implementation-index.md](./implementation-index.md) when files are added or moved.
- Update [backlog.md](./backlog.md) and [roadmap.md](./roadmap.md) when work ships.
- Add an entry to [changelog.md](./changelog.md) for milestones.
- Add cross-links from related docs; do not copy content.
- If the decision is architectural, add an ADR to [decisions.md](./decisions.md).

---

## Engineering Workflow

Every feature must follow all four phases. Skipping Phase 1 or Phase 3 is not allowed.

### Phase 1 — Plan

Update documentation before writing code:

- [ ] Relevant topic docs updated
- [ ] [architecture.md](./architecture.md) updated if boundaries or patterns change
- [ ] [database.md](./database.md) updated if schema or queries change
- [ ] [routes.md](./routes.md) updated if URLs or route responsibilities change
- [ ] [components.md](./components.md) updated if new shared components are introduced
- [ ] [backlog.md](./backlog.md) item scoped and confirmed
- [ ] ADR added to [decisions.md](./decisions.md) if architectural (see ADR policy below)

### Phase 2 — Build

Implement in this order:

1. **Schema** — `supabase/schema.sql` and migrations
2. **Types** — `types/database.ts`, `types/opportunity.ts`
3. **Queries** — `lib/queries.ts` (preserve mock fallback)
4. **UI** — pages and layouts per [routes.md](./routes.md)
5. **Components** — section components per [med-sections.md](./med-sections.md) and [components.md](./components.md)

See [ai-rules.md](./ai-rules.md) for AI-assisted development rules.

### Phase 3 — Verify

Before marking a feature complete:

- [ ] `npm run build` passes
- [ ] No TypeScript errors
- [ ] Existing routes still work
- [ ] Mock mode still works (app runs without Supabase env vars)

### Phase 4 — Sync

If implementation differed from the plan:

- [ ] Update relevant topic docs to match shipped behavior
- [ ] Update [project-state.md](./project-state.md)
- [ ] Update [implementation-index.md](./implementation-index.md)
- [ ] Check off [backlog.md](./backlog.md) and [roadmap.md](./roadmap.md)
- [ ] Add entry to [changelog.md](./changelog.md)
- [ ] Add or amend ADR in [decisions.md](./decisions.md) if the divergence was intentional

---

## Documentation Governance Rules

1. **Single source of truth** — one document owns each topic; link, don't duplicate.
2. **Plan before build** — no feature code without updated docs in Phase 1.
3. **Sync after divergence** — if code and docs disagree, fix the docs (or revert the code).
4. **ADRs for architectural choices** — significant decisions get a dated record in [decisions.md](./decisions.md).
5. **Roadmap + backlog stay current** — [roadmap.md](./roadmap.md) for phases, [backlog.md](./backlog.md) for tasks.
6. **Project state reflects reality** — [project-state.md](./project-state.md) updated when status changes.
7. **MED sections drive UI** — dossier and admin form structure follow [med-sections.md](./med-sections.md).
8. **Preserve mock mode** — `lib/queries.ts` must fall back to mock data when env vars are unset.
9. **Build must pass** — `npm run build` is required before any feature is considered done.

---

## Feature Lifecycle

```text
Plan (docs) → Build (schema → types → queries → UI → components) → Verify (build + mock mode) → Sync (docs if needed)
```

A feature enters the lifecycle when it appears in [backlog.md](./backlog.md). It exits when the Definition of Done checklist is complete.

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
- [ ] [current-task.md](./current-task.md) updated
- [ ] [project-state.md](./project-state.md) updated
- [ ] [implementation-index.md](./implementation-index.md) updated if files changed
- [ ] [backlog.md](./backlog.md) and [roadmap.md](./roadmap.md) updated
- [ ] [changelog.md](./changelog.md) updated for milestones
- [ ] [decisions.md](./decisions.md) updated if architecture changed

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

**Each ADR must contain:** Context, Decision, Alternatives, Consequences, Date.

Long-term truths distilled from ADRs live in [context.md](./context.md).

---

## AI Development

All AI/Cursor rules live in [ai-rules.md](./ai-rules.md). Do not duplicate them here.

---

## Appendix Index

| Document | Notes |
|----------|-------|
| [missing-med-implementation-plan.md](./missing-med-implementation-plan.md) | Historical gap plan; reference only |
| [README.md](./README.md) | Lightweight docs folder index; points here |

---

## Quick Links

- [Project state](./project-state.md) — where we are now
- [Current task](./current-task.md) — what is being built now
- [Backlog](./backlog.md) — what's next
- [AI rules](./ai-rules.md) — development playbook
- [Dev setup](./dev-setup.md) — `npm install && npm run dev` → http://localhost:3001
