import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ConfidenceLevel, TimeToValue } from "@/lib/decision-layer";
import { formatScore, cn } from "@/lib/helpers";
import { BUYER_TYPE_OPTIONS } from "@/types/user-preferences";
import type { Opportunity } from "@/types/opportunity";

interface OpportunityCardProps {
  opportunity: Opportunity;
  index?: number;
  variant?: "default" | "ranked";
  rank?: number;
  cardAssetLabel?: string;
  personaScoreDelta?: number;
  confidenceLevel?: ConfidenceLevel;
  decisionTimeToValue?: TimeToValue;
  showCta?: boolean;
}

function formatBuyer(opportunity: Opportunity): string | null {
  if (opportunity.target_buyer) {
    return opportunity.target_buyer;
  }

  const firstTag = opportunity.buyer_tags?.[0];
  if (!firstTag) {
    return null;
  }

  return (
    BUYER_TYPE_OPTIONS.find((option) => option.id === firstTag)?.label ??
    firstTag.replace(/_/g, " ")
  );
}

function MetaBadge({
  children,
  tone = "muted",
}: {
  children: React.ReactNode;
  tone?: "green" | "blue" | "orange" | "muted";
}) {
  return (
    <span
      className={cn(
        "rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide",
        tone === "green" && "border-accent-green/40 text-accent-green",
        tone === "blue" && "border-accent-blue/40 text-accent-blue",
        tone === "orange" && "border-accent-orange/40 text-accent-orange",
        tone === "muted" && "border-border-subtle text-text-muted"
      )}
    >
      {children}
    </span>
  );
}

export function OpportunityCard({
  opportunity,
  index = 0,
  variant = "default",
  rank,
  cardAssetLabel = "Start with",
  personaScoreDelta,
  confidenceLevel,
  decisionTimeToValue,
  showCta = false,
}: OpportunityCardProps) {
  const staggerClass =
    index === 1 ? "stagger-1" : index === 2 ? "stagger-2" : index >= 3 ? "stagger-3" : "";

  const buyer = formatBuyer(opportunity);
  const wedge = opportunity.initial_wedge;
  const isRanked = variant === "ranked";

  const confidenceTone =
    confidenceLevel === "High"
      ? "green"
      : confidenceLevel === "Medium"
        ? "orange"
        : "muted";

  const ttvTone =
    decisionTimeToValue === "Fast"
      ? "green"
      : decisionTimeToValue === "Medium"
        ? "blue"
        : "muted";

  return (
    <Link
      href={`/opportunity/${opportunity.id}`}
      className={cn(
        "glass-card group block animate-slide-in opacity-0",
        staggerClass,
        isRanked && "border-border-subtle"
      )}
    >
      <div className="ambient-glow-blue opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />

      <div className="relative flex items-start gap-4">
        {isRanked && rank != null ? (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border-subtle bg-bg-elevated font-mono text-sm font-bold text-accent-blue">
            #{rank}
          </div>
        ) : (
          <div className="icon-box-blue">
            <span className="font-mono text-xs font-bold">
              {formatScore(opportunity.overall_score)}
            </span>
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-start justify-between gap-4">
            <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent-blue">
              {opportunity.title}
            </h3>
            <div className="flex shrink-0 items-center gap-2">
              {isRanked && (
                <span className="icon-box-blue !h-8 !w-8 font-mono text-[10px] font-bold">
                  {formatScore(opportunity.overall_score)}
                </span>
              )}
              {!isRanked && (
                <span className="status-live shrink-0 text-xs font-medium text-accent-green">
                  Ready
                </span>
              )}
            </div>
          </div>

          {(confidenceLevel || decisionTimeToValue) && (
            <div className="mb-2 flex flex-wrap gap-1.5">
              {confidenceLevel && (
                <MetaBadge tone={confidenceTone}>{confidenceLevel} confidence</MetaBadge>
              )}
              {decisionTimeToValue && (
                <MetaBadge tone={ttvTone}>{decisionTimeToValue} TTV</MetaBadge>
              )}
            </div>
          )}

          {personaScoreDelta != null && personaScoreDelta !== 0 && (
            <p className="mb-2 text-xs text-text-muted">
              Lens rank adjustment: {personaScoreDelta > 0 ? "+" : ""}
              {personaScoreDelta} (score {formatScore(opportunity.overall_score)}{" "}
              unchanged)
            </p>
          )}

          {opportunity.best_first_asset && (
            <p className="mb-1.5 text-body">
              <span className="font-medium text-text-primary">{cardAssetLabel}:</span>{" "}
              <span className="text-text-secondary">{opportunity.best_first_asset}</span>
            </p>
          )}

          {buyer && (
            <p className="mb-1.5 text-xs text-text-muted">
              <span className="font-medium text-text-secondary">Buyer:</span> {buyer}
            </p>
          )}

          {wedge && (
            <p className="mb-2 text-xs text-text-secondary">
              <span className="font-medium text-text-primary">Wedge:</span>{" "}
              {wedge.length > 100 ? `${wedge.slice(0, 97)}…` : wedge}
            </p>
          )}

          {opportunity.short_summary && (
            <p className="mb-3 text-body text-text-secondary">
              {opportunity.short_summary}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-between gap-2">
            {(opportunity.tags ?? []).length > 0 && (
              <div className="flex flex-wrap gap-2">
                {(opportunity.tags ?? []).map((tag) => (
                  <span key={tag} className="badge-blue">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {showCta && (
              <span className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-accent-blue opacity-80 transition-opacity group-hover:opacity-100">
                View Dossier
                <ArrowRight className="h-3 w-3" />
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
