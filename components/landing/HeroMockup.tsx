import Link from "next/link";
import type { Opportunity } from "@/types/opportunity";
import { formatScore } from "@/lib/helpers";

interface HeroMockupProps {
  featured?: Opportunity | null;
  opportunities?: Opportunity[];
}

function ScoreBar({ label, score, color }: { label: string; score: number; color: string }) {
  const width = score <= 10 ? score * 10 : score;
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-[10px]">
        <span className="text-text-muted">{label}</span>
        <span className="font-mono font-medium text-text-secondary">{formatScore(score)}</span>
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-bg-elevated">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
          style={{ width: `${Math.min(width, 100)}%` }}
        />
      </div>
    </div>
  );
}

export function HeroMockup({ featured, opportunities = [] }: HeroMockupProps) {
  const cards = opportunities.slice(0, 3);
  const hero = featured ?? cards[0];

  return (
    <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
      <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent-blue/20 via-transparent to-accent-orange/10 blur-2xl" aria-hidden />

      <div className="relative overflow-hidden rounded-2xl border border-border-subtle bg-bg-secondary/80 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-2 border-b border-border-subtle bg-bg-elevated/80 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-accent-crimson/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent-orange/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent-green/80" />
          </div>
          <span className="ml-2 font-mono text-[10px] text-text-muted">datatello.app/dashboard</span>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="status-dot-live" />
            <span className="font-mono text-[10px] text-accent-green">Live</span>
          </div>
        </div>

        <div className="grid gap-4 p-4 lg:grid-cols-5 lg:gap-0 lg:p-0">
          <div className="space-y-2 border-border-subtle p-4 lg:col-span-2 lg:border-r">
            <p className="label-text">Opportunities</p>
            {cards.length > 0 ? (
              cards.map((opp, i) => (
                <div
                  key={opp.id}
                  className={`rounded-lg border p-3 transition-all ${
                    i === 0
                      ? "border-accent-blue/40 bg-accent-blue/5"
                      : "border-border-subtle bg-bg-elevated/50"
                  }`}
                >
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <span className="truncate text-xs font-semibold text-text-primary">{opp.title}</span>
                    <span className="shrink-0 font-mono text-xs font-bold text-accent-blue">
                      {formatScore(opp.overall_score)}
                    </span>
                  </div>
                  <p className="truncate text-[10px] text-text-muted">{opp.best_first_asset}</p>
                  {(opp.tags ?? []).slice(0, 2).map((tag) => (
                    <span key={tag} className="mr-1 mt-1.5 inline-block rounded border border-accent-blue/20 bg-accent-blue/10 px-1.5 py-0.5 font-mono text-[9px] text-accent-blue">
                      {tag}
                    </span>
                  ))}
                </div>
              ))
            ) : (
              <>
                <div className="rounded-lg border border-accent-blue/40 bg-accent-blue/5 p-3">
                  <div className="mb-1 flex justify-between">
                    <span className="text-xs font-semibold">OSHA Doc Tracker</span>
                    <span className="font-mono text-xs font-bold text-accent-blue">78</span>
                  </div>
                  <p className="text-[10px] text-text-muted">Spreadsheet / Template</p>
                </div>
                <div className="rounded-lg border border-border-subtle bg-bg-elevated/50 p-3 opacity-60">
                  <div className="mb-1 flex justify-between">
                    <span className="text-xs font-semibold">Vendor Risk Portal</span>
                    <span className="font-mono text-xs text-text-secondary">74</span>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="space-y-4 p-4 lg:col-span-3">
            {hero ? (
              <>
                <div>
                  <p className="label-text mb-1">Featured Dossier</p>
                  <h3 className="text-sm font-bold text-text-primary">{hero.title}</h3>
                  <p className="mt-1 text-[11px] leading-relaxed text-text-secondary">
                    {hero.short_summary}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-lg border border-border-subtle bg-bg-elevated/60 p-2.5 text-center">
                    <p className="label-text mb-0.5">Score</p>
                    <p className="font-mono text-xl font-bold text-accent-blue">
                      {formatScore(hero.overall_score)}
                    </p>
                  </div>
                  <div className="col-span-2 rounded-lg border border-accent-blue/20 bg-accent-blue/5 p-2.5">
                    <p className="label-text mb-0.5">Best First Asset</p>
                    <p className="text-xs font-semibold text-text-primary">{hero.best_first_asset}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <ScoreBar label="Pressure" score={hero.pressure_score ?? 0} color="from-accent-blue to-blue-400" />
                  <ScoreBar label="Demand" score={hero.demand_score ?? 0} color="from-accent-orange to-orange-400" />
                  <ScoreBar label="Wedge" score={hero.wedge_score ?? 0} color="from-accent-blue to-blue-400" />
                  <ScoreBar label="Buildability" score={hero.buildability_score ?? 0} color="from-accent-green to-green-400" />
                </div>

                {hero.target_buyer && (
                  <div className="rounded-lg border border-border-subtle bg-bg-elevated/40 px-3 py-2">
                    <p className="label-text mb-0.5">Buyer</p>
                    <p className="text-[11px] text-text-secondary">{hero.target_buyer}</p>
                  </div>
                )}
              </>
            ) : (
              <div className="flex h-full items-center justify-center text-text-muted">
                <p className="text-xs">Opportunity preview</p>
              </div>
            )}
          </div>
        </div>

        {hero && (
          <div className="border-t border-border-subtle bg-bg-elevated/40 px-4 py-2.5">
            <Link
              href={`/opportunity/${hero.id}`}
              className="text-[11px] font-medium text-accent-blue hover:underline"
            >
              View full dossier →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
