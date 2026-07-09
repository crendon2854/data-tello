"use client";

import { useCallback, useEffect, useState } from "react";
import { BookmarkPlus } from "lucide-react";
import {
  createWatchlist,
  getOpportunities,
  getWatchlists,
  syncWatchlistMatches,
} from "@/lib/queries";
import { watchlistFromOpportunity } from "@/lib/watchlist-matching";
import { getOrCreateUserId } from "@/lib/user-preferences-client";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import type { WatchlistRow } from "@/types/database";
import type { Opportunity } from "@/types/opportunity";
import { cn } from "@/lib/helpers";

interface SaveToWatchlistProps {
  opportunity: Opportunity;
}

export function SaveToWatchlist({ opportunity }: SaveToWatchlistProps) {
  const { preferences } = useUserPreferences();
  const [watchlists, setWatchlists] = useState<WatchlistRow[]>([]);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loadWatchlists = useCallback(async () => {
    const userId = getOrCreateUserId();
    const list = await getWatchlists(userId);
    setWatchlists(list);
  }, []);

  useEffect(() => {
    if (open) {
      void loadWatchlists();
    }
  }, [open, loadWatchlists]);

  const handleSaveToExisting = async (watchlistId: string) => {
    setLoading(true);
    setStatus(null);
    try {
      const watchlist = watchlists.find((w) => w.id === watchlistId);
      if (!watchlist) {
        return;
      }

      const allOpportunities = await getOpportunities();
      await syncWatchlistMatches(watchlist, allOpportunities, {
        role: preferences?.role,
        signalPreferences: preferences?.signal_preferences,
      });

      setStatus(`Synced to "${watchlist.name}"`);
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFromOpportunity = async () => {
    setLoading(true);
    setStatus(null);
    try {
      const userId = getOrCreateUserId();
      const seed = watchlistFromOpportunity(opportunity);
      const created = await createWatchlist({
        user_id: userId,
        name: seed.name ?? `Thesis: ${opportunity.title}`,
        description: seed.description ?? null,
        industries: seed.industries ?? [],
        buyer_types: seed.buyer_types ?? [],
        asset_types: seed.asset_types ?? [],
        min_overall_score: seed.min_overall_score ?? 0,
        min_persona_score: seed.min_persona_score ?? 0,
        required_signals: seed.required_signals ?? [],
      });

      const allOpportunities = await getOpportunities();
      await syncWatchlistMatches(created, allOpportunities, {
        role: preferences?.role,
        signalPreferences: preferences?.signal_preferences,
      });

      setStatus(`Created watchlist "${created.name}"`);
      setOpen(false);
      await loadWatchlists();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-lg border border-border-subtle bg-bg-elevated/50 px-3 py-2 text-sm text-text-secondary transition-colors hover:border-accent-brand/40 hover:text-accent-brand"
      >
        <BookmarkPlus className="h-4 w-4" />
        Save to Watchlist
      </button>

      {status && (
        <p className="mt-2 text-xs text-accent-brand">{status}</p>
      )}

      {open && (
        <div className="absolute left-0 top-full z-20 mt-2 w-72 rounded-lg border border-border-subtle bg-bg-elevated p-3 shadow-subtle-glow">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-text-muted">
            Add to watchlist
          </p>

          <button
            type="button"
            disabled={loading}
            onClick={() => void handleCreateFromOpportunity()}
            className="mb-3 w-full rounded-lg border border-accent-brand/30 bg-accent-brand/10 px-3 py-2 text-left text-sm text-accent-brand hover:bg-accent-brand/20 disabled:opacity-50"
          >
            Create watchlist from this opportunity
          </button>

          {watchlists.length > 0 ? (
            <ul className="max-h-48 space-y-1 overflow-y-auto">
              {watchlists.map((watchlist) => (
                <li key={watchlist.id}>
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => void handleSaveToExisting(watchlist.id)}
                    className={cn(
                      "w-full rounded-lg px-3 py-2 text-left text-sm text-text-secondary hover:bg-bg-primary/60 disabled:opacity-50"
                    )}
                  >
                    {watchlist.name}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-text-muted">
              No watchlists yet — create one from this opportunity or visit{" "}
              <a href="/watchlists" className="text-accent-blue hover:underline">
                Watchlists
              </a>
              .
            </p>
          )}
        </div>
      )}
    </div>
  );
}
