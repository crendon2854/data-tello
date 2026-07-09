# Architecture

See [MED.md](./MED.md) for documentation governance. Long-term truths: [context.md](./context.md).

---

## Product Positioning (Locked)

DataTello is **not** a general market intelligence platform.

DataTello is an **evidence-backed build opportunity intelligence platform** that discovers overlooked compliance- and procurement-backed workflow problems and converts them into buildable assets.

DataTello sells **build opportunities** — not intelligence feeds, trend alerts, or competitive monitoring dashboards.

### What DataTello is not

Do not position DataTello like:

| Product type | Examples | Why different |
|--------------|----------|---------------|
| Government intelligence | HigherGov, GovSignals | They sell intelligence; DataTello sells build opportunities |
| Market monitoring | Contify, Crayon, Klue | They track competitors; DataTello validates what to build |
| Trend discovery | Exploding Topics | They surface attention; DataTello validates operational pain + wedge + asset fit |

---

## MVP Wedge (Locked)

The MVP focuses on **one narrow wedge**:

**Environmental Compliance** + **Contractor Safety** + **Public-sector compliance workflows**

Everything else is future expansion. Additional industries and evidence layers ship only after the MVP consistently produces high-quality opportunities.

---

## Architecture Phases

| Phase | Scope | Status |
|-------|-------|--------|
| **MVP** | Environmental compliance, contractor safety, public-sector compliance workflows | Implemented now |
| **Phase 2** | Complaint signals, developer friction, additional agencies | After MVP quality bar met |
| **Phase 3** | Healthcare vertical | After Phase 2 |
| **Future Research Layers** | Onchain / x402, global procurement, investor intelligence, enterprise features | Research only — not in MVP scoring, ingestion, or architecture |

The long-term layered validation architecture is **preserved**. MVP is a focused subset of that architecture.

---

## Stack

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Supabase (`@supabase/supabase-js`)
- Postgres via Supabase

---

## System Boundaries

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
- user targeting / onboarding preferences

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

## MVP Pipeline

The MVP ships this pipeline only:

```text
Collect
  ↓
Normalize
  ↓
Cluster
  ↓
Keyword Enrichment
  ↓
Market Validation
  ↓
Procurement Validation
  ↓
Scoring
  ↓
Asset Strategy
  ↓
Human Review
  ↓
Opportunity Brief
  ↓
Publish
```

Procurement Validation is a first-class MVP step — not an afterthought. Construction and environmental workflows are validated through hiring and procurement language as much as through regulatory pressure.

---

## MVP Source Stack (Locked)

### Pressure Discovery — MVP only

| Source | Status |
|--------|--------|
| OSHA | ✅ MVP |
| EPA ECHO | ✅ MVP |
| Federal Register | ✅ MVP |

