# Onboarding & ICP Targeting

See [MED.md](./MED.md) for documentation governance. Long-term truths: [context.md](./context.md). Routes: [routes.md](./routes.md).

DataTello uses **one opportunity engine** for all users. Onboarding captures targeting preferences and applies them as **default filters** after login. The **default lens** (language, emphasis, collaboration depth) varies by ICP — not the underlying opportunity data.

---

## Core Principle

Same engine. Different post-login defaults and views.

| Layer | Shared across ICPs | Varies by ICP |
|-------|-------------------|---------------|
| Signals, scores, evidence | Yes | No |
| Default feed filters | Set from onboarding | Applied per user |
| Section emphasis, CTA language | No | Yes |
| Collaboration depth | No | Yes |
| Monitoring / compare tools | No | Yes |

---

## MVP Target Customer (Locked)

The MVP positions around **three primary segments** only:

| Segment | Job to be done |
|---------|----------------|
| **Builder** | What compliance- or procurement-backed workflow should I build first? |
| **Agency** (compliance-heavy industries) | What can we sell, implement, or productize for contractor and environmental clients? |
| **Consultant** (contractor/environmental) | What should we recommend, advise on, or turn into client-facing memos? |

Consultants are a **distinct ICP** from Agencies. Same onboarding flow; **not** the same default lens. Consultants get advisory, memo, and recommendation framing — not packaging, white-label, or delivery-first emphasis.

## Future Customer Segments (Not MVP Positioning)

These segments are preserved in the long-term product vision but are **not** the MVP launch focus:

| Segment | Status |
|---------|--------|
| Investors / VCs | Future |
| HoldCos | Future |
| Venture Studios / Product Studios | Future |
| Enterprise buyers | Future |
| White-label enterprise features | Future |

Onboarding may still capture these user types for waitlist or future activation, but MVP messaging, defaults, and feed emphasis target builders, agencies, and consultants in the compliance wedge.

---

## Onboarding Flow (3–5 Steps)

### Step 1 — Pick user type

**MVP options (primary):**

- Builder
- Agency
- Consultant

**Future options (waitlist / later activation):**

- Investor
- Venture Studio / Product Studio
- Enterprise
- Other

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

Summary shows: user type, industries, buyer/deal focus, signal preferences.

Buttons:

- **Looks right — show me opportunities**
- **Edit my choices**

---

## Default Lens by ICP

The onboarding **flow** is shared. The **default lens** is not.

### Consultant

**Default language:** recommendations, clients, advisory, memo / brief

**Not Agency:** advisory and client-memo framing — not packaging, white-label exports, or delivery-first execution.

**Post-login emphasis:**

- Full dossier
- Source trails
- Why now
- Buyer and risk framing
- Client memo mode
- Lighter collaboration

### Agency

**Default language:** offers, clients, implementation, service + tool hybrid, delivery

**Not Consultant:** packaging, implementation, and sellable offer framing — not standalone advisory or memo-first workflows.

**Post-login emphasis:**

- Service + tool hybrid recommendations
- Reusable offer angles
- Client/project organization
- White-label exports
- Implementation-first execution framing
- Light team collaboration

### Investor

**Default language:** deals, theses, portfolio, opportunities, validation

**Post-login emphasis:**

- Investable opportunity lens
- Wedge clarity
- Why this matters
- Compare / watchlist / monitor
- Portfolio-style evaluation
- Browse outside industry preferences more easily

### Venture Studio / Product Studio

**Default language:** ventures, operators, validation, repeated bets, venture fit

**Post-login emphasis:**

- Venture validation and concept proof
- Operator / venture fit and matching
- Repeated-bet prioritization across a studio portfolio
- Team workflow and internal venture decision support
- Asset bet paths and what is worth spinning up next

**Distinct from Investor:** studios prioritize operator matching, repeated venture bets, and internal venture creation — not deal funding, thesis monitoring, or capital allocation alone. Compare / watchlist tools may overlap with investor workflows, but the default lens stays venture-studio-first.

---

## Default Feed & Dashboard Rules

After onboarding, default opportunities shown match:

- `industries[]`
- `buyer_types[]`
- `signal_types[]`

Always allow extra filters by industry, buyer, and signal type.

### Explore Mode

**Show opportunities outside my selected industries**

Especially available for: Investors, Agencies, Venture Studios / Product Studios.

### Preferences / Targeting Page

Users can change at any time:

- `user_type`
- `industries[]`
- `buyer_types[]`
- `signal_types[]`

These values act as **default filters** on opportunity queries and dashboard views.

---

## Implementation Notes

- Persona lens (`lib/persona-lens.ts`) aligns with ICP defaults; it must never alter scores, signals, or evidence.
- Onboarding routes: see [routes.md](./routes.md) § Onboarding Routes (planned).
- User preference storage: see [database.md](./database.md) § User Targeting (planned).
