import Link from "next/link";
import type { Opportunity } from "@/types/opportunity";
import { formatScore } from "@/lib/helpers";

interface OpportunityCardProps {
  opportunity: Opportunity;
  index?: number;
  cardAssetLabel?: string;
}

export function OpportunityCard({
  opportunity,
  index = 0,
  cardAssetLabel = "Start with",
}: OpportunityCardProps) {
  const staggerClass =
    index === 1 ? "stagger-1" : index === 2 ? "stagger-2" : index >= 3 ? "stagger-3" : "";

  return (
    <Link
      href={`/opportunity/${opportunity.id}`}
      className={`glass-card group block animate-slide-in opacity-0 transition-all hover:border-accent-blue/30 hover:shadow-glow-blue ${staggerClass}`}
    >
      <div className="ambient-glow-blue opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />

      <div className="relative flex items-start gap-4">
        <div className="icon-box-blue">
          <span className="font-mono text-xs font-bold">
            {formatScore(opportunity.overall_score)}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-start justify-between gap-4">
            <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent-blue">
              {opportunity.title}
            </h3>
            <span className="status-live shrink-0 text-xs font-medium text-accent-green">
              Ready
            </span>
          </div>

          {opportunity.best_first_asset && (
            <p className="mb-2 text-body">
              <span className="font-medium text-text-primary">{cardAssetLabel}:</span>{" "}
              <span className="text-text-secondary">{opportunity.best_first_asset}</span>
            </p>
          )}

          {opportunity.short_summary && (
            <p className="mb-3 text-body text-text-secondary">
              {opportunity.short_summary}
            </p>
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
      </div>
    </Link>
  );
}
