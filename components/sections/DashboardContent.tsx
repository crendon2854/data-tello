"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { PageContainer } from "@/components/layout/PageContainer";
import { FilterBar } from "@/components/ui/FilterBar";
import { PersonaSelector } from "@/components/ui/PersonaSelector";
import { OpportunityCard } from "@/components/cards/OpportunityCard";
import { useFilters } from "@/hooks/useFilters";
import { usePersonaLens } from "@/hooks/usePersonaLens";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import { getPersonaConfig } from "@/lib/persona-lens";
import type { Opportunity } from "@/types/opportunity";

interface DashboardContentProps {
  opportunities: Opportunity[];
}

export function DashboardContent({ opportunities }: DashboardContentProps) {
  const { preferences, ready: prefsReady } = useUserPreferences();
  const [exploreOutsideFocus, setExploreOutsideFocus] = useState(false);
  const { filters, filtered, updateFilter, resetFilters } = useFilters(
    opportunities,
    {
      preferences: prefsReady ? preferences : null,
      exploreOutsideFocus,
    }
  );
  const { personaId, lens, setPersonaId, ready } = usePersonaLens();

  useEffect(() => {
    if (prefsReady && preferences?.onboarding_completed) {
      setPersonaId(preferences.role);
    }
  }, [prefsReady, preferences, setPersonaId]);

  const personaConfig = getPersonaConfig(
    preferences?.onboarding_completed ? preferences.role : "general"
  );

  const showExploreToggle =
    prefsReady &&
    preferences?.onboarding_completed &&
    preferences.industries.length > 0 &&
    !preferences.industries.includes("explore");

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      <Sidebar variant="dashboard" />
      <PageContainer className="flex-1">
        <div className="mb-8">
          <div className="mb-1 flex items-center gap-2">
            <span className="command-meta">Command Center</span>
            <span className="text-border-subtle">|</span>
            <span className="font-mono text-xs text-accent-blue">
              BUILD OPPORTUNITY INTELLIGENCE
            </span>
          </div>
          <h1 className="page-title">Opportunity Dashboard</h1>
          {ready && (
            <p className="mt-1 text-body text-text-muted">{lens.dashboardSubtitle}</p>
          )}
          {prefsReady && preferences?.onboarding_completed && (
            <p className="mt-2 text-xs text-text-muted">
              Lens: {personaConfig.label} — emphasis on{" "}
              {personaConfig.emphasis.join(", ")}
            </p>
          )}
        </div>

        <div className="mb-6 max-w-md">
          <PersonaSelector value={personaId} onChange={setPersonaId} compact />
        </div>

        {showExploreToggle && (
          <label className="mb-4 flex cursor-pointer items-center gap-2 text-sm text-text-muted">
            <input
              type="checkbox"
              checked={exploreOutsideFocus}
              onChange={(event) => setExploreOutsideFocus(event.target.checked)}
              className="h-4 w-4 accent-accent-blue"
            />
            Explore outside my focus
          </label>
        )}

        <div className="mb-6">
          <FilterBar
            filters={filters}
            onChange={updateFilter}
            onReset={resetFilters}
          />
        </div>

        <div className="flex flex-col gap-4">
          {filtered.length === 0 ? (
            <p className="text-body text-text-muted">
              No opportunities match your filters.
              {showExploreToggle && !exploreOutsideFocus && (
                <>
                  {" "}
                  Try enabling &ldquo;Explore outside my focus&rdquo;.
                </>
              )}
            </p>
          ) : (
            filtered.map((opportunity, index) => (
              <OpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
                index={index}
                cardAssetLabel={lens.cardAssetLabel}
              />
            ))
          )}
        </div>
      </PageContainer>
    </div>
  );
}
