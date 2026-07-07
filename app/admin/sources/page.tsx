"use client";

import { useCallback, useEffect, useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { createSource, getSources, updateSource } from "@/lib/queries";
import type {
  ApiStatus,
  Cadence,
  SourceRow,
  SourceType,
  WorkflowLane,
} from "@/types/database";

type SourceFormState = {
  name: string;
  workflow_lane: WorkflowLane;
  source_type: SourceType;
  category: string;
  api_status: ApiStatus;
  cadence: Cadence | "";
  geography_scope: string;
  reliability_score: string;
  freshness_window_days: string;
  active: boolean;
  notes: string;
};

const emptyForm: SourceFormState = {
  name: "",
  workflow_lane: "pressure_discovery",
  source_type: "structural",
  category: "",
  api_status: "manual",
  cadence: "",
  geography_scope: "",
  reliability_score: "",
  freshness_window_days: "",
  active: true,
  notes: "",
};

const workflowLanes: WorkflowLane[] = [
  "pressure_discovery",
  "demand_validation",
  "market_wedge_validation",
  "workflow_friction",
];

const sourceTypes: SourceType[] = [
  "structural",
  "trigger",
  "market_proof",
  "friction",
];

const apiStatuses: ApiStatus[] = ["automated", "semi_manual", "manual"];

const cadences: Cadence[] = [
  "daily",
  "weekly",
  "monthly",
  "quarterly",
  "annual",
  "manual",
];

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

function laneBadgeClass(lane: WorkflowLane): string {
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

function sourceTypeBadgeClass(type: SourceType): string {
  switch (type) {
    case "structural":
      return "badge-blue";
    case "trigger":
      return "badge-crimson";
    case "market_proof":
      return "badge-orange";
    case "friction":
      return "badge-green";
    default:
      return "badge-muted";
  }
}

function apiStatusBadgeClass(status: ApiStatus): string {
  switch (status) {
    case "automated":
      return "badge-green";
    case "semi_manual":
      return "badge-orange";
    default:
      return "badge-muted";
  }
}

function toFormState(source: SourceRow): SourceFormState {
  return {
    name: source.name,
    workflow_lane: source.workflow_lane,
    source_type: source.source_type,
    category: source.category ?? "",
    api_status: source.api_status,
    cadence: source.cadence ?? "",
    geography_scope: source.geography_scope ?? "",
    reliability_score:
      source.reliability_score != null ? String(source.reliability_score) : "",
    freshness_window_days:
      source.freshness_window_days != null
        ? String(source.freshness_window_days)
        : "",
    active: source.active,
    notes: source.notes ?? "",
  };
}

function toPayload(form: SourceFormState) {
  return {
    name: form.name.trim(),
    workflow_lane: form.workflow_lane,
    source_type: form.source_type,
    category: form.category.trim() || null,
    api_status: form.api_status,
    cadence: form.cadence || null,
    geography_scope: form.geography_scope.trim() || null,
    reliability_score: form.reliability_score
      ? Number(form.reliability_score)
      : null,
    freshness_window_days: form.freshness_window_days
      ? Number(form.freshness_window_days)
      : null,
    active: form.active,
    notes: form.notes.trim() || null,
  };
}

export default function SourcesPage() {
  const [sources, setSources] = useState<SourceRow[]>([]);
  const [form, setForm] = useState<SourceFormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSources = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getSources();
      setSources(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load sources. Check your Supabase connection or try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSources();
  }, [loadSources]);

  const handleEdit = (source: SourceRow) => {
    setForm(toFormState(source));
    setEditingId(source.id);
    setError(null);
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const payload = toPayload(form);

      if (editingId) {
        await updateSource(editingId, payload);
      } else {
        await createSource(payload);
      }

      setForm(emptyForm);
      setEditingId(null);
      await loadSources();
    } catch (err) {
      console.error(err);
      setError(
        editingId
          ? "Failed to update source. Check required fields and try again."
          : "Failed to create source. The name may already exist."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageContainer>
      <h1 className="page-title mb-2">Source Registry</h1>
      <p className="mb-8 text-body text-text-secondary">
        Track ingestion sources across pressure discovery, demand validation,
        market proof, and workflow friction lanes.
      </p>

      {error && (
        <div className="mb-6 rounded-md border border-accent-crimson/30 bg-accent-crimson/10 px-4 py-3 text-sm text-accent-crimson">
          {error}
        </div>
      )}

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,1fr)]">
        <div>
          <h2 className="section-title mb-4">Registered Sources</h2>

          {loading ? (
            <p className="text-body text-text-muted">Loading...</p>
          ) : sources.length === 0 ? (
            <div className="glass-card text-center">
              <p className="text-body text-text-secondary">
                No sources registered yet.
              </p>
              <p className="mt-2 text-meta text-text-muted">
                Add your first ingestion source using the form.
              </p>
            </div>
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
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {sources.map((source) => (
                    <tr
                      key={source.id}
                      className={
                        editingId === source.id ? "bg-accent-blue/5" : undefined
                      }
                    >
                      <td className="font-medium text-text-primary">
                        {source.name}
                      </td>
                      <td>
                        <span
                          className={`${laneBadgeClass(source.workflow_lane)} capitalize`}
                        >
                          {formatLabel(source.workflow_lane)}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`${sourceTypeBadgeClass(source.source_type)} capitalize`}
                        >
                          {formatLabel(source.source_type)}
                        </span>
                      </td>
                      <td>{source.category ?? "—"}</td>
                      <td>
                        <span
                          className={`${apiStatusBadgeClass(source.api_status)} capitalize`}
                        >
                          {formatLabel(source.api_status)}
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
                      <td>
                        <button
                          type="button"
                          onClick={() => handleEdit(source)}
                          className="text-sm text-accent-blue hover:text-accent-blue-glow"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div>
          <h2 className="section-title mb-4">
            {editingId ? "Edit Source" : "Add Source"}
          </h2>

          <form onSubmit={handleSubmit} className="glass-card space-y-4">
            <div>
              <label className="label-text mb-1.5 block">Name</label>
              <input
                className="input-field"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="label-text mb-1.5 block">Workflow Lane</label>
              <select
                className="input-field"
                value={form.workflow_lane}
                onChange={(e) =>
                  setForm({
                    ...form,
                    workflow_lane: e.target.value as WorkflowLane,
                  })
                }
              >
                {workflowLanes.map((lane) => (
                  <option key={lane} value={lane}>
                    {formatLabel(lane)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label-text mb-1.5 block">Source Type</label>
              <select
                className="input-field"
                value={form.source_type}
                onChange={(e) =>
                  setForm({
                    ...form,
                    source_type: e.target.value as SourceType,
                  })
                }
              >
                {sourceTypes.map((type) => (
                  <option key={type} value={type}>
                    {formatLabel(type)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label-text mb-1.5 block">Category</label>
              <input
                className="input-field"
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
              />
            </div>

            <div>
              <label className="label-text mb-1.5 block">API Status</label>
              <select
                className="input-field"
                value={form.api_status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    api_status: e.target.value as ApiStatus,
                  })
                }
              >
                {apiStatuses.map((status) => (
                  <option key={status} value={status}>
                    {formatLabel(status)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label-text mb-1.5 block">Cadence</label>
              <select
                className="input-field"
                value={form.cadence}
                onChange={(e) =>
                  setForm({
                    ...form,
                    cadence: e.target.value as Cadence | "",
                  })
                }
              >
                <option value="">Not set</option>
                {cadences.map((cadence) => (
                  <option key={cadence} value={cadence}>
                    {formatLabel(cadence)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label-text mb-1.5 block">Geography Scope</label>
              <input
                className="input-field"
                value={form.geography_scope}
                onChange={(e) =>
                  setForm({ ...form, geography_scope: e.target.value })
                }
                placeholder="US, Global, EU..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-text mb-1.5 block">
                  Reliability (1-5)
                </label>
                <input
                  className="input-field"
                  type="number"
                  min={1}
                  max={5}
                  value={form.reliability_score}
                  onChange={(e) =>
                    setForm({ ...form, reliability_score: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="label-text mb-1.5 block">
                  Freshness Window (days)
                </label>
                <input
                  className="input-field"
                  type="number"
                  min={1}
                  value={form.freshness_window_days}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      freshness_window_days: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-text-secondary">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) =>
                  setForm({ ...form, active: e.target.checked })
                }
                className="h-4 w-4 rounded border-border bg-bg-elevated accent-accent-blue"
              />
              Active source
            </label>

            <div>
              <label className="label-text mb-1.5 block">Notes</label>
              <textarea
                className="input-field min-h-24"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="btn-primary disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Source"
                    : "Create Source"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </PageContainer>
  );
}
