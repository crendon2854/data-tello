"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { PageContainer } from "@/components/layout/PageContainer";
import { FilterBar } from "@/components/ui/FilterBar";
import { OpportunityCard } from "@/components/cards/OpportunityCard";
import { useFilters } from "@/hooks/useFilters";
import type { Opportunity } from "@/types/opportunity";

interface DashboardContentProps {
  opportunities: Opportunity[];
}

export function DashboardContent({ opportunities }: DashboardContentProps) {
  const { filters, filtered, updateFilter, resetFilters } =
    useFilters(opportunities);

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      <Sidebar variant="dashboard" />
      <PageContainer className="flex-1">
        <div className="mb-8">
          <div className="mb-1 flex items-center gap-2">
            <span className="command-meta">Command Center</span>
            <span className="text-border-subtle">|</span>
            <span className="font-mono text-xs text-accent-blue">
              OPPORTUNITY INTELLIGENCE
            </span>
          </div>
          <h1 className="page-title">Opportunity Dashboard</h1>
          <p className="mt-1 text-body text-text-muted">
            Pick an opportunity — click through for the full build decision brief.
          </p>
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
              />
            ))
          )}
        </div>
      </PageContainer>
    </div>
  );
}
