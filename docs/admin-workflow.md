# Admin Workflow

See [MED.md](./MED.md) for documentation governance. Routes: [routes.md](./routes.md). Schema: [database.md](./database.md). Layered validation: [architecture.md](./architecture.md).

The admin backend is the internal research operating system for DataTello.

It should behave like a Notion-style research CMS: linked records, filters, statuses, review queues, source traceability, and one-click movement from raw signal to paid Opportunity Dossier.

## MVP Scope

The MVP admin workflow supports the **compliance + contractor + public-sector wedge** only. Tools marked **Future** are documented and preserved in the long-term architecture but are not active in MVP ingestion or scoring.

## Core Principle

The software handles collection, normalization, clustering, enrichment, layered validation, scoring, drafting, and publishing mechanics.

The human makes the final calls on buyer, buildability, asset fit, differentiation, and publish-worthiness.

### MVP system flow

```text
Pressure → Demand → Wedge → Friction → Procurement Validation
→ Scoring → Asset Strategy → Guardrails → Human Review → Publish
```

### Long-term system flow (preserved)

```text
Pressure → Demand → Wedge → Friction → Complaints → BASE OPPORTUNITY
→ Digital Infrastructure Amplification → Guardrails → Human Review → Publish
```

## Main Admin Tools

### MVP (active now)

1. Source Registry
2. Raw Signal Explorer
3. Problem Zone Workspace
4. Keyword Intelligence (DataForSEO)
5. Market Proof Workspace
6. Workflow Friction Workspace (job postings, procurement/RFP language)
7. Procurement Validation Workspace (SAM.gov, USAspending)
8. Candidate Opportunity Scoring
9. Guardrail Engine
10. Human Review Queue
11. Build Strategy Admin
12. Competitive Differentiator Admin
13. Paid Dashboard Publishing
14. Dossier Builder
15. Newsletter Engine
16. System Health
17. Settings / Rules

### Future (preserved, not MVP)

18. Complaint & Incident Signals Workspace — **Phase 2**
19. Emerging Digital Infrastructure Signals Workspace — **Future Research**
20. Watchlist Admin — future customer segment tooling
21. Delivery Fit Admin — future optional layer
22. Monetization Admin — internal only

## Opportunity Lifecycle

### MVP

```text
Collect → Normalize → Cluster → Keyword Enrichment → Market Validation → Procurement Validation
→ Score → Guardrails → Human Review → Publish → Generate PDF Dossier
```

## Step 1 — Source Registry

Track every source used by Core Engine lanes.

**MVP sources:**

| Lane | Sources |
|------|---------|
| Pressure | OSHA, EPA ECHO, Federal Register |
| Demand | DataForSEO |
| Market Wedge | Manual research, G2, Capterra |
| Friction | Job postings, procurement language, RFP language |
| Procurement | SAM.gov, USAspending |

Fields: source name, type, workflow lane, cadence, geography, reliability, API status, last sync, freshness window, notes.

Future sources are documented in [architecture.md](./architecture.md) § Future Expansion.

## Step 2 — Raw Signal Explorer

Incoming records land here first. Filter, inspect trails, mark bad records, approve for clustering. Nothing here is a published opportunity yet.

## Step 3 — Problem Zone Workspace

Grouped pain patterns, not final product ideas.

Answer: what pain is recurring? where? who is affected? structural, trigger-driven, or mixed? what source mix supports it?

Statuses: `new`, `reviewing`, `enriching`, `ready_for_market_proof`, `ready_for_scoring`, `watchlist`, `rejected`, `promoted`

## Step 4 — Keyword Intelligence

Demand Validation. DataForSEO only in MVP.

Keywords validate demand and buyer language — they do not create opportunities alone.

## Step 5 — Market Proof Workspace

Market Wedge Validation.

**MVP sources:** competitor sites, pricing pages, G2, Capterra (when relevant).

