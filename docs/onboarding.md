# Onboarding & ICP Targeting

See [MED.md](./MED.md) for documentation governance. Long-term truths: [context.md](./context.md). Routes: [routes.md](./routes.md). Decision Layer: [architecture.md](./architecture.md) § Decision Layer.

DataTello uses **one opportunity engine** for all users. Onboarding captures targeting preferences and user **role**. The **Decision Layer** (`getRecommendedOpportunity`) ranks opportunities per user; the **Role-Aware Output System** changes how dossiers render.

---

## Core Principle

Same engine. Different post-login defaults, ranking, and views.

| Layer | Shared across roles | Varies by role |
|-------|---------------------|----------------|
| Signals, scores, evidence | Yes | No |
| Decision Layer ranking | Computed per user | Yes |
| `recommended_reason[]` bullets | Generated per user | Yes |
| Default feed filters | Set from onboarding | Applied per user |
| Section visibility (execution vs Asset Thesis) | No | Yes |
| CTA language ("Start Here" anchor) | No | Yes |
| Collaboration depth | No | Yes |

---

## Roles (Locked)

Stored as `user_type` on `user_preferences`.

| Role key | Label | Decision question |
|----------|-------|-------------------|
| `agency` | Agency | What can we sell, implement, or productize? |
| `consultant` | Consultant | What should we recommend or advise on? |
| `investor` | Investor | What should we fund, validate, or monitor? |
| `venture_studio` | Venture Studio | What is worth validating and spinning up next? |
| `general` | General | What should I act on first? (fallback) |

---

## Onboarding Flow (3–5 Steps)

### Step 1 — Pick role

Primary options:

- Agency
- Consultant
- Investor
- Venture Studio
- General / Not sure

Stored as `user_type`.

### Step 2 — Select target industries

- Multi-select with search
- Require at least 1 selection
- Allow **Not sure / I want to explore**
  - If chosen: default to top high-signal industries; keep feed looser

Stored as `industries[]`.

### Step 3 — Select buyer / deal focus

- SMB / local
- Mid-market
- Enterprise
- Public sector / government
- No preference

Stored as `buyer_types[]`.

### Step 4 — Optional signal preferences

Pre-check MVP layers; allow opt-out:

- Regulatory / compliance pressure
- Search demand & buyer language
- Market gaps & competition
- Workflow friction (job postings, procurement/RFP language)
- Procurement validation (SAM.gov, USAspending)

**Phase 2 (not MVP — hide or show as "coming soon"):**

- Complaint & incident patterns
- Digital infrastructure signals

Stored as `signal_types[]`.

### Step 5 — Confirm and save

Summary shows: role, industries, buyer/deal focus, signal preferences.

Buttons:

- **Looks right — show me my recommendation**
- **Edit my choices**

Redirect to `/dashboard` with **Recommended for You** at top.

---

## Default Lens by Role

The onboarding **flow** is shared. The **default lens** and **output system** are not.

### Agency / Consultant

**Default language:** offers, clients, implementation, build, delivery

**Post-login emphasis:**

- **Recommended for You** card with execution framing
- Full dossier: Build Strategy, Builder Fit, tool stack, "How to build this"
- Source trails, why now, buyer framing
- CTA: **Start Here** → Build Strategy section

### Investor

**Default language:** deals, theses, portfolio, validation, risk

**Post-login emphasis:**

- **Recommended for You** card with thesis framing
- Asset Thesis instead of Builder Fit / tool stack
- Compare / watchlist / monitor (when shipped)
- CTA: **Start Here** → Asset Thesis section

### Venture Studio

**Default language:** ventures, operators, validation, repeated bets

**Post-login emphasis:**

- **Recommended for You** with venture-fit framing
- Asset Thesis, expansion ladder, operator matching angle
- Repeated-bet prioritization across portfolio
- CTA: **Start Here** → Asset Thesis section

**Distinct from Investor:** studios prioritize operator matching and internal venture creation — not capital allocation alone.

### General

**Default language:** neutral, action-oriented

**Post-login emphasis:**

- Balanced **Recommended for You**
- Abbreviated execution summary
- Full dossier available on detail page

---

## Why This Fits (Personalization)

The Decision Layer generates **3 short bullets** per recommended opportunity. Examples:

- Matches your selected industry: Construction
- Strong procurement signals from government buyers
- High workflow friction → fast monetization potential

Stored as `recommended_reason[]` on the opportunity (computed at recommendation time; may be cached per user-opportunity pair).

---

## Default Feed & Dashboard Rules

After onboarding:

1. **Recommended for You** — top 1 from `getRecommendedOpportunity()`
2. **Top Opportunities This Week** — ranked by score, freshness, procurement strength
3. Filtered opportunity list — respects `industries[]`, `buyer_types[]`, `signal_types[]`

Always allow manual filter override.

### Explore Mode

**Show opportunities outside my selected industries**

Especially available for: Investors, Agencies, Venture Studios.

### Preferences / Targeting Page

Users can change at any time:

- `user_type` (role)
- `industries[]`
- `buyer_types[]`
- `signal_types[]`

Re-running preferences triggers Decision Layer recalculation on next dashboard load.

---

## Implementation Notes

- Decision Layer: `lib/decision-layer.ts` — `getRecommendedOpportunity(userPreferences, opportunities[])`
- Persona lens: `lib/persona-lens.ts`, `lib/dossier-content.ts` — must never alter scores, signals, or evidence
- Role visibility: `role_visibility_config` on opportunities
- Onboarding routes: [routes.md](./routes.md)
- User preference storage: [database.md](./database.md) § `user_preferences`
