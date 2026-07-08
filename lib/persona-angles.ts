import type { Opportunity } from "@/types/opportunity";
import type { Role } from "@/types/user-preferences";
import { ICP_PERSONA_IDS, PERSONA_LENSES } from "@/lib/persona-lens";

export type PersonaAngle = {
  role: Role;
  label: string;
  angle: string;
};

function firstAsset(opportunity: Opportunity): string {
  return (
    opportunity.asset_path_1 ??
    opportunity.best_first_asset ??
    "this opportunity"
  );
}

export function getPersonaAngle(
  opportunity: Opportunity,
  role: Role
): string {
  const asset = firstAsset(opportunity);
  const buyer = opportunity.target_buyer ?? opportunity.primary_buyer;
  const wedge = opportunity.initial_wedge;

  switch (role) {
    case "agency":
      return buyer
        ? `Package "${asset}" as a ${buyer} offer — lead with execution and delivery.`
        : `Package "${asset}" as a productized service — friction and fit signals drive the pitch.`;
    case "consultant":
      return opportunity.problem_summary
        ? `Advise on ${opportunity.problem_summary.slice(0, 80)}${opportunity.problem_summary.length > 80 ? "…" : ""} — full evidence supports client strategy.`
        : `Frame advisory scope around "${asset}" with buyer clarity and market context.`;
    case "investor":
      return wedge
        ? `Capital entry via "${wedge}" wedge — market gap with ${opportunity.wedge_score ?? "—"}/10 wedge signal.`
        : `Evaluate market timing and competitive entry around "${asset}".`;
    case "venture_studio":
      return `Validate "${asset}" as a repeatable bet — compare operator fit and portfolio timing.`;
    default:
      return `Balanced read on "${asset}".`;
  }
}

export function getAllPersonaAngles(opportunity: Opportunity): PersonaAngle[] {
  return ICP_PERSONA_IDS.map((role) => ({
    role,
    label: PERSONA_LENSES[role].label,
    angle: getPersonaAngle(opportunity, role),
  }));
}
