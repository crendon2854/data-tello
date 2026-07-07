"use client";

import { useCallback, useEffect, useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import {
  createWorkflowFrictionSignal,
  deleteWorkflowFrictionSignal,
  getProblemZones,
  getWorkflowFrictionSignals,
  updateWorkflowFrictionSignal,
} from "@/lib/queries";
import type {
  ProblemZoneWithSignals,
  WorkflowFrictionSignalWithProblemZone,
} from "@/types/database";

type FrictionFormState = {
  problem_zone_id: string;
  source: string;
  source_url: string;
  title: string;
  summary: string;
  friction_type: string;
  friction_score: string;
  repetition_score: string;
  source_diversity_score: string;
  workflow_specificity_score: string;
  manual_workaround_score: string;
  manual_workaround_detected: boolean;
  evidence_count: string;
  accepted_for_scoring: boolean;
};

const emptyForm: FrictionFormState = {
  problem_zone_id: "",
  source: "",
  source_url: "",
  title: "",
  summary: "",
  friction_type: "",
  friction_score: "",
  repetition_score: "",
  source_diversity_score: "",
  workflow_specificity_score: "",
  manual_workaround_score: "",
  manual_workaround_detected: false,
  evidence_count: "0",
  accepted_for_scoring: false,
};

const frictionSources = [
  "GitHub Issues",
  "Stack Exchange",
  "Greenhouse Job Postings",
  "Lever Job Postings",
];

function formatLabel(value: string): string {
  return value.replace(/_/g, " ");
}

function frictionScoreBadgeClass(score: number | null): string {
  if (score == null) return "badge-muted";
  if (score >= 7) return "badge-crimson";
  if (score >= 4) return "badge-orange";
  return "badge-green";
}

function workaroundBadgeClass(detected: boolean): string {
  return detected ? "badge-orange" : "badge-muted";
}

function scoringBadgeClass(accepted: boolean): string {
  return accepted ? "badge-green" : "badge-muted";
}

function toFormState(
  signal: WorkflowFrictionSignalWithProblemZone
): FrictionFormState {
  return {
    problem_zone_id: signal.problem_zone_id ?? "",
    source: signal.source,
    source_url: signal.source_url ?? "",
    title: signal.title ?? "",
    summary: signal.summary ?? "",
    friction_type: signal.friction_type ?? "",
    friction_score:
      signal.friction_score != null ? String(signal.friction_score) : "",
    repetition_score:
      signal.repetition_score != null ? String(signal.repetition_score) : "",
    source_diversity_score:
      signal.source_diversity_score != null
        ? String(signal.source_diversity_score)
        : "",
    workflow_specificity_score:
      signal.workflow_specificity_score != null
        ? String(signal.workflow_specificity_score)
        : "",
    manual_workaround_score:
      signal.manual_workaround_score != null
        ? String(signal.manual_workaround_score)
        : "",
    manual_workaround_detected: signal.manual_workaround_detected,
    evidence_count: String(signal.evidence_count),
    accepted_for_scoring: signal.accepted_for_scoring,
  };
}

function toPayload(form: FrictionFormState) {
  return {
    problem_zone_id: form.problem_zone_id || null,
    source: form.source.trim(),
    source_url: form.source_url.trim() || null,
    title: form.title.trim() || null,
    summary: form.summary.trim() || null,
    friction_type: form.friction_type.trim() || null,
    friction_score: form.friction_score ? Number(form.friction_score) : null,
    repetition_score: form.repetition_score
      ? Number(form.repetition_score)
      : null,
    source_diversity_score: form.source_diversity_score
      ? Number(form.source_diversity_score)
      : null,
    workflow_specificity_score: form.workflow_specificity_score
      ? Number(form.workflow_specificity_score)
      : null,
    manual_workaround_score: form.manual_workaround_score
      ? Number(form.manual_workaround_score)
      : null,
    manual_workaround_detected: form.manual_workaround_detected,
    evidence_count: form.evidence_count ? Number(form.evidence_count) : 0,
    accepted_for_scoring: form.accepted_for_scoring,
  };
}

export default function FrictionPage() {
  const [signals, setSignals] = useState<
    WorkflowFrictionSignalWithProblemZone[]
  >([]);
  const [problemZones, setProblemZones] = useState<ProblemZoneWithSignals[]>(
    []
  );
  const [form, setForm] = useState<FrictionFormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [frictionSignals, zones] = await Promise.all([
        getWorkflowFrictionSignals(),
        getProblemZones(),
      ]);
      setSignals(frictionSignals);
      setProblemZones(zones);
    } catch (err) {
      console.error(err);
      setError(
        "Failed to load workflow friction signals. Check your Supabase connection or try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleEdit = (signal: WorkflowFrictionSignalWithProblemZone) => {
    setForm(toFormState(signal));
    setEditingId(signal.id);
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
        await updateWorkflowFrictionSignal(editingId, payload);
      } else {
        await createWorkflowFrictionSignal(payload);
      }

      setForm(emptyForm);
      setEditingId(null);
      await loadData();
    } catch (err) {
      console.error(err);
      setError(
        editingId
          ? "Failed to update friction signal."
          : "Failed to create friction signal."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this friction signal?")) return;

    setDeletingId(id);
    setError(null);

    try {
      await deleteWorkflowFrictionSignal(id);
      if (editingId === id) {
        setForm(emptyForm);
        setEditingId(null);
      }
      await loadData();
    } catch (err) {
      console.error(err);
      setError("Failed to delete friction signal.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <PageContainer>
      <h1 className="page-title mb-2">Workflow Friction Workspace</h1>
      <p className="mb-8 text-body text-text-secondary">
        Track repeated execution pain from GitHub, Stack Exchange, and job
        postings. Friction modifies pressure, wedge, and buildability internally.
      </p>

      {error && (
        <div className="mb-6 rounded-md border border-accent-crimson/30 bg-accent-crimson/10 px-4 py-3 text-sm text-accent-crimson">
          {error}
        </div>
      )}

      <div className="mb-6 rounded-md border border-border bg-bg-elevated/40 px-4 py-3 text-sm text-text-muted">
        Automated friction ingestion from GitHub, Stack Exchange, and job boards
        comes later. This workspace is for manual triage until connectors are
        wired.
      </div>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.4fr)_minmax(360px,1fr)]">
        <div>
          <h2 className="section-title mb-4">Friction Signals</h2>

          {loading ? (
            <p className="text-body text-text-muted">Loading...</p>
          ) : signals.length === 0 ? (
            <div className="glass-card text-center">
              <p className="text-body text-text-secondary">
                No friction signals yet.
              </p>
              <p className="mt-2 text-meta text-text-muted">
                Add your first signal using the form.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {signals.map((signal) => (
                <div
                  key={signal.id}
                  className={`glass-card !p-5 ${
                    editingId === signal.id ? "ring-1 ring-accent-blue/40" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-semibold text-text-primary">
                          {signal.title ?? "Untitled friction signal"}
                        </h3>
                        <span className="badge-blue">{signal.source}</span>
                      </div>

                      <p className="mt-1 text-meta text-text-muted">
                        Problem zone: {signal.problem_zone_name ?? "—"}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <span
                          className={`${frictionScoreBadgeClass(signal.friction_score)} capitalize`}
                        >
                          Friction: {signal.friction_score ?? "—"}/10
                        </span>
                        <span
                          className={`${workaroundBadgeClass(signal.manual_workaround_detected)} capitalize`}
                        >
                          Workaround:{" "}
                          {signal.manual_workaround_detected
                            ? "detected"
                            : "none"}
                        </span>
                        <span
                          className={`${scoringBadgeClass(signal.accepted_for_scoring)} capitalize`}
                        >
                          Scoring:{" "}
                          {signal.accepted_for_scoring ? "accepted" : "pending"}
                        </span>
                        {signal.friction_type && (
                          <span className="badge-muted capitalize">
                            {formatLabel(signal.friction_type)}
                          </span>
                        )}
                      </div>

                      {signal.summary && (
                        <p className="mt-3 text-body text-text-secondary">
                          {signal.summary}
                        </p>
                      )}

                      <div className="mt-4 grid gap-3 text-sm md:grid-cols-3">
                        <div>
                          <p className="label-text mb-1">Repetition</p>
                          <p className="text-text-secondary">
                            {signal.repetition_score ?? "—"}/3
                          </p>
                        </div>
                        <div>
                          <p className="label-text mb-1">Source Diversity</p>
                          <p className="text-text-secondary">
                            {signal.source_diversity_score ?? "—"}/2
                          </p>
                        </div>
                        <div>
                          <p className="label-text mb-1">
                            Workflow Specificity
                          </p>
                          <p className="text-text-secondary">
                            {signal.workflow_specificity_score ?? "—"}/3
                          </p>
                        </div>
                        <div>
                          <p className="label-text mb-1">
                            Manual Workaround Score
                          </p>
                          <p className="text-text-secondary">
                            {signal.manual_workaround_score ?? "—"}/2
                          </p>
                        </div>
                        <div>
                          <p className="label-text mb-1">Evidence Count</p>
                          <p className="text-text-secondary">
                            {signal.evidence_count}
                          </p>
                        </div>
                        <div>
                          <p className="label-text mb-1">Source URL</p>
                          {signal.source_url ? (
                            <a
                              href={signal.source_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-accent-blue hover:underline"
                            >
                              View source
                            </a>
                          ) : (
                            <p className="text-text-secondary">—</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-col gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(signal)}
                        className="btn-secondary text-sm"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(signal.id)}
                        disabled={deletingId === signal.id}
                        className="btn-secondary text-sm text-accent-crimson"
                      >
                        {deletingId === signal.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="glass-card sticky top-4">
          <h2 className="section-title mb-4">
            {editingId ? "Edit Friction Signal" : "New Friction Signal"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label-text mb-1 block">Problem Zone</label>
              <select
                value={form.problem_zone_id}
                onChange={(e) =>
                  setForm({ ...form, problem_zone_id: e.target.value })
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
              <label className="label-text mb-1 block">Source</label>
              <select
                required
                value={form.source}
                onChange={(e) => setForm({ ...form, source: e.target.value })}
                className="input-field w-full"
              >
                <option value="">Select source</option>
                {frictionSources.map((source) => (
                  <option key={source} value={source}>
                    {source}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label-text mb-1 block">Source URL</label>
              <input
                type="url"
                value={form.source_url}
                onChange={(e) =>
                  setForm({ ...form, source_url: e.target.value })
                }
                className="input-field w-full"
              />
            </div>

            <div>
              <label className="label-text mb-1 block">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="input-field w-full"
              />
            </div>

            <div>
              <label className="label-text mb-1 block">Summary</label>
              <textarea
                rows={3}
                value={form.summary}
                onChange={(e) =>
                  setForm({ ...form, summary: e.target.value })
                }
                className="input-field w-full"
              />
            </div>

            <div>
              <label className="label-text mb-1 block">Friction Type</label>
              <input
                type="text"
                placeholder="manual_workaround, missing_workflow_template"
                value={form.friction_type}
                onChange={(e) =>
                  setForm({ ...form, friction_type: e.target.value })
                }
                className="input-field w-full"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label-text mb-1 block">
                  Friction Score (0–10)
                </label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={form.friction_score}
                  onChange={(e) =>
                    setForm({ ...form, friction_score: e.target.value })
                  }
                  className="input-field w-full"
                />
              </div>
              <div>
                <label className="label-text mb-1 block">Evidence Count</label>
                <input
                  type="number"
                  min="0"
                  value={form.evidence_count}
                  onChange={(e) =>
                    setForm({ ...form, evidence_count: e.target.value })
                  }
                  className="input-field w-full"
                />
              </div>
              <div>
                <label className="label-text mb-1 block">
                  Repetition (0–3)
                </label>
                <input
                  type="number"
                  min="0"
                  max="3"
                  value={form.repetition_score}
                  onChange={(e) =>
                    setForm({ ...form, repetition_score: e.target.value })
                  }
                  className="input-field w-full"
                />
              </div>
              <div>
                <label className="label-text mb-1 block">
                  Source Diversity (0–2)
                </label>
                <input
                  type="number"
                  min="0"
                  max="2"
                  value={form.source_diversity_score}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      source_diversity_score: e.target.value,
                    })
                  }
                  className="input-field w-full"
                />
              </div>
              <div>
                <label className="label-text mb-1 block">
                  Workflow Specificity (0–3)
                </label>
                <input
                  type="number"
                  min="0"
                  max="3"
                  value={form.workflow_specificity_score}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      workflow_specificity_score: e.target.value,
                    })
                  }
                  className="input-field w-full"
                />
              </div>
              <div>
                <label className="label-text mb-1 block">
                  Manual Workaround (0–2)
                </label>
                <input
                  type="number"
                  min="0"
                  max="2"
                  value={form.manual_workaround_score}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      manual_workaround_score: e.target.value,
                    })
                  }
                  className="input-field w-full"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-text-secondary">
              <input
                type="checkbox"
                checked={form.manual_workaround_detected}
                onChange={(e) =>
                  setForm({
                    ...form,
                    manual_workaround_detected: e.target.checked,
                  })
                }
              />
              Manual workaround detected
            </label>

            <label className="flex items-center gap-2 text-sm text-text-secondary">
              <input
                type="checkbox"
                checked={form.accepted_for_scoring}
                onChange={(e) =>
                  setForm({
                    ...form,
                    accepted_for_scoring: e.target.checked,
                  })
                }
              />
              Accepted for scoring
            </label>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={saving}
                className="btn-primary flex-1"
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Signal"
                    : "Create Signal"}
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
