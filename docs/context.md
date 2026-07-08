# Context — Long-Term Architectural Truths

Documentation Version: 1.3  
Last Updated: 2026-07-08  
Status: Active  
Owner: DataTello Engineering

Stable facts about DataTello that rarely change. If one of these changes, update this file, add an ADR to [decisions.md](./decisions.md), and update [architecture.md](./architecture.md).

See [MED.md](./MED.md) for documentation governance.

---

## Product Identity

- DataTello does **not** discover opportunities from a single signal. It **validates opportunities through layered evidence**.
- DataTello is **not** a trend idea finder, startup idea list, or generic market scanner.
- A **Build Opportunity** is a validated way to create value in a market, backed by source-backed evidence and operational pain.
- Output names are fixed: **Weekly Signal Brief**, **Opportunity Dossier**, **Dashboard Brief View**, **PDF Dossier**.
- **Not all opportunities should start as software.** Every paid opportunity includes Asset Strategy with a best first asset.
- DataTello is a **premium intelligence product**, **decision-support system**, and **opportunity intelligence platform**.

Full positioning: [vision.md](./vision.md)

---

## Layered Validation Architecture

Each layer answers a different question:

| Layer | Question |
|-------|----------|
| Pressure | Is the problem forming? |
| Demand | Are people looking for it? |
| Wedge | Can you sell into it? |
| Friction | Are people failing to solve it? |
| Complaints | Are real users repeatedly affected? |

Steps 1–5 (Pressure through Complaints) form **Base Opportunity Confidence**.

### Confidence amplification (Step 6)

| Amplifier | Question |
|-----------|----------|
| Digital Infrastructure | Does emerging infrastructure strengthen confidence in an already-validated opportunity? |

Step 6 (Digital Infrastructure) amplifies confidence — it does not replace base validation and does not discover opportunities on its own.

---

## Target ICP

| ICP | Core question |
|-----|---------------|
| **Agencies** | What can we sell, implement, or productize for clients? |
| **Consultants** | What should we recommend, advise on, or turn into client-facing memos? |
| **Investors** | What should we fund, validate, monitor, or compare as a thesis/deal opportunity? |
| **Venture Studios / Product Studios** | What opportunities are worth validating, matching to operators, and prioritizing across repeated bets? |

Onboarding, default lens, and feed rules: [onboarding.md](./onboarding.md).

---

## Same Engine, Different Default Lens

Same opportunity engine for everyone. Different by ICP:

- default lens
- execution outputs
- collaboration level
- monitoring depth

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

## Core Engine (Five Layers)

All five layers are required for Base Opportunity Confidence:

1. **Pressure Discovery** — real-world operational pressure
2. **Demand Validation** — search behavior, buyer language, CPC (DataForSEO)
3. **Market Wedge Validation** — category gaps, competition, spend
4. **Workflow Friction Signals** — repeated execution failure
5. **Complaint & Incident Signals** — repeated real-world failure clusters

### Workflow Friction Rule

Workflow Friction = repeated execution failure.

- Modifies scoring: **Pain**, **Market Wedge**, **Buildability**
- Internal modifier only — not a standalone public score
- Does **not** act as a standalone decision engine

### Complaint & Incident Rule

- **Mandatory core Engine layer 5** — first-class realism layer, not an optional add-on
- Strongest realism layer for operational breakdown
- Focuses on **clusters**, not individual complaints
- Strengthens Pain confidence, buyer specificity, urgency
- Source categories include CFPB, FDA/MAUDE, NHTSA, FCC

### Digital Infrastructure Rule

Four modules only — **confidence amplifiers**, not discovery layers and not standalone opportunity engines:

- Agent Commerce Signals
- Stablecoin Workflow Signals
- Onchain Developer Tool Friction
- Tokenized Data / Pay-Per-Use Data Signals

Do **not** add DAO, grants, onchain compliance as a standalone user-facing module, or other sub-modules without an ADR.

**Final opportunities are determined by DataTello's structured scoring engine, guardrails, and human review — not by any single signal layer.**

---

## Scoring Model (V1)

Public scores:

- **Pain** (Pressure)
- **Demand**
- **Market** (Wedge)
- **Freshness**
- **Buildability**
- **Asset Fit**

Internal modifiers:

- **Friction** — modifies Pain, Market, Buildability
- **Digital Infrastructure Boost** (0–10) — increases confidence, breaks ties, prioritizes; **not** a primary score

**Asset Strategy** and **Competitive Differentiator Strategy** are required dossier sections.

Full spec: [med-sections.md](./med-sections.md)

---

## Guardrail System

1. **No signal stands alone** — reject if only onchain/digital infrastructure signals exist without pressure, demand, or friction.
2. **Must map to buyer + workflow** — reject if no clear buyer or repeatable workflow.
3. **Must improve decision** — keep only if it helps decide what to build, how to win, or what to sell, recommend, validate, or fund.
4. **Reject noise** — crypto hype, token speculation, creator monetization, experimental novelty, non-B2B use cases.

---

## Opportunity Dossier Structure (V1)

Seven sections, in order:

1. Opportunity Snapshot
2. Why This Exists
3. Signal Breakdown
4. Asset Strategy
5. Execution Angle
6. Competitive Differentiator Strategy
7. Why This Matters

---

## Non-Negotiable Rules

1. Core intelligence stays in **Next.js + Supabase**.
2. **n8n is for marketing automation only** — never core ingestion or scoring.
3. **Human review** controls final buyer, asset fit, competitive entry, and publish approval.
4. **AI assists; AI does not autopublish.**
5. **Section-driven, card-based UI** — one component per MED section.
6. **Mock mode must always work** — dev without Supabase env vars.
7. **Docs before code** — plan in docs, implement second.
8. **Digital infrastructure amplifies** — it does not replace base validation.
9. **Friction modifies scoring** — it does not decide opportunities alone.
10. **Complaints validate clusters** — not isolated incidents.

---

## Data Flow

```text
Source Sync → Normalize → Cluster → Enrich (Demand, Wedge, Friction, Complaints)
→ Base Opportunity → Digital Infrastructure Amplification → Guardrails → Human Review → Publish → PDF Dossier
```

Full flow: [architecture.md](./architecture.md)

---

## Freeze / Revisit (V1)

**Frozen for V1:**

- Layered validation architecture (five core layers + four digital infrastructure amplifiers)
- ICP: agencies, consultants, investors, venture studios / product studios
- Seven-section Opportunity Dossier output structure
- Guardrail system (four rules)
- Onboarding flow and ICP default lens model
- Newsletter Engine and Dossier Builder separation
- Core app in Next.js + Supabase
- n8n only for Growth Automation Stack
- Human review before publishing

**Revisit after V1:**

- Deeper personalization, social-listening sources
- Affiliate marketplace, advanced BI, multi-admin permissions

Full ADR list: [decisions.md](./decisions.md)
