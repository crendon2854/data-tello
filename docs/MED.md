# MED — Master Engineering Document

Documentation Version: 1.5  
Last Updated: 2026-07-09  
Status: Active  
Owner: DataTello Engineering

**Canonical entry point for the DataTello project.**

Every feature is planned in the docs first, implemented second, verified third, and documented again if implementation differs.

---

## Documentation Structure

```text
docs/
│
├── MED.md                        ← Master engineering document (you are here)
├── ai-rules.md                   ← AI development playbook
├── context.md                    ← Long-term architectural truths
├── onboarding.md                 ← ICP onboarding flow and default lens
├── project-state.md              ← Current project snapshot
├── current-task.md               ← Active implementation task
├── implementation-index.md     ← Feature → file map
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

DataTello is an **evidence-backed decision engine** for build opportunities — not a research dashboard or general market intelligence platform. It discovers overlooked compliance- and procurement-backed workflow problems, validates them through layered evidence, and tells each user **what to build or act on first**.

It validates build opportunities through **layered evidence** — not from a single signal.

### MVP wedge (locked)

**Environmental Compliance** + **Contractor Safety** + **Public-sector compliance workflows**

### MVP pipeline

```text
Collect → Normalize → Cluster → Keyword Enrichment → Market Validation → Procurement Validation
→ Scoring → Asset Strategy → Human Review → Opportunity Brief → Publish
```

### MVP target roles

**agency**, **consultant**, **investor**, **venture_studio**, and **general** (fallback). The Decision Layer and Role-Aware Output System personalize ranking and rendering per role.

### Decision Layer + Role-Aware Output

- `getRecommendedOpportunity()` — top 1 + top 3 ranked per user
- Dashboard: **Recommended for You** + **Top Opportunities This Week**
- Agency/consultant: full execution detail; investor/venture_studio: Asset Thesis

Full spec: [architecture.md](./architecture.md).

### Long-term architecture (preserved)

Five core validation layers + digital infrastructure amplifiers. MVP implements a focused subset. Full model and Future Expansion: [architecture.md](./architecture.md).

Final opportunities are determined by DataTello's structured scoring engine, guardrails, and human review.

Paid dossiers follow seven sections. Full spec: [med-sections.md](./med-sections.md).

ICP onboarding: [onboarding.md](./onboarding.md). Architecture: [architecture.md](./architecture.md). Positioning: [vision.md](./vision.md).

---

## Product Philosophy

1. **Layered evidence over single signals** — each layer answers a different validation question.
2. **Decisions over lists** — always answer what this user should build or act on first.
3. **Clarity over features** — every screen and dossier section drives a strategic decision.
4. **Evidence over hype** — source-backed signals, operational pain, and market wedge beat attention metrics.
5. **Role-aware presentation** — same truth layer; different execution vs thesis output by role.
6. **Section-driven, card-based UI** — one component per MED section.
7. **Human review controls publish** — AI assists; humans approve buyer, asset fit, and publish-worthiness.
8. **Docs before code** — documentation is the single source of truth.

---

## Documentation Map

### Governance layer

| Document | What belongs here |
|----------|-------------------|
| [MED.md](./MED.md) | Governance, workflow, DoD, ADR policy |
| [ai-rules.md](./ai-rules.md) | AI/Cursor development playbook |
| [context.md](./context.md) | Long-term architectural truths |
| [onboarding.md](./onboarding.md) | ICP onboarding flow, default lens, feed rules |
| [project-state.md](./project-state.md) | Current snapshot |
| [current-task.md](./current-task.md) | Active implementation task |
| [implementation-index.md](./implementation-index.md) | Feature → file map |
| [backlog.md](./backlog.md) | Remaining work |
| [changelog.md](./changelog.md) | Project history |

### Topic docs

| Document | What belongs here |
|----------|-------------------|
| [vision.md](./vision.md) | Product goal, layered validation, ICP, constraints |
| [architecture.md](./architecture.md) | Stack, system boundaries, signal lanes, guardrails, data flow |
| [database.md](./database.md) | Supabase schema, tables, columns |
| [admin-workflow.md](./admin-workflow.md) | Research OS workflow |
| [routes.md](./routes.md) | Public, dashboard, admin, onboarding routes |
| [components.md](./components.md) | Component inventory, section mapping |
| [design-system.md](./design-system.md) | Visual theme, colors, typography |
| [med-sections.md](./med-sections.md) | Dossier section spec |
| [roadmap.md](./roadmap.md) | Strategic build phases |
| [decisions.md](./decisions.md) | ADRs |
| [dev-setup.md](./dev-setup.md) | Local dev setup |

**Rule:** Each topic has exactly one home document. Other docs link to it.

---

## How to Use the Documentation

### Recommended read order

1. [ai-rules.md](./ai-rules.md)
2. [context.md](./context.md)
3. [project-state.md](./project-state.md)
4. [current-task.md](./current-task.md)
5. [implementation-index.md](./implementation-index.md)
6. [MED.md](./MED.md)

Then read feature-specific topic docs.

### Finding information

| I need to know… | Read |
|-----------------|------|
| Layered validation architecture | [architecture.md](./architecture.md), [context.md](./context.md) |
| Decision Layer + role-aware output | [architecture.md](./architecture.md) § Decision Layer |
| ICP onboarding and default lens | [onboarding.md](./onboarding.md) |
| Dossier section fields | [med-sections.md](./med-sections.md) |
| Guardrail rules | [architecture.md](./architecture.md) § Guardrail System |
| What we're building and why | [vision.md](./vision.md) |
| Where we are now | [project-state.md](./project-state.md) |
| What's left | [backlog.md](./backlog.md) |

---

## Engineering Workflow

Every feature follows: **Plan → Build → Verify → Sync**.

See Phase checklists in prior MED versions; rules unchanged.

### Build order

Schema → Types → Queries → UI → Components

---

## Definition of Done

A feature is **not complete** until:

- Docs updated
- Schema/types/queries updated
- UI implemented per [routes.md](./routes.md)
- `npm run build` passes
- Mock mode works
- Governance docs updated ([current-task.md](./current-task.md), [project-state.md](./project-state.md), etc.)

---

## ADR Policy

Architecture Decision Records live in [decisions.md](./decisions.md). Add an ADR when changing scoring logic, guardrails, signal layer architecture, ICP model, or dossier structure.

---

## AI Development

All AI/Cursor rules: [ai-rules.md](./ai-rules.md).

---

## Quick Links

- [Onboarding & ICP](./onboarding.md)
- [Architecture](./architecture.md)
- [Project state](./project-state.md)
- [Backlog](./backlog.md)
- [Dev setup](./dev-setup.md) — `npm run dev` → http://localhost:3001
