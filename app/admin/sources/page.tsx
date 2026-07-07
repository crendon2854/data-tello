"use client";

import { useEffect, useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { getSources } from "@/lib/queries";
import type { SourceRow } from "@/types/database";

function formatLane(lane: SourceRow["workflow_lane"]): string {
  return lane.replace(/_/g, " ");
}

function formatDate(value: string | null): string {
  if (!value) return "—";
  return new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function statusBadgeClass(status: SourceRow["api_status"]): string {
  switch (status) {
    case "automated":
      return "badge-green";
    case "semi_manual":
      return "badge-orange";
    default:
      return "badge-muted";
  }
}

export default function SourcesPage() {
  const [sources, setSources] = useState<SourceRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSources().then(setSources).finally(() => setLoading(false));
  }, []);

  return (
    <PageContainer>
      <h1 className="page-title mb-2">Source Registry</h1>
      <p className="mb-8 text-body text-text-secondary">
        Track ingestion sources across pressure discovery, demand validation,
        market proof, and workflow friction lanes.
      </p>

      {loading ? (
        <p className="text-body text-text-muted">Loading...</p>
      ) : (
        <div className="glass-card data-table !p-0 overflow-x-auto">
          <table className="w-full min-w-[960px]">
            <thead>
              <tr>
                <th>Name</th>
                <th>Workflow Lane</th>
                <th>Type</th>
                <th>Category</th>
                <th>API Status</th>
                <th>Cadence</th>
                <th>Geography</th>
                <th>Reliability</th>
                <th>Active</th>
                <th>Last Sync</th>
              </tr>
            </thead>
            <tbody>
              {sources.map((source) => (
                <tr key={source.id}>
                  <td className="font-medium text-text-primary">{source.name}</td>
                  <td>
                    <span className="badge-blue capitalize">
                      {formatLane(source.workflow_lane)}
                    </span>
                  </td>
                  <td>
                    <span className="badge-muted capitalize">
                      {source.source_type.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td>{source.category ?? "—"}</td>
                  <td>
                    <span className={statusBadgeClass(source.api_status)}>
                      {source.api_status.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="capitalize">{source.cadence ?? "—"}</td>
                  <td>{source.geography_scope ?? "—"}</td>
                  <td>
                    {source.reliability_score != null
                      ? `${source.reliability_score}/5`
                      : "—"}
                  </td>
                  <td>
                    <span
                      className={
                        source.active ? "badge-green" : "badge-muted"
                      }
                    >
                      {source.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>{formatDate(source.last_sync_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PageContainer>
  );
}
