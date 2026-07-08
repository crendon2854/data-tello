# Admin Workflow

See [MED.md](./MED.md) for documentation governance. For route URLs, see [routes.md](./routes.md). For schema backing each step, see [database.md](./database.md).

The admin backend is the internal research operating system for DataTello.

It should behave like a Notion-style research CMS: linked records, filters, statuses, review queues, source traceability, and one-click movement from raw signal to paid Opportunity Dossier.

## Core Principle

The software handles collection, normalization, clustering, enrichment, scoring, drafting, and publishing mechanics.

The human makes the final calls on buyer, buildability, asset fit, differentiation, and publish-worthiness.

## Main Admin Tools

1. Source Registry
2. Raw Signal Explorer
3. Problem Zone Workspace
4. Keyword Intelligence
5. Market Proof Workspace
6. Workflow Friction Workspace
7. Complaint & Incident Signals Workspace
8. Emerging Digital Infrastructure Signals Workspace
9. Candidate Opportunity Scoring
10. Guardrail Engine
11. Human Review Queue
12. Asset Strategy Admin
13. Competitive Differentiator Admin
14. Watchlist Admin
15. Paid Dashboard Publishing
16. Dossier Builder
17. Newsletter Engine
18. System Health
19. Settings / Rules

Internal admin only (not in seven-section dossier output): Builder Fit Strategy Admin, Monetization Admin, Risks Admin

## Opportunity Lifecycle

```text
Collect → Normalize → Cluster → Enrich → Market/Friction Proof → Score → Guardrails → Human Review → Publish → Generate PDF Dossier
```

Complaint & Incident Signals and Emerging Digital Infrastructure Signals feed analytical context in parallel. They do not bypass scoring or human review.

## Step 1 — Source Registry

Admin manages every source used by Core Engine lanes and expansion layers.

Track:

- source name
- source type
- workflow lane
- cadence
- geography
- reliability
- API status
- last sync
- freshness window
- notes

## Step 2 — Raw Signal Explorer

Incoming records land here first.

Admin can:

- filter by source, date, geography, vertical, and freshness
- inspect source trails
- mark bad records
- approve records for clustering
- see unclustered records

Nothing here is a published opportunity yet.

## Step 3 — Problem Zone Workspace

Problem zones are grouped pain patterns, not final product ideas.

A problem zone should answer:

- what pain is recurring?
- where is it happening?
- who is affected?
- is it structural, trigger-driven, or mixed?
- what source mix supports it?

Statuses:

- `new`
- `reviewing`
- `enriching`
- `ready_for_market_proof`
- `ready_for_scoring`
- `watchlist`
- `rejected`
- `promoted`

## Step 4 — Keyword Intelligence

Used for Demand Validation.

Admin manages:

- seed keywords
- buyer-aware keyword families
- expanded keywords
- rejected keywords
- DataForSEO enrichment
- CPC, volume, competition, trend direction
- internal keyword memory and false positives

Rule: keywords validate demand and buyer language. They do not create opportunities by themselves.

## Step 5 — Market Proof Workspace

Used for Market Wedge Validation.

Admin checks:

- competitor sites
- pricing pages
- review directories
- job postings
- SEC EDGAR mentions
- USAspending proof
- hidden-market risk
- review complaint themes
- underserved segments

Human review is required before deciding that competition is weak or a wedge is real.

## Step 6 — Workflow Friction Workspace

Workflow Friction Signals detect repeated execution failure — where people are struggling to operationalize workflows.

MVP sources:

- GitHub issues / feature requests
- Stack Exchange questions / workarounds
- Greenhouse job postings
- Lever job postings

Track:

- friction score 0-10
- friction type
- friction evidence count
- friction sources
- manual workaround detected

**Friction rule:**

- Modifies scoring: Pain/Pressure, Market Wedge, Buildability
- Internal modifier only — not a standalone public score
- Does **not** act as a standalone decision engine

Reject friction records that are hobby/dev-only, vague complaints, consumer frustration, or one-off feature requests.

## Step 7 — Complaint & Incident Signals Workspace

**Where real-world failures repeatedly occur.**

Purpose:

- detect repeated real-world failures
- reveal operational pain before demand spikes
- support regulated and operational industries

Admin tracks:

- incident type and recurrence
- complaint cluster patterns
- failure frequency and geography
- industry and buyer impact
- source diversity
- linkage to problem zones

This is a core expansion layer. It feeds human review and analytical panels. It does not autonomously determine final opportunities.

Reject records that are isolated incidents, unverified complaints, or lacking operational specificity.

## Step 8 — Emerging Digital Infrastructure Signals Workspace

Secondary expansion. **Four sub-modules only:**

