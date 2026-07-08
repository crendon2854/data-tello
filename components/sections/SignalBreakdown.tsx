import type { Opportunity } from "@/types/opportunity";
import type { Role, SignalPreferences } from "@/types/user-preferences";
import { formatScore } from "@/lib/helpers";
import {
  SIGNAL_DISPLAY_ORDER,
  SIGNAL_LABELS,
  type SectionContentConfig,
} from "@/lib/dossier-content";
import { cn } from "@/lib/helpers";

interface SignalBreakdownProps {
  opportunity: Pick<
    Opportunity,
    | "pressure_score"
    | "demand_score"
    | "wedge_score"
    | "buildability_score"
    | "asset_fit_score"
    | "friction_score"
    | "complaint_signal_strength"
  >;
  helperText?: string;
  content?: SectionContentConfig;
  personaId?: Role;
  signalPreferences?: SignalPreferences;
}

const SIGNAL_COLORS: Record<string, string> = {
  pressure_score: "from-accent-blue to-accent-blue-glow",
  demand_score: "from-accent-orange to-orange-400",
  wedge_score: "from-accent-blue to-accent-blue-glow",
  buildability_score: "from-accent-green to-green-400",
  asset_fit_score: "from-accent-blue to-accent-blue-glow",
  friction_score: "from-accent-orange to-orange-400",
  complaint_signal_strength: "from-accent-crimson to-red-400",
};

const SIGNAL_PREF_MAP: Record<string, keyof SignalPreferences> = {
  pressure_score: "pressure",
  demand_score: "demand",
  wedge_score: "wedge",
  friction_score: "friction",
  complaint_signal_strength: "complaints",
  asset_fit_score: "digital_infrastructure",
  buildability_score: "digital_infrastructure",
};

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
  content,
  personaId = "general",
  signalPreferences,
}: SignalBreakdownProps) {
  const signalOrder = SIGNAL_DISPLAY_ORDER[personaId];
  const intro = content?.intro ?? helperText;

  return (
    <div className="space-y-4">
      <p className="text-body text-text-secondary">{intro}</p>

      {signalOrder.map((key) => {
        const rawScore = opportunity[key] ?? 0;
        if (rawScore === 0 && (key === "friction_score" || key === "complaint_signal_strength")) {
          return null;
        }

        const barWidth = normalizeScore(rawScore);
        const label = SIGNAL_LABELS[key] ?? key;
        const color = SIGNAL_COLORS[key] ?? "from-accent-blue to-accent-blue-glow";
        const prefKey = SIGNAL_PREF_MAP[key];
        const isEnabled = !signalPreferences || !prefKey || signalPreferences[prefKey];

        return (
          <div
            key={key}
            className={cn(!isEnabled && "opacity-40")}
          >
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="font-medium text-text-primary">
                {label}
                {!isEnabled && (
                  <span className="ml-2 text-text-muted">(deprioritized)</span>
                )}
              </span>
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