**Not MVP:** SEC EDGAR, broad review scraping, startup marketplaces, broad ecosystem scraping.

Human review required before deciding competition is weak or wedge is real.

## Step 6 — Workflow Friction Workspace

**Workflow Friction = repeated execution failure.**

**MVP sources:**

- Targeted job postings
- Procurement language
- RFP language

**Phase 2 (not MVP):** GitHub, GitLab, Stack Exchange, developer ecosystems.

- Modifies Pain, Market Wedge, Buildability
- Internal modifier only — not a standalone public score
- Does **not** act as a standalone decision engine

Reject: hobby/dev-only, vague complaints, consumer frustration, one-off feature requests.

## Step 7 — Procurement Validation Workspace

**MVP-first validation step.**

Sources: SAM.gov, USAspending.

Purpose:

- Validate buyer intent and budget signal
- Confirm workflow language in active procurement
- Strengthen recurrence and structural pain
- Feed procurement hidden modifier in scoring

**Roadmap expansion:** state, city, county, utilities, global tenders — see [architecture.md](./architecture.md) § Future Expansion.

## Step 8 — Complaint & Incident Signals Workspace — Phase 2

**Not active in MVP.** Preserved in long-term architecture.

Purpose when activated:

- Detect repeated real-world failure
- Validate through **clusters**, not individual complaints
- Strengthen Pain confidence, buyer specificity, urgency

Source categories: CFPB, openFDA/MAUDE, NHTSA, FCC.

## Step 9 — Emerging Digital Infrastructure Signals Workspace — Future Research

**Not active in MVP.** Not in MVP scoring or ingestion.

Four sub-modules preserved for future research:

- Agent Commerce Signals
- Stablecoin Workflow Signals
- Onchain Developer Tool Friction
- Tokenized Data / Pay-Per-Use Data Signals

## Step 10 — Candidate Opportunity Scoring

Combines MVP validation layers into opportunity confidence.

**Public scores:** Pain, Demand, Market, Freshness, Buildability, Asset Fit.

**Hidden modifiers (MVP):** Friction, Procurement.

**Not MVP:** Digital Infrastructure Boost.

Verdicts: `publish_software_first`, `publish_asset_first`, `watchlist`, `reject`

## Step 11 — Guardrail Engine

### Rule 1 — No Signal Stands Alone

Reject if only one source type without pressure, demand, or friction.

### Rule 2 — Must Map to Buyer + Workflow

Reject if no clear buyer or repeatable workflow.

### Rule 3 — Must Improve Decision

Keep only if it helps decide what to build, how to win, or what to sell, recommend, validate, or fund.

### Rule 4 — Reject Noise

Reject: crypto hype, token speculation, creator monetization, experimental novelty, non-B2B use cases.

Hard checks: ≥2 independent source types, ≥1 pressure source, ≥1 demand/spend signal, freshness label, buildability threshold, best first asset, no duplicate.

## Step 12 — Human Review Queue

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

## Step 13 — Build Strategy Admin

Required for every published opportunity. **Do not default to SaaS.**

- Best First Asset
- Top 3 Asset Paths
- Why This Wins First
- Expansion Ladder
- Revenue Ceiling
- Build Difficulty

## Step 14 — Competitive Differentiator Admin

Required for every published opportunity.

- Competitor Landscape
- Review Complaint Patterns
- Underserved Segment
- Differentiation Angle
- What NOT to Compete On
- Entry Strategy

## Step 15 — Watchlist Admin — Future

For promising but incomplete opportunities. Primarily serves future investor/studio segments.

## Step 16 — Dossier Builder

Creates full paid Opportunity Dossiers and PDF Dossiers. Seven-section output per [med-sections.md](./med-sections.md).

Does not create newsletters or manage subscribers.

## Step 17 — Newsletter Engine

Separate. Free subscribers, weekly Signal Briefs, autoresponder, tracking. Weekly brief is watered down — not the full paid dossier.

## Step 18 — System Health

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
