import type { Opportunity } from "@/types/opportunity";
import type { SectionContentConfig } from "@/lib/dossier-content";

interface WhyThisMattersProps {
  opportunity: Pick<Opportunity, "strategic_importance">;
  content?: SectionContentConfig;
}

export function WhyThisMatters({ opportunity, content }: WhyThisMattersProps) {
  if (!opportunity.strategic_importance) {
    return <p className="text-body text-text-muted">No strategic importance noted.</p>;
  }

  return (
    <div className="space-y-3">
      {content?.intro && (
        <p className="text-body text-text-muted">{content.intro}</p>
      )}
      <p className="text-body text-text-secondary">
        {opportunity.strategic_importance}
      </p>
    </div>
  );
}
