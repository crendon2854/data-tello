"use client";

import { useState } from "react";
import { updateOpportunityStatus } from "@/lib/queries";
import type { Opportunity } from "@/types/opportunity";
import { formatScore } from "@/lib/helpers";
import Link from "next/link";

interface ReviewActionsProps {
  opportunity: Opportunity;
}

export function ReviewActions({ opportunity }: ReviewActionsProps) {
  const [status, setStatus] = useState(opportunity.status);
  const [loading, setLoading] = useState(false);

  const handleAction = async (newStatus: Opportunity["status"]) => {
    setLoading(true);
    try {
      await updateOpportunityStatus(opportunity.id, newStatus);
      setStatus(newStatus);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="badge-blue capitalize">{status}</span>
      <span className="font-mono text-sm font-semibold text-accent-blue">
        {formatScore(opportunity.overall_score)}
      </span>
      <Link
        href={`/admin/opportunities/${opportunity.id}`}
        className="text-sm text-accent-blue hover:text-accent-blue-glow"
      >
        Edit
      </Link>
      {status === "draft" && (
        <>
          <button
            type="button"
            disabled={loading}
            onClick={() => handleAction("published")}
            className="rounded-md bg-accent-green px-3 py-1 text-xs font-medium text-white shadow-glow-green hover:opacity-90 disabled:opacity-50"
          >
            Approve
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => handleAction("rejected")}
            className="rounded-md bg-accent-crimson px-3 py-1 text-xs font-medium text-white shadow-glow-crimson hover:opacity-90 disabled:opacity-50"
          >
            Reject
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => handleAction("published")}
            className="btn-secondary px-3 py-1 text-xs disabled:opacity-50"
          >
            Publish
          </button>
        </>
      )}
    </div>
  );
}
