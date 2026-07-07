import type { Opportunity } from "@/types/opportunity";

interface WhyThisMattersProps {
  opportunity: Pick<Opportunity, "strategic_importance">;
}

export function WhyThisMatters({ opportunity }: WhyThisMattersProps) {
  if (!opportunity.strategic_importance) {
    return <p className="text-body text-text-muted">No strategic importance noted.</p>;
  }

  return (
    <p className="text-body text-text-secondary">
      {opportunity.strategic_importance}
    </p>
  );
}
