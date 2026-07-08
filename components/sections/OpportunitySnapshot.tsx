import type { Opportunity } from "@/types/opportunity";
import { formatScore } from "@/lib/helpers";
import type { SectionContentConfig } from "@/lib/dossier-content";

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
    | "wedge_score"
  >;
  snapshotAssetLabel?: string;
  primaryCta?: string;
  content?: SectionContentConfig;
  personaScore?: number;
  personaScoreDelta?: number;
}

export function OpportunitySnapshot({
  opportunity,
  snapshotAssetLabel = "Start building",
  primaryCta,
  content,
  personaScore,
  personaScoreDelta,
}: OpportunitySnapshotProps) {
  const scoreLabel = content?.fieldLabels?.overall_score ?? "Overall Score";
  const assetLabel = content?.fieldLabels?.best_first_asset ?? "Best First Asset";
  const ttvLabel = content?.fieldLabels?.time_to_value ?? "Time to Value";
  const complexityLabel = content?.fieldLabels?.complexity ?? "Complexity";
  const displayScore = personaScore ?? opportunity.overall_score;

  return (
    <div className="space-y-5 text-text-primary">
      {content?.intro && (
        <p className="text-body text-text-muted">{content.intro}</p>
      )}

      <div>
        <p className="label-text mb-2">Opportunity</p>
        <h1 className="page-title">{opportunity.title}</h1>
      </div>

      <div className="rounded-lg border border-accent-blue/30 bg-accent-blue/10 px-4 py-3">
        <p className="label-text mb-1">{snapshotAssetLabel}</p>
        <p className="text-base font-semibold text-text-primary">
          {opportunity.asset_path_1 ?? opportunity.best_first_asset}
        </p>
        {primaryCta && (
          <p className="mt-2 text-xs font-medium text-accent-blue">{primaryCta}</p>
        )}
        {opportunity.initial_wedge && (
          <p className="mt-1 text-body text-text-secondary">
            Wedge: {opportunity.initial_wedge}
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <p className="label-text mb-1">{scoreLabel}</p>
          <p className="kpi-value text-accent-blue">{formatScore(displayScore)}</p>
          {personaScoreDelta != null && personaScoreDelta !== 0 && (
            <p className="mt-1 text-xs text-text-muted">
              Lens adjustment: {personaScoreDelta > 0 ? "+" : ""}
              {personaScoreDelta}
            </p>
          )}
        </div>

        <div>
          <p className="label-text mb-1">{complexityLabel}</p>
          <p className="font-mono text-lg font-semibold text-text-primary">
            {opportunity.complexity ?? "—"}
          </p>
        </div>

        <div>
          <p className="label-text mb-1">{ttvLabel}</p>
          <p className="font-mono text-lg font-semibold text-accent-green">
            {opportunity.time_to_value ?? "—"}
          </p>
        </div>
      </div>

      {opportunity.best_first_asset && (
        <div>
          <p className="label-text mb-1">{assetLabel}</p>
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
