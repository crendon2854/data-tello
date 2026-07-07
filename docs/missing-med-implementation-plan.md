# DataTello MED Gap Implementation Plan

This document defines how to continue building DataTello so the current docs include the missing pieces from the product plan.

Use the attached MED-style file as structural inspiration only: one canonical operating document, clear section ownership, appendices, decision logs, and freeze/revisit rules. Do not copy its old business model literally.

## Canonical Product Model

DataTello is an evidence-backed build-opportunity intelligence system.

It finds public, market, and friction signals, turns them into candidate build opportunities, and recommends the best first asset to create: software, template, tracker, dashboard, workflow pack, internal tool, or service + tool hybrid.

## Core Workflow

1. Pressure Discovery
2. Demand Validation
3. Market Wedge Validation
4. Workflow Friction Signals
5. Buildability Check
6. Asset Fit Decision
7. Human Review
8. Dashboard Publishing
9. PDF Dossier Generation

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

## Missing Modules to Merge Into Existing Docs

### 1. Growth & Outreach Automation

Add to `docs/architecture.md`, `docs/roadmap.md`, and `docs/decisions.md`.

Scope:

- Oracle VPS/cloud infrastructure
- n8n marketing automation suite
- AI prospecting agents
- ICP/prospect finder
- lead enrichment
- outbound sequence drafting
- reply classification
- suppression/unsubscribe handling
- human approval before outbound sending

### 2. Newsletter Engine

Add to `docs/architecture.md`, `docs/database.md`, `docs/routes.md`, and `docs/roadmap.md`.

Scope:

- newsletter_subscribers table
- weekly free Signal Brief
- list management
- unsubscribe handling
- autoresponder basics
- open/click tracking
- CTA tracking
- free-to-paid conversion tracking

Free Signal Briefs are watered down. They should not include the full paid Opportunity Dossier.

### 3. Dossier Builder / PDF Dossier Builder

Add to `docs/admin-workflow.md`, `docs/components.md`, `docs/database.md`, and `docs/routes.md`.

Scope:

- full paid Opportunity Dossier generation
- default PDF template selection
- section toggles
- suggested charts/graphics
- evidence table insertion
- affiliate link insertion
- branding controls
- regeneration when source data changes
- template versioning
- export history

### 4. System Health / Connector Repair

Add to `docs/admin-workflow.md`, `docs/architecture.md`, `docs/database.md`, and `docs/roadmap.md`.

Admin tabs:

- Connector Status
- Failed Syncs
- Schema Changes
- Auto-Repair Logs
- Human Approval Queue
- Source Reliability
- Data Quality Alerts

AI may auto-fix mechanical breakages only:

- renamed fields
- changed pagination
- endpoint path changes
- date format changes
- minor response shape changes
- optional null fields
- CSV header changes
- parser updates

Human approval required for:

- source meaning changes
- discontinued datasets
- metric definition changes
- API terms/commercial restrictions
- scoring impact changes
- buyer/category interpretation changes

### 5. Asset Strategy

Add to `docs/med-sections.md`, `docs/admin-workflow.md`, `docs/database.md`, and `docs/components.md`.

Fields:

- Best First Asset
- Top 3 Asset Paths
- Expansion Ladder
- Zip-Ready Fit
- Build Difficulty
- Revenue Ceiling
- Recommended AI Build Stack
- Why Not Full Software Yet
- When to Upgrade to SaaS
- Maintenance Burden
- Support Burden

Supported asset types:

- Full software
- Lightweight SaaS
- Internal tool
- Spreadsheet/template
- Tracker/log
- Dashboard/reporting layer
- Workflow pack
- Service + tool hybrid

### 6. Builder Fit Strategy

Add to `docs/med-sections.md`, `docs/admin-workflow.md`, `docs/database.md`, and `docs/components.md`.

Builder types:

- Vibe coder
- No-code operator
- Automation builder
- Template seller
- Technical founder
- Agency/productizer
- Product studio / advanced SaaS builder

Fields:

- Primary Builder Type
- Secondary Builder Types
- Recommended Tool Stack
- Tool Fit by User Type
- Avoid First
- Skill Fit
- Build Speed
- Setup Complexity
- Maintenance Burden
- Packaging Ease
- Revenue Ceiling
- Support Risk
- Upgrade Potential

### 7. Competitive Differentiator Strategy

Add to `docs/med-sections.md`, `docs/admin-workflow.md`, `docs/database.md`, and `docs/components.md`.

This is qualitative, not a fake score.

Fields:

- Competitor Landscape
- Visible Competitor Count
- Competitor Type
- Review Complaint Themes
- Underserved Segment
- Best Vertical Entry Point
- Avoided Verticals
- Differentiation Angle
- What Not to Compete On
- Competitive Entry Path
- Feature Gap
- Pricing Gap
- UX Gap
- Distribution Gap
- Service Gap
- Small Builder Right-to-Win

