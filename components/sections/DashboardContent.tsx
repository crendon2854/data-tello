"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { PageContainer } from "@/components/layout/PageContainer";
import { FilterBar } from "@/components/ui/FilterBar";
import { PersonaSelector } from "@/components/ui/PersonaSelector";
import { OpportunityCard } from "@/components/cards/OpportunityCard";
import { useFilters } from "@/hooks/useFilters";
import { usePersonaLens } from "@/hooks/usePersonaLens";
import type { Opportunity } from "@/types/opportunity";

interface DashboardContentProps {
  opportunities: Opportunity[];
}

export function DashboardContent({ opportunities }: DashboardContentProps) {
  const { filters, filtered, updateFilter, resetFilters } =
    useFilters(opportunities);
  const { personaId, lens, setPersonaId, ready } = usePersonaLens();

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
        </div>

        <div className="mb-6 max-w-md">
          <PersonaSelector value={personaId} onChange={setPersonaId} compact />
        </div>

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
