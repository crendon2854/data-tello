import type { PersonaAngleResult } from "@/types/opportunity";
import { formatScore } from "@/lib/helpers";

interface GeneralMultiLensProps {
  angles: PersonaAngleResult[];
}

export function GeneralMultiLens({ angles }: GeneralMultiLensProps) {
  return (
    <div className="space-y-4">
      <p className="text-body text-text-secondary">
        Same evidence, read through four decision lenses. Each angle highlights
        what matters for that role.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {angles.map(({ role, label, angle, score }) => (
          <div
            key={role}
            className="rounded-lg border border-border-subtle bg-bg-elevated/50 px-4 py-3"
          >
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-accent-blue">
                {label} angle
              </p>
              <span className="font-mono text-xs text-text-muted">
                {formatScore(score)}
              </span>
            </div>
            <p className="text-body text-text-secondary">{angle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
