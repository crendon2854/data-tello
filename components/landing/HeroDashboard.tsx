"use client";

import Link from "next/link";
import { Bell, ChevronRight } from "lucide-react";
import { heroOpportunities, sampleOpportunity } from "./landing-data";
import { ScoreBar } from "./landing-ui";

export function HeroDashboard() {
  const featured = heroOpportunities.find((o) => o.featured) ?? heroOpportunities[0];
  const sidebar = heroOpportunities.filter((o) => !o.featured);

  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
      <div
        className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-blue-500/15 via-cyan-400/10 to-transparent blur-2xl"
        aria-hidden
      />

      <div className="animate-float relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-900/10">
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/80 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <span className="ml-2 font-mono text-[10px] text-slate-400">datatello.app</span>
          <div className="ml-auto flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono text-[10px] font-medium text-emerald-700">Live signals</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-5">
          <div className="space-y-2 border-slate-100 p-4 lg:col-span-2 lg:border-r">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Opportunities
            </p>
            {[featured, ...sidebar].map((opp, i) => (
              <div
                key={opp.title}
                className={`rounded-xl border p-3 transition-colors ${
                  i === 0
                    ? "border-blue-200 bg-blue-50/60"
                    : "border-slate-100 bg-slate-50/50"
                }`}
              >
                <div className="mb-1 flex items-center justify-between gap-2">
                  <span className="truncate text-xs font-semibold text-slate-800">{opp.title}</span>
                  <span className="shrink-0 rounded-md bg-white px-1.5 py-0.5 font-mono text-xs font-bold text-blue-600 shadow-sm">
                    {opp.score}
                  </span>
                </div>
                <p className="truncate text-[10px] text-slate-500">{opp.asset}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {opp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[9px] font-medium text-slate-600"
                    >
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
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Featured dossier
                </p>
                <h3 className="mt-1 text-sm font-bold text-slate-900">{featured.title}</h3>
              </div>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-sm font-bold text-white shadow-lg shadow-blue-500/30">
                {featured.score}
              </div>
            </div>

            <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-600">
                Best first asset
              </p>
              <p className="mt-0.5 text-xs font-semibold text-slate-800">{featured.asset}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {sampleOpportunity.signals.slice(0, 4).map((s) => (
                <ScoreBar key={s.label} label={s.label} score={s.score} colorClass={s.color} />
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {["Pressure", "Demand", "Wedge", "Friction"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-medium text-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/60 px-4 py-2.5">
          <Link href="#examples" className="flex items-center gap-1 text-[11px] font-medium text-blue-600 hover:underline">
            View sample opportunity
            <ChevronRight className="h-3 w-3" />
          </Link>
          <Bell className="h-3.5 w-3.5 text-slate-400" />
        </div>
      </div>
    </div>
  );
}
