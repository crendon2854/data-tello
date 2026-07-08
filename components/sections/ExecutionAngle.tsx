import type { Opportunity } from "@/types/opportunity";
import type { SectionContentConfig } from "@/lib/dossier-content";

interface ExecutionAngleProps {
  opportunity: Pick<
    Opportunity,
    "target_buyer" | "core_workflow" | "initial_wedge" | "time_to_value"
  >;
  content?: SectionContentConfig;
}

const DEFAULT_FIELDS = [
  { key: "target_buyer", label: "Target buyer" },
  { key: "core_workflow", label: "Core workflow" },
  { key: "initial_wedge", label: "Initial wedge" },
  { key: "time_to_value", label: "Time to value" },
] as const;

export function ExecutionAngle({ opportunity, content }: ExecutionAngleProps) {
  const order = content?.fieldOrder ?? DEFAULT_FIELDS.map((f) => f.key);
  const labels = Object.fromEntries(
    DEFAULT_FIELDS.map((f) => [f.key, content?.fieldLabels?.[f.key] ?? f.label])
  );

  return (
    <div className="space-y-4">
      {content?.intro && (
        <p className="text-body text-text-muted">{content.intro}</p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        {order.map((key) => {
          const value = opportunity[key as keyof typeof opportunity];
          if (!value) return null;

          return (
            <div
              key={key}
              className="rounded-lg border border-border-subtle bg-bg-elevated px-4 py-3"
            >
              <p className="label-text mb-1">{labels[key]}</p>
              <p className="text-body font-medium text-text-primary">{value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
