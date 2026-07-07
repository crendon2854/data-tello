# DataTello Docs

Living documentation for the DataTello build. Update these files as features ship — they are the alignment layer between spec, code, and workflow.

## Product Definition

DataTello is an evidence-backed build-opportunity intelligence system.

It finds public, market, and workflow-friction signals, turns them into candidate build opportunities, and recommends the best first asset to create: software, template, tracker, dashboard, workflow pack, internal tool, or service + tool hybrid.

## Index

| Doc | Purpose |
|-----|---------|
| [design-system.md](./design-system.md) | Visual theme, colors, typography |
| [vision.md](./vision.md) | Product goal, principles, constraints |
| [architecture.md](./architecture.md) | System boundaries, signal lanes, app structure, core patterns |
| [med-sections.md](./med-sections.md) | Opportunity Dossier section spec — source of truth for opportunity UI |
| [database.md](./database.md) | Supabase schema, target tables, query layer |
| [routes.md](./routes.md) | Public, dashboard, and admin route responsibilities |
| [components.md](./components.md) | Component inventory and reuse rules |
| [admin-workflow.md](./admin-workflow.md) | Research OS: source → signal → zone → score → review → publish |
| [dev-setup.md](./dev-setup.md) | Local dev, env vars, port config |
| [roadmap.md](./roadmap.md) | Build order and status tracker |
| [decisions.md](./decisions.md) | Architecture and product decision log |
| [missing-med-implementation-plan.md](./missing-med-implementation-plan.md) | Gap plan used to merge the missing MED concepts into these docs |

## Core Terms

- **Weekly Signal Brief** — free newsletter email
- **Opportunity Dossier** — full paid dashboard/PDF asset
- **Dashboard Brief View** — in-app readable version of the dossier
- **PDF Dossier** — downloadable PDF generated from a default/selected template

## Core Signal Lanes

1. **Pressure Discovery** — finds real-world operational pressure
2. **Demand Validation** — checks search behavior, buyer language, CPC, and attention
3. **Market Wedge Validation** — checks category, competition, spend, and underserved segments
4. **Workflow Friction Signals** — detects repeated execution pain and manual workaround evidence

## Module Boundaries

- **DataTello Core** — Next.js + Supabase research engine and dashboard
- **Newsletter Engine** — free subscribers and Weekly Signal Briefs
- **Dossier Builder** — paid Opportunity Dossiers and PDF Dossiers
- **Growth Automation Stack** — separate outbound/prospecting system using n8n, AI agents, and Oracle infrastructure

## Rules

- Clarity > features
- Speed > perfection
- Section-driven, card-based UI
- Human review controls publish decisions
- Dossier Builder does not manage newsletters
- Newsletter Engine does not generate full paid dossiers
- n8n is for growth automation, not core ingestion/scoring
- Update docs when behavior changes, not after the fact