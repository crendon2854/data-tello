"use client";

import { useMemo, useState } from "react";
import type { Opportunity } from "@/types/opportunity";
import {
  DEFAULT_FILTERS,
  type OpportunityFilters,
} from "@/types/opportunity";

export function useFilters(opportunities: Opportunity[]) {
  const [filters, setFilters] = useState<OpportunityFilters>(DEFAULT_FILTERS);

  const filtered = useMemo(() => {
    return opportunities.filter((opportunity) => {
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
  }, [opportunities, filters]);

  const updateFilter = <K extends keyof OpportunityFilters>(
    key: K,
    value: OpportunityFilters[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  return { filters, filtered, updateFilter, resetFilters };
}
