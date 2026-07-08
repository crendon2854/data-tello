# Admin Workflow

See [MED.md](./MED.md) for documentation governance. Routes: [routes.md](./routes.md). Schema: [database.md](./database.md). Layered validation: [architecture.md](./architecture.md).

The admin backend is the internal research operating system for DataTello.

It should behave like a Notion-style research CMS: linked records, filters, statuses, review queues, source traceability, and one-click movement from raw signal to paid Opportunity Dossier.

## Core Principle

The software handles collection, normalization, clustering, enrichment, layered validation, scoring, drafting, and publishing mechanics.

The human makes the final calls on buyer, buildability, asset fit, differentiation, and publish-worthiness.

DataTello validates opportunities through layered evidence. Admin workflow must reflect the system flow:

```text
Pressure → Demand → Wedge → Friction → Complaints → BASE OPPORTUNITY
→ Digital Infrastructure Amplification → Guardrails → Human Review → Publish
```

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

Internal admin only (not in seven-section dossier output): Delivery Fit Admin, Monetization Admin, Risks Admin

## Opportunity Lifecycle

```text
Collect → Normalize → Cluster → Enrich → Layered Validation → Score → Guardrails → Human Review → Publish → Generate PDF Dossier
```

## Step 1 — Source Registry

Track every source used by Core Engine lanes and complaint/incident connectors.

Fields: source name, type, workflow lane, cadence, geography, reliability, API status, last sync, freshness window, notes.

## Step 2 — Raw Signal Explorer

Incoming records land here first. Filter, inspect trails, mark bad records, approve for clustering. Nothing here is a published opportunity yet.

## Step 3 — Problem Zone Workspace

Grouped pain patterns, not final product ideas.

Answer: what pain is recurring? where? who is affected? structural, trigger-driven, or mixed? what source mix supports it?

Statuses: `new`, `reviewing`, `enriching`, `ready_for_market_proof`, `ready_for_scoring`, `watchlist`, `rejected`, `promoted`

## Step 4 — Keyword Intelligence

Demand Validation. Keywords validate demand and buyer language — they do not create opportunities alone.

## Step 5 — Market Proof Workspace

Market Wedge Validation. Competitor sites, pricing, reviews, job postings, SEC EDGAR, USAspending, complaint themes, underserved segments.

Human review required before deciding competition is weak or wedge is real.

## Step 6 — Workflow Friction Workspace

**Workflow Friction = repeated execution failure.**

MVP sources: GitHub issues, Stack Exchange, Greenhouse, Lever.

- Modifies Pain, Market Wedge, Buildability
- Internal modifier only — not a standalone public score
- Does **not** act as a standalone decision engine

Reject: hobby/dev-only, vague complaints, consumer frustration, one-off feature requests.

## Step 7 — Complaint & Incident Signals Workspace

**Mandatory core validation layer — first-class realism layer.**

Purpose:

- Detect repeated real-world failure
- Strongest realism layer for operational breakdown
- Validate through **clusters**, not individual complaints
- Strengthen Pain confidence, buyer specificity, urgency

Source categories:

| Source | Use |
|--------|-----|
| CFPB | Consumer financial complaint clusters |
| FDA / MAUDE | Medical device adverse event patterns |
| NHTSA | Vehicle safety incident recurrence |
| FCC | Telecom / communications complaint clusters |

Admin tracks: incident type, recurrence, cluster patterns, geography, industry impact, source diversity, problem zone linkage.

Reject: isolated incidents, unverified single complaints, lacking operational specificity.

This layer feeds Base Opportunity Confidence. It does not bypass scoring or guardrails.

## Step 8 — Emerging Digital Infrastructure Signals Workspace

**Confidence amplifiers only — not discovery layers, not standalone opportunity engines.** Applied after base opportunity formed.

Four sub-modules only. Each answers a confidence question about an existing candidate — none surface new opportunities by themselves.

### Agent Commerce Signals

Confidence question: Are machines already paying in this category?  
Strengthens: Market Wedge, Early Demand confidence

### Stablecoin Workflow Signals

Confidence question: Are real businesses struggling with new payment workflows?  
Strengthens: Pain, Friction confidence

### Onchain Developer Tool Friction

Confidence question: Are people repeatedly failing to implement this?  
Strengthens: Workflow Friction, Buildability clarity

### Tokenized Data / Pay-Per-Use Data Signals

Confidence question: Is a new infrastructure layer forming around paid data/services?  
Strengthens: Market Wedge, Asset Strategy confidence

Admin manages analytical records, trend summaries, and Weak/Moderate/Strong ratings per module.

**Rule:** Amplifies confidence only. Does not determine final opportunities alone.

Do not add DAO, grants, onchain compliance as standalone user-facing modules without an ADR.

## Step 9 — Candidate Opportunity Scoring

Combines five core validation layers into Base Opportunity Confidence.

Public scores: Pain, Demand, Market, Freshness, Buildability, Asset Fit.

Internal modifiers: Friction, Digital Infrastructure Boost (0–10).

Digital Infrastructure Boost: increases confidence, breaks ties, prioritizes — **not** a primary score.

Verdicts: `publish_software_first`, `publish_asset_first`, `watchlist`, `reject`

## Step 10 — Guardrail Engine

### Rule 1 — No Signal Stands Alone

Reject if only digital infrastructure signals exist without pressure, demand, or friction.

### Rule 2 — Must Map to Buyer + Workflow

Reject if no clear buyer or repeatable workflow.

### Rule 3 — Must Improve Decision

Keep only if it helps decide what to build, how to win, or what to sell, recommend, validate, or fund.

### Rule 4 — Reject Noise

Reject: crypto hype, token speculation, creator monetization, experimental novelty, non-B2B use cases.

Hard checks: ≥2 independent source types, ≥1 pressure source, ≥1 demand/spend signal, freshness label, buildability threshold, best first asset, no duplicate.

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

Statuses: `pending`, `in_review`, `approved`, `rework`, `rejected`

## Step 12 — Asset Strategy Admin

Required for every published opportunity. **Do not default to SaaS.**

- Best First Asset
- Top 3 Asset Paths
- Why This Wins First
- Expansion Ladder
- Revenue Ceiling
- Build Difficulty

## Step 13 — Competitive Differentiator Admin

Required for every published opportunity.

- Competitor Landscape
- Review Complaint Patterns
- Underserved Segment
- Differentiation Angle
- What NOT to Compete On
- Entry Strategy

## Step 14 — Watchlist Admin

For promising but incomplete opportunities. Track next review date and recheck trigger.

## Step 15 — Dossier Builder

Creates full paid Opportunity Dossiers and PDF Dossiers. Seven-section output per [med-sections.md](./med-sections.md).

Does not create newsletters or manage subscribers.

## Step 16 — Newsletter Engine

Separate. Free subscribers, weekly Signal Briefs, autoresponder, tracking. Weekly brief is watered down — not the full paid dossier.

## Step 17 — System Health

Connector status, failed syncs, schema changes, auto-repair logs, human approval queue.

## Status Values

### Opportunities

| Status | Visible on Dashboard |
|--------|---------------------|
| `draft` | No |
| `in_review` | No |
| `watchlist` | No |
| `published` | Yes |
| `rejected` | No |
| `archived` | Optional |

## Implementation Rule

Build like a research operating system — not generic CRUD. Every candidate screen should answer:

1. What is the painful workflow?
2. Who is the buyer?
3. Why now?
4. What should be offered or built first?
5. Should this be published?
