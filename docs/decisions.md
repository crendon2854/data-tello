# Decision Log

Record significant choices so the team stays aligned. This file is the home for all Architecture Decision Records (ADRs).

See [MED.md](./MED.md) for documentation governance and when ADRs are required.

## ADR Policy

### When to add an ADR

Add a new record when a decision affects how the system is built, operated, or understood long-term. Examples:

- **New workflow** — e.g. a new review stage, publish gate, or admin tool
- **New scoring logic** — guardrails, lane weights, friction modifiers
- **New database pattern** — table design, naming convention, migration strategy
- **New external dependency** — API, service, or infrastructure integration
- **Major UX change** — information architecture, dossier structure, admin layout
- **Security change** — auth, RLS, data access, or secrets handling

Do **not** add an ADR for routine implementation details (bug fixes, copy tweaks, refactors that preserve behavior).

### Required fields

Every ADR must include all five fields:

| Field | Description |
|-------|-------------|
| **Context** | Why this came up; what problem or constraint triggered the decision |
| **Decision** | What was chosen |
| **Alternatives** | What was rejected and why |
| **Consequences** | Trade-offs, follow-up work, risks, and things future contributors should watch |
| **Date** | When the decision was made (`YYYY-MM-DD`) |

### Format

```text
### YYYY-MM-DD Title

**Context:** Why this came up
**Decision:** What we chose
**Alternatives:** What we rejected
**Consequences:** Trade-offs and follow-up implications
```

---

> **Note:** ADRs recorded before documentation governance (2026-07-07) may omit the **Consequences** field. New ADRs must include all five required fields per the ADR policy above.

### 2026-07-07 Port 3001 for local dev

**Context:** Another project occupies port 3000.
**Decision:** Run dev and start scripts on port 3001 (`next dev -p 3001`).
**Alternatives:** Use env var `PORT=3001` — rejected for explicit script clarity.

### 2026-07-07 Mock data fallback

**Context:** Need to develop UI before Supabase is connected.
**Decision:** `lib/queries.ts` falls back to `lib/mock-data.ts` when env vars are unset.
**Alternatives:** Require Supabase from day one — rejected for slower iteration.

### 2026-07-07 Section-driven architecture

**Context:** Opportunity detail must match MED spec exactly.
**Decision:** One React component per MED section; pages compose them inside `Card`.
**Alternatives:** Single monolithic detail component — rejected for reuse in admin forms.

### 2026-07-07 Docs in /docs

**Context:** Need alignment layer as the app grows.
**Decision:** Living markdown docs indexed from `docs/README.md`.
**Alternatives:** Wiki or Notion — rejected for co-location with code.

### 2026-07-08 Layered validation architecture and ICP expansion

**Context:** Documentation and product messaging needed to reflect that DataTello validates through layered evidence, not single-signal discovery. Complaint & Incident Signals elevated to core Engine layer 5. Venture Studio / Product Studio added as fourth ICP. Onboarding flow and guardrail system required formal documentation.

**Decision:** Lock layered validation architecture: Pressure → Demand → Wedge → Friction → Complaints → Base Opportunity → Digital Infrastructure amplification. Complaint & Incident Signals are mandatory core validation (clusters; CFPB, FDA/MAUDE, NHTSA, FCC). Emerging Digital Infrastructure Signals remain four amplifiers only. Add guardrail rules (no signal alone, buyer+workflow, improve decision, reject noise). Add Digital Infrastructure Boost (0–10) as internal confidence amplifier. Add ICP onboarding docs with shared flow and distinct default lens per agency/consultant/investor/venture studio. Remove builder/vibe-coder language from all docs (homepage deferred).

**Alternatives:** Keep Complaint & Incident as optional expansion — rejected. Add DAO/grants/compliance modules — rejected. Treat digital infrastructure as discovery layer — rejected.

**Consequences:** New [onboarding.md](./onboarding.md). [architecture.md](./architecture.md), [med-sections.md](./med-sections.md), [context.md](./context.md) rewritten. Phase 13 onboarding implementation added to roadmap. `persona-lens.ts` venture studio alignment pending in code.

### 2026-07-08 Canonical seven-section Opportunity Dossier

**Context:** Dossier output needed a single canonical structure aligned with premium ICP positioning and Asset Strategy emphasis.

**Decision:** Lock paid dossier to seven sections: Opportunity Snapshot, Why This Exists, Signal Breakdown, Asset Strategy, Execution Angle, Competitive Differentiator Strategy, Why This Matters. Asset Strategy requires best first asset, top 3 paths, why format wins, expansion path, zip-ready fit, revenue ceiling. Workflow Friction modifies Pain, Market Wedge, Buildability — not a standalone decision engine.

**Alternatives:** Keep Builder Fit in primary dossier output — rejected for ICP focus.

**Consequences:** `med-sections.md` is canonical. Component names (`BuildStrategy`, `CompetitiveAngle`) map to Asset Strategy and Competitive Differentiator Strategy until renamed in code.

### 2026-07-08 Strategic repositioning and signal layer expansion

**Context:** DataTello repositioned from builder-focused messaging to premium opportunity intelligence for agencies, consultants, and investors. Two expansion signal layers were added to the product architecture.

**Decision:** Reframe all documentation and product messaging around evidence-backed build opportunities using structured signals, scoring, and guardrails. Primary ICP: agencies, consultants, investors. Add Complaint & Incident Signals as core expansion and Emerging Digital Infrastructure Signals as secondary expansion (four sub-modules only). Expansion layers are visual/analytical only — final opportunities determined by scoring engine, guardrails, and human review.

**Alternatives:** Continue builder/indie-hacker positioning — rejected. Add DAO/compliance/grants sub-modules — rejected.

