"use client";

import Link from "next/link";
import { Bell, ChevronRight } from "lucide-react";
import { cn } from "@/lib/helpers";
import { heroOpportunities, sampleOpportunity } from "./landing-data";
import { ScoreBar } from "./landing-ui";

export function HeroDashboard() {
  const featured = heroOpportunities.find((o) => o.featured) ?? heroOpportunities[0];
  const sidebar = heroOpportunities.filter((o) => !o.featured);

  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
      <div className="ambient-glow-blue -right-4 -top-4 h-40 w-40 opacity-60" aria-hidden />

      <div className="landing-dashboard landing-float">
        <div className="flex items-center gap-2 border-b border-border bg-bg-elevated/80 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-accent-crimson/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent-orange/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent-green/80" />
          </div>
          <span className="ml-2 font-mono text-[10px] text-text-muted">datatello.app/dashboard</span>
          <div className="ml-auto flex items-center gap-1.5 rounded-full border border-border-subtle bg-bg-elevated px-2.5 py-1">
            <span className="status-dot-live" />
            <span className="font-mono text-[10px] text-text-muted">LIVE</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-5">
          <div className="space-y-2 border-border p-4 lg:col-span-2 lg:border-r">
            <p className="label-text">Opportunities</p>
            {[featured, ...sidebar].map((opp, i) => (
              <div
                key={opp.title}
                className={cn(
                  "rounded-lg border p-3 transition-colors",
                  i === 0
                    ? "border-accent-blue/30 bg-accent-blue/5"
                    : "border-border-subtle bg-bg-elevated/50"
                )}
              >
                <div className="mb-1 flex items-center justify-between gap-2">
                  <span className="truncate text-xs font-semibold text-text-primary">{opp.title}</span>
                  <span className="icon-box-blue !h-7 !w-7 shrink-0 font-mono text-[10px] font-bold">
                    {opp.score}
                  </span>
                </div>
                <p className="truncate text-[10px] text-text-muted">{opp.asset}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {opp.tags.map((tag) => (
                    <span key={tag} className="badge-blue">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 p-4 lg:col-span-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="label-text">Featured dossier</p>
                <h3 className="mt-1 text-sm font-bold text-text-primary">{featured.title}</h3>
              </div>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-blue to-accent-blue-glow text-sm font-bold text-white shadow-glow-blue">
                {featured.score}
              </div>
            </div>

            <div className="rounded-lg border border-accent-blue/30 bg-accent-blue/10 px-4 py-3">
              <p className="label-text mb-1">Best first asset</p>
              <p className="text-xs font-semibold text-text-primary">{featured.asset}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {sampleOpportunity.signals.slice(0, 4).map((s) => (
                <ScoreBar key={s.label} label={s.label} score={s.score} gradient={s.gradient} />
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {["Pressure", "Demand", "Wedge", "Friction"].map((tag) => (
                <span key={tag} className="badge-muted">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-border bg-bg-elevated/40 px-4 py-2.5">
          <Link
            href="#examples"
            className="flex items-center gap-1 text-[11px] font-medium text-accent-blue hover:underline"
          >
            View sample opportunity
            <ChevronRight className="h-3 w-3" />
          </Link>
          <Bell className="h-3.5 w-3.5 text-text-muted" />
        </div>
      </div>
    </div>
  );
}
