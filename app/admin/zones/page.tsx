"use client";

import { useEffect, useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { getZones, upsertZone } from "@/lib/queries";
import type { ZoneRow } from "@/types/database";

const emptyZone = {
  id: "",
  title: "",
  summary: "",
  industry: "",
  buyer: "",
};

export default function ZonesPage() {
  const [zones, setZones] = useState<ZoneRow[]>([]);
  const [form, setForm] = useState(emptyZone);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadZones = () => {
    getZones().then(setZones).finally(() => setLoading(false));
  };

  useEffect(() => {
    loadZones();
  }, []);

  const handleEdit = (zone: ZoneRow) => {
    setForm({
      id: zone.id,
      title: zone.title,
      summary: zone.summary,
      industry: zone.industry,
      buyer: zone.buyer,
    });
    setEditingId(zone.id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await upsertZone({
        id: editingId ?? String(Date.now()),
        title: form.title,
        summary: form.summary,
        industry: form.industry,
        buyer: form.buyer,
      });
      setForm(emptyZone);
      setEditingId(null);
      loadZones();
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageContainer>
      <h1 className="page-title mb-2">Zones</h1>
      <p className="mb-8 text-body text-text-secondary">Define and manage market zones</p>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="section-title mb-4">Existing Zones</h2>
          {loading ? (
            <p className="text-body text-text-muted">Loading...</p>
          ) : (
            <div className="flex flex-col gap-3">
              {zones.map((zone) => (
                <div key={zone.id} className="glass-card !p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-text-primary">{zone.title}</h3>
                      <p className="mt-1 text-body text-text-secondary">{zone.summary}</p>
                      <p className="mt-2 text-meta">
                        {zone.industry} &middot; {zone.buyer}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleEdit(zone)}
                      className="text-sm text-accent-blue hover:text-accent-blue-glow"
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
            {editingId ? "Edit Zone" : "Create Zone"}
          </h2>
          <form onSubmit={handleSubmit} className="glass-card space-y-4">
            <div>
              <label className="label-text mb-1.5 block">Title</label>
              <input
                className="input-field"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="label-text mb-1.5 block">Summary</label>
              <textarea
                className="input-field min-h-20"
                value={form.summary}
                onChange={(e) => setForm({ ...form, summary: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="label-text mb-1.5 block">Industry</label>
              <input
                className="input-field"
                value={form.industry}
                onChange={(e) => setForm({ ...form, industry: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="label-text mb-1.5 block">Buyer</label>
              <input
                className="input-field"
                value={form.buyer}
                onChange={(e) => setForm({ ...form, buyer: e.target.value })}
                required
              />
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
                {saving ? "Saving..." : editingId ? "Update" : "Create"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setForm(emptyZone);
                    setEditingId(null);
                  }}
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
