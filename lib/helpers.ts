import type { Opportunity } from "@/types/opportunity";
import type { OpportunityFormData } from "@/types/opportunity";

export function formatScore(score: number | null | undefined): string {
  if (score == null) return "-";
  return String(Math.round(score));
}

export function parseTags(value: string): string[] {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function joinTags(tags: string[] | null | undefined): string {
  return (tags ?? []).join(", ");
}

export function parsePainDrivers(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function joinPainDrivers(drivers: string[] | null | undefined): string {
  return (drivers ?? []).join("\n");
}

export function opportunityToFormData(
  opportunity: Opportunity
): OpportunityFormData {
  return {
    title: opportunity.title,
    overall_score: opportunity.overall_score,
    best_first_asset: opportunity.best_first_asset ?? "",
    short_summary: opportunity.short_summary ?? "",
    complexity: opportunity.complexity ?? "",
    tags: joinTags(opportunity.tags),
    status: opportunity.status,
    problem_summary: opportunity.problem_summary ?? "",
    evidence_summary: opportunity.evidence_summary ?? "",
    key_pain_drivers: joinPainDrivers(opportunity.key_pain_drivers),
    pressure_score: opportunity.pressure_score ?? 0,
    demand_score: opportunity.demand_score ?? 0,
    wedge_score: opportunity.wedge_score ?? 0,
    buildability_score: opportunity.buildability_score ?? 0,
    asset_fit_score: opportunity.asset_fit_score ?? 0,
    asset_path_1: opportunity.asset_path_1 ?? "",
    asset_path_2: opportunity.asset_path_2 ?? "",
    asset_path_3: opportunity.asset_path_3 ?? "",
    asset_reason: opportunity.asset_reason ?? "",
    expansion_ladder: opportunity.expansion_ladder ?? "",
    target_buyer: opportunity.target_buyer ?? "",
    core_workflow: opportunity.core_workflow ?? "",
    initial_wedge: opportunity.initial_wedge ?? "",
    time_to_value: opportunity.time_to_value ?? "",
    underserved_segment: opportunity.underserved_segment ?? "",
    competitor_summary: opportunity.competitor_summary ?? "",
    avoid: opportunity.avoid ?? "",
    differentiation: opportunity.differentiation ?? "",
    entry_strategy: opportunity.entry_strategy ?? "",
    strategic_importance: opportunity.strategic_importance ?? "",
  };
}

export function formDataToPayload(data: OpportunityFormData) {
  return {
    title: data.title,
    overall_score: data.overall_score,
    best_first_asset: data.best_first_asset || null,
    short_summary: data.short_summary || null,
    complexity: data.complexity || null,
    tags: parseTags(data.tags),
    status: data.status,
    problem_summary: data.problem_summary || null,
    evidence_summary: data.evidence_summary || null,
    key_pain_drivers: parsePainDrivers(data.key_pain_drivers),
    pressure_score: data.pressure_score,
    demand_score: data.demand_score,
    wedge_score: data.wedge_score,
    buildability_score: data.buildability_score,
    asset_fit_score: data.asset_fit_score,
    asset_path_1: data.asset_path_1 || null,
    asset_path_2: data.asset_path_2 || null,
    asset_path_3: data.asset_path_3 || null,
    asset_reason: data.asset_reason || null,
    expansion_ladder: data.expansion_ladder || null,
    target_buyer: data.target_buyer || null,
    core_workflow: data.core_workflow || null,
    initial_wedge: data.initial_wedge || null,
    time_to_value: data.time_to_value || null,
    underserved_segment: data.underserved_segment || null,
    competitor_summary: data.competitor_summary || null,
    avoid: data.avoid || null,
    differentiation: data.differentiation || null,
    entry_strategy: data.entry_strategy || null,
    strategic_importance: data.strategic_importance || null,
    updated_at: new Date().toISOString(),
  };
}

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}