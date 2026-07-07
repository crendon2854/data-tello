import type { Opportunity } from "@/types/opportunity";

interface BuildStrategyProps {
  opportunity: Pick<
    Opportunity,
    | "asset_path_1"
    | "asset_path_2"
    | "asset_path_3"
    | "asset_reason"
    | "expansion_ladder"
  >;
  assetPathLabels?: [string, string, string];
}

const pathKeys = ["asset_path_1", "asset_path_2", "asset_path_3"] as const;

export function BuildStrategy({
  opportunity,
  assetPathLabels = ["Start here", "Next step", "Long-term play"],
}: BuildStrategyProps) {
  const activePaths = pathKeys
    .map((key, index) => ({ label: assetPathLabels[index], key }))
    .filter(({ key }) => opportunity[key]);

  return (
    <div className="space-y-5">
      {activePaths.length > 0 && (
        <ol className="space-y-3">
          {activePaths.map(({ label, key }, index) => (
            <li key={key} className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-blue/15 font-mono text-xs font-semibold text-accent-blue">
                {index + 1}
              </span>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
                  {label}
                </p>
                <p className="text-body font-medium text-text-primary">
                  {opportunity[key]}
                </p>
              </div>
            </li>
          ))}
        </ol>
      )}

      {opportunity.asset_reason && (
        <div className="rounded-lg border border-border-subtle bg-bg-elevated/50 px-4 py-3">
          <p className="label-text mb-1">Why this path</p>
          <p className="text-body text-text-secondary">{opportunity.asset_reason}</p>
        </div>
      )}

      {opportunity.expansion_ladder && (
        <div>
          <p className="label-text mb-1">Expansion ladder</p>
          <p className="font-mono text-sm text-text-primary">
            {opportunity.expansion_ladder}
          </p>
        </div>
      )}
    </div>
  );
}
