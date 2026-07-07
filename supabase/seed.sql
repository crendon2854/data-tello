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

-- Raw Signal Explorer seed rows (linked to sources by name)
-- Safe to re-run: uses ON CONFLICT (dedup_hash) DO NOTHING.

insert into raw_signals (
  source_id,
  title,
  summary,
  source_url,
  published_at,
  workflow_lane,
  source_type,
  cadence_class,
  freshness_label,
  geography,
  industry_tags,
  regulation_tags,
  dedup_hash,
  needs_review
)
select
  s.id,
  v.title,
  v.summary,
  v.source_url,
  v.published_at,
  v.workflow_lane,
  v.source_type,
  v.cadence_class,
  v.freshness_label,
  v.geography,
  v.industry_tags,
  v.regulation_tags,
  v.dedup_hash,
  v.needs_review
from (
  values
    (
      'Federal Register',
      'SEC proposes new crypto custody rules',
      'SEC rulemaking notice for qualified custodian requirements affecting crypto asset managers.',
      'https://www.federalregister.gov/documents/2026/01/15/2026-01234',
      '2026-01-15T12:00:00Z'::timestamptz,
      'pressure_discovery',
      'trigger',
      'daily',
      'fresh',
      'US',
      array['financial services', 'crypto'],
      array['SEC', 'custody'],
      'seed-federal-register-sec-crypto-custody',
      false
    ),
    (
      'EPA ECHO',
      'Hospital vendor breach highlights third-party environmental compliance risk',
      'EPA enforcement context for healthcare facilities with outsourced waste handling vendors.',
      'https://echo.epa.gov/facilities/example',
      '2026-01-10T09:30:00Z'::timestamptz,
      'pressure_discovery',
      'trigger',
      'weekly',
      'recent',
      'US',
      array['healthcare', 'environmental'],
      array['EPA', 'RCRA'],
      'seed-epa-echo-hospital-vendor-breach',
      true
    ),
    (
      'GitHub Issues',
      'Teams request native compliance workflow templates in issue trackers',
      'Repeated friction signals from open-source repos asking for built-in audit trail exports.',
      'https://github.com/example/repo/issues/4821',
      '2026-01-08T16:45:00Z'::timestamptz,
      'workflow_friction',
      'friction',
      'daily',
      'recent',
      'Global',
      array['developer tools', 'compliance'],
      array[]::text[],
      'seed-github-issues-compliance-workflow-templates',
      true
    )
) as v(
  source_name,
  title,
  summary,
  source_url,
  published_at,
  workflow_lane,
  source_type,
  cadence_class,
  freshness_label,
  geography,
  industry_tags,
  regulation_tags,
  dedup_hash,
  needs_review
)
join sources s on s.name = v.source_name
on conflict (dedup_hash) do nothing;

-- Problem Zone Workspace seed rows
-- Safe to re-run: zones use ON CONFLICT (name) DO NOTHING; links use ON CONFLICT DO NOTHING.

insert into problem_zones (
  name,
  summary,
  primary_industry,
  sub_industry,
  primary_buyer,
  secondary_buyer,
  buyer_confidence,
  geography_scope,
  timing_label,
  pain_theme,
  source_count,
  source_diversity_count,
  pressure_strength_score,
  freshness_score,
  friction_score,
  signal_mix,
  status,
  notes
) values
  (
    'Crypto Custody Compliance Pressure',
    'Recurring regulatory pressure on asset managers to meet qualified custodian requirements for digital assets.',
    'Financial Services',
    'Crypto Asset Management',
    'Chief Compliance Officer',
    'General Counsel',
    'medium',
    'US',
    'trigger_driven',
    'Regulatory custody requirements',
    1,
    1,
    4,
    5,
    1,
    'trigger-heavy',
    'reviewing',
    'Clustered from Federal Register custody rulemaking signals.'
  ),
  (
    'Healthcare Environmental Vendor Risk',
    'Healthcare facilities face third-party environmental compliance exposure through outsourced waste and vendor operations.',
    'Healthcare',
    'Hospital Operations',
    'Director of Environmental Services',
    'VP of Compliance',
    'high',
    'US',
    'mixed',
    'Third-party vendor compliance gaps',
    1,
    1,
    3,
    4,
    2,
    'trigger + structural',
    'enriching',
    'Linked to EPA ECHO enforcement context signals.'
  ),
  (
    'Compliance Workflow Template Friction',
    'Teams repeatedly request built-in compliance workflow templates and audit trail exports in developer tooling.',
    'Developer Tools',
    'Issue Tracking',
    'Engineering Manager',
    'Compliance Operations Lead',
    'medium',
    'Global',
    'structural',
    'Manual compliance workarounds',
    1,
    1,
    2,
    3,
    6,
    'friction-heavy',
    'new',
    'Workflow friction cluster from GitHub Issues signals.'
  )
