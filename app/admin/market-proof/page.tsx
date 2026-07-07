"use client";

import { useCallback, useEffect, useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import {
  createMarketProofRecord,
  deleteMarketProofRecord,
  getMarketProofRecords,
  getProblemZones,
  updateMarketProofRecord,
} from "@/lib/queries";
import type {
  HiddenMarketRisk,
  MarketProofRecordWithProblemZone,
  ProblemZoneWithSignals,
} from "@/types/database";

type MarketProofFormState = {
  problem_zone_id: string;
  core_search_phrase: string;
  category_exists: "" | "true" | "false";
  visible_competitor_count: string;
  hidden_market_risk: HiddenMarketRisk | "";
  review_sites_found: string;
  pricing_visibility: string;
  job_posting_evidence: string;
  spend_evidence: string;
  sec_evidence: string;
  usaspending_evidence: string;
  segment_wedge: string;
  competition_notes: string;
  manual_reviewer_notes: string;
  market_proof_score: string;
};

const emptyForm: MarketProofFormState = {
  problem_zone_id: "",
  core_search_phrase: "",
  category_exists: "",
  visible_competitor_count: "",
  hidden_market_risk: "",
  review_sites_found: "",
  pricing_visibility: "",
  job_posting_evidence: "",
  spend_evidence: "",
  sec_evidence: "",
  usaspending_evidence: "",
  segment_wedge: "",
  competition_notes: "",
  manual_reviewer_notes: "",
  market_proof_score: "",
};

const hiddenMarketRisks: HiddenMarketRisk[] = ["low", "medium", "high"];

function formatLabel(value: string): string {
  return value.replace(/_/g, " ");
}

function hiddenMarketRiskBadgeClass(risk: HiddenMarketRisk | null): string {
  switch (risk) {
    case "low":
      return "badge-green capitalize";
    case "medium":
      return "badge-orange capitalize";
    case "high":
      return "badge-crimson capitalize";
    default:
      return "badge-muted capitalize";
  }
}

function categoryExistsBadgeClass(exists: boolean | null): string {
  if (exists === true) return "badge-green";
  if (exists === false) return "badge-crimson";
  return "badge-muted";
}

function pricingVisibilityBadgeClass(value: string | null): string {
  if (!value) return "badge-muted capitalize";
  switch (value.toLowerCase()) {
    case "public":
      return "badge-green capitalize";
    case "partial":
      return "badge-orange capitalize";
    case "hidden":
      return "badge-crimson capitalize";
    default:
      return "badge-muted capitalize";
  }
}

function spendEvidenceBadgeClass(value: string | null): string {
  if (!value || value.trim() === "") return "badge-muted";
  return "badge-green";
}

function toFormState(
  record: MarketProofRecordWithProblemZone
): MarketProofFormState {
  return {
    problem_zone_id: record.problem_zone_id ?? "",
    core_search_phrase: record.core_search_phrase ?? "",
    category_exists:
      record.category_exists === true
        ? "true"
        : record.category_exists === false
          ? "false"
          : "",
    visible_competitor_count:
      record.visible_competitor_count != null
        ? String(record.visible_competitor_count)
        : "",
    hidden_market_risk: record.hidden_market_risk ?? "",
    review_sites_found: record.review_sites_found ?? "",
    pricing_visibility: record.pricing_visibility ?? "",
    job_posting_evidence: record.job_posting_evidence ?? "",
    spend_evidence: record.spend_evidence ?? "",
    sec_evidence: record.sec_evidence ?? "",
    usaspending_evidence: record.usaspending_evidence ?? "",
    segment_wedge: record.segment_wedge ?? "",
    competition_notes: record.competition_notes ?? "",
    manual_reviewer_notes: record.manual_reviewer_notes ?? "",
    market_proof_score:
      record.market_proof_score != null
        ? String(record.market_proof_score)
        : "",
  };
}

function toPayload(form: MarketProofFormState) {
  return {
    problem_zone_id: form.problem_zone_id || null,
    core_search_phrase: form.core_search_phrase.trim() || null,
    category_exists:
      form.category_exists === "true"
        ? true
        : form.category_exists === "false"
          ? false
          : null,
    visible_competitor_count: form.visible_competitor_count
      ? Number(form.visible_competitor_count)
      : null,
    hidden_market_risk: form.hidden_market_risk || null,
    review_sites_found: form.review_sites_found.trim() || null,
    pricing_visibility: form.pricing_visibility.trim() || null,
    job_posting_evidence: form.job_posting_evidence.trim() || null,
    spend_evidence: form.spend_evidence.trim() || null,
    sec_evidence: form.sec_evidence.trim() || null,
    usaspending_evidence: form.usaspending_evidence.trim() || null,
    segment_wedge: form.segment_wedge.trim() || null,
    competition_notes: form.competition_notes.trim() || null,
    manual_reviewer_notes: form.manual_reviewer_notes.trim() || null,
    market_proof_score: form.market_proof_score
      ? Number(form.market_proof_score)
      : null,
  };
}

export default function MarketProofPage() {
  const [records, setRecords] = useState<MarketProofRecordWithProblemZone[]>(
    []
  );
  const [problemZones, setProblemZones] = useState<ProblemZoneWithSignals[]>(
    []
  );
  const [form, setForm] = useState<MarketProofFormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [proofRecords, zones] = await Promise.all([
        getMarketProofRecords(),
        getProblemZones(),
      ]);
      setRecords(proofRecords);
      setProblemZones(zones);
    } catch (err) {
      console.error(err);
      setError(
        "Failed to load market proof records. Check your Supabase connection or try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleEdit = (record: MarketProofRecordWithProblemZone) => {
    setForm(toFormState(record));
    setEditingId(record.id);
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
        await updateMarketProofRecord(editingId, payload);
      } else {
        await createMarketProofRecord(payload);
      }

      setForm(emptyForm);
      setEditingId(null);
      await loadData();
    } catch (err) {
      console.error(err);
      setError(
        editingId
          ? "Failed to update market proof record."
          : "Failed to create market proof record."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this market proof record?")) return;

    setDeletingId(id);
    setError(null);

    try {
      await deleteMarketProofRecord(id);
      if (editingId === id) {
        setForm(emptyForm);
        setEditingId(null);
      }
      await loadData();
    } catch (err) {
      console.error(err);
      setError("Failed to delete market proof record.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <PageContainer>
      <h1 className="page-title mb-2">Market Proof Workspace</h1>
      <p className="mb-8 text-body text-text-secondary">
        Validate market wedge before scoring. Review competition, pricing
        visibility, spend signals, and reviewer notes for each problem zone.
      </p>

      {error && (
        <div className="mb-6 rounded-md border border-accent-crimson/30 bg-accent-crimson/10 px-4 py-3 text-sm text-accent-crimson">
          {error}
        </div>
      )}

      <div className="mb-6 rounded-md border border-border bg-bg-elevated/40 px-4 py-3 text-sm text-text-muted">
        Competitor and pricing capture automation comes later. This workspace is
        for manual market wedge validation until scraping is wired.
      </div>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.4fr)_minmax(360px,1fr)]">
        <div>
          <h2 className="section-title mb-4">Market Proof Records</h2>

          {loading ? (
            <p className="text-body text-text-muted">Loading...</p>
          ) : records.length === 0 ? (
            <div className="glass-card text-center">
              <p className="text-body text-text-secondary">
                No market proof records yet.
              </p>
              <p className="mt-2 text-meta text-text-muted">
                Add your first record using the form.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {records.map((record) => (
                <div
                  key={record.id}
                  className={`glass-card !p-5 ${
                    editingId === record.id ? "ring-1 ring-accent-blue/40" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-semibold text-text-primary">
                          {record.core_search_phrase ?? "Untitled record"}
                        </h3>
                        {record.market_proof_score != null && (
                          <span className="badge-blue">
                            Score {record.market_proof_score}
                          </span>
                        )}
                      </div>

                      <p className="mt-1 text-meta text-text-muted">
                        Problem zone: {record.problem_zone_name ?? "—"}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <span
                          className={hiddenMarketRiskBadgeClass(
                            record.hidden_market_risk
                          )}
                        >
                          Risk: {record.hidden_market_risk ?? "unknown"}
                        </span>
                        <span
                          className={`${categoryExistsBadgeClass(record.category_exists)} capitalize`}
                        >
                          Category:{" "}
                          {record.category_exists === true
                            ? "exists"
                            : record.category_exists === false
                              ? "missing"
                              : "unknown"}
                        </span>
                        <span
                          className={pricingVisibilityBadgeClass(
                            record.pricing_visibility
                          )}
                        >
                          Pricing: {record.pricing_visibility ?? "unknown"}
                        </span>
                        <span
                          className={spendEvidenceBadgeClass(
                            record.spend_evidence
                          )}
                        >
                          Spend:{" "}
                          {record.spend_evidence?.trim()
                            ? "evidence found"
                            : "none"}
                        </span>
                      </div>

                      <div className="mt-4 grid gap-3 text-sm md:grid-cols-2">
                        <div>
                          <p className="label-text mb-1">
                            Visible Competitors
                          </p>
                          <p className="text-text-secondary">
                            {record.visible_competitor_count ?? "—"}
                          </p>
                        </div>
                        <div>
                          <p className="label-text mb-1">Review Sites</p>
                          <p className="text-text-secondary">
                            {record.review_sites_found ?? "—"}
                          </p>
                        </div>
                        <div>
                          <p className="label-text mb-1">Job Posting Evidence</p>
                          <p className="text-text-secondary">
                            {record.job_posting_evidence ?? "—"}
                          </p>
                        </div>
                        <div>
                          <p className="label-text mb-1">SEC Evidence</p>
                          <p className="text-text-secondary">
                            {record.sec_evidence ?? "—"}
                          </p>
                        </div>
                        <div>
                          <p className="label-text mb-1">
                            USAspending Evidence
                          </p>
                          <p className="text-text-secondary">
                            {record.usaspending_evidence ?? "—"}
                          </p>
                        </div>
                        <div>
                          <p className="label-text mb-1">Segment Wedge</p>
                          <p className="text-text-secondary">
                            {record.segment_wedge ?? "—"}
                          </p>
                        </div>
                      </div>

                      {record.competition_notes && (
                        <div className="mt-4 border-t border-border pt-3">
                          <p className="label-text mb-1">Competition Notes</p>
                          <p className="text-body text-text-secondary">
                            {record.competition_notes}
                          </p>
                        </div>
                      )}

                      {record.manual_reviewer_notes && (
                        <div className="mt-3">
                          <p className="label-text mb-1">Reviewer Notes</p>
                          <p className="text-body text-text-secondary">
                            {record.manual_reviewer_notes}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex shrink-0 flex-col gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(record)}
                        className="btn-secondary text-sm"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(record.id)}
                        disabled={deletingId === record.id}
                        className="btn-secondary text-sm text-accent-crimson"
                      >
                        {deletingId === record.id ? "Deleting..." : "Delete"}
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
            {editingId ? "Edit Market Proof Record" : "New Market Proof Record"}
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
              <label className="label-text mb-1 block">Core Search Phrase</label>
              <input
                type="text"
                value={form.core_search_phrase}
                onChange={(e) =>
                  setForm({ ...form, core_search_phrase: e.target.value })
                }
                className="input-field w-full"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label-text mb-1 block">Category Exists</label>
                <select
                  value={form.category_exists}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      category_exists: e.target.value as "" | "true" | "false",
                    })
                  }
                  className="input-field w-full"
                >
                  <option value="">Unknown</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div>
                <label className="label-text mb-1 block">
                  Visible Competitor Count
                </label>
                <input
                  type="number"
                  min="0"
                  value={form.visible_competitor_count}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      visible_competitor_count: e.target.value,
                    })
                  }
                  className="input-field w-full"
                />
              </div>
              <div>
                <label className="label-text mb-1 block">
                  Hidden Market Risk
                </label>
                <select
                  value={form.hidden_market_risk}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      hidden_market_risk: e.target.value as
                        | HiddenMarketRisk
                        | "",
                    })
                  }
                  className="input-field w-full"
                >
                  <option value="">Select risk level</option>
                  {hiddenMarketRisks.map((risk) => (
                    <option key={risk} value={risk}>
                      {formatLabel(risk)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label-text mb-1 block">
                  Market Proof Score
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={form.market_proof_score}
                  onChange={(e) =>
                    setForm({ ...form, market_proof_score: e.target.value })
                  }
                  className="input-field w-full"
                />
              </div>
            </div>

            <div>
              <label className="label-text mb-1 block">Review Sites Found</label>
              <input
                type="text"
                value={form.review_sites_found}
                onChange={(e) =>
                  setForm({ ...form, review_sites_found: e.target.value })
                }
                className="input-field w-full"
              />
            </div>

            <div>
              <label className="label-text mb-1 block">Pricing Visibility</label>
              <input
                type="text"
                placeholder="public, partial, hidden"
                value={form.pricing_visibility}
                onChange={(e) =>
                  setForm({ ...form, pricing_visibility: e.target.value })
                }
                className="input-field w-full"
              />
            </div>

            <div>
              <label className="label-text mb-1 block">
                Job Posting Evidence
              </label>
              <textarea
                rows={2}
                value={form.job_posting_evidence}
                onChange={(e) =>
                  setForm({ ...form, job_posting_evidence: e.target.value })
                }
                className="input-field w-full"
              />
            </div>

            <div>
              <label className="label-text mb-1 block">Spend Evidence</label>
              <textarea
                rows={2}
                value={form.spend_evidence}
                onChange={(e) =>
                  setForm({ ...form, spend_evidence: e.target.value })
                }
                className="input-field w-full"
              />
            </div>

            <div>
              <label className="label-text mb-1 block">SEC Evidence</label>
              <textarea
                rows={2}
                value={form.sec_evidence}
                onChange={(e) =>
                  setForm({ ...form, sec_evidence: e.target.value })
                }
                className="input-field w-full"
              />
            </div>

            <div>
              <label className="label-text mb-1 block">
                USAspending Evidence
              </label>
              <textarea
                rows={2}
                value={form.usaspending_evidence}
                onChange={(e) =>
                  setForm({ ...form, usaspending_evidence: e.target.value })
                }
                className="input-field w-full"
              />
            </div>

            <div>
              <label className="label-text mb-1 block">Segment Wedge</label>
              <textarea
                rows={2}
                value={form.segment_wedge}
                onChange={(e) =>
                  setForm({ ...form, segment_wedge: e.target.value })
                }
                className="input-field w-full"
              />
            </div>

            <div>
              <label className="label-text mb-1 block">Competition Notes</label>
              <textarea
                rows={3}
                value={form.competition_notes}
                onChange={(e) =>
                  setForm({ ...form, competition_notes: e.target.value })
                }
                className="input-field w-full"
              />
            </div>

            <div>
              <label className="label-text mb-1 block">Reviewer Notes</label>
              <textarea
                rows={3}
                value={form.manual_reviewer_notes}
                onChange={(e) =>
                  setForm({ ...form, manual_reviewer_notes: e.target.value })
                }
                className="input-field w-full"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={saving}
                className="btn-primary flex-1"
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Record"
                    : "Create Record"}
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