**Consequences:** Landing copy, docs, and dossier framing updated. Implementation of new signal workspaces phased in roadmap Phases 14–15. Builder Fit Strategy retained as internal admin only.

### 2026-07-07 Positioning: build opportunities, not trend ideas

**Context:** DataTello could be misread as a generic trend or idea finder.
**Decision:** Position the product as evidence-backed build-opportunity intelligence for agencies, consultants, and investors.
**Alternatives:** Trend ideas, startup ideas, or software-only ideas — rejected because they are either too broad or too narrow.

### 2026-07-07 Output names: briefs and dossiers

**Context:** Calling every output a report creates confusion.
**Decision:** Use Weekly Signal Brief for free newsletter emails and Opportunity Dossier / PDF Dossier for paid dashboard assets.
**Alternatives:** Report as the primary term — rejected for user-facing language.

### 2026-07-07 Newsletter Engine and Dossier Builder are separate

**Context:** The workflow/PDF builder could accidentally become a newsletter builder.
**Decision:** Dossier Builder generates full paid Opportunity Dossiers and PDFs only. Newsletter Engine handles free subscriber emails and autoresponder basics.
**Alternatives:** One workflow builder for both — rejected because it blurs product boundaries.

### 2026-07-07 Core app uses Next.js + Supabase, not n8n

**Context:** n8n was discussed for automation, but core ingestion/scoring needs to stay inside the app.
**Decision:** Core source ingestion, clustering, scoring, dashboard publishing, and dossier generation live in Next.js + Supabase.
**Alternatives:** n8n for core ingestion/scoring — rejected to avoid fragile business logic outside the app.

### 2026-07-07 n8n and Oracle belong to Growth Automation Stack

**Context:** Marketing automation and outbound prospecting are useful but separate from the product core.
**Decision:** Use n8n, AI agents, and Oracle VPS/cloud infrastructure for marketing/growth automation only.
**Alternatives:** Mix growth automation into the Research OS — rejected.

### 2026-07-07 Signal lanes renamed

**Context:** Workflow A/B/C labels were too abstract.
**Decision:** Use Pressure Discovery, Demand Validation, Market Wedge Validation, and Workflow Friction Signals.
**Alternatives:** Workflow A/B/C — rejected for unclear user/admin language.

### 2026-07-07 Add Workflow Friction Signals as fourth lane

**Context:** Pressure, demand, and wedge proof do not fully show whether people are struggling to execute the workflow.
**Decision:** Add Workflow Friction Signals using GitHub, Stack Exchange, Greenhouse, and Lever for repeated workflow pain and manual workaround evidence.
**Alternatives:** Social listening from Reddit/X/Product Hunt/Hacker News — rejected for V1 because it adds noise.

### 2026-07-07 Friction is an internal modifier, not a public score

**Context:** A standalone friction score would double-count pain.
**Decision:** Use friction to modify pressure, wedge, and buildability internally.
**Alternatives:** Add friction as a seventh public score — rejected.

### 2026-07-07 Replace software-likelihood with Buildability + Asset Fit

**Context:** Not every real opportunity should become SaaS first.
**Decision:** Use Buildability to judge whether something useful can be built and Asset Fit to choose the best first asset.
**Alternatives:** Software-likelihood only — rejected because it forces everything into software.

### 2026-07-07 Add Asset Strategy

**Context:** Users need to know what to build first, not just whether the idea is good.
**Decision:** Every paid Opportunity Dossier includes Best First Asset, Top 3 Asset Paths, Expansion Ladder, Zip-Ready Fit, Revenue Ceiling, and Recommended AI Build Stack.
**Alternatives:** Generic recommended build — rejected as too shallow.

### 2026-07-07 Add Delivery Fit Strategy (internal)

**Context:** Different organization types need different delivery recommendations for the same opportunity.

**Decision:** Add delivery fit by organization type and tool stack (`builder_fit_strategy` table). Retained as internal admin only — not in seven-section paid dossier output.

**Alternatives:** One universal tech stack — rejected.

### 2026-07-07 Add Competitive Differentiator Strategy

**Context:** Competitor count alone is weak and can be misread.
**Decision:** Add a qualitative competitive strategy covering complaints, underserved segment, differentiation, avoid-first guidance, entry path, and small-operator right-to-win.
**Alternatives:** Numeric competitor score — rejected for false precision.

### 2026-07-07 Add System Health / Connector Repair

**Context:** Source APIs and schemas will break over time.
**Decision:** Build System Health with connector status, failed syncs, schema changes, repair logs, and human approval.
**Alternatives:** Manual debugging only — rejected. Fully autonomous AI repair of business logic — also rejected.

### 2026-07-07 Keep human review as final quality gate

**Context:** AI can draft and score, but weak opportunities often come from bad buyer/wedge calls.
**Decision:** Human review controls final buyer, asset fit, competitive entry, and publish approval.
**Alternatives:** Full AI autopilot publishing — rejected.

## Freeze / Revisit Rules

Freeze for V1:

- Layered validation architecture (five core layers + four digital infrastructure amplifiers)
- ICP: agencies, consultants, investors, venture studios / product studios
- Guardrail system (four rules)
- Onboarding flow and ICP default lens model
- Complaint & Incident Signals as core Engine layer 5
- Emerging Digital Infrastructure Signals (four sub-modules only; amplifiers not discovery)
- Newsletter Engine and Dossier Builder separation
- Core app in Next.js + Supabase
- n8n only for Growth Automation Stack
- Asset Strategy and Competitive Differentiator Strategy (seven-section dossier)
- Human review before publishing
- Expansion signal layers are analytical only

Revisit after V1:

- deeper personalization
- full workflow builder
- social-listening sources
- affiliate marketplace
- advanced BI dashboards
- multi-admin permissions