on conflict (name) do nothing;

-- Link problem zones to raw signals by dedup_hash
insert into problem_zone_signals (problem_zone_id, raw_signal_id)
select pz.id, rs.id
from (
  values
    ('Crypto Custody Compliance Pressure', 'seed-federal-register-sec-crypto-custody'),
    ('Healthcare Environmental Vendor Risk', 'seed-epa-echo-hospital-vendor-breach'),
    ('Compliance Workflow Template Friction', 'seed-github-issues-compliance-workflow-templates')
) as v(zone_name, dedup_hash)
join problem_zones pz on pz.name = v.zone_name
join raw_signals rs on rs.dedup_hash = v.dedup_hash
on conflict (problem_zone_id, raw_signal_id) do nothing;

-- Keyword Intelligence seed rows
-- Safe to re-run: uses NOT EXISTS guards on set name + problem zone name.

insert into keyword_sets (
  problem_zone_id,
  name,
  topic_layer,
  workflow_layer,
  product_layer,
  buyer_layer,
  seed_keywords,
  expanded_keywords,
  rejected_keywords,
  geo_target,
  dataforseo_pulled,
  last_enriched_at,
  notes
)
select
  pz.id,
  v.name,
  v.topic_layer,
  v.workflow_layer,
  v.product_layer,
  v.buyer_layer,
  v.seed_keywords,
  v.expanded_keywords,
  v.rejected_keywords,
  v.geo_target,
  v.dataforseo_pulled,
  v.last_enriched_at,
  v.notes
from (
  values
    (
      'Crypto Custody Compliance Pressure',
      'Crypto Custody Compliance Demand',
      'Regulatory custody',
      'Qualified custodian onboarding',
      'Custody compliance tooling',
      'Chief Compliance Officer',
      array['crypto qualified custodian', 'digital asset custody compliance', 'SEC custody rule crypto'],
      array['qualified custodian requirements crypto', 'crypto asset manager compliance software', 'digital asset custody audit trail'],
      array['crypto trading bot', 'NFT marketplace'],
      'US',
      false,
      null::timestamptz,
      'Seed set for demand validation on custody rulemaking pressure.'
    ),
    (
      'Healthcare Environmental Vendor Risk',
      'Healthcare Vendor Environmental Risk',
      'Third-party environmental compliance',
      'Vendor risk assessment',
      'Healthcare vendor compliance tracker',
      'Director of Environmental Services',
      array['healthcare vendor environmental compliance', 'hospital waste vendor audit', 'EPA healthcare facility compliance'],
      array['healthcare third party environmental risk', 'hospital outsourced waste compliance'],
      array['medical waste disposal pricing'],
      'US',
      true,
      '2026-01-05T10:00:00Z'::timestamptz,
      'Partially enriched seed metrics for hospital vendor risk theme.'
    ),
    (
      'Compliance Workflow Template Friction',
      'Compliance Workflow Template Demand',
      'Developer compliance workflows',
      'Audit trail export',
      'Issue tracker compliance templates',
      'Engineering Manager',
      array['compliance workflow template', 'audit trail export software', 'SOC 2 issue tracker workflow'],
      array[]::text[],
      array['free Jira template download'],
      'Global',
      false,
      null::timestamptz,
      'Friction-led keyword family; expand after DataForSEO wiring.'
    )
) as v(
  zone_name,
  name,
  topic_layer,
  workflow_layer,
  product_layer,
  buyer_layer,
  seed_keywords,
  expanded_keywords,
  rejected_keywords,
  geo_target,
  dataforseo_pulled,
  last_enriched_at,
  notes
)
join problem_zones pz on pz.name = v.zone_name
where not exists (
  select 1
  from keyword_sets ks
  where ks.name = v.name
    and ks.problem_zone_id = pz.id
);

