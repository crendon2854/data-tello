/** Keyword groups and high-signal query combinations for SAM.gov. */

export const CORE_SOFTWARE_TERMS = [
  "software",
  "system",
  "platform",
  "dashboard",
  "tracking",
  "management system",
  "case management",
  "reporting system",
] as const;

export const WORKFLOW_PAIN_TERMS = [
  "compliance",
  "reporting",
  "inspection",
  "audit",
  "documentation",
  "monitoring",
  "workflow",
  "case tracking",
  "data collection",
] as const;

/** Terms that indicate low-signal opportunities when no software term is present. */
export const EXCLUDE_LOW_SIGNAL_TERMS = [
  "construction only",
  "staffing",
  "personnel services",
  "labor only",
  "hardware only",
  "equipment only",
  "consulting services only",
  "janitorial",
  "landscaping",
  "catering",
  "uniforms",
  "furniture",
  "vehicles",
  "building renovation",
  "roof repair",
  "paving",
  "demolition",
] as const;

/** Hardware-only signals — reject unless software/system also mentioned. */
export const HARDWARE_ONLY_TERMS = [
  "hardware",
  "equipment procurement",
  "laptop",
  "desktop computer",
  "server hardware",
  "network switch",
  "printer",
  "monitor",
  "cabling",
] as const;

/** Staffing-only signals. */
export const STAFFING_TERMS = [
  "staffing",
  "staff augmentation",
  "personnel",
  "body shop",
  "labor category",
  "fte",
  "full-time equivalent",
  "contractor support services",
  "professional services only",
] as const;

/** NAICS codes related to software, IT services, and admin systems. */
export const IT_NAICS_CODES = [
  "511210", // Software publishers
  "518210", // Data processing, hosting
  "541511", // Custom computer programming
  "541512", // Computer systems design
  "541513", // Computer facilities management
  "541519", // Other computer related services
  "541611", // Administrative management consulting
  "541690", // Other scientific and technical consulting
  "561110", // Office administrative services
  "561499", // Other business support services
  "561990", // All other support services
] as const;

/** High-signal (pain × software) query combinations for post-fetch filtering. */
export const QUERY_COMBINATIONS: ReadonlyArray<{
  id: string;
  pain: string;
  software: string;
  label: string;
}> = [
  { id: "compliance-software", pain: "compliance", software: "software", label: "compliance × software" },
  { id: "reporting-system", pain: "reporting", software: "system", label: "reporting × system" },
  { id: "case-mgmt-platform", pain: "case management", software: "platform", label: "case management × platform" },
  { id: "inspection-tracking", pain: "inspection", software: "tracking system", label: "inspection × tracking system" },
  { id: "audit-dashboard", pain: "audit", software: "dashboard", label: "audit × dashboard" },
  { id: "workflow-automation", pain: "workflow", software: "platform", label: "workflow × platform" },
  { id: "monitoring-system", pain: "monitoring", software: "system", label: "monitoring × system" },
  { id: "documentation-management", pain: "documentation", software: "management system", label: "documentation × management system" },
  { id: "data-collection-platform", pain: "data collection", software: "platform", label: "data collection × platform" },
  { id: "case-tracking-software", pain: "case tracking", software: "software", label: "case tracking × software" },
];

/** SAM notice types: solicitations and sources sought (exclude awards/justifications). */
export const SAM_NOTICE_TYPES = "o,k,p,r" as const;

export const SAM_SEARCH_BASE_URL =
  "https://api.sam.gov/opportunities/v2/search" as const;

export const ASSET_HINT_TERMS: ReadonlyArray<{ term: string; hint: string }> = [
  { term: "dashboard", hint: "dashboard" },
  { term: "tracker", hint: "tracker" },
  { term: "tracking system", hint: "tracker" },
  { term: "case management", hint: "case management system" },
  { term: "workflow", hint: "workflow automation" },
  { term: "portal", hint: "portal" },
  { term: "platform", hint: "platform" },
  { term: "reporting", hint: "reporting system" },
  { term: "audit", hint: "audit tool" },
  { term: "monitoring", hint: "monitoring system" },
  { term: "database", hint: "data management system" },
  { term: "data management", hint: "data management system" },
];

export const WORKFLOW_TYPE_PATTERNS: ReadonlyArray<{
  pattern: RegExp;
  workflow_type: string;
  core_workflow: string;
}> = [
  { pattern: /compliance\s+report/i, workflow_type: "compliance_reporting", core_workflow: "compliance reporting" },
  { pattern: /case\s+manag/i, workflow_type: "case_management", core_workflow: "case management" },
  { pattern: /audit/i, workflow_type: "audit_tracking", core_workflow: "audit tracking" },
  { pattern: /inspection/i, workflow_type: "inspection_tracking", core_workflow: "inspection tracking" },
  { pattern: /workflow/i, workflow_type: "workflow_automation", core_workflow: "workflow automation" },
  { pattern: /reporting/i, workflow_type: "operational_reporting", core_workflow: "operational reporting" },
  { pattern: /monitoring/i, workflow_type: "monitoring", core_workflow: "monitoring and alerting" },
  { pattern: /documentation/i, workflow_type: "documentation", core_workflow: "documentation management" },
  { pattern: /data\s+collection/i, workflow_type: "data_collection", core_workflow: "data collection" },
  { pattern: /tracking/i, workflow_type: "tracking", core_workflow: "process tracking" },
];
