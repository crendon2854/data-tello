# DataTello MED Gap Implementation Plan

Historical reference document. For current product structure, see [architecture.md](./architecture.md), [context.md](./context.md), [med-sections.md](./med-sections.md), and [onboarding.md](./onboarding.md).

## Canonical Product Model

DataTello is an **evidence-backed decision engine** for build opportunities — not a research dashboard.

It validates through **layered evidence**, then the **Decision Layer** tells each user what to build or act on first.

## Roles

| Role | Output lens |
|------|-------------|
| agency | Full execution detail |
| consultant | Full execution detail |
| investor | Asset Thesis |
| venture_studio | Asset Thesis |
| general | Balanced summary |

## Layered Validation Architecture (unchanged)

| Layer | Question |
|-------|----------|
| Pressure | Is the problem forming? |
| Demand | Are people looking for it? |
| Wedge | Can you sell into it? |
| Friction | Are people failing to solve it? |
| Procurement | Is buyer intent and budget real? |
| Complaints | Are real users repeatedly affected? (Phase 2) |

## Decision Layer

`getRecommendedOpportunity(userPreferences, opportunities[])` → top 1 + top 3 ranked.

Dashboard: **Recommended for You** + **Top Opportunities This Week**.

## Guardrails

### Publish (unchanged)

1. No signal stands alone
2. Must map to buyer + workflow
3. Must improve decision
4. Reject noise

### Recommendation

Do not recommend if: buildability unclear, buyer unclear, <2 evidence layers, low confidence.

## Seven-Section Dossier (unchanged)

Opportunity Snapshot → Why This Exists → Signal Breakdown → Build Strategy → Execution Angle → Competitive Differentiator → Why This Matters

Role-aware visibility: Build Strategy vs Asset Thesis; Builder Fit for agency/consultant only.