**Removed from MVP** (documented under [Future Expansion](#future-expansion)):

- BLS, Census, CMS, Grants.gov, CISA KEV, Regulations.gov, and other agencies

### Demand Validation — MVP only

| Source | Status |
|--------|--------|
| DataForSEO | ✅ MVP |

Do not add other keyword providers in MVP.

### Market Wedge — MVP only

| Source | Status |
|--------|--------|
| Manual competitor research | ✅ MVP |
| Pricing pages | ✅ MVP |
| G2 | ✅ MVP |
| Capterra | ✅ MVP (when relevant) |

**Removed from MVP:**

- SEC EDGAR
- Broad review scraping
- Startup marketplaces
- Broad ecosystem scraping

### Workflow Friction — MVP only

| Source | Status |
|--------|--------|
| Targeted job postings | ✅ MVP |
| Procurement language | ✅ MVP |
| RFP language | ✅ MVP |

**Moved to Phase 2:**

- GitHub, GitLab, Stack Exchange, developer ecosystems

Reason: construction and environmental workflows are usually validated through hiring and procurement rather than GitHub issues.

### Procurement — MVP only

| Source | Status |
|--------|--------|
| SAM.gov | ✅ MVP |
| USAspending | ✅ MVP |

**Moved to roadmap** (see Future Expansion):

- State, city, county procurement portals
- Utilities procurement
- Global tenders

The MVP must prove procurement intelligence before expanding.

### Complaint Signals — Phase 2 (not MVP)

All complaint sources are **Phase 2**. None are active in MVP ingestion or scoring.

### Healthcare — Phase 3 (not MVP)

No healthcare ingestion in MVP.

### Onchain / x402 — Future Research Layers

Not mentioned in MVP architecture. Not included in scoring, ingestion, or dossier output.

---

## MVP Scoring

### Public scores

| Score | Source layer |
|-------|--------------|
| Pain | Pressure (+ friction modifier) |
| Demand | Demand Validation |
| Market | Market Wedge Validation |
| Freshness | Timing / mixed signal label |
| Buildability | Delivery feasibility |
| Asset Fit | Best first asset alignment |

### Hidden modifiers (MVP only)

| Modifier | Role |
|----------|------|
| Friction | Modifies Pain, Market, Buildability |
| Procurement | Strengthens buyer intent, budget signal, workflow clarity, recurrence |

No other score categories in MVP. Digital Infrastructure Boost is **not** an MVP modifier — see Future Research Layers.

---

## MVP Target Customer (Locked)

**Primary customer (MVP only):**

| Segment | Core question |
|---------|---------------|
| **Builders** | What compliance- or procurement-backed workflow should I build first? |
| **Agencies serving compliance-heavy industries** | What can we sell, implement, or productize for contractor and environmental clients? |
| **Consultants serving contractor/environmental businesses** | What should we recommend, advise on, or turn into client-facing memos? |

**Not MVP positioning** (future customer segments):

- VCs / Investors
- HoldCos
- Product Studios
- Enterprise buyers
- White-label enterprise features

---

## Opportunity Output Structure (Locked)

Every published opportunity follows **seven sections** in this exact order. Do not simplify.

1. **Opportunity Snapshot**
2. **Why This Exists**
3. **Signal Breakdown**
4. **Build Strategy**
5. **Execution Angle**
6. **Competitive Differentiator**
7. **Why This Matters**

Full field spec: [med-sections.md](./med-sections.md).

---

## Guardrail System

### Rule 1 — No Signal Stands Alone

Reject if:

- only one source type supports the opportunity
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

## Long-Term Layered Validation Architecture

DataTello's full architecture validates opportunities through layered evidence. MVP implements a focused subset; the complete model is preserved for expansion.

| Layer | Question | MVP | Phase |
|-------|----------|-----|-------|
| Pressure | Is the problem forming? | OSHA, EPA ECHO, Federal Register | MVP |
| Demand | Are people looking for it? | DataForSEO | MVP |
| Wedge | Can you sell into it? | Manual research, G2, Capterra | MVP |
| Friction | Are people failing to solve it? | Job postings, procurement/RFP language | MVP |
| Procurement | Is buyer intent and budget real? | SAM.gov, USAspending | MVP |
| Complaints | Are real users repeatedly affected? | — | Phase 2 |
| Healthcare vertical | Regulated care workflows | — | Phase 3 |
| Digital Infrastructure | Does emerging infra strengthen confidence? | — | Future Research |

**Base Opportunity Confidence** in the long-term model is formed from Pressure through Complaints (Steps 1–5). MVP forms confidence from Pressure, Demand, Wedge, Friction, and Procurement Validation.

### Confidence amplification (long-term Step 6)

| Amplifier | Question | Phase |
|-----------|----------|-------|
| Digital Infrastructure | Does emerging infrastructure strengthen confidence in an already-validated opportunity? | Future Research |

Four modules (preserved for future, not MVP):

- Agent Commerce Signals
- Stablecoin Workflow Signals
- Onchain Developer Tool Friction
- Tokenized Data / Pay-Per-Use Data Signals

Step 6 amplifies confidence after base validation. It does **not** discover or create opportunities on its own.

### Long-term system flow

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

## Future Expansion

All capabilities below are **preserved in the long-term architecture**. They are explicitly **out of MVP scope** until the wedge consistently produces high-quality opportunities.

### Phase 2 — Complaint & Incident Signals

Mandatory in the long-term model; not active in MVP.

| Source | Domain |
|--------|--------|
| CFPB | Consumer financial complaints |
| openFDA / MAUDE | Medical device adverse events |
| NHTSA | Vehicle safety incidents |
| FCC | Telecom / communications complaints |

- Detect repeated real-world failure through **clusters**, not individual complaints
- Strengthen Pain confidence, buyer specificity, urgency
- Admin workspace: `/admin/complaint-incidents` (planned)

### Phase 2 — Developer Friction Sources

| Source | Use |
|--------|-----|
| GitHub Issues | Repeated implementation failure |
| GitLab | Same |
| Stack Exchange | Same |
| Developer ecosystems | Broader friction patterns |

### Phase 2 — Additional Government Agencies

| Source | Use |
|--------|-----|
| BLS | Labor and operational pressure |
| Census | Permits, structural indicators |
| CMS | Healthcare-adjacent pressure (full healthcare is Phase 3) |
| Grants.gov | Funding signal |
| CISA KEV | Security pressure |
| Regulations.gov | Rulemaking signal |

### Phase 2 — Market Wedge Expansion

| Source | Use |
|--------|-----|
| SEC EDGAR | Public company spend signals |
| Broad review scraping | Category complaint themes |
| Startup marketplaces | Emerging competitor landscape |
| Broad ecosystem scraping | Market formation signals |

### Phase 3 — Healthcare

Entire healthcare vertical:

- CMS and healthcare-specific pressure sources
- Healthcare procurement patterns
- FDA/MAUDE as primary complaint layer for med devices
- Healthcare operations as target industry

No healthcare ingestion in MVP.

### Roadmap — Procurement Expansion

| Source | Scope |
|--------|-------|
| State procurement portals | Multi-state expansion |
| City procurement | Municipal workflows |
| County procurement | Local government |
| Utilities procurement | Regulated utility buyers |
| Global tenders | International expansion |

### Future Research Layers

| Capability | Notes |
|------------|-------|
| Onchain / x402 | Not in MVP architecture, scoring, or ingestion |
| Agent Commerce Signals | Confidence amplifier only |
| Stablecoin Workflow Signals | Confidence amplifier only |
| Onchain Developer Tool Friction | Confidence amplifier only |
| Tokenized Data / Pay-Per-Use Data | Confidence amplifier only |
| Investor intelligence | Future customer segment |
| Enterprise intelligence | Future customer segment |
| White-label enterprise features | Future product tier |
| Additional verticals | After wedge proven |

Do **not** add DAO signals, grants, or onchain compliance as a standalone user-facing module without an ADR.

---

## Data Flow

### MVP

```text
Source Sync → Raw Signals → Normalize/Classify → Problem Zones
→ Keyword Enrichment → Market Validation → Procurement Validation
→ Scoring → Asset Strategy → Guardrails → Human Review → Publish → PDF Dossier
```

### Long-term (full architecture)

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
  /procurement          # SAM.gov pipeline, scoring, integration
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
- Onboarding preferences apply as default query filters

## Non-Negotiable Architecture Rules

1. Core intelligence stays in Next.js + Supabase.
2. n8n is for marketing automation, not core intelligence.
3. Newsletter Engine and Dossier Builder are separate.
4. Paid PDF Dossiers are generated from templates, not manually made one by one.
5. AI can draft and assist, but human review controls publish decisions.
6. MVP proves the compliance + contractor + public-sector wedge before expanding.
7. Long-term layered validation is preserved — expansion adds layers, not replacements.
8. Digital infrastructure signals are future research amplifiers — not MVP scoring or ingestion.
9. Complaint signals are Phase 2 — preserved in architecture, not active in MVP.
10. DataTello sells build opportunities, not intelligence feeds.
