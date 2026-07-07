"use client";

import { useCallback, useEffect, useState } from "react";
import type { Opportunity } from "@/types/opportunity";

export function useOpportunities() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOpportunities = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/opportunities");

      if (!response.ok) {
        throw new Error("Failed to load opportunities");
      }

      const data: Opportunity[] = await response.json();
      setOpportunities(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load opportunities");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOpportunities();
  }, [fetchOpportunities]);

  return { opportunities, loading, error, refetch: fetchOpportunities };
}
