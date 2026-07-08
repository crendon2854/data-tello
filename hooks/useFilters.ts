"use client";

import { useMemo, useState } from "react";
import { filterOpportunitiesByPreferences, type ExploreMode } from "@/lib/feed-filters";
import { getDefaultFilters } from "@/lib/persona-lens";
import type { Opportunity, OpportunityFeedItem } from "@/types/opportunity";
import {
  DEFAULT_FILTERS,
  type OpportunityFilters,
} from "@/types/opportunity";
import type { UserPreferences } from "@/types/user-preferences";

type UseFiltersOptions = {
  preferences?: UserPreferences | null;
  exploreMode?: ExploreMode;
};

export function useFilters(
  opportunities: Opportunity[],
  options: UseFiltersOptions = {}
) {
  const { preferences = null, exploreMode = "focus" } = options;

  const initialFilters = useMemo(() => {
    if (preferences?.onboarding_completed) {
      return getDefaultFilters(preferences.role);
    }
    return DEFAULT_FILTERS;
  }, [preferences]);

  const [filters, setFilters] = useState<OpportunityFilters>(initialFilters);

  const preferenceFiltered = useMemo(() => {
    return filterOpportunitiesByPreferences(opportunities, preferences, {
      exploreMode,
    });
  }, [opportunities, preferences, exploreMode]);

  const filtered = useMemo(() => {
    return preferenceFiltered.filter((opportunity: OpportunityFeedItem) => {
      if (
        filters.assetType &&
        !opportunity.best_first_asset
          ?.toLowerCase()
          .includes(filters.assetType.toLowerCase())
      ) {
        return false;
      }

      if (filters.minScore > 0 && opportunity.persona_score < filters.minScore) {
        return false;
      }

      if (
        filters.tag &&
        !(opportunity.tags ?? []).some((tag) =>
          tag.toLowerCase().includes(filters.tag.toLowerCase())
        )
      ) {
        return false;
      }

      return true;
    });
  }, [preferenceFiltered, filters]);

  const updateFilter = <K extends keyof OpportunityFilters>(
    key: K,
    value: OpportunityFilters[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => setFilters(initialFilters);

  return { filters, filtered, updateFilter, resetFilters };
}
