"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { PageContainer } from "@/components/layout/PageContainer";
import { FilterBar } from "@/components/ui/FilterBar";
import { PersonaSelector } from "@/components/ui/PersonaSelector";
import { OpportunityCard } from "@/components/cards/OpportunityCard";
import { useFilters } from "@/hooks/useFilters";
import { usePersonaLens } from "@/hooks/usePersonaLens";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import { getPersonaConfig } from "@/lib/persona-lens";
import type { ExploreMode } from "@/lib/feed-filters";
import type { Opportunity } from "@/types/opportunity";

interface DashboardContentProps {
  opportunities: Opportunity[];
}

const EXPLORE_MODE_OPTIONS: Array<{ value: ExploreMode; label: string }> = [
  { value: "focus", label: "My industries" },
  { value: "adjacent", label: "Adjacent industries" },
  { value: "all", label: "All industries" },
];

export function DashboardContent({ opportunities }: DashboardContentProps) {
  const { preferences, ready: prefsReady } = useUserPreferences();
  const [exploreMode, setExploreMode] = useState<ExploreMode>("focus");
  const { filters, filtered, updateFilter, resetFilters } = useFilters(
    opportunities,
    {
      preferences: prefsReady ? preferences : null,
      exploreMode,
    }
  );
  const { personaId, lens, setPersonaId, ready } = usePersonaLens();

  const personaConfig = getPersonaConfig(personaId);

  const showExploreSelector =
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
          <PersonaSelector
            value={personaId}
            onChange={(id) => void setPersonaId(id)}
            compact
          />
        </div>

        {showExploreSelector && (
          <div className="mb-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-text-muted">
              Explore mode
            </p>
            <div className="flex flex-wrap gap-2">
              {EXPLORE_MODE_OPTIONS.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setExploreMode(value)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                    exploreMode === value
                      ? "border-accent-blue bg-accent-blue/15 text-accent-blue"
                      : "border-border-subtle text-text-muted hover:border-accent-blue/40 hover:text-text-primary"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
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
              {showExploreSelector && exploreMode === "focus" && (
                <>
                  {" "}
                  Try expanding to adjacent or all industries.
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
                personaScoreDelta={opportunity.persona_score_delta}
              />
            ))
          )}
        </div>
      </PageContainer>
    </div>
  );
}
