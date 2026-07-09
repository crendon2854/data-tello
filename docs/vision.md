# Vision

See [MED.md](./MED.md) for documentation governance. Current status: [project-state.md](./project-state.md).

## What DataTello Is

DataTello is **not** a research dashboard or general market intelligence platform.

DataTello is an **evidence-backed decision engine** for build opportunities. It discovers overlooked compliance- and procurement-backed workflow problems, validates them through layered evidence, and tells each user **what to build or act on first**.

It validates build opportunities through **layered evidence** — not from a single signal. Users receive source-backed dossiers grounded in operational pain, market wedge, procurement signals, and build strategy — plus a **Decision Layer** that ranks and recommends the best next move for their role and preferences.

DataTello sells **decisions**, not lists. It is not a trend feed, a startup idea list, a generic market scanner, or a competitive intelligence dashboard.

### The core question DataTello always answers

> For **this** user → what should they build or act on **first**?

Not: "Here are some interesting opportunities."

### Competitive differentiation

| They sell | DataTello sells |
|-----------|-----------------|
| HigherGov, GovSignals — government intelligence | Build opportunities backed by compliance + procurement evidence |
| Contify, Crayon, Klue — market monitoring | Validated wedges with asset fit and execution angle |
| Exploding Topics — trend discovery | Operational pain + procurement validation → buildable assets |

## MVP Wedge (Locked)

**Environmental Compliance** + **Contractor Safety** + **Public-sector compliance workflows**

The MVP proves this wedge before expanding into additional industries or evidence layers.

## Core Principle (Locked)

Each validation layer answers a different question. MVP implements a focused subset; the long-term model preserves all layers.

| Layer | Question | MVP |
|-------|----------|-----|
| Pressure | Is the problem forming? | ✅ |
| Demand | Are people looking for it? | ✅ |
| Wedge | Can you sell into it? | ✅ |
| Friction | Are people failing to solve it? | ✅ |
| Procurement | Is buyer intent and budget real? | ✅ |
| Complaints | Are real users repeatedly affected? | Phase 2 |
| Digital Infrastructure | Does emerging infra strengthen confidence? | Future Research |

MVP forms opportunity confidence from Pressure, Demand, Wedge, Friction, and Procurement Validation.

**Long-term amplification (Step 6):** Digital Infrastructure signals strengthen confidence in an already-validated opportunity. They do **not** discover or create opportunities on their own. Not in MVP.

This layered architecture is the system's authentication layer. No single signal stands alone.

## MVP Target Users & Roles

DataTello uses a **Role-Aware Output System**. The same validated opportunity renders differently by user role.

| Role | Core question | Primary output lens |
|------|---------------|---------------------|
| **agency** | What can we sell, implement, or productize for clients? | Full execution detail — Build Strategy, tool stack, how to build |
| **consultant** | What should we recommend or turn into client memos? | Full execution detail — Build Strategy, tool stack, how to build |
| **investor** | What should we fund, validate, or monitor? | Asset Thesis — entry point, expansion ladder, monetization, risk |
| **venture_studio** | What is worth validating and spinning up next? | Asset Thesis — entry point, expansion ladder, monetization, risk |
| **general** | What should I act on first? | Balanced summary (fallback) |

Onboarding captures role + preferences. The **Decision Layer** (`getRecommendedOpportunity`) combines role, industries, buyer types, signal preferences, scoring, and modifiers to surface a top recommendation and ranked alternatives.

Onboarding and role-aware rendering: [onboarding.md](./onboarding.md). Decision Layer spec: [architecture.md](./architecture.md) § Decision Layer.

## Product Structure

### MVP Core Engine (unchanged)

1. Pressure Discovery — OSHA, EPA ECHO, Federal Register
2. Demand Validation — DataForSEO
3. Market Wedge Validation — manual research, G2, Capterra
4. Workflow Friction Signals — job postings, procurement/RFP language
5. Procurement Validation — SAM.gov, USAspending

Plus scoring, guardrails, and human review.

