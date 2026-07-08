# Architecture

See [MED.md](./MED.md) for documentation governance. Long-term truths: [context.md](./context.md).

## Stack

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Supabase (`@supabase/supabase-js`)
- Postgres via Supabase

## System Boundary

DataTello has four separate systems.

### 1. DataTello Core

Handles:

- source ingestion
- raw signal normalization
- clustering into problem zones
- layered validation and scoring
- guardrails
- human review
- paid dashboard publishing
- user targeting / onboarding preferences (planned)

Built in Next.js + Supabase.

### 2. Newsletter Engine

Handles:

- free subscribers
- Weekly Signal Brief email
- basic autoresponder functionality
- unsubscribe handling
- open/click tracking
- free-to-paid CTA tracking

Separate from the Dossier Builder.

### 3. Dossier Builder

Handles:

- paid Opportunity Dossier generation
- downloadable PDF Dossier export
- template selection
- section toggles
- suggested charts/graphics
- evidence tables
- affiliate links
- branding
- export history

Separate from the Newsletter Engine.

### 4. Growth Automation Stack

Handles outbound marketing and prospecting only.

Expected stack:

- Oracle VPS / cloud infrastructure
- n8n marketing automation suite
- AI prospecting agents
- lead enrichment
- outreach sequence drafting
- reply classification
- suppression/unsubscribe handling

Hard rule: n8n is for marketing/growth automation only. It should not run core ingestion, clustering, scoring, or dashboard logic.

---

## Core Principle: Layered Validation

DataTello does **not** discover opportunities from a single signal. It validates opportunities through layered evidence.

| Layer | Question |
|-------|----------|
| Pressure | Is the problem forming? |
| Demand | Are people looking for it? |
| Wedge | Can you sell into it? |
| Friction | Are people failing to solve it? |
| Complaints | Are real users repeatedly affected? |
| Digital Infrastructure | Is new infrastructure accelerating this? |

This is the system's authentication layer.

---

## Product Structure

### 1. Core Engine (five validation layers)

The scoring and decision backbone:

1. **Pressure Discovery** — real-world operational pressure
2. **Demand Validation** — search behavior, buyer language, commercial intent
3. **Market Wedge Validation** — category gaps, competition, spend proof
4. **Workflow Friction Signals** — repeated execution failure
5. **Complaint & Incident Signals** — repeated real-world failure clusters

These create → **Base Opportunity Confidence**

Plus Buildability Score, Asset Fit Decision, guardrails, and human review.

### 2. Emerging Digital Infrastructure Signals (validation amplifiers)

**Not discovery layers.** Applied only after a base opportunity is formed.

Four modules only:

| Module | Validates | Strengthens |
|--------|-----------|-------------|
| **Agent Commerce Signals** | Are machines already paying in this category? | Market Wedge, Early Demand |
| **Stablecoin Workflow Signals** | Are real businesses struggling with new payment workflows? | Pain, Friction |
| **Onchain Developer Tool Friction** | Are people repeatedly failing to implement this? | Workflow Friction, Buildability clarity |
| **Tokenized Data / Pay-Per-Use Data Signals** | Is a new infrastructure layer forming around paid data/services? | Market Wedge, Asset Strategy |

Do **not** add DAO signals, grants, onchain compliance as a standalone user-facing module, or other sub-modules without an ADR.

---

## System Flow

```text
Step 1 → Pressure
Step 2 → Demand
Step 3 → Wedge
Step 4 → Friction
Step 5 → Complaints
         ↓
    BASE OPPORTUNITY FORMED
         ↓
Step 6 → Digital Infrastructure Signals
         ↓
    strengthen: confidence, urgency, asset decisions, wedge clarity
         ↓
    Guardrails → Human Review → Publish → PDF Dossier
```

---

## Core Engine Signal Lanes

### Pressure Discovery

Finds real-world pressure forming.

Examples: OSHA, EPA ECHO, BLS, Census permits, SAM.gov, CISA KEV, Federal Register, Regulations.gov, USAspending, CMS (healthcare scope).

### Demand Validation

Checks attention, buyer language, and commercial intent.

Primary source: DataForSEO v3.

Use: historical search volume, related keywords, trends, CPC, competition, internal keyword memory.

### Market Wedge Validation

Checks whether there is a sellable product/category gap.

Sources: competitor sites, pricing pages, review directories, job postings, SEC EDGAR, USAspending, manual market proof review.

### Workflow Friction Signals

**Workflow Friction = repeated execution failure.**

Impacts: Pain, Market Wedge, Buildability.

- Internal modifier only — not a standalone public score
- Does **not** act as a standalone decision engine
- Does not bypass guardrails, scoring, or human review

MVP sources: GitHub issues, Stack Exchange, Greenhouse, Lever job postings.

### Complaint & Incident Signals

**Mandatory core layer.**

