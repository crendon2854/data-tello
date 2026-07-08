# DataTello MED Gap Implementation Plan

Historical reference document. For current product structure, see [architecture.md](./architecture.md), [context.md](./context.md), [med-sections.md](./med-sections.md), and [onboarding.md](./onboarding.md).

## Canonical Product Model

DataTello validates build opportunities through **layered evidence** — not from a single signal.

Premium opportunity intelligence for agencies, consultants, investors, and venture studios / product studios.

## Layered Validation Architecture

| Layer | Question |
|-------|----------|
| Pressure | Is the problem forming? |
| Demand | Are people looking for it? |
| Wedge | Can you sell into it? |
| Friction | Are people failing to solve it? |
| Complaints | Are real users repeatedly affected? |

Steps 1–5 → Base Opportunity Confidence.

### Confidence amplification (Step 6)

| Amplifier | Question |
|-----------|----------|
| Digital Infrastructure | Does emerging infrastructure strengthen confidence in an already-validated opportunity? |

Step 6 → confidence amplification only. Not a discovery layer. Not a standalone opportunity engine.

## Target ICP

| ICP | Core question |
|-----|---------------|
| Agencies | What can we sell, implement, or productize for clients? |
| Consultants | What should we recommend, advise on, or turn into client memos? |
| Investors | What should we fund, validate, monitor, or compare? |
| Venture Studios / Product Studios | What opportunities are worth validating, matching to operators, and prioritizing across repeated bets? |

## Core Engine (five layers)

1. Pressure Discovery
2. Demand Validation
3. Market Wedge Validation
4. Workflow Friction Signals — repeated execution failure; modifies Pain, Market, Buildability
5. Complaint & Incident Signals — cluster-based realism layer; CFPB, FDA/MAUDE, NHTSA, FCC

## Digital Infrastructure (four confidence amplifiers only)

- Agent Commerce Signals
- Stablecoin Workflow Signals
- Onchain Developer Tool Friction
- Tokenized Data / Pay-Per-Use Data Signals

Not discovery layers. Not standalone opportunity engines. Applied after base opportunity formed.

## Guardrails

1. No signal stands alone
2. Must map to buyer + workflow
3. Must improve decision
4. Reject noise (crypto hype, token speculation, creator monetization, non-B2B)

## Scoring

Public: Pain, Demand, Market, Freshness, Buildability, Asset Fit

Internal: Friction modifier, Digital Infrastructure Boost (0–10)

## V1 Opportunity Dossier (seven sections)

1. Opportunity Snapshot
2. Why This Exists
3. Signal Breakdown (+ Digital Infrastructure Evidence ratings)
4. Asset Strategy — Best First Asset, Top 3 Paths, Why This Wins First, Expansion Ladder, Revenue Ceiling, Build Difficulty
5. Execution Angle
6. Competitive Differentiator Strategy
7. Why This Matters

## Onboarding

3–5 step flow capturing user_type, industries, buyer_types, signal_types. Default lens varies by ICP. See [onboarding.md](./onboarding.md).

## System Boundaries

DataTello Core, Newsletter Engine, Dossier Builder, Growth Automation Stack — see [architecture.md](./architecture.md).

## Non-Negotiable Rules

1. Do not mix Dossier Builder with Newsletter Engine.
2. Do not use n8n for core ingestion or scoring.
3. Do not force every opportunity into software.
4. Do not let AI auto-publish without human review.
5. Digital infrastructure amplifies — does not replace base validation.
6. Complaints validate clusters — not isolated incidents.
