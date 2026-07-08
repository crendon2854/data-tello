# Vision

See [MED.md](./MED.md) for documentation governance. Current status: [project-state.md](./project-state.md).

## What DataTello Is

DataTello validates build opportunities through **layered evidence** — not from a single signal.

It is a premium opportunity intelligence platform and decision-support system for agencies, consultants, investors, and venture studios / product studios. Users receive source-backed dossiers grounded in operational pain, market wedge, complaint clusters, and asset strategy.

DataTello is **not** a trend feed, a startup idea list, or a generic market scanner.

## Core Principle (Locked)

Each base validation layer answers a different question:

| Layer | Question |
|-------|----------|
| Pressure | Is the problem forming? |
| Demand | Are people looking for it? |
| Wedge | Can you sell into it? |
| Friction | Are people failing to solve it? |
| Complaints | Are real users repeatedly affected? |

Steps 1–5 form **Base Opportunity Confidence**.

**Confidence amplification (Step 6):** Digital Infrastructure signals strengthen confidence in an already-validated opportunity. They do **not** discover or create opportunities on their own.

This layered architecture is the system's authentication layer. No single signal stands alone.

## Target Users

| ICP | Core question |
|-----|---------------|
| **Agencies** | What can we sell, implement, or productize for clients? |
| **Consultants** | What should we recommend, advise on, or turn into client-facing memos? |
| **Investors** | What should we fund, validate, monitor, or compare as a thesis/deal opportunity? |
| **Venture Studios / Product Studios** | What opportunities are worth validating, matching to operators, and prioritizing across repeated bets? |

Onboarding and default lens: [onboarding.md](./onboarding.md).

## Product Structure

### Core Engine (five validation layers)

1. Pressure Discovery
2. Demand Validation
3. Market Wedge Validation
4. Workflow Friction Signals
5. Complaint & Incident Signals — **mandatory core realism layer**

These create **Base Opportunity Confidence**.

Plus scoring, guardrails, and human review.

### Confidence amplifiers (after base opportunity formed)

**Emerging Digital Infrastructure Signals** — four modules only. These are **not** discovery layers and **not** standalone opportunity engines. They strengthen confidence, urgency, asset decisions, and wedge clarity for opportunities already validated through Steps 1–5.

### System flow

```text
Pressure → Demand → Wedge → Friction → Complaints → BASE OPPORTUNITY FORMED
→ Digital Infrastructure Signals → confidence / urgency / asset / wedge amplification
→ Guardrails → Human Review → Publish
```

## Opportunity Output Structure

Every paid opportunity follows seven sections:

1. Opportunity Snapshot
2. Why This Exists
3. Signal Breakdown
4. Asset Strategy
5. Execution Angle
6. Competitive Differentiator Strategy
7. Why This Matters

Not all opportunities should start as software. Asset Strategy defines the best first asset and expansion path.

Full spec: [med-sections.md](./med-sections.md).

## Guardrails (Summary)

1. **No signal stands alone** — reject if only digital infrastructure signals exist without pressure, demand, or friction.
2. **Must map to buyer + workflow** — reject if no clear buyer or repeatable workflow.
3. **Must improve decision** — keep only if it helps decide what to build, how to win, or what to sell, recommend, validate, or fund.
4. **Reject noise** — crypto hype, token speculation, creator monetization, experimental novelty, non-B2B use cases.

Full rules: [architecture.md](./architecture.md) § Guardrail System.

## Constraints (Do Not Build Yet)

- No AI generation
- No analytics
- No complex auth roles
- No overbuilt styling

## Success Criteria

- Opportunities can be created via admin with layered validation evidence
- Opportunities display correctly on dashboard and detail pages
- Structure matches MED spec (seven-section dossier)
- Admin review workflow is usable
- Messaging reflects agency, consultant, investor, and venture studio use cases
- Onboarding captures targeting and applies default filters (when implemented)
