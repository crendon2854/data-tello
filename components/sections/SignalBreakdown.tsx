import type { Opportunity } from "@/types/opportunity";
import { formatScore } from "@/lib/helpers";

interface SignalBreakdownProps {
  opportunity: Pick<
    Opportunity,
    | "pressure_score"
    | "demand_score"
    | "wedge_score"
    | "buildability_score"
    | "asset_fit_score"
  >;
  helperText?: string;
}

const signals = [
  { key: "pressure_score", label: "Pressure", color: "from-accent-blue to-accent-blue-glow" },
  { key: "demand_score", label: "Demand", color: "from-accent-orange to-orange-400" },
  { key: "wedge_score", label: "Wedge", color: "from-accent-blue to-accent-blue-glow" },
  { key: "buildability_score", label: "Buildability", color: "from-accent-green to-green-400" },
  { key: "asset_fit_score", label: "Asset Fit", color: "from-accent-blue to-accent-blue-glow" },
] as const;

function normalizeScore(score: number): number {
  return score <= 10 ? score * 10 : score;
}

function displayScore(score: number): string {
  if (score <= 10) return `${formatScore(score)}/10`;
  return formatScore(score);
}

export function SignalBreakdown({
  opportunity,
  helperText = "Higher scores mean stronger signal. Use these to sanity-check whether the opportunity is worth building now.",
}: SignalBreakdownProps) {
  return (
    <div className="space-y-4">
      <p className="text-body text-text-secondary">{helperText}</p>

      {signals.map(({ key, label, color }) => {
        const rawScore = opportunity[key] ?? 0;
        const barWidth = normalizeScore(rawScore);

        return (
          <div key={key}>
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="font-medium text-text-primary">{label}</span>
              <span className="font-mono font-semibold text-text-secondary">
                {displayScore(rawScore)}
              </span>
            </div>
            <div className="progress-bar">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${color}`}
                style={{ width: `${Math.min(barWidth, 100)}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
