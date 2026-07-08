# AI Development Playbook

Documentation Version: 1.1  
Last Updated: 2026-07-08  
Status: Active  
Owner: DataTello Engineering

Rules for Cursor and other AI-assisted development on DataTello.

See [MED.md](./MED.md) for engineering workflow. See [context.md](./context.md) for architectural truths.

---

## Mandatory Startup Procedure

Before implementing **ANY** feature:

1. Read [ai-rules.md](./ai-rules.md), [context.md](./context.md), [project-state.md](./project-state.md), [current-task.md](./current-task.md), [implementation-index.md](./implementation-index.md), [MED.md](./MED.md)
2. Read feature-specific docs only
3. Summarize understanding before coding
4. Then implement

---

## Architectural Truths (Never Violate)

1. **Layered validation** — five core layers form Base Opportunity Confidence; digital infrastructure amplifies only.
2. **No signal stands alone** — guardrails reject single-layer or infrastructure-only opportunities.
3. **Friction modifies scoring** — not a standalone decision engine.
4. **Complaints validate clusters** — first-class realism layer (core Engine layer 5); CFPB, FDA/MAUDE, NHTSA, FCC; not isolated incidents.
5. **Four digital infrastructure modules only** — confidence amplifiers, not discovery layers or standalone opportunity engines; no DAO, grants, or standalone onchain compliance modules.
6. **ICP lens is presentation only** — never alter scores, signals, or evidence. Consultant ≠ Agency default lens. Venture Studio ≠ Investor-only ICP.
7. **Mock mode must always work**.
8. **n8n is marketing automation only**.
9. **Newsletter Engine and Dossier Builder are separate**.

Full rules: [architecture.md](./architecture.md), [context.md](./context.md).

---

## Hard Rules

1. Never implement before planning — update docs in Phase 1 first.
2. Never duplicate documentation — link to the topic doc.
3. Never invent database fields without updating [database.md](./database.md).
4. Never add routes without updating [routes.md](./routes.md).
5. Never change architecture without updating [architecture.md](./architecture.md) and [context.md](./context.md).
6. Always preserve mock mode in `lib/queries.ts`.
7. Always run `npm run build` before marking work complete.

---

## Build Order

```text
Schema → Types → Queries → UI → Components
```

---

## Messaging Rules (Docs & Non-Homepage Code)

- Target ICPs: agencies, consultants, investors, venture studios / product studios
- Do **not** use builder, vibe-coder, indie hacker, solo builder, SaaS idea seeker, or "build this app" language in docs or non-homepage UI
- Homepage/landing files are exempt until explicitly updated
- Tone: sharp, analytical, structured, non-hype

---

## After You Ship

Update: [current-task.md](./current-task.md), [project-state.md](./project-state.md), [implementation-index.md](./implementation-index.md), [backlog.md](./backlog.md), [changelog.md](./changelog.md), [roadmap.md](./roadmap.md), [decisions.md](./decisions.md) as applicable.

---

## What Not to Do

- Do not build features marked out of scope in [roadmap.md](./roadmap.md)
- Do not add charts, AI generation, analytics, or complex auth without explicit request
- Do not merge Newsletter Engine and Dossier Builder responsibilities
- Do not treat digital infrastructure signals as discovery layers or standalone opportunity engines
- Do not skip mock data updates when schema changes
