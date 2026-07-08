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

## Target ICPs

| ICP | Job to be done |
|-----|----------------|
| **Agencies** | What can we sell, implement, or productize for clients? |
| **Consultants** | What should we recommend, advise on, or turn into client-facing memos? |
| **Investors** | What should we fund, validate, monitor, or compare as a thesis/deal opportunity? |
| **Venture Studios / Product Studios** | What opportunities are worth validating, matching to operators, and prioritizing across repeated bets? |

Venture Studios are **not** described as product consultants, fractional PMs, or idea validators alone. They are organizations that create ventures, validate concepts, recruit or match operators, and run repeated venture bets.

---

## Onboarding Flow (3–5 Steps)

### Step 1 — Pick user type

Options:

- Investor
- Agency
- Consultant
- Venture Studio / Product Studio
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

Pre-check all; allow opt-out:

- Regulatory / compliance pressure
- Search demand & buyer language
- Market gaps & competition
- Workflow friction
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

**Post-login emphasis:**

- Full dossier
- Source trails
- Why now
- Buyer and risk framing
- Client memo mode
- Lighter collaboration

### Agency

**Default language:** offers, clients, implementation, service + tool hybrid, delivery

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

**Default language:** ventures, operators, validation, portfolio, repeated bets

**Post-login emphasis:**

- Opportunity validation
- Operator/venture fit
- Repeated-bet prioritization
- Compare opportunities
- Portfolio board / watchlist orientation
- Team workflow and internal decision support

Shares investor-style evaluation lens for compare/monitor; distinct on operator matching and repeated-bet prioritization.

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
