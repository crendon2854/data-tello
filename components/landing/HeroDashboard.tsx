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
        className="pointer-events-none absolute -inset-8 rounded-[2rem] bg-gradient-to-br from-blue-500/20 via-cyan-400/15 to-transparent blur-3xl"
        aria-hidden
      />

      <div className="landing-dashboard landing-float">
        <div className="flex items-center gap-2 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-blue-50/40 px-5 py-3.5">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
          </div>
          <span className="ml-2 font-mono text-[11px] text-slate-400">datatello.app/dashboard</span>
          <div className="ml-auto flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono text-[10px] font-semibold text-emerald-700">Live signals</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-5">
          <div className="space-y-2.5 border-slate-100 bg-slate-50/30 p-5 lg:col-span-2 lg:border-r">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Opportunities
            </p>
            {[featured, ...sidebar].map((opp, i) => (
              <div
                key={opp.title}
                className={`rounded-xl border p-3.5 ${
                  i === 0
                    ? "border-blue-200 bg-gradient-to-br from-blue-50 to-white shadow-sm"
                    : "border-slate-100 bg-white/80"
                }`}
              >
                <div className="mb-1 flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-bold text-slate-800">{opp.title}</span>
                  <span className="landing-score-ring !h-8 !w-8 !rounded-lg !text-xs !shadow-md">
                    {opp.score}
                  </span>
                </div>
                <p className="truncate text-xs text-slate-500">{opp.asset}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {opp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-medium text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 p-5 lg:col-span-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Featured dossier
                </p>
                <h3 className="mt-1 text-base font-bold text-slate-900">{featured.title}</h3>
              </div>
              <div className="landing-score-ring">{featured.score}</div>
            </div>

            <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50/50 p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600">
                Best first asset
              </p>
              <p className="mt-1 text-sm font-bold text-slate-800">{featured.asset}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {sampleOpportunity.signals.slice(0, 4).map((s) => (
                <ScoreBar key={s.label} label={s.label} score={s.score} colorClass={s.color} />
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {["Pressure", "Demand", "Wedge", "Friction"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/80 px-5 py-3">
          <Link
            href="#examples"
            className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
          >
            View sample opportunity
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
          <Bell className="h-4 w-4 text-slate-400" />
        </div>
      </div>
    </div>
  );
}