### Decision Layer (new core feature)

`getRecommendedOpportunity(userPreferences, opportunities[])` returns:

- **top 1** recommended opportunity
- **top 3** ranked opportunities

Ranking combines: user role, industries, buyer types, signal preferences, scoring (Pain, Demand, Market, Buildability, Asset Fit), friction modifier, and procurement modifier.

Dashboard surfaces this as **Recommended for You** (top card) and **Top Opportunities This Week** (secondary ranked list).

### Role-Aware Output System

- **Agency / Consultant view** — full execution detail: Best First Asset, Top 3 Asset Paths, Builder Fit Strategy, Recommended Tool Stack, Execution Angle, Time-to-value, "How to build this"
- **Investor / Venture Studio view** — **Asset Thesis** replaces Builder Fit: Best First Asset, why this entry point, Expansion Ladder, monetization logic, market maturity, procurement/buyer signals, risk level. Hides tool stack, builder fit, and technical build paths.

### Distribution Loop — Weekly Signal Brief

The **Newsletter Engine** (`/newsletter-engine`) sends a weekly brief: 3 short signals, 1 featured opportunity, Best First Asset teaser only, CTA to dashboard. No full dossier in email.

### MVP pipeline

```text
Collect → Normalize → Cluster → Keyword Enrichment → Market Validation → Procurement Validation
→ Scoring → Asset Strategy → Human Review → Opportunity Brief → Publish
```

### Long-term expansion (preserved, not MVP)

- Complaint & Incident Signals (Phase 2)
- Developer friction sources — GitHub, Stack Exchange (Phase 2)
- Healthcare vertical (Phase 3)
- Digital Infrastructure amplifiers (Future Research)
- Additional agencies, procurement portals, verticals

Full expansion spec: [architecture.md](./architecture.md) § Future Expansion.

## Opportunity Output Structure

Every paid opportunity follows seven sections:

1. Opportunity Snapshot
2. Why This Exists
3. Signal Breakdown
4. Build Strategy
5. Execution Angle
6. Competitive Differentiator
7. Why This Matters

Not all opportunities should start as software. Build Strategy defines the best first asset and expansion path.

Full spec: [med-sections.md](./med-sections.md).

## Guardrails (Summary)

### Publish guardrails (unchanged)

1. **No signal stands alone** — reject if only one source type without pressure, demand, or friction.
2. **Must map to buyer + workflow** — reject if no clear buyer or repeatable workflow.
3. **Must improve decision** — keep only if it helps decide what to build, how to win, or what to sell, recommend, validate, or fund.
4. **Reject noise** — crypto hype, token speculation, creator monetization, experimental novelty, non-B2B use cases.

### Recommendation guardrails (Decision Layer)

Do **not** recommend an opportunity if:

- software/buildability is unclear
- buyer is unclear
- fewer than 2 evidence layers
- confidence level is Low

Full rules: [architecture.md](./architecture.md) § Guardrail System.

## Constraints (Do Not Build Yet)

- No AI generation
- No analytics
- No complex auth roles
- No overbuilt styling
- No complaint ingestion in MVP
- No healthcare ingestion in MVP
- No onchain/x402 in MVP

## Success Criteria

- MVP consistently produces high-quality opportunities in the compliance + contractor + public-sector wedge
- Opportunities can be created via admin with layered validation evidence
- **Decision Layer** returns a defensible top recommendation per user with 3 "why this fits" bullets
- Dashboard leads with **Recommended for You** — not an undifferentiated opportunity list
- Role-aware rendering shows execution detail for agency/consultant and Asset Thesis for investor/venture_studio
- Structure matches MED spec (seven-section dossier) with role visibility config
- Confidence Level and Time to First Revenue calculated and displayed
- Weekly Signal Brief drives dashboard CTA without exposing full dossiers
- Admin review workflow is usable
- Architecture is impossible to confuse with HigherGov, GovSignals, Contify, Crayon, Klue, or Exploding Topics
