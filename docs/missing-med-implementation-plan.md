# DataTello MED Gap Implementation Plan

Historical reference document. For current product structure, see [architecture.md](./architecture.md), [context.md](./context.md), and [med-sections.md](./med-sections.md).

## Canonical Product Model

DataTello delivers evidence-backed build opportunities using structured signals, scoring, and guardrails.

It is a premium opportunity intelligence product for agencies, consultants, and investors. DataTello finds operational pain, market wedge, and source-backed evidence, turns them into scored build opportunities, and recommends the best first asset to create.

## Target ICP

| Persona | Core question |
|---------|---------------|
| Agencies | What new services or offers can we sell? |
| Consultants | What should we advise clients to do? |
| Investors | Where are new markets and opportunities forming? |

## Product Structure

1. **Core Engine** — Pressure Discovery, Demand Validation, Market Wedge Validation, Workflow Friction Signals, scoring, guardrails, human review
2. **Complaint & Incident Signals** — where real users repeatedly experience failure (core expansion)
3. **Emerging Digital Infrastructure Signals** — four analytical sub-modules (secondary expansion)

Final opportunities are determined by DataTello's structured scoring engine, guardrails, and human review — not by any single signal layer.

## Core Workflow

1. Pressure Discovery
2. Demand Validation
3. Market Wedge Validation
4. Workflow Friction Signals
5. Complaint & Incident Signals (analytical context)
6. Emerging Digital Infrastructure Signals (analytical context)
7. Buildability Check
8. Asset Fit Decision
9. Human Review
10. Dashboard Publishing
11. PDF Dossier Generation

## Product Output Names

Use these names consistently:

- Weekly Signal Brief = free newsletter email
- Opportunity Dossier = full paid dashboard/PDF asset
- Dashboard Brief View = in-app readable dossier view
- PDF Dossier = downloadable PDF generated from selected/default template

Avoid using `report` as the main user-facing word unless the context requires it.

## System Boundaries

### DataTello Core

Handles source ingestion, signal processing, clustering, scoring, guardrails, human review, and dashboard publishing.

Built with Next.js and Supabase.

### Newsletter Engine

Handles subscribers, weekly free Signal Briefs, autoresponder basics, unsubscribe handling, and free-to-paid CTA tracking.

This is separate from the Dossier Builder.

### Dossier Builder

Handles full paid Opportunity Dossier generation and downloadable PDFs.

It uses structured opportunity data, default templates, section toggles, evidence tables, suggested charts, affiliate links, branding, versioning, and export history.

It does not create newsletters or manage subscribers.

### Growth Automation Stack

Handles outbound prospecting and marketing automations using AI agents, n8n, and Oracle VPS/cloud infrastructure.

Hard rule: core app ingestion, clustering, scoring, and dashboard logic stay in Next.js + Supabase. n8n is only for marketing and growth automation.

## Signal Layer Architecture Rule

Complaint & Incident Signals and Emerging Digital Infrastructure Signals are visual and analytical only. They show charts, patterns, and trends.

Final opportunities are determined by DataTello's structured scoring engine, guardrails, and human review — not by any single signal layer.

## Emerging Digital Infrastructure Sub-Modules (only these four)

- Agent Commerce Signals
- Stablecoin Workflow Signals
- Onchain Developer Tool Friction
- Tokenized Data / Pay-Per-Use Data Signals

Do not add DAO signals, compliance signals, grants, or other sub-modules.

## Modules Merged Into Existing Docs

See [architecture.md](./architecture.md), [admin-workflow.md](./admin-workflow.md), [database.md](./database.md), [med-sections.md](./med-sections.md), and [roadmap.md](./roadmap.md) for full specifications of:

- Growth & Outreach Automation
- Newsletter Engine
- Dossier Builder / PDF Dossier Builder
- System Health / Connector Repair
- Asset Strategy
- Builder Fit Strategy (delivery fit by organization type)
- Competitive Differentiator Strategy
- Workflow Friction Signals
- Complaint & Incident Signals
- Emerging Digital Infrastructure Signals
- Risk Section
- Monetization Path

## Admin Tool Map

See [admin-workflow.md](./admin-workflow.md) for the complete admin map including Complaint & Incident Signals Workspace and Emerging Digital Infrastructure Signals Workspace.

## Database Tables to Add or Confirm

- sources
- raw_signals
- problem_zones
- keyword_sets
- market_proof_records
- workflow_friction_signals
- complaint_incident_signals
- emerging_digital_infrastructure_signals
- opportunities
- opportunity_scores
- asset_strategy
- builder_fit_strategy
- competitive_strategy
- watchlist_items
- review_queue
- dossier_templates
- dossier_exports
- newsletter_subscribers
- newsletter_events
- system_health_events
- growth_prospects
- outreach_runs

## Non-Negotiable Rules

1. Do not mix Dossier Builder with Newsletter Engine.
2. Do not use n8n for core ingestion or scoring.
3. Do not show detailed internal scoring machinery as the main user value.
4. Do not force every opportunity into software.
5. Do not let AI auto-publish opportunities without human review.
6. Do not let AI auto-fix business logic or source meaning changes.
7. Do not add social-listening noise to V1.
8. Do not build a full visual workflow builder in V1.
9. Expansion signal layers are analytical — they do not determine final opportunities.
