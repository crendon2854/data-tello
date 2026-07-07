import type { Opportunity } from "@/types/opportunity";

interface CompetitiveAngleProps {
  opportunity: Pick<
    Opportunity,
    | "underserved_segment"
    | "competitor_summary"
    | "avoid"
    | "differentiation"
    | "entry_strategy"
  >;
}

export function CompetitiveAngle({ opportunity }: CompetitiveAngleProps) {
  return (
    <div className="space-y-4">
      {opportunity.underserved_segment && (
        <div>
          <p className="label-text mb-1">Underserved segment</p>
          <p className="text-body text-text-secondary">
            {opportunity.underserved_segment}
          </p>
        </div>
      )}

      {opportunity.competitor_summary && (
        <div>
          <p className="label-text mb-1">Market reality</p>
          <p className="text-body text-text-secondary">
            {opportunity.competitor_summary}
          </p>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        {opportunity.differentiation && (
          <div className="rounded-lg border border-accent-green/30 bg-accent-green/10 px-4 py-3">
            <p className="label-text mb-1 text-accent-green">Do this</p>
            <p className="text-body text-text-primary">
              {opportunity.differentiation}
            </p>
          </div>
        )}

        {opportunity.avoid && (
          <div className="rounded-lg border border-accent-crimson/30 bg-accent-crimson/10 px-4 py-3">
            <p className="label-text mb-1 text-accent-crimson">Avoid</p>
            <p className="text-body text-text-primary">{opportunity.avoid}</p>
          </div>
        )}
      </div>

      {opportunity.entry_strategy && (
        <div>
          <p className="label-text mb-1">Entry strategy</p>
          <p className="text-body text-text-secondary">
            {opportunity.entry_strategy}
          </p>
        </div>
      )}
    </div>
  );
}