insert into keyword_metrics (
  keyword_set_id,
  keyword,
  search_volume,
  trend_direction,
  cpc,
  competition,
  related_keyword_density,
  geo_signal,
  intent_type,
  kept_for_scoring
)
select
  ks.id,
  v.keyword,
  v.search_volume,
  v.trend_direction,
  v.cpc,
  v.competition,
  v.related_keyword_density,
  v.geo_signal,
  v.intent_type,
  v.kept_for_scoring
from (
  values
    (
      'Healthcare Vendor Environmental Risk',
      'healthcare vendor environmental compliance',
      720,
      'up',
      12.4,
      0.62,
      18,
      'US',
      'commercial',
      true
    ),
    (
      'Healthcare Vendor Environmental Risk',
      'hospital waste vendor audit',
      390,
      'stable',
      8.9,
      0.48,
      11,
      'US',
      'mixed',
      true
    ),
    (
      'Crypto Custody Compliance Demand',
      'crypto qualified custodian',
      1200,
      'up',
      18.2,
      0.71,
      24,
      'US',
      'commercial',
      true
    )
) as v(
  set_name,
  keyword,
  search_volume,
  trend_direction,
  cpc,
  competition,
  related_keyword_density,
  geo_signal,
  intent_type,
  kept_for_scoring
)
join keyword_sets ks on ks.name = v.set_name
where not exists (
  select 1
  from keyword_metrics km
  where km.keyword_set_id = ks.id
    and km.keyword = v.keyword
);

-- Market Proof Workspace seed rows
-- Safe to re-run: uses NOT EXISTS guards on core search phrase + problem zone name.

insert into market_proof_records (
  problem_zone_id,
  core_search_phrase,
  category_exists,
  visible_competitor_count,
  hidden_market_risk,
  review_sites_found,
  pricing_visibility,
  job_posting_evidence,
  spend_evidence,
  sec_evidence,
  usaspending_evidence,
  segment_wedge,
  competition_notes,
  manual_reviewer_notes,
  market_proof_score
)
select
  pz.id,
  v.core_search_phrase,
  v.category_exists,
  v.visible_competitor_count,
  v.hidden_market_risk,
  v.review_sites_found,
  v.pricing_visibility,
  v.job_posting_evidence,
  v.spend_evidence,
  v.sec_evidence,
  v.usaspending_evidence,
  v.segment_wedge,
  v.competition_notes,
  v.manual_reviewer_notes,
  v.market_proof_score
