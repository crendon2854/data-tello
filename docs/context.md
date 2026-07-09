# Context — Long-Term Architectural Truths

Documentation Version: 1.5  
Last Updated: 2026-07-09  
Status: Active  
Owner: DataTello Engineering

Stable facts about DataTello that rarely change. If one of these changes, update this file, add an ADR to [decisions.md](./decisions.md), and update [architecture.md](./architecture.md).

See [MED.md](./MED.md) for documentation governance.

---

## Product Identity

- DataTello is **not** a research dashboard or general market intelligence platform.
- DataTello is an **evidence-backed decision engine** for build opportunities.
- DataTello tells each user **what to build or act on first** — not "here are some interesting opportunities."
- DataTello validates opportunities through **layered evidence** — not from a single signal.
- A **Build Opportunity** is a validated way to create value in a market, backed by source-backed evidence and operational pain.
- The **Decision Layer** (`getRecommendedOpportunity`) ranks opportunities per user role and preferences.
- The **Role-Aware Output System** changes presentation by role — agency/consultant see execution detail; investor/venture_studio see Asset Thesis.
- Output names are fixed: **Weekly Signal Brief**, **Opportunity Dossier**, **Dashboard Brief View**, **PDF Dossier**, **Recommended for You**.
- **Not all opportunities should start as software.** Every paid opportunity includes Build Strategy with a best first asset.

Full positioning: [vision.md](./vision.md). MVP wedge and source stack: [architecture.md](./architecture.md).

---

## MVP Wedge (Locked)

**Environmental Compliance** + **Contractor Safety** + **Public-sector compliance workflows**

Everything else is future expansion. Additional industries and evidence layers ship only after the MVP consistently produces high-quality opportunities.

---

## Architecture Phases

| Phase | What ships |
|-------|------------|
| **MVP** | Compliance wedge, OSHA/EPA/Federal Register, DataForSEO, SAM.gov/USAspending, procurement + job-posting friction |
| **Phase 2** | Complaint signals, developer friction, additional agencies, market wedge expansion |
| **Phase 3** | Healthcare vertical |
| **Future Research** | Onchain/x402, digital infrastructure amplifiers, investor/enterprise intelligence |

The long-term layered validation model is **preserved**. MVP is a focused subset.

---

## Layered Validation Architecture (Long-Term)

Each layer answers a different question:

| Layer | Question | MVP |
|-------|----------|-----|
| Pressure | Is the problem forming? | ✅ |
| Demand | Are people looking for it? | ✅ |
| Wedge | Can you sell into it? | ✅ |
| Friction | Are people failing to solve it? | ✅ |
| Procurement | Is buyer intent and budget real? | ✅ |
| Complaints | Are real users repeatedly affected? | Phase 2 |
| Digital Infrastructure | Does emerging infra strengthen confidence? | Future Research |

Steps 1–5 (Pressure through Complaints) form **Base Opportunity Confidence** in the long-term model. MVP forms confidence from Pressure, Demand, Wedge, Friction, and Procurement Validation.

### Confidence amplification (long-term Step 6)

| Amplifier | Question | Phase |
|-----------|----------|-------|
| Digital Infrastructure | Does emerging infrastructure strengthen confidence? | Future Research |

Step 6 amplifies confidence — it does not replace base validation and does not discover opportunities on its own. **Not in MVP scoring or ingestion.**

---

## MVP Target Roles

| Role | Core question |
|------|---------------|
| **agency** | What can we sell, implement, or productize for clients? |
| **consultant** | What should we recommend, advise on, or turn into client memos? |
| **investor** | What should we fund, validate, monitor, or compare? |
| **venture_studio** | What is worth validating and spinning up next? |
| **general** | What should I act on first? (fallback) |

Onboarding + Decision Layer: [onboarding.md](./onboarding.md), [architecture.md](./architecture.md) § Decision Layer.

---

## Same Engine, Role-Aware Output

Same opportunity engine and validation layers. Different by role:

- default lens and section visibility
- execution vs Asset Thesis output
- Decision Layer ranking and "why this fits" bullets
- collaboration level
- monitoring depth

