# DataTello MED Gap Implementation Plan

Historical reference document. For current product structure, see [architecture.md](./architecture.md), [context.md](./context.md), and [med-sections.md](./med-sections.md).

## Canonical Product Model

DataTello delivers evidence-backed build opportunities using structured signals, scoring, and guardrails.

Premium opportunity intelligence platform and decision-support system for agencies, consultants, and investors.

## Target ICP

| Persona | Core question |
|---------|---------------|
| Agencies | What services or products can we offer clients? |
| Consultants | What should we advise clients to do? |
| Investors | Where are new opportunities forming? |

## Core Signal Layers (all four required)

1. Pressure Discovery
2. Demand Validation
3. Market Wedge Validation
4. Workflow Friction Signals — detects repeated execution failure where people struggle to operationalize workflows; modifies Pain, Market Wedge, Buildability; not a standalone decision engine

## Expansion Layers

- **Complaint & Incident Signals** — where real-world failures repeatedly occur
- **Emerging Digital Infrastructure Signals** — Agent Commerce, Stablecoin Workflow, Onchain Developer Tool Friction, Tokenized Data / Pay-Per-Use Data (visual only)

Final opportunities are determined by DataTello's structured scoring engine, guardrails, and human review — not by any single signal layer.

## Scoring

Software Likelihood replaced by:

- Buildability Score
- Asset Fit Decision

## V1 Opportunity Dossier Output (seven sections)

1. Opportunity Snapshot
2. Why This Exists
3. Signal Breakdown
4. Asset Strategy — Best First Asset, Top 3 Asset Paths, Why This Format Wins First, Expansion Path (Template → Tool → SaaS), Zip-Ready Fit, Revenue Ceiling. Not all opportunities should start as software.
5. Execution Angle
6. Competitive Differentiator Strategy — Competitor Landscape, Review Complaint Patterns, Underserved Segment, Differentiation Angle, What NOT to Build, Competitive Entry Path
7. Why This Matters

## System Boundaries

See [architecture.md](./architecture.md) for DataTello Core, Newsletter Engine, Dossier Builder, and Growth Automation Stack.

## Non-Negotiable Rules

1. Do not mix Dossier Builder with Newsletter Engine.
2. Do not use n8n for core ingestion or scoring.
3. Do not show detailed internal scoring machinery as the main user value.
4. Do not force every opportunity into software.
5. Do not let AI auto-publish opportunities without human review.
6. Friction modifies scoring — it does not decide opportunities alone.
7. Expansion signal layers are visual — they do not determine final opportunities.
