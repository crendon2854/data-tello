"use client";

import { useEffect, useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { getSignals, toggleSignalProcessed } from "@/lib/queries";
import type { SignalRow } from "@/types/database";

export default function SignalsPage() {
  const [signals, setSignals] = useState<SignalRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSignals().then(setSignals).finally(() => setLoading(false));
  }, []);

  const handleToggle = async (id: string, processed: boolean) => {
    await toggleSignalProcessed(id, processed);
    setSignals((prev) =>
      prev.map((s) => (s.id === id ? { ...s, processed } : s))
    );
  };

  return (
    <PageContainer>
      <h1 className="page-title mb-2">Signals</h1>
      <p className="mb-8 text-body text-text-secondary">Manage incoming market signals</p>

      {loading ? (
        <p className="text-body text-text-muted">Loading...</p>
      ) : (
        <div className="glass-card data-table !p-0">
          <table className="w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>Source</th>
                <th>Type</th>
                <th>Processed</th>
              </tr>
            </thead>
            <tbody>
              {signals.map((signal) => (
                <tr key={signal.id}>
                  <td className="font-medium text-text-primary">{signal.title}</td>
                  <td>{signal.source}</td>
                  <td>
                    <span className="badge-orange">{signal.type}</span>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={signal.processed}
                      onChange={(e) => handleToggle(signal.id, e.target.checked)}
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