from (
  values
    (
      'Crypto Custody Compliance Pressure',
      'crypto qualified custodian software',
      true,
      8,
      'medium',
      'G2, Capterra (limited crypto custody category)',
      'partial',
      'Compliance analyst roles at digital asset managers',
      'Limited public spend signals',
      'SEC custody rulemaking notices and comment letters',
      null,
      'Mid-size RIAs needing audit-ready custody workflows',
      'Incumbents target enterprise; mid-market onboarding remains fragmented.',
      'Category exists but buyer confusion around qualified custodian vs wallet.',
      62
    ),
    (
      'Healthcare Environmental Vendor Risk',
      'healthcare vendor environmental compliance software',
      true,
      5,
      'low',
      'G2, TrustRadius',
      'public',
      'Environmental services coordinator roles at hospital systems',
      'EPA enforcement spend references in vendor risk RFPs',
      null,
      'Healthcare facility compliance contract mentions',
      'Regional hospital networks with outsourced waste vendors',
      'Established EHS platforms exist; wedge is vendor-specific audit workflows.',
      'Strong spend and job posting overlap supports wedge.',
      71
    ),
    (
      'Compliance Workflow Template Friction',
      'compliance workflow template issue tracker',
      false,
      2,
      'high',
      'None specific to compliance workflow templates',
      'hidden',
      'Engineering ops roles mention audit trail exports',
      null,
      null,
      null,
      'Teams exporting audit trails from generic issue trackers',
      'Pain is real but category is immature; risk of feature-not-product.',
      'Watch for hobby/dev-only friction before scoring.',
      38
    )
) as v(
  zone_name,
  core_search_phrase,
  category_exists,
  visible_competitor_count,
  hidden_market_risk,
  review_sites_found,
  pricing_visibility,
  job_posting_evidence,
  spend_evidence,
  sec_evidence,
  usaspending_evidence,
  segment_wedge,
  competition_notes,
  manual_reviewer_notes,
  market_proof_score
)
join problem_zones pz on pz.name = v.zone_name
where not exists (
  select 1
  from market_proof_records mpr
  where mpr.problem_zone_id = pz.id
    and mpr.core_search_phrase = v.core_search_phrase
);

-- Workflow Friction Workspace seed rows
-- Safe to re-run: uses NOT EXISTS guards on source_url + problem zone name.

insert into workflow_friction_signals (
  problem_zone_id,
  source,
  source_url,
  title,
  summary,
  friction_type,
  friction_score,
  repetition_score,
  source_diversity_score,
  workflow_specificity_score,
  manual_workaround_score,
  manual_workaround_detected,
  evidence_count,
  accepted_for_scoring
)
select
  pz.id,
  v.source,
  v.source_url,
  v.title,
  v.summary,
  v.friction_type,
  v.friction_score,
  v.repetition_score,
  v.source_diversity_score,
  v.workflow_specificity_score,
  v.manual_workaround_score,
  v.manual_workaround_detected,
  v.evidence_count,
  v.accepted_for_scoring
from (
  values
    (
      'Compliance Workflow Template Friction',
      'GitHub Issues',
      'https://github.com/example/repo/issues/4821',
      'Native compliance workflow templates requested',
      'Teams repeatedly ask for built-in audit trail exports and compliance workflow templates in issue trackers.',
      'missing_workflow_template',
      7,
      3,
      1,
      2,
      2,
      true,
      4,
      true
    ),
    (
      'Crypto Custody Compliance Pressure',
      'Stack Exchange',
      'https://stackoverflow.com/questions/example-custody-audit',
      'Manual spreadsheet workarounds for custody audit trails',
      'Asset managers describe spreadsheet-based custody compliance tracking as error-prone during audits.',
      'manual_workaround',
      5,
      2,
      1,
      2,
      2,
      true,
      2,
      false
    ),
    (
      'Healthcare Environmental Vendor Risk',
      'Greenhouse Job Postings',
      'https://boards.greenhouse.io/example/jobs/12345',
      'Hospital vendor compliance coordinator hiring spike',
      'Job postings reference manual vendor environmental compliance review workflows and spreadsheet tracking.',
      'operational_bottleneck',
      6,
      2,
      2,
      3,
      1,
      false,
      3,
      true
    )
) as v(
  zone_name,
  source,
  source_url,
  title,
  summary,
  friction_type,
  friction_score,
  repetition_score,
  source_diversity_score,
  workflow_specificity_score,
  manual_workaround_score,
  manual_workaround_detected,
  evidence_count,
  accepted_for_scoring
)
join problem_zones pz on pz.name = v.zone_name
where not exists (
  select 1
  from workflow_friction_signals wfs
  where wfs.problem_zone_id = pz.id
    and wfs.source_url = v.source_url
);
