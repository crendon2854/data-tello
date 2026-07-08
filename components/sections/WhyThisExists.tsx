import type { Opportunity } from "@/types/opportunity";
import type { SectionContentConfig } from "@/lib/dossier-content";

interface WhyThisExistsProps {
  opportunity: Pick<
    Opportunity,
    "problem_summary" | "evidence_summary" | "key_pain_drivers"
  >;
  content?: SectionContentConfig;
}

const FIELD_RENDERERS: Record<
  string,
  (opportunity: WhyThisExistsProps["opportunity"], label: string) => JSX.Element | null
> = {
  problem_summary: (opportunity, label) =>
    opportunity.problem_summary ? (
      <div key="problem_summary">
        <p className="label-text mb-1.5">{label}</p>
        <p className="text-body text-text-secondary">{opportunity.problem_summary}</p>
      </div>
    ) : null,
  evidence_summary: (opportunity, label) =>
    opportunity.evidence_summary ? (
      <div key="evidence_summary">
        <p className="label-text mb-1.5">{label}</p>
        <p className="text-body text-text-secondary">{opportunity.evidence_summary}</p>
      </div>
    ) : null,
  key_pain_drivers: (opportunity, label) =>
    (opportunity.key_pain_drivers ?? []).length > 0 ? (
      <div key="key_pain_drivers">
        <p className="label-text mb-2">{label}</p>
        <ul className="space-y-1.5">
          {(opportunity.key_pain_drivers ?? []).map((driver) => (
            <li
              key={driver}
              className="flex items-start gap-2 text-body text-text-secondary"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-orange" />
              {driver}
            </li>
          ))}
        </ul>
      </div>
    ) : null,
};

const DEFAULT_ORDER = ["problem_summary", "evidence_summary", "key_pain_drivers"];
const DEFAULT_LABELS: Record<string, string> = {
  problem_summary: "Problem",
  evidence_summary: "Evidence",
  key_pain_drivers: "Key Pain Drivers",
};

export function WhyThisExists({ opportunity, content }: WhyThisExistsProps) {
  const order = content?.fieldOrder ?? DEFAULT_ORDER;
  const labels = { ...DEFAULT_LABELS, ...content?.fieldLabels };

  return (
    <div className="space-y-4 text-text-primary">
      {content?.intro && (
        <p className="text-body text-text-muted">{content.intro}</p>
      )}
      {order.map((key) => {
        const render = FIELD_RENDERERS[key];
        return render ? render(opportunity, labels[key] ?? key) : null;
      })}
    </div>
  );
}
