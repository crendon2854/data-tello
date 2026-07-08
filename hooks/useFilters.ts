"use client";

import { useMemo, useState } from "react";
import { filterOpportunitiesByPreferences } from "@/lib/feed-filters";
import { getDefaultFilters } from "@/lib/persona-lens";
import type { Opportunity } from "@/types/opportunity";
import {
  DEFAULT_FILTERS,
  type OpportunityFilters,
} from "@/types/opportunity";
import type { UserPreferences } from "@/types/user-preferences";

type UseFiltersOptions = {
  preferences?: UserPreferences | null;
  exploreOutsideFocus?: boolean;
};

export function useFilters(
  opportunities: Opportunity[],
  options: UseFiltersOptions = {}
) {
  const { preferences = null, exploreOutsideFocus = false } = options;

  const initialFilters = useMemo(() => {
    if (preferences?.onboarding_completed) {
      return getDefaultFilters(preferences.role);
    }
    return DEFAULT_FILTERS;
  }, [preferences]);

  const [filters, setFilters] = useState<OpportunityFilters>(initialFilters);

  const preferenceFiltered = useMemo(() => {
    return filterOpportunitiesByPreferences(opportunities, preferences, {
      exploreOutsideFocus,
    });
  }, [opportunities, preferences, exploreOutsideFocus]);

  const filtered = useMemo(() => {
    return preferenceFiltered.filter((opportunity) => {
      if (
        filters.assetType &&
        !opportunity.best_first_asset
          ?.toLowerCase()
          .includes(filters.assetType.toLowerCase())
      ) {
        return false;
      }

      if (filters.minScore > 0 && opportunity.overall_score < filters.minScore) {
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
