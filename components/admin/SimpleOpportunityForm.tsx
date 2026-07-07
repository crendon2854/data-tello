"use client";

import { useEffect, useState } from "react";
import { createOpportunity, getOpportunityById, updateOpportunity } from "@/lib/queries";

type FormState = {
  title: string;
  overall_score: number;
  best_first_asset: string;
  problem_summary: string;
  target_buyer: string;
  differentiation: string;
  status: string;
};

const emptyForm: FormState = {
  title: "",
  overall_score: 0,
  best_first_asset: "",
  problem_summary: "",
  target_buyer: "",
  differentiation: "",
  status: "draft",
};

function toPayload(form: FormState) {
  return {
    title: form.title,
    overall_score: Number(form.overall_score),
    best_first_asset: form.best_first_asset,
    problem_summary: form.problem_summary,
    target_buyer: form.target_buyer,
    differentiation: form.differentiation,
    status: form.status,
  };
}

export default function OpportunityForm({
  params,
}: {
  params: { id: string };
}) {
  const isEdit = params.id !== "new";
  const [form, setForm] = useState<FormState>(emptyForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isEdit) return;

    async function load() {
      const data = await getOpportunityById(params.id);

      if (data) {
        setForm({
          title: data.title ?? "",
          overall_score: data.overall_score ?? 0,
          best_first_asset: data.best_first_asset ?? "",
          problem_summary: data.problem_summary ?? "",
          target_buyer: data.target_buyer ?? "",
          differentiation: data.differentiation ?? "",
          status: data.status ?? "draft",
        });
      }
    }

    load();
  }, [isEdit, params.id]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "overall_score" ? Number(value) : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = toPayload(form);

      if (isEdit) {
        await updateOpportunity(params.id, payload);
        alert("Updated successfully");
      } else {
        await createOpportunity(payload);
        alert("Created successfully");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving");
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 max-w-2xl">
      <h1 className="page-title">
        {isEdit ? "Edit Opportunity" : "Create Opportunity"}
      </h1>

      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="w-full border p-2"
        required
      />

      <input
        name="overall_score"
        type="number"
        placeholder="Score"
        value={form.overall_score}
        onChange={handleChange}
        className="w-full border p-2"
      />

      <input
        name="best_first_asset"
        placeholder="Best First Asset"
        value={form.best_first_asset}
        onChange={handleChange}
        className="w-full border p-2"
      />

      <textarea
        name="problem_summary"
        placeholder="Problem Summary"
        value={form.problem_summary}
        onChange={handleChange}
        className="w-full border p-2"
      />

      <input
        name="target_buyer"
        placeholder="Target Buyer"
        value={form.target_buyer}
        onChange={handleChange}
        className="w-full border p-2"
      />

      <textarea
        name="differentiation"
        placeholder="Differentiation"
        value={form.differentiation}
        onChange={handleChange}
        className="w-full border p-2"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-4 py-2 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