- Detects repeated real-world failure
- Strongest realism layer for operational breakdown
- Validates operational breakdown through **clusters**, not individual complaints
- Strengthens: Pain confidence, buyer specificity, urgency

Source categories:

| Source | Domain |
|--------|--------|
| CFPB | Consumer financial complaints |
| FDA / MAUDE | Medical device adverse events |
| NHTSA | Vehicle safety incidents |
| FCC | Telecom / communications complaints |

Feeds problem zone clustering and human review. Does not bypass scoring.

---

## Guardrail System

### Rule 1 — No Signal Stands Alone

Reject if:

- only onchain/digital infrastructure signals exist
- no pressure, demand, or friction evidence

### Rule 2 — Must Map to Buyer + Workflow

Reject if:

- no clear buyer
- no repeatable workflow

### Rule 3 — Must Improve Decision

Keep only if it helps decide:

- what to build
- how to win
- what to sell, recommend, validate, or fund

### Rule 4 — Reject Noise

Reject:

- crypto hype
- token speculation
- creator monetization
- experimental novelty
- non-B2B use cases

Hard checks before review also include: at least two independent source types, at least one pressure source, at least one demand or spend signal, freshness label assigned, buildability threshold met, best first asset selected, no obvious duplicate.

---

## Scoring System

### Public scores

| Score | Source layer |
|-------|--------------|
| Pain | Pressure (+ friction modifier) |
| Demand | Demand Validation |
| Market | Market Wedge Validation |
| Freshness | Timing / mixed signal label |
| Buildability | Delivery feasibility |
| Asset Fit | Best first asset alignment |

### Internal modifiers

| Modifier | Role |
|----------|------|
| Friction | Modifies Pain, Market, Buildability |
| Digital Infrastructure Boost (0–10) | Increases confidence, breaks ties, prioritizes — **not** a primary score |

Digital Infrastructure Boost is used **only** to increase confidence, break ties, and prioritize. It must not override weak base validation.

---

## ICP & Onboarding

One engine. Different post-login defaults and views.

Target ICPs: Agencies, Consultants, Investors, Venture Studios / Product Studios.

Onboarding captures `user_type`, `industries[]`, `buyer_types[]`, `signal_types[]` and applies them as default filters on dashboard queries.

Full spec: [onboarding.md](./onboarding.md)

---

## Data Flow

```text
Source Sync → Raw Signals → Normalize/Classify → Problem Zones
→ Keyword Enrichment → Market/Friction/Complaint Proof
→ Candidate Opportunity (Base Confidence) → Digital Infrastructure Amplification
→ Guardrails → Human Review → Publish → PDF Dossier
```

## Freshness Rules

Every opportunity must have one timing/freshness label:

- `trigger_driven`
- `structural`
- `mixed`

## AI Automation Boundary

AI may assist with: summarization, classification, keyword generation, clustering suggestions, first-pass scoring, first-pass dossier drafting, chart suggestions, connector repair proposals.

AI must not autonomously decide: final buyer, final build recommendation, whether software beats service, competitive right-to-win, scoring weight changes, publish approval.

## Connector Health + Repair

Each connector should have an adapter layer with source name, base URL, auth type, rate limits, field mapping, freshness cadence, last sync, failure reason, repair status.

AI may auto-fix mechanical issues only. Human approval required for source meaning changes, metric definition changes, scoring impact, API terms, buyer/category interpretation changes.

## Folder Structure

```text
/app                    # Routes (App Router)
/components
  /ui                   # Card, FilterBar, primitives
  /layout               # Navbar, Sidebar, PageContainer
  /cards                # OpportunityCard
  /sections             # MED/Dossier section components
  /admin                # Admin forms and actions
/lib                    # supabase.ts, queries.ts, helpers.ts, persona-lens.ts
/types                  # database.ts, opportunity.ts
/hooks                  # useOpportunities, useFilters, usePersonaLens
/styles                 # globals.css
/docs                   # This documentation
/supabase               # schema.sql
```

## Design Patterns

- `PageContainer` wraps all page content
- `Card` wraps every dossier/admin section
- Section components accept typed `opportunity` slices
- Admin pages preserve source traceability
- Dashboard pages simplify internal scoring into decision-ready output
- Onboarding preferences apply as default query filters (when implemented)

## Non-Negotiable Architecture Rules

1. Core intelligence stays in Next.js + Supabase.
2. n8n is for marketing automation, not core intelligence.
3. Newsletter Engine and Dossier Builder are separate.
4. Paid PDF Dossiers are generated from templates, not manually made one by one.
5. AI can draft and assist, but human review controls publish decisions.
6. Five core layers form base opportunity confidence before digital infrastructure amplification.
7. Digital infrastructure signals are amplifiers — they do not determine final opportunities alone.
8. Complaint & Incident Signals are core validation, not optional add-ons.
