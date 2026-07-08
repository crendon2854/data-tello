/**
 * Example structured output for the Procurement Signal Engine.
 * Use as reference for ingestion jobs and admin review.
 */

import type { SamRawOpportunity } from "@/types/procurement";
import { runProcurementPipeline } from "./integration";
import { buildSamSearchQueries } from "./queries";

export const EXAMPLE_RAW_OPPORTUNITIES: SamRawOpportunity[] = [
  {
    noticeId: "ex-001",
    title: "Compliance Reporting Software Platform",
    description:
      "Department seeks a cloud-based compliance reporting software platform to automate recurring audit documentation, inspection tracking, and agency-wide reporting workflows.",
    agency: "Department of Health and Human Services / CMS",
    postedDate: "06/15/2026",
    responseDeadline: "2026-07-30T17:00:00-04:00",
    estimatedValue: "$450,000",
    url: "https://sam.gov/opp/ex-001/view",
    naicsCodes: ["541511"],
    active: true,
  },
  {
    noticeId: "ex-002",
    title: "Case Management System Modernization",
    description:
      "Agency requires a case management system with workflow automation for ongoing case tracking, documentation, and operational reporting. Multi-year support expected.",
    agency: "Department of Veterans Affairs / VHA",
    postedDate: "06/20/2026",
    responseDeadline: "2026-08-15T17:00:00-04:00",
    estimatedValue: "$1,200,000",
    url: "https://sam.gov/opp/ex-002/view",
    naicsCodes: ["541512"],
    active: true,
  },
  {
    noticeId: "ex-reject-staffing",
    title: "IT Staff Augmentation Services",
    description:
      "Agency seeks personnel and staffing support for general IT labor categories. No software procurement.",
    agency: "General Services Administration",
    postedDate: "06/10/2026",
    responseDeadline: null,
    estimatedValue: null,
    url: "https://sam.gov/opp/ex-reject-staffing/view",
    naicsCodes: ["541512"],
    active: true,
  },
];

export const EXAMPLE_PIPELINE_OUTPUT = runProcurementPipeline(EXAMPLE_RAW_OPPORTUNITIES);

export const EXAMPLE_STRUCTURED_SIGNAL = EXAMPLE_PIPELINE_OUTPUT.signals[0];

export const EXAMPLE_QUERY_PLAN = buildSamSearchQueries({ postedFromDays: 30 });

export const EXAMPLE_DOSSIER_EVIDENCE = {
  strength: "Strong" as const,
  label: "Strong" as const,
  example_requests: [
    "Department of Health and Human Services / CMS: Compliance Reporting Software Platform",
    "Department of Veterans Affairs / VHA: Case Management System Modernization",
  ],
  signal_count: 2,
  workflow_tags: ["compliance_reporting", "case_management"],
};