Persona lens must **never** alter opportunity data, scores, signals, or evidence. See [med-sections.md](./med-sections.md) and [architecture.md](./architecture.md) § Role-Aware Output System.

---

## System Boundaries

Four separate systems. Do not merge responsibilities.

| System | Owns | Does not own |
|--------|------|--------------|
| **DataTello Core** | Ingestion, scoring, review, dashboard publishing | Newsletter sends, PDF templates, outbound prospecting |
| **Newsletter Engine** | Free subscribers, Weekly Signal Brief (teaser only) | Full paid dossiers, PDF generation |
| **Dossier Builder** | Paid dossiers, PDF export, templates | Newsletter subscriber management |
| **Growth Automation Stack** | n8n, AI agents, outbound prospecting | Core ingestion, clustering, scoring |

Full boundaries: [architecture.md](./architecture.md)

---

## Scoring Model

### Public scores (MVP and long-term)

- **Pain** (Pressure)
- **Demand**
- **Market** (Wedge)
- **Freshness**
- **Buildability**
- **Asset Fit**

### Hidden modifiers

| Modifier | MVP | Long-term |
|----------|-----|-----------|
| **Friction** | ✅ | ✅ |
| **Procurement** | ✅ | ✅ |
| **Digital Infrastructure Boost** | ❌ | Future Research |

### Decision Layer fields (candidate reports)

- `recommended_rank_score`
- `recommended_reason[]` — 3 personalization bullets
- `confidence_level` — Low / Medium / High
- `time_to_value` — Fast / Medium / Slow
- `role_visibility_config` — per-role section visibility

Full spec: [database.md](./database.md)

---

## Guardrail System

1. **No signal stands alone** — reject if only one source type without pressure, demand, or friction.
2. **Must map to buyer + workflow** — reject if no clear buyer or repeatable workflow.
3. **Must improve decision** — keep only if it helps decide what to build, how to win, or what to sell, recommend, validate, or fund.
4. **Reject noise** — crypto hype, token speculation, creator monetization, experimental novelty, non-B2B use cases.

### Recommendation guardrails (Decision Layer)

Do **not** recommend if: buildability unclear, buyer unclear, fewer than 2 evidence layers, or `confidence_level` is Low.

---

## Opportunity Dossier Structure (Locked)

Seven sections, in order:

1. Opportunity Snapshot
2. Why This Exists
3. Signal Breakdown
4. Build Strategy
5. Execution Angle
6. Competitive Differentiator
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
8. **MVP proves the wedge** before expanding industries or evidence layers.
9. **Friction modifies scoring** — it does not decide opportunities alone.
10. **Complaints validate clusters** — Phase 2; not MVP ingestion.

---

## Data Flow

### MVP

```text
Source Sync → Normalize → Cluster → Keyword Enrichment → Market Validation → Procurement Validation
→ Scoring → Asset Strategy → Guardrails → Human Review → Publish → PDF Dossier
```

### Long-term

```text
Source Sync → Normalize → Cluster → Enrich (Demand, Wedge, Friction, Complaints)
→ Base Opportunity → Digital Infrastructure Amplification → Guardrails → Human Review → Publish → PDF Dossier
```

Full flow: [architecture.md](./architecture.md)

---

## Freeze / Revisit

**Frozen for MVP launch:**

- MVP wedge: environmental compliance + contractor safety + public-sector compliance
- MVP source stack (see architecture.md)
- MVP pipeline (Collect → Publish)
- Seven-section Opportunity Dossier output structure
- Guardrail system (four rules)
- Core app in Next.js + Supabase
- n8n only for Growth Automation Stack
- Human review before publishing
- Scoring: Pain, Demand, Market, Freshness, Buildability, Asset Fit + Friction/Procurement modifiers

**Preserved for expansion (not MVP):**

- Full five-layer + digital infrastructure long-term model
- Complaint & Incident Signals (Phase 2)
- Healthcare vertical (Phase 3)
- Onchain / x402 (Future Research)
- Investor, enterprise, and white-label customer segments

Full ADR list: [decisions.md](./decisions.md). Future Expansion detail: [architecture.md](./architecture.md) § Future Expansion.
