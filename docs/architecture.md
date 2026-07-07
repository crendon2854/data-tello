# Architecture

## Stack

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Supabase (`@supabase/supabase-js`)
- Postgres via Supabase

## System Boundary

DataTello has four separate systems.

### 1. DataTello Core

Handles:

- source ingestion
- raw signal normalization
- clustering into problem zones
- scoring and guardrails
- human review
- paid dashboard publishing

Built in Next.js + Supabase.

### 2. Newsletter Engine

Handles:

- free subscribers
- Weekly Signal Brief email
- basic autoresponder functionality
- unsubscribe handling
- open/click tracking
- free-to-paid CTA tracking

Separate from the Dossier Builder.

### 3. Dossier Builder

Handles:

- paid Opportunity Dossier generation
- downloadable PDF Dossier export
- template selection
- section toggles
- suggested charts/graphics
- evidence tables
- affiliate links
- branding
- export history

Separate from the Newsletter Engine.

### 4. Growth Automation Stack

Handles outbound marketing and prospecting only.

Expected stack:

- Oracle VPS / cloud infrastructure
- n8n marketing automation suite
- AI prospecting agents
- lead enrichment
- outreach sequence drafting
- reply classification
- suppression/unsubscribe handling

Hard rule: n8n is for marketing/growth automation only. It should not run core ingestion, clustering, scoring, or dashboard logic.

## Signal Lanes

DataTello Core uses four lanes:

### Pressure Discovery

Finds real-world pressure.

Examples:

- OSHA
- EPA ECHO
- BLS
- Census permits
- SAM.gov
- CISA KEV
- Federal Register
- Regulations.gov
- USAspending
- Grants.gov where relevant
- CMS where healthcare is in scope

### Demand Validation

Checks attention, buyer language, and commercial intent.

Primary source:

- DataForSEO v3

Use:

- historical search volume
- related keywords
- trends/popularity
- CPC
- competition
- internal keyword memory

### Market Wedge Validation

Checks whether there is a sellable product/category gap.

Sources/checks:

- competitor sites
- pricing pages
- review directories
- job postings
- SEC EDGAR
- USAspending where relevant
- manual market proof review

### Workflow Friction Signals

Detects repeated execution pain where people visibly struggle to operationalize the workflow.

MVP sources:

- GitHub issues / feature requests
- Stack Exchange questions / workarounds
- Greenhouse job postings
- Lever job postings

Friction is an internal modifier. It can boost pressure, wedge, and buildability when repeated workflow failure is visible.

## Data Flow

```text
Source Sync → Raw Signals → Normalize/Classify → Problem Zones → Keyword Enrichment → Market/Friction Proof → Candidate Opportunity → Guardrails → Human Review → Publish → PDF Dossier
```

## Freshness Rules

Do not treat all sources as moving on the same clock.

Examples:

- daily/weekly sources can support trigger timing
- monthly/quarterly/annual sources usually support structural pressure
- mixed signals require a mixed timing label

Every opportunity must have one timing/freshness label:

- `trigger_driven`
- `structural`
- `mixed`

## AI Automation Boundary

AI may assist with:

- source summarization
- classification
- keyword generation
- clustering suggestions
- first-pass scoring
- first-pass dossier drafting
- chart/graphic suggestions
- connector repair proposals

AI must not autonomously decide:

- final buyer
- final build recommendation
- whether software beats service
- competitive right-to-win
- scoring weight changes
- publish approval

## Connector Health + Repair

Each connector should have an adapter layer:

- source name
- base URL
- auth type
- rate limits
- expected schema
- field mapping
- freshness cadence
- last successful sync
- failure reason
- repair status

AI may auto-fix mechanical issues only:

- renamed fields
- changed pagination
- endpoint path changes
- date format changes
- minor response shape changes
- optional null fields
- CSV header changes
- parser updates

Human approval is required for:

- source meaning changes
- discontinued datasets
- metric definition changes
- new API terms/commercial restrictions
- scoring impact changes
- buyer/category interpretation changes

## Folder Structure

```text
/app                    # Routes (App Router)
/components
  /ui                   # Card, FilterBar, primitives
  /layout               # Navbar, Sidebar, PageContainer
  /cards                # OpportunityCard
  /sections             # MED/Dossier section components
  /admin                # Admin forms and actions
/lib                    # supabase.ts, queries.ts, helpers.ts
/types                  # database.ts, opportunity.ts
/hooks                  # useOpportunities, useFilters
/styles                 # globals.css
/docs                   # This documentation
/supabase               # schema.sql
```

## Design Patterns

- `PageContainer` wraps all page content
- `Card` wraps every dossier/admin section
- Section components accept typed `opportunity` slices
- Admin pages should preserve source traceability
- Dashboard pages should simplify internal scoring into decision-ready output

## Non-Negotiable Architecture Rules

1. Core intelligence stays in Next.js + Supabase.
2. n8n is for marketing automation, not core intelligence.
3. Newsletter Engine and Dossier Builder are separate.
4. Paid PDF Dossiers are generated from templates, not manually made one by one.
5. AI can draft and assist, but human review controls publish decisions.
6. System Health can repair mechanical connector issues, not business logic.