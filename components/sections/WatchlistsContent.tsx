"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Bell, ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/Card";
import { formatScore, cn } from "@/lib/helpers";
import {
  createWatchlist,
  deleteWatchlist,
  dismissWatchlistMatch,
  getWatchlistMatches,
  getWatchlists,
  syncWatchlistMatches,
} from "@/lib/queries";
import {
  ASSET_TYPE_OPTIONS,
  getWatchlistDefaults,
} from "@/lib/watchlist-matching";
import { getOrCreateUserId } from "@/lib/user-preferences-client";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import type { WatchlistMatchWithOpportunity, WatchlistRow } from "@/types/database";
import type { Opportunity } from "@/types/opportunity";
import {
  BUYER_TYPE_OPTIONS,
  INDUSTRY_OPTIONS,
  SIGNAL_PREFERENCE_OPTIONS,
} from "@/types/user-preferences";

interface WatchlistsContentProps {
  opportunities: Opportunity[];
}

type WatchlistDraft = {
  name: string;
  description: string;
  industries: string[];
  buyer_types: string[];
  asset_types: string[];
  min_overall_score: number;
  min_persona_score: number;
  required_signals: string[];
};

function toggleValue(values: string[], value: string): string[] {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

function draftFromDefaults(
  defaults: ReturnType<typeof getWatchlistDefaults>
): WatchlistDraft {
  return {
    name: "",
    description: "",
    industries: defaults.industries ?? [],
    buyer_types: defaults.buyer_types ?? [],
    asset_types: defaults.asset_types ?? [],
    min_overall_score: defaults.min_overall_score ?? 0,
    min_persona_score: defaults.min_persona_score ?? 0,
    required_signals: defaults.required_signals ?? [],
  };
}

export function WatchlistsContent({ opportunities }: WatchlistsContentProps) {
  const { preferences, ready: prefsReady } = useUserPreferences();
  const [watchlists, setWatchlists] = useState<WatchlistRow[]>([]);
  const [matches, setMatches] = useState<WatchlistMatchWithOpportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [draft, setDraft] = useState<WatchlistDraft>(() =>
    draftFromDefaults(getWatchlistDefaults("general"))
  );

  const role = preferences?.role ?? "general";

  const loadData = useCallback(async () => {
    const userId = getOrCreateUserId();
    setLoading(true);

    try {
      const [list, storedMatches] = await Promise.all([
        getWatchlists(userId),
        getWatchlistMatches(userId),
      ]);

      setWatchlists(list);

      if (storedMatches.length === 0 && list.length > 0) {
        for (const watchlist of list) {
          await syncWatchlistMatches(watchlist, opportunities, {
            role: preferences?.role,
            signalPreferences: preferences?.signal_preferences,
          });
        }
        const refreshed = await getWatchlistMatches(userId);
        setMatches(refreshed);
      } else {
        setMatches(storedMatches);
      }
    } finally {
      setLoading(false);
    }
  }, [opportunities, preferences?.role, preferences?.signal_preferences]);

  useEffect(() => {
    if (prefsReady) {
      void loadData();
    }
  }, [prefsReady, loadData]);

  useEffect(() => {
    if (prefsReady && preferences) {
      setDraft((prev) => ({
        ...prev,
        ...draftFromDefaults(getWatchlistDefaults(preferences.role, preferences)),
        name: prev.name,
        description: prev.description,
      }));
    }
  }, [prefsReady, preferences]);

  const matchesByWatchlist = useMemo(() => {
    const map = new Map<string, WatchlistMatchWithOpportunity[]>();
    for (const match of matches) {
      const list = map.get(match.watchlist_id) ?? [];
      list.push(match);
      map.set(match.watchlist_id, list);
    }
    return map;
  }, [matches]);

  const handleCreate = async () => {
    if (!draft.name.trim()) {
      return;
    }

    setSaving(true);
    try {
      const userId = getOrCreateUserId();
      const created = await createWatchlist({
        user_id: userId,
        name: draft.name.trim(),
        description: draft.description.trim() || null,
        industries: draft.industries,
        buyer_types: draft.buyer_types,
        asset_types: draft.asset_types,
        min_overall_score: draft.min_overall_score,
        min_persona_score: draft.min_persona_score,
        required_signals: draft.required_signals,
      });

      await syncWatchlistMatches(created, opportunities, {
        role: preferences?.role,
        signalPreferences: preferences?.signal_preferences,
      });

      setShowForm(false);
      setDraft(draftFromDefaults(getWatchlistDefaults(role, preferences)));
      await loadData();
      setExpandedId(created.id);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteWatchlist(id);
    await loadData();
  };

  const handleDismiss = async (matchId: string) => {
    await dismissWatchlistMatch(matchId);
    setMatches((prev) => prev.filter((m) => m.id !== matchId));
  };

  const handleResync = async (watchlist: WatchlistRow) => {
    await syncWatchlistMatches(watchlist, opportunities, {
      role: preferences?.role,
      signalPreferences: preferences?.signal_preferences,
    });
    const userId = getOrCreateUserId();
    const refreshed = await getWatchlistMatches(userId);
    setMatches(refreshed);
  };

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      <Sidebar variant="dashboard" />
      <PageContainer className="flex-1">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <span className="command-meta">Alert Triggers</span>
              <span className="text-border-subtle">|</span>
              <span className="font-mono text-xs text-accent-blue">
                INVESTOR WATCHLISTS
              </span>
            </div>
            <h1 className="page-title">Watchlists</h1>
            <p className="mt-1 text-body text-text-muted">
              Save opportunity theses and surface matches when published
              opportunities fit your focus. Truth scores stay unchanged — persona
              rank drives watchlist sorting.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            className="inline-flex items-center gap-2 rounded-lg border border-accent-brand/40 bg-accent-brand/10 px-4 py-2 text-sm font-medium text-accent-brand transition-colors hover:bg-accent-brand/20"
          >
            <Plus className="h-4 w-4" />
            Create Watchlist
          </button>
        </div>

        {showForm && (
          <Card title="New watchlist" glow="blue" className="mb-6">
            <div className="space-y-5">
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-text-muted">
                  Name
                </label>
                <input
                  type="text"
                  value={draft.name}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="e.g. Compliance wedge plays in construction"
                  className="w-full rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-sm text-text-primary"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-text-muted">
                  Description
                </label>
                <textarea
                  value={draft.description}
                  onChange={(e) =>
                    setDraft((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={2}
                  placeholder="What thesis are you monitoring?"
                  className="w-full rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-sm text-text-primary"
                />
              </div>

              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-text-muted">
                  Industries
                </p>
                <div className="flex flex-wrap gap-2">
                  {INDUSTRY_OPTIONS.filter((o) => o.id !== "explore").map(
                    (option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() =>
                          setDraft((prev) => ({
                            ...prev,
                            industries: toggleValue(prev.industries, option.id),
                          }))
                        }
                        className={cn(
                          "rounded-full border px-3 py-1 text-xs transition-colors",
                          draft.industries.includes(option.id)
                            ? "border-accent-brand/50 bg-accent-brand/15 text-accent-brand"
                            : "border-border-subtle text-text-muted hover:border-border-default"
                        )}
                      >
                        {option.label}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-text-muted">
                  Buyer types
                </p>
                <div className="flex flex-wrap gap-2">
                  {BUYER_TYPE_OPTIONS.filter(
                    (o) => o.id !== "no_preference"
                  ).map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() =>
                        setDraft((prev) => ({
                          ...prev,
                          buyer_types: toggleValue(prev.buyer_types, option.id),
                        }))
                      }
                      className={cn(
                        "rounded-full border px-3 py-1 text-xs transition-colors",
                        draft.buyer_types.includes(option.id)
                          ? "border-accent-brand/50 bg-accent-brand/15 text-accent-brand"
                          : "border-border-subtle text-text-muted hover:border-border-default"
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-text-muted">
                  Asset types
                </p>
                <div className="flex flex-wrap gap-2">
                  {ASSET_TYPE_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() =>
                        setDraft((prev) => ({
                          ...prev,
                          asset_types: toggleValue(prev.asset_types, option.id),
                        }))
                      }
                      className={cn(
                        "rounded-full border px-3 py-1 text-xs transition-colors",
                        draft.asset_types.includes(option.id)
                          ? "border-accent-brand/50 bg-accent-brand/15 text-accent-brand"
                          : "border-border-subtle text-text-muted hover:border-border-default"
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-text-muted">
                    Min overall score (truth layer)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={draft.min_overall_score}
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        min_overall_score: Number(e.target.value) || 0,
                      }))
                    }
                    className="w-full rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-sm text-text-primary"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-text-muted">
                    Min persona score (lens rank)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={draft.min_persona_score}
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        min_persona_score: Number(e.target.value) || 0,
                      }))
                    }
                    className="w-full rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-sm text-text-primary"
                  />
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-text-muted">
                  Required signals
                </p>
                <div className="flex flex-wrap gap-2">
                  {SIGNAL_PREFERENCE_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() =>
                        setDraft((prev) => ({
                          ...prev,
                          required_signals: toggleValue(
                            prev.required_signals,
                            option.id
                          ),
                        }))
                      }
                      className={cn(
                        "rounded-full border px-3 py-1 text-xs transition-colors",
                        draft.required_signals.includes(option.id)
                          ? "border-accent-orange/50 bg-accent-orange/15 text-accent-orange"
                          : "border-border-subtle text-text-muted hover:border-border-default"
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  disabled={saving || !draft.name.trim()}
                  onClick={() => void handleCreate()}
                  className="rounded-lg bg-accent-brand px-4 py-2 text-sm font-medium text-bg-primary disabled:opacity-50"
                >
                  {saving ? "Saving…" : "Save watchlist"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-lg border border-border-subtle px-4 py-2 text-sm text-text-muted"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Card>
        )}

        {loading ? (
          <p className="text-text-muted">Loading watchlists…</p>
        ) : watchlists.length === 0 ? (
          <Card glow="none">
            <div className="flex flex-col items-center gap-3 py-8 text-center">
              <Bell className="h-8 w-8 text-text-dim" />
              <p className="text-body text-text-secondary">
                No watchlists yet. Create one to monitor opportunity theses and
                get matched alerts.
              </p>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {watchlists.map((watchlist) => {
              const watchlistMatches =
                matchesByWatchlist.get(watchlist.id) ?? [];
              const isExpanded = expandedId === watchlist.id;

              return (
                <Card key={watchlist.id} glow="none">
                  <div className="flex items-start justify-between gap-4">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedId(isExpanded ? null : watchlist.id)
                      }
                      className="flex min-w-0 flex-1 items-start gap-3 text-left"
                    >
                      {isExpanded ? (
                        <ChevronUp className="mt-0.5 h-4 w-4 shrink-0 text-text-muted" />
                      ) : (
                        <ChevronDown className="mt-0.5 h-4 w-4 shrink-0 text-text-muted" />
                      )}
                      <div className="min-w-0">
                        <h2 className="text-sm font-semibold text-text-primary">
                          {watchlist.name}
                        </h2>
                        {watchlist.description && (
                          <p className="mt-1 text-body text-text-secondary">
                            {watchlist.description}
                          </p>
                        )}
                        <p className="mt-2 text-xs text-text-muted">
                          {watchlistMatches.length} match
                          {watchlistMatches.length === 1 ? "" : "es"} · min
                          overall {watchlist.min_overall_score} · min persona{" "}
                          {watchlist.min_persona_score}
                        </p>
                      </div>
                    </button>
                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        onClick={() => void handleResync(watchlist)}
                        className="rounded-lg border border-border-subtle px-3 py-1.5 text-xs text-text-muted hover:text-text-primary"
                      >
                        Refresh matches
                      </button>
                      <button
                        type="button"
                        onClick={() => void handleDelete(watchlist.id)}
                        className="rounded-lg border border-border-subtle p-2 text-text-muted hover:border-red-500/40 hover:text-red-400"
                        aria-label="Delete watchlist"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="mt-5 space-y-3 border-t border-border-subtle pt-5">
                      {watchlistMatches.length === 0 ? (
                        <p className="text-sm text-text-muted">
                          No matching opportunities yet. Try lowering score
                          thresholds or broadening industries.
                        </p>
                      ) : (
                        watchlistMatches.map((match) => (
                          <div
                            key={match.id}
                            className="rounded-lg border border-border-subtle bg-bg-elevated/50 p-4"
                          >
                            <div className="mb-2 flex flex-wrap items-start justify-between gap-3">
                              <div>
                                <Link
                                  href={`/opportunity/${match.opportunity.id}`}
                                  className="text-sm font-semibold text-accent-blue hover:text-accent-blue-glow"
                                >
                                  {match.opportunity.title}
                                </Link>
                                <p className="mt-1 text-xs text-text-muted">
                                  Match score {formatScore(match.match_score)} ·
                                  truth {formatScore(match.opportunity.overall_score)}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => void handleDismiss(match.id)}
                                className="text-xs text-text-muted hover:text-text-primary"
                              >
                                Dismiss
                              </button>
                            </div>
                            {match.opportunity.short_summary && (
                              <p className="mb-3 text-body text-text-secondary">
                                {match.opportunity.short_summary}
                              </p>
                            )}
                            <ul className="space-y-1">
                              {match.match_reasons.map((reason) => (
                                <li
                                  key={reason}
                                  className="text-xs text-text-muted before:mr-2 before:text-accent-brand before:content-['•']"
                                >
                                  {reason}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </PageContainer>
    </div>
  );
}
