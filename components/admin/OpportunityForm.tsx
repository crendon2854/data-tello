"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { createOpportunity, updateOpportunity } from "@/lib/queries";
import type { OpportunityFormData } from "@/types/opportunity";

const emptyForm: OpportunityFormData = {
  title: "",
  overall_score: 0,
  best_first_asset: "",
  short_summary: "",
  complexity: "",
  tags: "",
  status: "draft",
  problem_summary: "",
  evidence_summary: "",
  key_pain_drivers: "",
  pressure_score: 0,
  demand_score: 0,
  wedge_score: 0,
  buildability_score: 0,
  asset_fit_score: 0,
  asset_path_1: "",
  asset_path_2: "",
  asset_path_3: "",
  asset_reason: "",
  expansion_ladder: "",
  target_buyer: "",
  core_workflow: "",
  initial_wedge: "",
  time_to_value: "",
  underserved_segment: "",
  competitor_summary: "",
  avoid: "",
  differentiation: "",
  entry_strategy: "",
  strategic_importance: "",
};

interface OpportunityFormProps {
  initialData?: OpportunityFormData;
  opportunityId?: string;
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="label-text">{label}</label>
      {children}
    </div>
  );
}

const inputClass = "input-field";

export function OpportunityForm({
  initialData,
  opportunityId,
}: OpportunityFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<OpportunityFormData>(
    initialData ?? emptyForm
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = <K extends keyof OpportunityFormData>(
    key: K,
    value: OpportunityFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      if (opportunityId) {
        await updateOpportunity(opportunityId, form);
      } else {
        await createOpportunity(form);
      }
      router.push("/admin/opportunities");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-md border border-accent-crimson/30 bg-accent-crimson/10 px-4 py-3 text-sm text-accent-crimson">
          {error}
        </div>
      )}

      <Card title="Basic">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="Title">
            <input
              className={inputClass}
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              required
            />
          </FormField>
          <FormField label="Score">
            <input
              type="number"
              min={0}
              max={100}
              className={inputClass}
              value={form.overall_score}
              onChange={(e) =>
                update("overall_score", Number(e.target.value))
              }
            />
          </FormField>
          <FormField label="Best First Asset">
            <input
              className={inputClass}
              value={form.best_first_asset}
              onChange={(e) => update("best_first_asset", e.target.value)}
            />
          </FormField>
          <FormField label="Complexity">
            <input
              className={inputClass}
              value={form.complexity}
              onChange={(e) => update("complexity", e.target.value)}
            />
          </FormField>
          <FormField label="Tags (comma-separated)">
            <input
              className={inputClass}
              value={form.tags}
              onChange={(e) => update("tags", e.target.value)}
            />
          </FormField>
          <FormField label="Status">
            <select
              className={inputClass}
              value={form.status}
              onChange={(e) =>
                update("status", e.target.value as OpportunityFormData["status"])
              }
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="rejected">Rejected</option>
            </select>
          </FormField>
          <div className="md:col-span-2">
            <FormField label="Short Summary">
              <textarea
                className={`${inputClass} min-h-20 w-full`}
                value={form.short_summary}
                onChange={(e) => update("short_summary", e.target.value)}
              />
            </FormField>
          </div>
        </div>
      </Card>

      <Card title="Why This Exists">
        <div className="grid gap-4">
          <FormField label="Problem">
            <textarea
              className={`${inputClass} min-h-24 w-full`}
              value={form.problem_summary}
              onChange={(e) => update("problem_summary", e.target.value)}
            />
          </FormField>
          <FormField label="Evidence">
            <textarea
              className={`${inputClass} min-h-24 w-full`}
              value={form.evidence_summary}
              onChange={(e) => update("evidence_summary", e.target.value)}
            />
          </FormField>
          <FormField label="Key Pain Drivers (one per line)">
            <textarea
              className={`${inputClass} min-h-24 w-full`}
              value={form.key_pain_drivers}
              onChange={(e) => update("key_pain_drivers", e.target.value)}
            />
          </FormField>
        </div>
      </Card>

      <Card title="Scores">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(
            [
              ["pressure_score", "Pressure"],
              ["demand_score", "Demand"],
              ["wedge_score", "Wedge"],
              ["buildability_score", "Buildability"],
              ["asset_fit_score", "Asset Fit"],
            ] as const
          ).map(([key, label]) => (
            <FormField key={key} label={label}>
              <input
                type="number"
                min={0}
                max={100}
                className={inputClass}
                value={form[key]}
                onChange={(e) => update(key, Number(e.target.value))}
              />
            </FormField>
          ))}
        </div>
      </Card>

      <Card title="Build Strategy">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="Asset Path 1">
            <input
              className={inputClass}
              value={form.asset_path_1}
              onChange={(e) => update("asset_path_1", e.target.value)}
            />
          </FormField>
          <FormField label="Asset Path 2">
            <input
              className={inputClass}
              value={form.asset_path_2}
              onChange={(e) => update("asset_path_2", e.target.value)}
            />
          </FormField>
          <FormField label="Asset Path 3">
            <input
              className={inputClass}
              value={form.asset_path_3}
              onChange={(e) => update("asset_path_3", e.target.value)}
            />
          </FormField>
          <FormField label="Asset Reason">
            <textarea
              className={`${inputClass} min-h-20 w-full`}
              value={form.asset_reason}
              onChange={(e) => update("asset_reason", e.target.value)}
            />
          </FormField>
          <div className="md:col-span-2">
            <FormField label="Expansion Ladder">
              <input
                className={inputClass}
                value={form.expansion_ladder}
                onChange={(e) => update("expansion_ladder", e.target.value)}
              />
            </FormField>
          </div>
        </div>
      </Card>

      <Card title="Execution">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="Buyer">
            <input
              className={inputClass}
              value={form.target_buyer}
              onChange={(e) => update("target_buyer", e.target.value)}
            />
          </FormField>
          <FormField label="Workflow">
            <input
              className={inputClass}
              value={form.core_workflow}
              onChange={(e) => update("core_workflow", e.target.value)}
            />
          </FormField>
          <FormField label="Wedge">
            <input
              className={inputClass}
              value={form.initial_wedge}
              onChange={(e) => update("initial_wedge", e.target.value)}
            />
          </FormField>
          <FormField label="Time to Value">
            <input
              className={inputClass}
              value={form.time_to_value}
              onChange={(e) => update("time_to_value", e.target.value)}
            />
          </FormField>
        </div>
      </Card>

      <Card title="Competition">
        <div className="grid gap-4">
          <FormField label="Underserved Segment">
            <input
              className={inputClass}
              value={form.underserved_segment}
              onChange={(e) => update("underserved_segment", e.target.value)}
            />
          </FormField>
          <FormField label="Differentiation">
            <textarea
              className={`${inputClass} min-h-20 w-full`}
              value={form.differentiation}
              onChange={(e) => update("differentiation", e.target.value)}
            />
          </FormField>
          <FormField label="Competitor Summary">
            <textarea
              className={`${inputClass} min-h-20 w-full`}
              value={form.competitor_summary}
              onChange={(e) => update("competitor_summary", e.target.value)}
            />
          </FormField>
          <FormField label="Avoid">
            <input
              className={inputClass}
              value={form.avoid}
              onChange={(e) => update("avoid", e.target.value)}
            />
          </FormField>
          <FormField label="Entry Strategy">
            <input
              className={inputClass}
              value={form.entry_strategy}
              onChange={(e) => update("entry_strategy", e.target.value)}
            />
          </FormField>
          <FormField label="Strategic Importance">
            <textarea
              className={`${inputClass} min-h-20 w-full`}
              value={form.strategic_importance}
              onChange={(e) => update("strategic_importance", e.target.value)}
            />
          </FormField>
        </div>
      </Card>

      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
          {saving ? "Saving..." : opportunityId ? "Update" : "Create"}
        </button>
        <button type="button" onClick={() => router.back()} className="btn-secondary">
          Cancel
        </button>
      </div>
    </form>
  );
}
