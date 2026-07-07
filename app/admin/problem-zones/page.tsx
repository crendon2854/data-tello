"use client";

import { useCallback, useEffect, useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import {
  createProblemZone,
  getProblemZones,
  getRawSignals,
  linkRawSignalToProblemZone,
  unlinkRawSignalFromProblemZone,
  updateProblemZone,
} from "@/lib/queries";
import type {
  ProblemZoneStatus,
  ProblemZoneWithSignals,
  RawSignalWithSource,
  TimingLabel,
} from "@/types/database";

type ZoneFormState = {
  name: string;
  summary: string;
  primary_industry: string;
  sub_industry: string;
  primary_buyer: string;
  secondary_buyer: string;
  buyer_confidence: string;
  geography_scope: string;
  timing_label: TimingLabel | "";
  pain_theme: string;
  pressure_strength_score: string;
  freshness_score: string;
  friction_score: string;
  signal_mix: string;
  status: ProblemZoneStatus;
  owner: string;
  notes: string;
};

const emptyForm: ZoneFormState = {
  name: "",
  summary: "",
  primary_industry: "",
  sub_industry: "",
  primary_buyer: "",
  secondary_buyer: "",
  buyer_confidence: "",
  geography_scope: "",
  timing_label: "",
  pain_theme: "",
  pressure_strength_score: "",
  freshness_score: "",
  friction_score: "",
  signal_mix: "",
  status: "new",
  owner: "",
  notes: "",
};

const statuses: ProblemZoneStatus[] = [
  "new",
  "reviewing",
  "enriching",
  "ready_for_market_proof",
  "ready_for_scoring",
  "watchlist",
  "rejected",
  "promoted",
];

const timingLabels: TimingLabel[] = [
  "trigger_driven",
  "structural",
  "mixed",
];

function formatLabel(value: string): string {
  return value.replace(/_/g, " ");
}

function statusBadgeClass(status: ProblemZoneStatus): string {
  switch (status) {
    case "new":
      return "badge-muted";
    case "reviewing":
    case "enriching":
      return "badge-blue";
    case "ready_for_market_proof":
    case "ready_for_scoring":
      return "badge-green";
    case "watchlist":
      return "badge-orange";
    case "promoted":
      return "badge-green";
    case "rejected":
      return "badge-crimson";
    default:
      return "badge-muted";
  }
}

function timingBadgeClass(timing: TimingLabel | null): string {
  switch (timing) {
    case "trigger_driven":
      return "badge-crimson";
    case "structural":
      return "badge-blue";
    case "mixed":
      return "badge-orange";
    default:
      return "badge-muted";
  }
}

function toFormState(zone: ProblemZoneWithSignals): ZoneFormState {
  return {
    name: zone.name,
    summary: zone.summary ?? "",
    primary_industry: zone.primary_industry ?? "",
    sub_industry: zone.sub_industry ?? "",
    primary_buyer: zone.primary_buyer ?? "",
    secondary_buyer: zone.secondary_buyer ?? "",
    buyer_confidence: zone.buyer_confidence ?? "",
    geography_scope: zone.geography_scope ?? "",
    timing_label: zone.timing_label ?? "",
    pain_theme: zone.pain_theme ?? "",
    pressure_strength_score:
      zone.pressure_strength_score != null
        ? String(zone.pressure_strength_score)
        : "",
    freshness_score:
      zone.freshness_score != null ? String(zone.freshness_score) : "",
    friction_score:
      zone.friction_score != null ? String(zone.friction_score) : "",
    signal_mix: zone.signal_mix ?? "",
    status: zone.status,
    owner: zone.owner ?? "",
    notes: zone.notes ?? "",
  };
}

function toPayload(form: ZoneFormState) {
  return {
    name: form.name.trim(),
    summary: form.summary.trim() || null,
    primary_industry: form.primary_industry.trim() || null,
    sub_industry: form.sub_industry.trim() || null,
    primary_buyer: form.primary_buyer.trim() || null,
    secondary_buyer: form.secondary_buyer.trim() || null,
    buyer_confidence: form.buyer_confidence.trim() || null,
    geography_scope: form.geography_scope.trim() || null,
    timing_label: form.timing_label || null,
    pain_theme: form.pain_theme.trim() || null,
    pressure_strength_score: form.pressure_strength_score
      ? Number(form.pressure_strength_score)
      : null,
    freshness_score: form.freshness_score
      ? Number(form.freshness_score)
      : null,
    friction_score: form.friction_score ? Number(form.friction_score) : null,
    signal_mix: form.signal_mix.trim() || null,
    status: form.status,
    owner: form.owner.trim() || null,
    notes: form.notes.trim() || null,
  };
}

export default function ProblemZonesPage() {
  const [zones, setZones] = useState<ProblemZoneWithSignals[]>([]);
  const [availableSignals, setAvailableSignals] = useState<RawSignalWithSource[]>(
    []
  );
  const [form, setForm] = useState<ZoneFormState>(emptyForm);
  const [editingZone, setEditingZone] = useState<ProblemZoneWithSignals | null>(
    null
  );
  const [linkSignalId, setLinkSignalId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [linking, setLinking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadZones = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [zoneData, signalData] = await Promise.all([
        getProblemZones(),
        getRawSignals(),
      ]);
      setZones(zoneData);
      setAvailableSignals(signalData);
    } catch (err) {
      console.error(err);
      setError(
        "Failed to load problem zones. Check your Supabase connection or try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadZones();
  }, [loadZones]);

  const handleEdit = (zone: ProblemZoneWithSignals) => {
    setForm(toFormState(zone));
    setEditingZone(zone);
    setLinkSignalId("");
    setError(null);
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setEditingZone(null);
    setLinkSignalId("");
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const payload = toPayload(form);

      if (editingZone) {
        await updateProblemZone(editingZone.id, payload);
      } else {
        await createProblemZone(payload);
      }

      setForm(emptyForm);
      setEditingZone(null);
      await loadZones();
    } catch (err) {
      console.error(err);
      setError(
        editingZone
          ? "Failed to update problem zone."
          : "Failed to create problem zone. The name may already exist."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleLinkSignal = async () => {
    if (!editingZone || !linkSignalId) return;

    setLinking(true);
    setError(null);

    try {
      await linkRawSignalToProblemZone(editingZone.id, linkSignalId);
      setLinkSignalId("");
      await loadZones();
      const refreshed = await getProblemZones();
      const updated = refreshed.find((z) => z.id === editingZone.id);
      if (updated) {
        setEditingZone(updated);
        setForm(toFormState(updated));
      }
    } catch (err) {
      console.error(err);
      setError("Failed to link raw signal.");
    } finally {
      setLinking(false);
    }
  };

  const handleUnlinkSignal = async (rawSignalId: string) => {
    if (!editingZone) return;

    setLinking(true);
    setError(null);

    try {
      await unlinkRawSignalFromProblemZone(editingZone.id, rawSignalId);
      await loadZones();
      const refreshed = await getProblemZones();
      const updated = refreshed.find((z) => z.id === editingZone.id);
      if (updated) {
        setEditingZone(updated);
        setForm(toFormState(updated));
      }
    } catch (err) {
      console.error(err);
      setError("Failed to unlink raw signal.");
    } finally {
      setLinking(false);
    }
  };

  const linkedSignalIds = new Set(
    editingZone?.linked_signals.map((s) => s.id) ?? []
  );
  const unlinkableSignals = availableSignals.filter(
    (signal) => !linkedSignalIds.has(signal.id)
  );

  return (
    <PageContainer>
      <h1 className="page-title mb-2">Problem Zone Workspace</h1>
      <p className="mb-8 text-body text-text-secondary">
        Group recurring pain patterns before they become opportunities. Link raw
        signals to trace source mix and diversity.
      </p>

      {error && (
        <div className="mb-6 rounded-md border border-accent-crimson/30 bg-accent-crimson/10 px-4 py-3 text-sm text-accent-crimson">
          {error}
        </div>
      )}

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.4fr)_minmax(360px,1fr)]">
        <div>
          <h2 className="section-title mb-4">Problem Zones</h2>

          {loading ? (
            <p className="text-body text-text-muted">Loading...</p>
          ) : zones.length === 0 ? (
            <div className="glass-card text-center">
              <p className="text-body text-text-secondary">
                No problem zones yet.
              </p>
              <p className="mt-2 text-meta text-text-muted">
                Create your first zone using the form.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {zones.map((zone) => (
                <div
                  key={zone.id}
                  className={`glass-card !p-5 ${
                    editingZone?.id === zone.id ? "ring-1 ring-accent-blue/40" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-semibold text-text-primary">
                          {zone.name}
                        </h3>
                        <span
                          className={`${statusBadgeClass(zone.status)} capitalize`}
                        >
                          {formatLabel(zone.status)}
                        </span>
                        {zone.timing_label && (
                          <span
                            className={`${timingBadgeClass(zone.timing_label)} capitalize`}
                          >
                            {formatLabel(zone.timing_label)}
                          </span>
                        )}
                      </div>

                      {zone.summary && (
                        <p className="mt-2 text-body text-text-secondary">
                          {zone.summary}
                        </p>
                      )}

                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-meta text-text-muted">
                        <span>
                          Buyer: {zone.primary_buyer ?? "—"}
                        </span>
                        <span>Sources: {zone.source_count}</span>
                        <span>Diversity: {zone.source_diversity_count}</span>
                        <span>
                          Friction: {zone.friction_score ?? "—"}
                        </span>
                      </div>

                      {zone.linked_signals.length > 0 && (
                        <div className="mt-4 border-t border-border pt-3">
                          <p className="label-text mb-2">Linked Raw Signals</p>
                          <ul className="space-y-2">
                            {zone.linked_signals.map((signal) => (
                              <li
                                key={signal.id}
                                className="rounded-md bg-bg-elevated/50 px-3 py-2 text-sm"
                              >
                                <p className="font-medium text-text-primary">
                                  {signal.title}
                                </p>
                                <p className="text-meta text-text-muted">
                                  {signal.source_name ?? "Unknown source"}
                                </p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleEdit(zone)}
                      className="shrink-0 text-sm text-accent-blue hover:text-accent-blue-glow"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="section-title mb-4">
            {editingZone ? "Edit Problem Zone" : "Create Problem Zone"}
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
              <label className="label-text mb-1.5 block">Summary</label>
              <textarea
                className="input-field min-h-20"
                value={form.summary}
                onChange={(e) => setForm({ ...form, summary: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-text mb-1.5 block">Primary Industry</label>
                <input
                  className="input-field"
                  value={form.primary_industry}
                  onChange={(e) =>
                    setForm({ ...form, primary_industry: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="label-text mb-1.5 block">Sub Industry</label>
                <input
                  className="input-field"
                  value={form.sub_industry}
                  onChange={(e) =>
                    setForm({ ...form, sub_industry: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-text mb-1.5 block">Primary Buyer</label>
                <input
                  className="input-field"
                  value={form.primary_buyer}
                  onChange={(e) =>
                    setForm({ ...form, primary_buyer: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="label-text mb-1.5 block">Secondary Buyer</label>
                <input
                  className="input-field"
                  value={form.secondary_buyer}
                  onChange={(e) =>
                    setForm({ ...form, secondary_buyer: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-text mb-1.5 block">Status</label>
                <select
                  className="input-field"
                  value={form.status}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      status: e.target.value as ProblemZoneStatus,
                    })
                  }
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {formatLabel(status)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label-text mb-1.5 block">Timing Label</label>
                <select
                  className="input-field"
                  value={form.timing_label}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      timing_label: e.target.value as TimingLabel | "",
                    })
                  }
                >
                  <option value="">Not set</option>
                  {timingLabels.map((label) => (
                    <option key={label} value={label}>
                      {formatLabel(label)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="label-text mb-1.5 block">Pain Theme</label>
              <input
                className="input-field"
                value={form.pain_theme}
                onChange={(e) =>
                  setForm({ ...form, pain_theme: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="label-text mb-1.5 block">Pressure</label>
                <input
                  className="input-field"
                  type="number"
                  min={0}
                  max={10}
                  value={form.pressure_strength_score}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      pressure_strength_score: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="label-text mb-1.5 block">Freshness</label>
                <input
                  className="input-field"
                  type="number"
                  min={0}
                  max={10}
                  value={form.freshness_score}
                  onChange={(e) =>
                    setForm({ ...form, freshness_score: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="label-text mb-1.5 block">Friction</label>
                <input
                  className="input-field"
                  type="number"
                  min={0}
                  max={10}
                  value={form.friction_score}
                  onChange={(e) =>
                    setForm({ ...form, friction_score: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="label-text mb-1.5 block">Signal Mix</label>
              <input
                className="input-field"
                value={form.signal_mix}
                onChange={(e) =>
                  setForm({ ...form, signal_mix: e.target.value })
                }
                placeholder="trigger-heavy, friction-heavy..."
              />
            </div>

            <div>
              <label className="label-text mb-1.5 block">Notes</label>
              <textarea
                className="input-field min-h-20"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </div>

            {editingZone && (
              <div className="rounded-md border border-border bg-bg-elevated/30 p-4">
                <p className="label-text mb-3">Link Raw Signals</p>

                {editingZone.linked_signals.length > 0 ? (
                  <ul className="mb-4 space-y-2">
                    {editingZone.linked_signals.map((signal) => (
                      <li
                        key={signal.id}
                        className="flex items-start justify-between gap-3 rounded-md bg-bg-primary/50 px-3 py-2"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-text-primary">
                            {signal.title}
                          </p>
                          <p className="text-meta text-text-muted">
                            {signal.source_name ?? "Unknown source"}
                          </p>
                        </div>
                        <button
                          type="button"
                          disabled={linking}
                          onClick={() => handleUnlinkSignal(signal.id)}
                          className="shrink-0 text-sm text-accent-crimson hover:opacity-80 disabled:opacity-50"
                        >
                          Unlink
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mb-4 text-sm text-text-muted">
                    No raw signals linked yet.
                  </p>
                )}

                <div className="flex gap-2">
                  <select
                    className="input-field min-w-0 flex-1"
                    value={linkSignalId}
                    onChange={(e) => setLinkSignalId(e.target.value)}
                  >
                    <option value="">Select raw signal...</option>
                    {unlinkableSignals.map((signal) => (
                      <option key={signal.id} value={signal.id}>
                        {signal.title}
                        {signal.source_name ? ` (${signal.source_name})` : ""}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    disabled={!linkSignalId || linking}
                    onClick={handleLinkSignal}
                    className="btn-secondary shrink-0 disabled:opacity-50"
                  >
                    Link
                  </button>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="btn-primary disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : editingZone
                    ? "Update Zone"
                    : "Create Zone"}
              </button>
              {editingZone && (
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
