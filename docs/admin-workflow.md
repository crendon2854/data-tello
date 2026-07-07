# Admin Workflow

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
7. Candidate Opportunity Scoring
8. Guardrail Engine
9. Human Review Queue
10. Asset Strategy Admin
11. Builder Fit Strategy Admin
12. Competitive Differentiator Admin
13. Watchlist Admin
14. Paid Dashboard Publishing
15. Dossier Builder
16. Newsletter Engine
17. System Health
18. Settings / Rules

## Opportunity Lifecycle

```text
Collect → Normalize → Cluster → Enrich → Market/Friction Proof → Score → Guardrails → Human Review → Publish → Generate PDF Dossier
```

## Step 1 — Source Registry

Admin manages every source used by Pressure Discovery, Demand Validation, Market Wedge Validation, and Workflow Friction Signals.

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

Used to detect repeated execution pain.

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

Friction is internal. It modifies pressure, wedge, and buildability. It is not the main public score.

Reject friction records that are hobby/dev-only, vague complaints, consumer frustration, crypto/AI hype, or one-off feature requests.

## Step 7 — Candidate Opportunity Scoring

Candidate opportunities combine the signal lanes.

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

## Step 8 — Guardrail Engine

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

## Step 9 — Human Review Queue

Reviewer must answer:

1. What exactly is the painful workflow?
2. Who is the actual buyer?
3. Why now?
4. What should be built first?
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

## Step 10 — Asset Strategy Admin

Admin defines:

- Best First Asset
- Top 3 Asset Paths
- Expansion Ladder
- Zip-Ready Fit
- Revenue Ceiling
- Build Difficulty
- Recommended AI Build Stack
- Why Not Full Software Yet
- When to Upgrade to SaaS
- Maintenance Burden
- Support Burden

## Step 11 — Builder Fit Strategy Admin

Admin maps the opportunity to builder types:

- vibe coder
- no-code operator
- automation builder
- template seller
- technical founder
- agency/productizer
- product studio / advanced SaaS builder

Output should recommend the best fit, not the most powerful tool.

## Step 12 — Competitive Differentiator Admin

Admin defines:

- competitor landscape
- review complaint themes
- underserved segment
- best vertical entry point
- avoided verticals
- differentiation angle
- what not to compete on
- competitive entry path
- small builder right-to-win

This is qualitative, not a score.

## Step 13 — Watchlist Admin

Use watchlist for promising but incomplete ideas.

Reasons:

- weak buyer signal
- weak demand
- weak buildability
- stale timing
- unclear wedge
- too crowded
- not enough proof yet

Track next review date and recheck trigger.

## Step 14 — Dossier Builder

The Dossier Builder creates full paid Opportunity Dossiers and PDF Dossiers from structured opportunity data.

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

## Step 15 — Newsletter Engine

Newsletter Engine is separate.

It handles:

- free subscribers
- weekly Signal Briefs
- basic autoresponder functionality
- unsubscribe handling
- open/click tracking
- free-to-paid CTA tracking

The Weekly Signal Brief is watered down and should not include the full paid dossier.

## Step 16 — System Health

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
4. What should be built first?
5. Should this be published?