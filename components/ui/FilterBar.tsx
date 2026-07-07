"use client";

import type { OpportunityFilters } from "@/types/opportunity";

interface FilterBarProps {
  filters: OpportunityFilters;
  onChange: <K extends keyof OpportunityFilters>(
    key: K,
    value: OpportunityFilters[K]
  ) => void;
  onReset: () => void;
}

export function FilterBar({ filters, onChange, onReset }: FilterBarProps) {
  return (
    <div className="glass-card flex flex-wrap items-end gap-4 !p-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="asset-type" className="label-text">
          Asset Type
        </label>
        <input
          id="asset-type"
          type="text"
          placeholder="e.g. Dashboard"
          value={filters.assetType}
          onChange={(e) => onChange("assetType", e.target.value)}
          className="input-field min-w-[160px]"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="min-score" className="label-text">
          Min Score
        </label>
        <input
          id="min-score"
          type="number"
          min={0}
          max={100}
          value={filters.minScore || ""}
          onChange={(e) => onChange("minScore", Number(e.target.value) || 0)}
          className="input-field w-24 font-mono"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="tag" className="label-text">
          Tags
        </label>
        <input
          id="tag"
          type="text"
          placeholder="e.g. fintech"
          value={filters.tag}
          onChange={(e) => onChange("tag", e.target.value)}
          className="input-field min-w-[140px]"
        />
      </div>

      <button type="button" onClick={onReset} className="btn-secondary">
        Reset
      </button>
    </div>
  );
}
