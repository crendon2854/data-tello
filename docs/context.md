# Context — Long-Term Architectural Truths

Documentation Version: 1.1  
Last Updated: 2026-07-08  
Status: Active  
Owner: DataTello Engineering

Stable facts about DataTello that rarely change. If one of these changes, update this file, add an ADR to [decisions.md](./decisions.md), and update [architecture.md](./architecture.md).

See [MED.md](./MED.md) for documentation governance.

---

## Product Identity

- DataTello delivers **evidence-backed build opportunities** using structured signals, scoring, and guardrails.
- DataTello is **not** a trend idea finder, startup idea list, or generic market scanner.
- A **Build Opportunity** is a validated way to create value in a market, backed by source-backed evidence and operational pain.
- Output names are fixed: **Weekly Signal Brief**, **Opportunity Dossier**, **Dashboard Brief View**, **PDF Dossier**.
- Every paid opportunity recommends a **best first asset** — software is one path among several, not the default assumption.
- DataTello is a **premium intelligence product** and **decision-support tool** for higher-value users.

Full positioning: [vision.md](./vision.md)

---

## Target ICP

Primary users:

| Persona | Core question |
|---------|---------------|
| **Agencies** | What new services or offers can we sell? |
| **Consultants** | What should we advise clients to do? |
| **Investors** | Where are new markets and opportunities forming? |

All product messaging, dossier framing, and dashboard copy should answer these questions.

---

## Persona Execution Lens

Same opportunity → same truth layer → different execution lens.

**Truth layer (everyone sees):** signals, scores, problem, buyer, evidence, competitive reality, risks.

**Persona lens (presentation only):** section emphasis, CTA wording, asset path ordering/labels, dashboard copy, labels and helper text.

Primary personas: **agency**, **consultant**, **investor**.

Persona lens must **never** alter opportunity data, scores, signals, or evidence. See [med-sections.md](./med-sections.md).

---

## System Boundaries

Four separate systems. Do not merge responsibilities.

| System | Owns | Does not own |
|--------|------|--------------|
| **DataTello Core** | Ingestion, scoring, review, dashboard publishing | Newsletter sends, PDF templates, outbound prospecting |
| **Newsletter Engine** | Free subscribers, Weekly Signal Brief, autoresponder | Full paid dossiers, PDF generation |
| **Dossier Builder** | Paid dossiers, PDF export, templates | Newsletter subscriber management |
| **Growth Automation Stack** | n8n, AI agents, outbound prospecting | Core ingestion, clustering, scoring |

Full boundaries: [architecture.md](./architecture.md)

---

## Product Structure

### 1. Core Engine (unchanged)

Four scoring lanes:

1. **Pressure Discovery** — real-world operational pressure
2. **Demand Validation** — search behavior, buyer language, CPC (DataForSEO)
3. **Market Wedge Validation** — category gaps, competition, spend
4. **Workflow Friction Signals** — repeated execution pain (GitHub, Stack Exchange, job postings)

Friction is an **internal modifier** — it boosts pressure, wedge, and buildability; it is not a standalone public score.

### 2. Complaint & Incident Signals (core expansion)

Where real users repeatedly experience failure.

- Detects repeated real-world failures
- Reveals operational pain before demand spikes
- Used for regulated and operational industries
- Visual and analytical in the dashboard; does not alone determine final opportunities

### 3. Emerging Digital Infrastructure Signals (secondary expansion)

Analytical views of infrastructure shifts. Four sub-modules only:

- Agent Commerce Signals
- Stablecoin Workflow Signals
- Onchain Developer Tool Friction
- Tokenized Data / Pay-Per-Use Data Signals

Visual and analytical only — charts, patterns, trends. Does not determine final opportunities.

### Scoring Rule

**Final opportunities are determined by DataTello's structured scoring engine, guardrails, and human review — not by any single signal layer.**

---

## Non-Negotiable Rules

1. Core intelligence stays in **Next.js + Supabase**.
2. **n8n is for marketing automation only** — never core ingestion or scoring.
3. **Human review** controls final buyer, asset fit, competitive entry, and publish approval.
4. **AI assists; AI does not autopublish.**
5. **Section-driven, card-based UI** — one component per MED section.
6. **Mock mode must always work** — dev without Supabase env vars.
7. **Docs before code** — plan in docs, implement second.
8. **Expansion signal layers are analytical** — they inform review; they do not override scoring.

---

## Scoring Model (V1)

- Public scores: pressure, demand, wedge, buildability, asset fit.
- **Buildability + Asset Fit** replaced software-likelihood.
- **Asset Strategy**, **Builder Fit Strategy**, and **Competitive Differentiator Strategy** are required dossier sections.
- Competitor count alone is insufficient — qualitative differentiation required.

Full spec: [med-sections.md](./med-sections.md)

---

## Data Flow

```text
Source Sync → Raw Signals → Normalize/Classify → Problem Zones → Keyword Enrichment → Market/Friction Proof → Candidate Opportunity → Guardrails → Human Review → Publish → PDF Dossier
```

Complaint & Incident Signals and Emerging Digital Infrastructure Signals feed analytical views in parallel; they do not bypass the scoring engine.

Full flow and freshness rules: [architecture.md](./architecture.md)

---

## Freeze / Revisit (V1)

**Frozen for V1:**

- Product positioning as evidence-backed opportunity intelligence for agencies, consultants, and investors
- Core Engine signal lanes and scoring model
- Complaint & Incident Signals as core expansion layer (documented; implementation phased)
- Emerging Digital Infrastructure Signals as secondary expansion (four sub-modules only)
- Newsletter Engine and Dossier Builder separation
- Core app in Next.js + Supabase
- n8n only for Growth Automation Stack
- Asset Strategy and Builder Fit Strategy
- Human review before publishing

**Revisit after V1:**

- Deeper personalization, full workflow builder, social-listening sources
- Affiliate marketplace, advanced BI, multi-admin permissions

Full ADR list: [decisions.md](./decisions.md)
