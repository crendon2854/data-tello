"use client";

import { useCallback, useEffect, useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import {
  createKeywordMetric,
  createKeywordSet,
  deleteKeywordMetric,
  getKeywordSets,
  getProblemZones,
  updateKeywordMetric,
  updateKeywordSet,
} from "@/lib/queries";
import type {
  IntentType,
  KeywordMetricRow,
  KeywordSetWithMetrics,
  ProblemZoneWithSignals,
} from "@/types/database";

type KeywordSetFormState = {
  problem_zone_id: string;
  name: string;
  topic_layer: string;
  workflow_layer: string;
  product_layer: string;
  buyer_layer: string;
  seed_keywords: string;
  expanded_keywords: string;
  rejected_keywords: string;
  geo_target: string;
  notes: string;
};

type MetricFormState = {
  keyword: string;
  search_volume: string;
  trend_direction: string;
  cpc: string;
  competition: string;
  related_keyword_density: string;
  geo_signal: string;
  intent_type: IntentType | "";
  kept_for_scoring: boolean;
};

const emptySetForm: KeywordSetFormState = {
  problem_zone_id: "",
  name: "",
  topic_layer: "",
  workflow_layer: "",
  product_layer: "",
  buyer_layer: "",
  seed_keywords: "",
  expanded_keywords: "",
  rejected_keywords: "",
  geo_target: "",
  notes: "",
};

const emptyMetricForm: MetricFormState = {
  keyword: "",
  search_volume: "",
  trend_direction: "",
  cpc: "",
  competition: "",
  related_keyword_density: "",
  geo_signal: "",
  intent_type: "",
  kept_for_scoring: false,
};

const intentTypes: IntentType[] = ["informational", "commercial", "mixed"];

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

function parseKeywordList(value: string): string[] {
  return value
    .split(/[\n,]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function formatKeywordList(values: string[]): string {
  return values.join("\n");
}

function toSetFormState(set: KeywordSetWithMetrics): KeywordSetFormState {
  return {
    problem_zone_id: set.problem_zone_id ?? "",
    name: set.name,
    topic_layer: set.topic_layer ?? "",
    workflow_layer: set.workflow_layer ?? "",
    product_layer: set.product_layer ?? "",
    buyer_layer: set.buyer_layer ?? "",
    seed_keywords: formatKeywordList(set.seed_keywords),
    expanded_keywords: formatKeywordList(set.expanded_keywords),
    rejected_keywords: formatKeywordList(set.rejected_keywords),
    geo_target: set.geo_target ?? "",
    notes: set.notes ?? "",
  };
}

function toSetPayload(form: KeywordSetFormState) {
  return {
    problem_zone_id: form.problem_zone_id || null,
    name: form.name.trim(),
    topic_layer: form.topic_layer.trim() || null,
    workflow_layer: form.workflow_layer.trim() || null,
    product_layer: form.product_layer.trim() || null,
    buyer_layer: form.buyer_layer.trim() || null,
    seed_keywords: parseKeywordList(form.seed_keywords),
    expanded_keywords: parseKeywordList(form.expanded_keywords),
    rejected_keywords: parseKeywordList(form.rejected_keywords),
    geo_target: form.geo_target.trim() || null,
    notes: form.notes.trim() || null,
  };
}

function toMetricFormState(metric: KeywordMetricRow): MetricFormState {
  return {
    keyword: metric.keyword,
    search_volume:
      metric.search_volume != null ? String(metric.search_volume) : "",
    trend_direction: metric.trend_direction ?? "",
    cpc: metric.cpc != null ? String(metric.cpc) : "",
    competition: metric.competition != null ? String(metric.competition) : "",
    related_keyword_density:
      metric.related_keyword_density != null
        ? String(metric.related_keyword_density)
        : "",
    geo_signal: metric.geo_signal ?? "",
    intent_type: metric.intent_type ?? "",
    kept_for_scoring: metric.kept_for_scoring,
  };
}

function toMetricPayload(form: MetricFormState) {
  return {
    keyword: form.keyword.trim(),
    search_volume: form.search_volume ? Number(form.search_volume) : null,
    trend_direction: form.trend_direction.trim() || null,
    cpc: form.cpc ? Number(form.cpc) : null,
    competition: form.competition ? Number(form.competition) : null,
    related_keyword_density: form.related_keyword_density
      ? Number(form.related_keyword_density)
      : null,
    geo_signal: form.geo_signal.trim() || null,
    intent_type: form.intent_type || null,
    kept_for_scoring: form.kept_for_scoring,
  };
}

function KeywordTagList({
  label,
  keywords,
  variant = "default",
}: {
  label: string;
  keywords: string[];
  variant?: "default" | "rejected";
}) {
  if (keywords.length === 0) {
    return (
      <div>
        <p className="label-text mb-1">{label}</p>
        <p className="text-meta text-text-muted">—</p>
      </div>
    );
  }

  return (
    <div>
      <p className="label-text mb-2">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {keywords.map((keyword) => (
          <span
            key={keyword}
            className={
              variant === "rejected"
                ? "badge-crimson text-xs"
                : "badge-muted text-xs"
            }
          >
            {keyword}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function KeywordsPage() {
  const [keywordSets, setKeywordSets] = useState<KeywordSetWithMetrics[]>([]);
  const [problemZones, setProblemZones] = useState<ProblemZoneWithSignals[]>(
    []
  );
  const [setForm, setSetForm] = useState<KeywordSetFormState>(emptySetForm);
  const [metricForm, setMetricForm] = useState<MetricFormState>(emptyMetricForm);
  const [editingSet, setEditingSet] = useState<KeywordSetWithMetrics | null>(
    null
  );
  const [editingMetricId, setEditingMetricId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [metricSaving, setMetricSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [sets, zones] = await Promise.all([
        getKeywordSets(),
        getProblemZones(),
      ]);
      setKeywordSets(sets);
      setProblemZones(zones);
    } catch (err) {
      console.error(err);
      setError(
        "Failed to load keyword sets. Check your Supabase connection or try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const refreshEditingSet = async (setId: string) => {
    const refreshed = await getKeywordSets();
    setKeywordSets(refreshed);
    const updated = refreshed.find((set) => set.id === setId);
    if (updated) {
      setEditingSet(updated);
      setSetForm(toSetFormState(updated));
    }
  };

  const handleEditSet = (set: KeywordSetWithMetrics) => {
    setEditingSet(set);
    setSetForm(toSetFormState(set));
    setMetricForm(emptyMetricForm);
    setEditingMetricId(null);
    setError(null);
  };

  const handleCancelSet = () => {
    setEditingSet(null);
    setSetForm(emptySetForm);
    setMetricForm(emptyMetricForm);
    setEditingMetricId(null);
    setError(null);
  };

  const handleSubmitSet = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const payload = toSetPayload(setForm);

      if (editingSet) {
        await updateKeywordSet(editingSet.id, payload);
      } else {
        await createKeywordSet(payload);
      }

      setEditingSet(null);
      setSetForm(emptySetForm);
      await loadData();
    } catch (err) {
      console.error(err);
      setError(
        editingSet
          ? "Failed to update keyword set."
          : "Failed to create keyword set."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEditMetric = (metric: KeywordMetricRow) => {
    setMetricForm(toMetricFormState(metric));
    setEditingMetricId(metric.id);
    setError(null);
  };

  const handleCancelMetric = () => {
    setMetricForm(emptyMetricForm);
    setEditingMetricId(null);
    setError(null);
  };

  const handleSubmitMetric = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSet) return;

    setMetricSaving(true);
    setError(null);

    try {
      const payload = toMetricPayload(metricForm);

      if (editingMetricId) {
        await updateKeywordMetric(editingMetricId, payload);
      } else {
        await createKeywordMetric({
          keyword_set_id: editingSet.id,
          ...payload,
        });
      }

      setMetricForm(emptyMetricForm);
      setEditingMetricId(null);
      await refreshEditingSet(editingSet.id);
      await loadData();
    } catch (err) {
      console.error(err);
      setError(
        editingMetricId
          ? "Failed to update keyword metric."
          : "Failed to add keyword metric."
      );
    } finally {
      setMetricSaving(false);
    }
  };

  const handleDeleteMetric = async (metricId: string) => {
    if (!editingSet) return;

    setMetricSaving(true);
    setError(null);

    try {
      await deleteKeywordMetric(metricId);
      if (editingMetricId === metricId) {
        setMetricForm(emptyMetricForm);
        setEditingMetricId(null);
      }
      await refreshEditingSet(editingSet.id);
      await loadData();
    } catch (err) {
      console.error(err);
      setError("Failed to delete keyword metric.");
    } finally {
      setMetricSaving(false);
    }
  };

  return (
    <PageContainer>
      <h1 className="page-title mb-2">Keyword Intelligence</h1>
      <p className="mb-8 text-body text-text-secondary">
        Manage buyer-aware keyword families tied to problem zones. Validate
        demand language before market proof and scoring.
      </p>

      {error && (
        <div className="mb-6 rounded-md border border-accent-crimson/30 bg-accent-crimson/10 px-4 py-3 text-sm text-accent-crimson">
          {error}
        </div>
      )}

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.4fr)_minmax(360px,1fr)]">
        <div>
          <h2 className="section-title mb-4">Keyword Sets</h2>

          {loading ? (
            <p className="text-body text-text-muted">Loading...</p>
          ) : keywordSets.length === 0 ? (
            <div className="glass-card text-center">
              <p className="text-body text-text-secondary">
                No keyword sets yet.
              </p>
              <p className="mt-2 text-meta text-text-muted">
                Create your first keyword family using the form.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {keywordSets.map((set) => (
                <div
                  key={set.id}
                  className={`glass-card !p-5 ${
                    editingSet?.id === set.id ? "ring-1 ring-accent-blue/40" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-semibold text-text-primary">
                          {set.name}
                        </h3>
                        <span
                          className={
                            set.dataforseo_pulled
                              ? "badge-green capitalize"
                              : "badge-muted capitalize"
                          }
                        >
                          {set.dataforseo_pulled
                            ? "DataForSEO pulled"
                            : "Not enriched"}
                        </span>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-meta text-text-muted">
                        <span>
                          Problem zone: {set.problem_zone_name ?? "—"}
                        </span>
                        <span>Geo: {set.geo_target ?? "—"}</span>
                        <span>
                          Last enriched: {formatDate(set.last_enriched_at)}
                        </span>
                        <span>Metrics: {set.metrics.length}</span>
                      </div>

                      <div className="mt-4 grid gap-4 md:grid-cols-3">
                        <KeywordTagList
                          label="Seed Keywords"
                          keywords={set.seed_keywords}
                        />
                        <KeywordTagList
                          label="Expanded Keywords"
                          keywords={set.expanded_keywords}
                        />
                        <KeywordTagList
                          label="Rejected Keywords"
                          keywords={set.rejected_keywords}
                          variant="rejected"
                        />
                      </div>

                      {set.metrics.length > 0 && (
                        <div className="mt-4 border-t border-border pt-4">
                          <p className="label-text mb-3">Keyword Metrics</p>
                          <div className="data-table !p-0 overflow-x-auto rounded-md border border-border">
                            <table className="w-full min-w-[720px]">
                              <thead>
                                <tr>
                                  <th>Keyword</th>
                                  <th>Volume</th>
                                  <th>Trend</th>
                                  <th>CPC</th>
                                  <th>Competition</th>
                                  <th>Intent</th>
                                  <th>Scoring</th>
                                </tr>
                              </thead>
                              <tbody>
                                {set.metrics.map((metric) => (
                                  <tr key={metric.id}>
                                    <td>{metric.keyword}</td>
                                    <td>{metric.search_volume ?? "—"}</td>
                                    <td className="capitalize">
                                      {metric.trend_direction ?? "—"}
                                    </td>
                                    <td>
                                      {metric.cpc != null ? `$${metric.cpc}` : "—"}
                                    </td>
                                    <td>{metric.competition ?? "—"}</td>
                                    <td className="capitalize">
                                      {metric.intent_type ?? "—"}
                                    </td>
                                    <td>
                                      {metric.kept_for_scoring ? "Yes" : "No"}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleEditSet(set)}
                      className="btn-secondary shrink-0 text-sm"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="glass-card sticky top-4">
            <h2 className="section-title mb-4">
              {editingSet ? "Edit Keyword Set" : "New Keyword Set"}
            </h2>

            <form onSubmit={handleSubmitSet} className="space-y-4">
              <div>
                <label className="label-text mb-1 block">Problem Zone</label>
                <select
                  value={setForm.problem_zone_id}
                  onChange={(e) =>
                    setSetForm({ ...setForm, problem_zone_id: e.target.value })
                  }
                  className="input-field w-full"
                >
                  <option value="">Select problem zone</option>
                  {problemZones.map((zone) => (
                    <option key={zone.id} value={zone.id}>
                      {zone.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label-text mb-1 block">Name</label>
                <input
                  type="text"
                  required
                  value={setForm.name}
                  onChange={(e) =>
                    setSetForm({ ...setForm, name: e.target.value })
                  }
                  className="input-field w-full"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label-text mb-1 block">Topic Layer</label>
                  <input
                    type="text"
                    value={setForm.topic_layer}
                    onChange={(e) =>
                      setSetForm({ ...setForm, topic_layer: e.target.value })
                    }
                    className="input-field w-full"
                  />
                </div>
                <div>
                  <label className="label-text mb-1 block">
                    Workflow Layer
                  </label>
                  <input
                    type="text"
                    value={setForm.workflow_layer}
                    onChange={(e) =>
                      setSetForm({
                        ...setForm,
                        workflow_layer: e.target.value,
                      })
                    }
                    className="input-field w-full"
                  />
                </div>
                <div>
                  <label className="label-text mb-1 block">Product Layer</label>
                  <input
                    type="text"
                    value={setForm.product_layer}
                    onChange={(e) =>
                      setSetForm({ ...setForm, product_layer: e.target.value })
                    }
                    className="input-field w-full"
                  />
                </div>
                <div>
                  <label className="label-text mb-1 block">Buyer Layer</label>
                  <input
                    type="text"
                    value={setForm.buyer_layer}
                    onChange={(e) =>
                      setSetForm({ ...setForm, buyer_layer: e.target.value })
                    }
                    className="input-field w-full"
                  />
                </div>
              </div>

              <div>
                <label className="label-text mb-1 block">
                  Seed Keywords (one per line)
                </label>
                <textarea
                  rows={3}
                  value={setForm.seed_keywords}
                  onChange={(e) =>
                    setSetForm({ ...setForm, seed_keywords: e.target.value })
                  }
                  className="input-field w-full"
                />
              </div>

              <div>
                <label className="label-text mb-1 block">
                  Expanded Keywords (one per line)
                </label>
                <textarea
                  rows={3}
                  value={setForm.expanded_keywords}
                  onChange={(e) =>
                    setSetForm({
                      ...setForm,
                      expanded_keywords: e.target.value,
                    })
                  }
                  className="input-field w-full"
                />
              </div>

              <div>
                <label className="label-text mb-1 block">
                  Rejected Keywords (one per line)
                </label>
                <textarea
                  rows={3}
                  value={setForm.rejected_keywords}
                  onChange={(e) =>
                    setSetForm({
                      ...setForm,
                      rejected_keywords: e.target.value,
                    })
                  }
                  className="input-field w-full"
                />
              </div>

              <div>
                <label className="label-text mb-1 block">Geo Target</label>
                <input
                  type="text"
                  value={setForm.geo_target}
                  onChange={(e) =>
                    setSetForm({ ...setForm, geo_target: e.target.value })
                  }
                  className="input-field w-full"
                />
              </div>

              <div>
                <label className="label-text mb-1 block">Notes</label>
                <textarea
                  rows={3}
                  value={setForm.notes}
                  onChange={(e) =>
                    setSetForm({ ...setForm, notes: e.target.value })
                  }
                  className="input-field w-full"
                />
              </div>

              {editingSet && (
                <div className="rounded-md border border-border bg-bg-elevated/40 p-4">
                  <p className="label-text mb-2">DataForSEO Enrichment</p>
                  <p className="mb-3 text-meta text-text-muted">
                    Real DataForSEO API wiring comes later. This button is a
                    placeholder for volume, CPC, and competition enrichment.
                  </p>
                  <button
                    type="button"
                    disabled
                    className="btn-secondary w-full cursor-not-allowed opacity-50"
                    title="DataForSEO integration not wired yet"
                  >
                    Enrich with DataForSEO
                  </button>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary flex-1"
                >
                  {saving
                    ? "Saving..."
                    : editingSet
                      ? "Update Keyword Set"
                      : "Create Keyword Set"}
                </button>
                {editingSet && (
                  <button
                    type="button"
                    onClick={handleCancelSet}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {editingSet && (
            <div className="glass-card">
              <h2 className="section-title mb-4">
                {editingMetricId ? "Edit Keyword Metric" : "Add Keyword Metric"}
              </h2>

              <form onSubmit={handleSubmitMetric} className="space-y-4">
                <div>
                  <label className="label-text mb-1 block">Keyword</label>
                  <input
                    type="text"
                    required
                    value={metricForm.keyword}
                    onChange={(e) =>
                      setMetricForm({ ...metricForm, keyword: e.target.value })
                    }
                    className="input-field w-full"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="label-text mb-1 block">
                      Search Volume
                    </label>
                    <input
                      type="number"
                      value={metricForm.search_volume}
                      onChange={(e) =>
                        setMetricForm({
                          ...metricForm,
                          search_volume: e.target.value,
                        })
                      }
                      className="input-field w-full"
                    />
                  </div>
                  <div>
                    <label className="label-text mb-1 block">
                      Trend Direction
                    </label>
                    <input
                      type="text"
                      placeholder="up, stable, down"
                      value={metricForm.trend_direction}
                      onChange={(e) =>
                        setMetricForm({
                          ...metricForm,
                          trend_direction: e.target.value,
                        })
                      }
                      className="input-field w-full"
                    />
                  </div>
                  <div>
                    <label className="label-text mb-1 block">CPC</label>
                    <input
                      type="number"
                      step="0.01"
                      value={metricForm.cpc}
                      onChange={(e) =>
                        setMetricForm({ ...metricForm, cpc: e.target.value })
                      }
                      className="input-field w-full"
                    />
                  </div>
                  <div>
                    <label className="label-text mb-1 block">Competition</label>
                    <input
                      type="number"
                      step="0.01"
                      value={metricForm.competition}
                      onChange={(e) =>
                        setMetricForm({
                          ...metricForm,
                          competition: e.target.value,
                        })
                      }
                      className="input-field w-full"
                    />
                  </div>
                  <div>
                    <label className="label-text mb-1 block">
                      Related Keyword Density
                    </label>
                    <input
                      type="number"
                      value={metricForm.related_keyword_density}
                      onChange={(e) =>
                        setMetricForm({
                          ...metricForm,
                          related_keyword_density: e.target.value,
                        })
                      }
                      className="input-field w-full"
                    />
                  </div>
                  <div>
                    <label className="label-text mb-1 block">Geo Signal</label>
                    <input
                      type="text"
                      value={metricForm.geo_signal}
                      onChange={(e) =>
                        setMetricForm({
                          ...metricForm,
                          geo_signal: e.target.value,
                        })
                      }
                      className="input-field w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="label-text mb-1 block">Intent Type</label>
                  <select
                    value={metricForm.intent_type}
                    onChange={(e) =>
                      setMetricForm({
                        ...metricForm,
                        intent_type: e.target.value as IntentType | "",
                      })
                    }
                    className="input-field w-full"
                  >
                    <option value="">Select intent</option>
                    {intentTypes.map((intent) => (
                      <option key={intent} value={intent}>
                        {formatLabel(intent)}
                      </option>
                    ))}
                  </select>
                </div>

                <label className="flex items-center gap-2 text-sm text-text-secondary">
                  <input
                    type="checkbox"
                    checked={metricForm.kept_for_scoring}
                    onChange={(e) =>
                      setMetricForm({
                        ...metricForm,
                        kept_for_scoring: e.target.checked,
                      })
                    }
                  />
                  Keep for scoring
                </label>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={metricSaving}
                    className="btn-primary flex-1"
                  >
                    {metricSaving
                      ? "Saving..."
                      : editingMetricId
                        ? "Update Metric"
                        : "Add Metric"}
                  </button>
                  {editingMetricId && (
                    <button
                      type="button"
                      onClick={handleCancelMetric}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>

              {editingSet.metrics.length > 0 && (
                <div className="mt-6 border-t border-border pt-4">
                  <p className="label-text mb-3">Manage Metrics</p>
                  <ul className="space-y-2">
                    {editingSet.metrics.map((metric) => (
                      <li
                        key={metric.id}
                        className="flex items-center justify-between gap-3 rounded-md bg-bg-elevated/50 px-3 py-2 text-sm"
                      >
                        <div className="min-w-0">
                          <p className="font-medium text-text-primary">
                            {metric.keyword}
                          </p>
                          <p className="text-meta text-text-muted">
                            Vol {metric.search_volume ?? "—"} · CPC{" "}
                            {metric.cpc != null ? `$${metric.cpc}` : "—"}
                          </p>
                        </div>
                        <div className="flex shrink-0 gap-2">
                          <button
                            type="button"
                            onClick={() => handleEditMetric(metric)}
                            className="btn-secondary text-xs"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteMetric(metric.id)}
                            disabled={metricSaving}
                            className="btn-secondary text-xs text-accent-crimson"
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
