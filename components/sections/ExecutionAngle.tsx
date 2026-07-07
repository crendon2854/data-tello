import type { Opportunity } from "@/types/opportunity";

interface ExecutionAngleProps {
  opportunity: Pick<
    Opportunity,
    "target_buyer" | "core_workflow" | "initial_wedge" | "time_to_value"
  >;
}

const fields = [
  { label: "Target buyer", key: "target_buyer" },
  { label: "Core workflow", key: "core_workflow" },
  { label: "Initial wedge", key: "initial_wedge" },
  { label: "Time to value", key: "time_to_value" },
] as const;

export function ExecutionAngle({ opportunity }: ExecutionAngleProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {fields.map(({ label, key }) => {
        const value = opportunity[key];
        if (!value) return null;

        return (
          <div key={key} className="rounded-lg border border-border-subtle bg-bg-elevated px-4 py-3">
            <p className="label-text mb-1">{label}</p>
            <p className="text-body font-medium text-text-primary">{value}</p>
          </div>
        );
      })}
    </div>
  );
}
