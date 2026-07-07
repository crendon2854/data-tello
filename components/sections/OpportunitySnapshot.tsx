import type { Opportunity } from "@/types/opportunity";
import { formatScore } from "@/lib/helpers";

interface OpportunitySnapshotProps {
  opportunity: Pick<
    Opportunity,
    | "title"
    | "overall_score"
    | "best_first_asset"
    | "complexity"
    | "tags"
    | "asset_path_1"
    | "initial_wedge"
    | "time_to_value"
  >;
}

export function OpportunitySnapshot({ opportunity }: OpportunitySnapshotProps) {
  return (
    <div className="space-y-5 text-text-primary">
      <div>
        <p className="label-text mb-2">Opportunity</p>
        <h1 className="page-title">{opportunity.title}</h1>
      </div>

      <div className="rounded-lg border border-accent-blue/30 bg-accent-blue/10 px-4 py-3">
        <p className="label-text mb-1">Build this first</p>
        <p className="text-base font-semibold text-text-primary">
          {opportunity.asset_path_1 ?? opportunity.best_first_asset}
        </p>
        {opportunity.initial_wedge && (
          <p className="mt-1 text-body text-text-secondary">
            Wedge: {opportunity.initial_wedge}
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <p className="label-text mb-1">Overall Score</p>
          <p className="kpi-value text-accent-blue">
            {formatScore(opportunity.overall_score)}
          </p>
        </div>

        <div>
          <p className="label-text mb-1">Complexity</p>
          <p className="font-mono text-lg font-semibold text-text-primary">
            {opportunity.complexity ?? "—"}
          </p>
        </div>

        <div>
          <p className="label-text mb-1">Time to Value</p>
          <p className="font-mono text-lg font-semibold text-accent-green">
            {opportunity.time_to_value ?? "—"}
          </p>
        </div>
      </div>

      {opportunity.best_first_asset && (
        <div>
          <p className="label-text mb-1">Best First Asset</p>
          <p className="text-sm font-medium text-text-primary">
            {opportunity.best_first_asset}
          </p>
        </div>
      )}

      {(opportunity.tags ?? []).length > 0 && (
        <div className="flex flex-wrap gap-2">
          {(opportunity.tags ?? []).map((tag) => (
            <span key={tag} className="badge-blue">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
