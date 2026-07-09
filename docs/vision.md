# Vision

See [MED.md](./MED.md) for documentation governance. Current status: [project-state.md](./project-state.md).

## What DataTello Is

DataTello is **not** a general market intelligence platform.

DataTello is an **evidence-backed build opportunity intelligence platform** that discovers overlooked compliance- and procurement-backed workflow problems and converts them into buildable assets.

It validates build opportunities through **layered evidence** — not from a single signal. Users receive source-backed dossiers grounded in operational pain, market wedge, procurement signals, and build strategy.

DataTello sells **build opportunities**. It is not a trend feed, a startup idea list, a generic market scanner, or a competitive intelligence dashboard.

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

## MVP Target Users

| Segment | Core question |
|---------|---------------|
| **Builders** | What compliance- or procurement-backed workflow should I build first? |
| **Agencies** (compliance-heavy industries) | What can we sell, implement, or productize for contractor and environmental clients? |
| **Consultants** (contractor/environmental) | What should we recommend, advise on, or turn into client-facing memos? |

**Future customer segments** (not MVP positioning): Investors, VCs, HoldCos, Product Studios, Enterprise.

Onboarding and default lens: [onboarding.md](./onboarding.md).

## Product Structure

### MVP Core Engine

1. Pressure Discovery — OSHA, EPA ECHO, Federal Register
2. Demand Validation — DataForSEO
3. Market Wedge Validation — manual research, G2, Capterra
4. Workflow Friction Signals — job postings, procurement/RFP language
5. Procurement Validation — SAM.gov, USAspending

Plus scoring, guardrails, and human review.

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

1. **No signal stands alone** — reject if only one source type without pressure, demand, or friction.
2. **Must map to buyer + workflow** — reject if no clear buyer or repeatable workflow.
3. **Must improve decision** — keep only if it helps decide what to build, how to win, or what to sell, recommend, validate, or fund.
4. **Reject noise** — crypto hype, token speculation, creator monetization, experimental novelty, non-B2B use cases.

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
- Opportunities display correctly on dashboard and detail pages
- Structure matches MED spec (seven-section dossier)
- Admin review workflow is usable
- Messaging reflects builders, agencies, and consultants — not generic intelligence positioning
- Architecture is impossible to confuse with HigherGov, GovSignals, Contify, Crayon, Klue, or Exploding Topics
