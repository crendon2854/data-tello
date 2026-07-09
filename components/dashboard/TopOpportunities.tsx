import { OpportunityCard } from "@/components/cards/OpportunityCard";
import type { DecisionLayerOpportunity } from "@/lib/decision-layer";
type RankedOpportunity = DecisionLayerOpportunity;

interface TopOpportunitiesProps {
  opportunities: RankedOpportunity[];
  cardAssetLabel?: string;
}

export function TopOpportunities({
  opportunities,
  cardAssetLabel = "Start with",
}: TopOpportunitiesProps) {
  if (opportunities.length === 0) {
    return null;
  }

  return (
    <section className="mb-8">
      <div className="mb-4">
        <h2 className="section-title">Top Opportunities This Week</h2>
        <p className="mt-1 text-body text-text-muted">
          Ranked by match score, signal strength, and freshness
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {opportunities.map((opportunity, index) => (
          <OpportunityCard
            key={opportunity.id}
            opportunity={opportunity}
            index={index}
            variant="ranked"
            rank={index + 1}
            cardAssetLabel={cardAssetLabel}
            confidenceLevel={opportunity.confidence_level}
            decisionTimeToValue={opportunity.time_to_value}
            showCta
          />
        ))}
      </div>
    </section>
  );
}
