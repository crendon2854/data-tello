import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import type { DecisionLayerOpportunity } from "@/lib/decision-layer";
import { formatScore, cn } from "@/lib/helpers";

interface RecommendedForYouProps {
  opportunity: DecisionLayerOpportunity;
  cardAssetLabel?: string;
}

function ConfidenceBadge({ level }: { level: string }) {
  return (
    <span
      className={cn(
        "rounded-full border px-2.5 py-0.5 text-xs font-medium",
        level === "High" &&
          "border-accent-green/40 bg-accent-green/10 text-accent-green",
        level === "Medium" &&
          "border-accent-orange/40 bg-accent-orange/10 text-accent-orange",
        level === "Low" && "border-border-subtle bg-bg-elevated text-text-muted"
      )}
    >
      {level} confidence
    </span>
  );
}

function TimeToValueBadge({ value }: { value: string }) {
  return (
    <span
      className={cn(
        "rounded-full border px-2.5 py-0.5 text-xs font-medium",
        value === "Fast" &&
          "border-accent-green/40 bg-accent-green/10 text-accent-green",
        value === "Medium" &&
          "border-accent-blue/40 bg-accent-blue/10 text-accent-blue",
        value === "Slow" && "border-border-subtle bg-bg-elevated text-text-muted"
      )}
    >
      {value} time-to-value
    </span>
  );
}

export function RecommendedForYou({
  opportunity,
  cardAssetLabel = "Best first asset",
}: RecommendedForYouProps) {
  const displayScore =
    opportunity.recommended_rank_score ?? opportunity.overall_score;
  const asset = opportunity.best_first_asset ?? opportunity.asset_path_1;
  const reasons = opportunity.recommended_reason ?? [];

  return (
    <section className="mb-8 animate-slide-in opacity-0">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-accent-blue" />
        <h2 className="section-title">Recommended for You</h2>
      </div>

      <div className="glass-card relative overflow-hidden border-accent-blue/30">
        <div className="ambient-glow-blue opacity-60" aria-hidden />

        <div className="relative p-5 sm:p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0 flex-1 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="badge-blue">Top pick</span>
                <ConfidenceBadge level={opportunity.confidence_level} />
                <TimeToValueBadge value={opportunity.time_to_value} />
              </div>

              <div>
                <h3 className="text-lg font-bold text-text-primary sm:text-xl">
                  {opportunity.title}
                </h3>
                {opportunity.initial_wedge && (
                  <p className="mt-1 text-body text-text-secondary">
                    {opportunity.initial_wedge.length > 120
                      ? `${opportunity.initial_wedge.slice(0, 117)}…`
                      : opportunity.initial_wedge}
                  </p>
                )}
              </div>

              {asset && (
                <div className="rounded-lg border border-accent-blue/30 bg-accent-blue/10 px-4 py-3">
                  <p className="label-text mb-1">{cardAssetLabel}</p>
                  <p className="text-sm font-semibold text-text-primary">{asset}</p>
                </div>
              )}

              {reasons.length > 0 && (
                <div>
                  <p className="label-text mb-2">Why this fits you</p>
                  <ul className="space-y-1.5">
                    {reasons.map((reason) => (
                      <li
                        key={reason}
                        className="flex items-start gap-2 text-body text-text-secondary"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-blue" />
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-wrap gap-3 pt-1">
                <Link
                  href={`/opportunity/${opportunity.id}`}
                  className="btn-primary inline-flex items-center gap-2 text-sm"
                >
                  View Dossier
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={`/opportunity/${opportunity.id}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-border-subtle px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:border-accent-blue/40 hover:text-accent-blue"
                >
                  Start Here
                </Link>
              </div>
            </div>

            <div className="flex shrink-0 flex-col items-center gap-1 lg:items-end">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-blue to-accent-blue-glow text-xl font-bold text-white shadow-glow-blue">
                {formatScore(displayScore)}
              </div>
              <p className="text-xs text-text-muted">Match score</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