| Sub-module | Tracks |
|------------|--------|
| Agent Commerce Signals | Agent-mediated commerce patterns and friction |
| Stablecoin Workflow Signals | Stablecoin workflow adoption and operational pain |
| Onchain Developer Tool Friction | Repeated failure in onchain development tooling |
| Tokenized Data / Pay-Per-Use Data Signals | Tokenized and metered data access patterns |

Admin manages analytical records, trend charts, and pattern summaries per sub-module.

**Rule:** Visual and analytical only. These signals show charts, patterns, and trends. They do not determine final opportunities.

Do not add DAO signals, compliance signals, grants, or other sub-modules without an ADR.

## Step 9 — Candidate Opportunity Scoring

Candidate opportunities combine Core Engine signal lanes.

Visible score buckets:

- Pressure
- Demand
- Wedge
- Freshness
- Buildability
- Asset Fit

Internal modifier:

- Friction

Verdicts:

- `publish_software_first`
- `publish_asset_first`
- `watchlist`
- `reject`

Complaint & Incident and Emerging Digital Infrastructure data appear in analytical context. They do not override these scores.

## Step 10 — Guardrail Engine

Hard checks before review:

- at least two independent source types
- at least one pressure source
- at least one demand or spend signal
- identifiable buyer
- freshness label assigned
- buildability threshold met
- best first asset selected
- no obvious duplicate

Do not weaken guardrails automatically.

## Step 11 — Human Review Queue

Reviewer must answer:

1. What exactly is the painful workflow?
2. Who is the actual buyer?
3. Why now?
4. What should be built or offered first?
5. Why this asset format?
6. Should software come now, later, or not at all?
7. Where is the competitive entry path?
8. Is the timing label honest?
9. Is this publish-worthy?

Statuses:

- `pending`
- `in_review`
- `approved`
- `rework`
- `rejected`

## Step 12 — Asset Strategy Admin

Required for every published opportunity. **Not all opportunities should start as software.**

Admin defines:

- Best First Asset
- Top 3 Asset Paths
- Why This Format Wins First
- Expansion Path (Template → Tool → SaaS)
- Zip-Ready Fit
- Revenue Ceiling

## Step 13 — Competitive Differentiator Admin

Required for every published opportunity. Qualitative — not a fake precision score.

Admin defines:

- Competitor Landscape
- Review Complaint Patterns
- Underserved Segment
- Differentiation Angle
- What NOT to Build
- Competitive Entry Path

## Step 14 — Watchlist Admin

Use watchlist for promising but incomplete opportunities.

Reasons:

- weak buyer signal
- weak demand
- weak buildability
- stale timing
- unclear wedge
- too crowded
- not enough proof yet

Track next review date and recheck trigger.

## Step 15 — Dossier Builder

The Dossier Builder creates full paid Opportunity Dossiers and PDF Dossiers from structured opportunity data.

Seven-section output:

1. Opportunity Snapshot
2. Why This Exists
3. Signal Breakdown
4. Asset Strategy
5. Execution Angle
6. Competitive Differentiator Strategy
7. Why This Matters

It handles:

- default PDF template
- section toggles
- suggested charts/graphics
- evidence tables
- affiliate link insertion
- branding
- regeneration when data changes
- template versioning
- export history

It does not create newsletters or manage subscribers.

## Step 16 — Newsletter Engine

Newsletter Engine is separate.

It handles:

- free subscribers
- weekly Signal Briefs
- basic autoresponder functionality
- unsubscribe handling
- open/click tracking
- free-to-paid CTA tracking

The Weekly Signal Brief is watered down and should not include the full paid dossier.

## Step 17 — System Health

Admin monitors:

- connector status
- failed syncs
- schema changes
- auto-repair logs
- human approval queue
- source reliability
- data quality alerts

AI can auto-fix mechanical connector issues only. Human approval is required for source meaning changes, metric definition changes, scoring impact, API terms, or buyer/category interpretation.

## Status Values

### Opportunities

| Status | Meaning | Visible on Dashboard |
|--------|---------|---------------------|
| `draft` | Created, not reviewed | No |
| `in_review` | Human review active | No |
| `watchlist` | Interesting but incomplete | No |
| `published` | Paid dashboard visible | Yes |
| `rejected` | Not useful enough | No |
| `archived` | Previously published but retired | Optional |

### Publishing Targets

- dashboard only
- PDF dossier
- weekly signal brief teaser
- both dashboard and PDF

## Implementation Rule

Do not build this like generic CRUD.

Build it like a research operating system:

- linked records
- fast filters
- status movement
- source traceability
- review buttons
- score visibility
- dossier generation

Every candidate screen should answer five questions quickly:

1. What is the painful workflow?
2. Who is the buyer?
3. Why now?
4. What should be offered or built first?
5. Should this be published?
