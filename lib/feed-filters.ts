import { computePersonaScore } from "@/lib/scoring";
import type { OpportunityFeedItem } from "@/types/opportunity";
import type { Opportunity } from "@/types/opportunity";
import type {
  SignalPreferences,
  UserPreferences,
} from "@/types/user-preferences";
import { createDefaultUserPreferences } from "@/types/user-preferences";
import { getSignalPreferenceStrength } from "@/lib/scoring";

const SIGNAL_SCORE_THRESHOLD = 50;

const BUYER_KEYWORDS: Record<string, string[]> = {
  smb: ["smb", "small business", "local", "contractor", "startup"],
  mid_market: ["mid-market", "mid market", "regional", "growing"],
  enterprise: ["enterprise", "director", "vp", "fortune", "large"],
  public_sector: ["government", "public sector", "municipal", "federal"],
};

const INDUSTRY_KEYWORDS: Record<string, string[]> = {
  healthcare: ["healthcare", "hospital", "clinical", "medical"],
  financial_services: ["financial", "fintech", "banking", "crypto", "finance"],
  compliance: ["compliance", "regulatory", "osha", "audit"],
  hr: ["hr", "people", "policy", "hiring", "workforce"],
  construction: ["construction", "contractor", "trades", "safety"],
  developer_tools: ["developer", "devops", "api", "engineering"],
  logistics: ["logistics", "supply chain", "shipping", "warehouse"],
  public_sector: ["government", "public sector", "municipal", "federal"],
};

export type FeedFilterOptions = {
  exploreOutsideFocus?: boolean;
};

export function getEffectivePreferences(
  preferences: UserPreferences | null
): UserPreferences {
  if (!preferences) {
    return createDefaultUserPreferences("anonymous");
  }

  if (!preferences.onboarding_completed) {
    return {
      ...preferences,
      role: "general",
      industries: [],
      buyer_types: [],
      signal_preferences: {
        pressure: true,
        demand: true,
        wedge: true,
        friction: true,
        complaints: true,
        digital_infrastructure: true,
      },
    };
  }

  return preferences;
}

function buyerHaystack(opportunity: Opportunity): string {
  return [
    opportunity.primary_buyer,
    opportunity.target_buyer,
    opportunity.asset_strategy,
    opportunity.best_first_asset,
    ...(opportunity.secondary_buyers ?? []),
    ...(opportunity.buyer_tags ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function industryHaystack(opportunity: Opportunity): string {
  return [
    ...(opportunity.industry_tags ?? []),
    ...(opportunity.tags ?? []),
    opportunity.asset_strategy,
    opportunity.best_first_asset,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function matchesIndustry(
  opportunity: Opportunity,
  industries: string[],
  exploreOutsideFocus: boolean
): boolean {
  if (exploreOutsideFocus || industries.length === 0) {
    return true;
  }

  if (industries.includes("explore")) {
    return true;
  }

  const haystack = industryHaystack(opportunity);

  return industries.some((industry) => {
    const keywords = INDUSTRY_KEYWORDS[industry] ?? [industry.replace(/_/g, " ")];
    return keywords.some((keyword) => haystack.includes(keyword));
  });
}

export function matchesBuyerType(
  opportunity: Opportunity,
  buyerTypes: string[]
): boolean {
  if (buyerTypes.length === 0 || buyerTypes.includes("no_preference")) {
    return true;
  }

  const haystack = buyerHaystack(opportunity);

  return buyerTypes.some((buyerType) => {
    const keywords = BUYER_KEYWORDS[buyerType] ?? [buyerType.replace(/_/g, " ")];
    return keywords.some((keyword) => haystack.includes(keyword));
  });
}

export function matchesSignalPreferences(
  opportunity: Opportunity,
  signalPreferences: SignalPreferences
): boolean {
  const enabledSignals = (
    Object.entries(signalPreferences) as Array<[keyof SignalPreferences, boolean]>
  ).filter(([, enabled]) => enabled);

  if (enabledSignals.length === 0) {
    return true;
  }

  if (enabledSignals.length === Object.keys(signalPreferences).length) {
    return true;
  }

  return enabledSignals.some(([signal]) => {
    const strength = getSignalPreferenceStrength(opportunity, signal);
    return strength >= SIGNAL_SCORE_THRESHOLD;
  });
}

export function filterOpportunitiesByPreferences(
  opportunities: Opportunity[],
  preferences: UserPreferences | null,
  options: FeedFilterOptions = {}
): OpportunityFeedItem[] {
  const effective = getEffectivePreferences(preferences);
  const exploreOutsideFocus = options.exploreOutsideFocus ?? false;

  return opportunities
    .filter((opportunity) =>
      matchesIndustry(opportunity, effective.industries, exploreOutsideFocus)
    )
    .filter((opportunity) =>
      matchesBuyerType(opportunity, effective.buyer_types)
    )
    .filter((opportunity) =>
      matchesSignalPreferences(opportunity, effective.signal_preferences)
    )
    .map((opportunity) => ({
      ...opportunity,
      ...computePersonaScore(opportunity, effective.role),
    }))
    .sort((a, b) => b.persona_score - a.persona_score);
}