### 8. Workflow Friction Signals

Add to `docs/architecture.md`, `docs/database.md`, `docs/admin-workflow.md`, and `docs/roadmap.md`.

Purpose:

Detect repeated operational pain where people are actively struggling to execute workflows, not just experiencing pressure.

Locked MVP sources:

- GitHub issues / feature requests
- Stack Exchange questions / workarounds
- Greenhouse job postings
- Lever job postings

Friction is not a standalone user-facing score. It is an internal modifier that can boost Pain, Market Wedge, and Buildability when repeated workflow failure is visible.

Fields:

- Friction Score 0-10
- Friction Type
- Friction Evidence Count
- Friction Sources
- Manual Workaround Detected

### 9. Risk Section

Add to `docs/med-sections.md`, `docs/admin-workflow.md`, and `docs/database.md`.

Every paid Opportunity Dossier should include:

- false-positive risk
- competition risk
- data lag risk
- buyer uncertainty
- service-vs-software risk
- regulatory dependency risk
- maintenance/support burden

### 10. Monetization Path

Add to `docs/med-sections.md`, `docs/components.md`, and `docs/database.md`.

Every paid Opportunity Dossier should include a compact monetization path:

- first paid asset
- likely price band
- upgrade path
- service/package option
- recurring revenue potential
- affiliate/tool monetization option

Keep this compact. It should not become a generic business-plan section.

## V1 Opportunity Dossier Output

Use this structure for the paid dashboard/PDF dossier:

1. Opportunity Snapshot
2. Why This Opportunity Exists
3. Signal Breakdown
4. Build Strategy
5. Execution Angle
6. Competitive Angle
7. Why This Matters

This gives the user clarity without bloating the output.

## Admin Tool Map

Add to `docs/admin-workflow.md` and `docs/routes.md`.

MVP admin tools:

1. Source Registry
2. Raw Signal Explorer
3. Problem Zone Workspace
4. Keyword Intelligence
5. Market Proof Workspace
6. Candidate Opportunity Scoring
7. Guardrail Engine
8. Human Review Queue
9. Asset Strategy Admin
10. Builder Fit Strategy Admin
11. Competitive Differentiator Admin
12. Watchlist Admin
13. Paid Dashboard Publishing
14. Dossier Builder
15. Newsletter Engine
16. System Health
17. Settings / Rules

## Database Tables to Add or Confirm

- sources
- raw_signals
- problem_zones
- keyword_sets
- market_proof_records
- opportunities
- opportunity_scores
- asset_strategy
- builder_fit_strategy
- competitive_strategy
- workflow_friction_signals
- watchlist_items
- review_queue
- dossier_templates
- dossier_exports
- newsletter_subscribers
- newsletter_events
- system_health_events
- growth_prospects
- outreach_runs

## Recommended Implementation Order

### Phase 1 — Documentation alignment

1. Push local Cursor project files to GitHub.
2. Merge this plan into the existing docs.
3. Update `docs/med-sections.md` as the canonical product structure.
4. Update `docs/admin-workflow.md` with the complete admin map.
5. Update `docs/database.md` with missing tables/fields.
6. Update `docs/architecture.md` with module boundaries.
7. Update `docs/roadmap.md` with the phased build order.
8. Update `docs/decisions.md` with ADRs and freeze/revisit rules.

### Phase 2 — Admin data foundation

Build Supabase tables for the core research OS, scoring, dossier builder, newsletter engine, and system health.

### Phase 3 — Admin UI foundation

Build routes:

- `/admin/sources`
- `/admin/signals`
- `/admin/problem-zones`
- `/admin/opportunities`
- `/admin/review`
- `/admin/watchlist`
- `/admin/dossiers`
- `/admin/newsletter`
- `/admin/system-health`
- `/admin/settings`

### Phase 4 — Paid dashboard and dossier delivery

Build:

- paid opportunity library
- opportunity detail pages
- PDF dossier download
- saved opportunities
- filters by asset type, builder type, industry, freshness, and confidence

### Phase 5 — Newsletter and growth systems

Build:

- weekly Signal Brief sender
- list management
- conversion tracking
- separate Growth Automation Stack hooks

## Non-Negotiable Rules

1. Do not mix Dossier Builder with Newsletter Engine.
2. Do not use n8n for core ingestion or scoring.
3. Do not show detailed internal scoring machinery as the main user value.
4. Do not force every opportunity into SaaS.
5. Do not let AI auto-publish opportunities without human review.
6. Do not let AI auto-fix business logic or source meaning changes.
7. Do not add social-listening noise to V1.
8. Do not build a full visual workflow builder in V1.
