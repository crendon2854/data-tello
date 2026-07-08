import type { SamRawOpportunity } from "@/types/procurement";
import {
  CORE_SOFTWARE_TERMS,
  EXCLUDE_LOW_SIGNAL_TERMS,
  HARDWARE_ONLY_TERMS,
  STAFFING_TERMS,
  WORKFLOW_PAIN_TERMS,
} from "./keywords";

export type FilterRejectionReason =
  | "staffing_only"
  | "hardware_only"
  | "generic_consulting"
  | "low_signal_exclude"
  | "no_workflow"
  | "no_system_mention"
  | "no_buyer"
  | "vague_language"
  | "construction_only";

export type FilterResult = {
  keep: boolean;
  reason?: FilterRejectionReason;
  matched_keywords: string[];
};

const SYSTEM_TERMS = [
  ...CORE_SOFTWARE_TERMS,
  "tool",
  "application",
  "app",
  "saas",
  "module",
  "portal",
  "database",
  "automation",
];

const WORKFLOW_INDICATORS = [
  ...WORKFLOW_PAIN_TERMS,
  "process",
  "procedure",
  "tracking",
  "management",
  "submission",
  "approval",
  "review cycle",
  "recordkeeping",
  "records management",
];

const VAGUE_PHRASES = [
  "various services",
  "as needed",
  "general support",
  "miscellaneous",
  "other services",
  "broad range",
  "indefinite delivery",
];

const CONSULTING_ONLY_PATTERNS = [
  /consulting\s+services?\s+only/i,
  /professional\s+services?\s+only/i,
  /advisory\s+services?\s+only/i,
  /management\s+consulting\s+(?!.*(?:system|software|platform|tool))/i,
];

function normalizeText(opp: SamRawOpportunity): string {
  return `${opp.title} ${opp.description}`.toLowerCase();
}

function containsAny(text: string, terms: readonly string[]): string[] {
  return terms.filter((term) => text.includes(term.toLowerCase()));
}

function hasSoftwareMention(text: string): boolean {
  return containsAny(text, SYSTEM_TERMS).length > 0;
}

function hasWorkflowProblem(text: string): boolean {
  return containsAny(text, WORKFLOW_INDICATORS).length > 0;
}

function isStaffingOnly(text: string): boolean {
  const staffingHits = containsAny(text, STAFFING_TERMS);
  if (staffingHits.length === 0) return false;
  return !hasSoftwareMention(text);
}

function isHardwareOnly(text: string): boolean {
  const hardwareHits = containsAny(text, HARDWARE_ONLY_TERMS);
  if (hardwareHits.length === 0) return false;
  return !hasSoftwareMention(text);
}

function isGenericConsulting(text: string): boolean {
  const hasConsulting = /consulting|advisory|professional services/i.test(text);
  if (!hasConsulting) return false;
  if (hasSoftwareMention(text)) return false;
  return CONSULTING_ONLY_PATTERNS.some((pattern) => pattern.test(text));
}

function isConstructionOnly(text: string): boolean {
  const constructionTerms = [
    "construction",
    "renovation",
    "building",
    "hvac installation",
    "roofing",
    "paving",
  ];
  const hasConstruction = containsAny(text, constructionTerms).length > 0;
  if (!hasConstruction) return false;
  return !hasSoftwareMention(text);
}

function isVague(text: string): boolean {
  const vagueHits = containsAny(text, VAGUE_PHRASES);
  const workflowHits = containsAny(text, WORKFLOW_INDICATORS);
  return vagueHits.length >= 2 && workflowHits.length === 0;
}

function hasIdentifiableBuyer(opp: SamRawOpportunity): boolean {
  const agency = opp.agency?.trim();
  return Boolean(agency && agency !== "Unknown agency" && agency.length > 3);
}

/**
 * Aggressive single-opportunity filter.
 * KEEP only high-signal B2B software / workflow opportunities.
 */
export function filterProcurementOpportunity(
  opp: SamRawOpportunity
): FilterResult {
  const text = normalizeText(opp);
  const matched = [
    ...containsAny(text, CORE_SOFTWARE_TERMS),
    ...containsAny(text, WORKFLOW_PAIN_TERMS),
  ];

  if (!hasIdentifiableBuyer(opp)) {
    return { keep: false, reason: "no_buyer", matched_keywords: matched };
  }

  if (isStaffingOnly(text)) {
    return { keep: false, reason: "staffing_only", matched_keywords: matched };
  }

  if (isHardwareOnly(text)) {
    return { keep: false, reason: "hardware_only", matched_keywords: matched };
  }

  if (isConstructionOnly(text)) {
    return { keep: false, reason: "construction_only", matched_keywords: matched };
  }

  const excludeHits = containsAny(text, EXCLUDE_LOW_SIGNAL_TERMS);
  if (excludeHits.length > 0 && !hasSoftwareMention(text)) {
    return {
      keep: false,
      reason: "low_signal_exclude",
      matched_keywords: matched,
    };
  }

  if (isGenericConsulting(text)) {
    return {
      keep: false,
      reason: "generic_consulting",
      matched_keywords: matched,
    };
  }

  if (!hasWorkflowProblem(text)) {
    return { keep: false, reason: "no_workflow", matched_keywords: matched };
  }

  if (!hasSoftwareMention(text)) {
    return {
      keep: false,
      reason: "no_system_mention",
      matched_keywords: matched,
    };
  }

  if (isVague(text)) {
    return { keep: false, reason: "vague_language", matched_keywords: matched };
  }

  return { keep: true, matched_keywords: [...new Set(matched)] };
}

/** Filter a batch; returns only kept opportunities. */
export function filterProcurementOpportunities(
  opportunities: SamRawOpportunity[]
): Array<SamRawOpportunity & { matched_keywords: string[] }> {
  return opportunities
    .map((opp) => {
      const result = filterProcurementOpportunity(opp);
      if (!result.keep) return null;
      return { ...opp, matched_keywords: result.matched_keywords };
    })
    .filter((item): item is SamRawOpportunity & { matched_keywords: string[] } => item !== null);
}

/** Post-fetch validation for query combination (pain AND software in text). */
export function matchesQueryCombination(
  opp: SamRawOpportunity,
  painTerm: string,
  softwareTerm: string
): boolean {
  const text = normalizeText(opp);
  return text.includes(painTerm.toLowerCase()) && text.includes(softwareTerm.toLowerCase());
}
