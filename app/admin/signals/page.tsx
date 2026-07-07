"use client";

import { useCallback, useEffect, useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { getRawSignals, toggleRawSignalNeedsReview } from "@/lib/queries";
import type { RawSignalWithSource, WorkflowLane } from "@/types/database";

function formatLabel(value: string): string {
  return value.replace(/_/g, " ");
}

function formatDate(value: string | null): string {
  if (!value) return "—";
  return new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function laneBadgeClass(lane: WorkflowLane | null): string {
  switch (lane) {
    case "pressure_discovery":
      return "badge-crimson";
    case "demand_validation":
      return "badge-blue";
    case "market_wedge_validation":
      return "badge-orange";
    case "workflow_friction":
      return "badge-green";
    default:
      return "badge-muted";
  }
}

export default function SignalsPage() {
  const [signals, setSignals] = useState<RawSignalWithSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSignals = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getRawSignals();
      setSignals(data);
    } catch (err) {
      console.error(err);
      setError(
        "Failed to load raw signals. Check your Supabase connection or try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSignals();
  }, [loadSignals]);

  const handleToggleReview = async (id: string, needsReview: boolean) => {
    try {
      await toggleRawSignalNeedsReview(id, needsReview);
      setSignals((prev) =>
        prev.map((s) => (s.id === id ? { ...s, needs_review: needsReview } : s))
      );
    } catch (err) {
      console.error(err);
      setError("Failed to update review flag.");
    }
  };

  return (
    <PageContainer>
      <h1 className="page-title mb-2">Raw Signal Explorer</h1>
      <p className="mb-8 text-body text-text-secondary">
        Browse ingested records linked to the Source Registry. Use the review
        flag to queue signals for triage before clustering.
      </p>

      {error && (
        <div className="mb-6 rounded-md border border-accent-crimson/30 bg-accent-crimson/10 px-4 py-3 text-sm text-accent-crimson">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-body text-text-muted">Loading...</p>
      ) : signals.length === 0 ? (
        <div className="glass-card text-center">
          <p className="text-body text-text-secondary">No raw signals yet.</p>
          <p className="mt-2 text-meta text-text-muted">
            Seed data or connect ingestion to populate this view.
          </p>
        </div>
      ) : (
        <div className="glass-card data-table !p-0 overflow-x-auto">
          <table className="w-full min-w-[960px]">
            <thead>
              <tr>
                <th>Title</th>
                <th>Source</th>
                <th>Workflow Lane</th>
                <th>Type</th>
                <th>Observed</th>
                <th>Freshness</th>
                <th>Needs Review</th>
              </tr>
            </thead>
            <tbody>
              {signals.map((signal) => (
                <tr key={signal.id}>
                  <td className="max-w-xs font-medium text-text-primary">
                    <p>{signal.title}</p>
                    {signal.summary && (
                      <p className="mt-1 text-meta text-text-muted line-clamp-2">
                        {signal.summary}
                      </p>
                    )}
                  </td>
                  <td>{signal.source_name ?? "—"}</td>
                  <td>
                    {signal.workflow_lane ? (
                      <span
                        className={`${laneBadgeClass(signal.workflow_lane)} capitalize`}
                      >
                        {formatLabel(signal.workflow_lane)}
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>
                    {signal.source_type ? (
                      <span className="badge-orange capitalize">
                        {formatLabel(signal.source_type)}
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>{formatDate(signal.observed_at)}</td>
                  <td className="capitalize">
                    {signal.freshness_label ?? "—"}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={signal.needs_review}
                      onChange={(e) =>
                        handleToggleReview(signal.id, e.target.checked)
                      }
                      className="h-4 w-4 rounded border-border bg-bg-elevated accent-accent-blue"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PageContainer>
  );
}
