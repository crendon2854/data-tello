-- DataTello seed data for Source Registry
-- Run after schema.sql in the Supabase SQL editor.
-- Safe to re-run: uses ON CONFLICT (name) DO NOTHING.

insert into sources (
  name,
  workflow_lane,
  source_type,
  category,
  api_status,
  cadence,
  geography_scope,
  reliability_score,
  freshness_window_days,
  active,
  notes
) values
  (
    'OSHA',
    'pressure_discovery',
    'structural',
    'Occupational Safety',
    'semi_manual',
    'monthly',
    'US',
    5,
    30,
    true,
    'OSHA enforcement data and compliance guidance for workplace safety pressure signals.'
  ),
  (
    'EPA ECHO',
    'pressure_discovery',
    'trigger',
    'Environmental Compliance',
    'automated',
    'weekly',
    'US',
    5,
    14,
    true,
    'EPA Enforcement and Compliance History Online for facility violations and triggers.'
  ),
  (
    'Federal Register',
    'pressure_discovery',
    'trigger',
    'Regulatory',
    'automated',
    'daily',
    'US',
    5,
    7,
    true,
    'Primary regulatory trigger source for new rules, notices, and compliance deadlines.'
  ),
  (
    'DataForSEO',
    'demand_validation',
    'structural',
    'Search Demand',
    'automated',
    'weekly',
    'US',
    4,
    30,
    true,
    'Keyword volume, CPC, competition, and trend enrichment for demand validation.'
  ),
  (
    'GitHub Issues',
    'workflow_friction',
    'friction',
    'Developer Forums',
    'automated',
    'daily',
    'Global',
    3,
    14,
    true,
    'Workflow friction signals from open-source repos, feature requests, and workarounds.'
  )
on conflict (name) do nothing;
