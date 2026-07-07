import type { Opportunity } from "@/types/opportunity";

interface WhyThisExistsProps {
  opportunity: Pick<
    Opportunity,
    "problem_summary" | "evidence_summary" | "key_pain_drivers"
  >;
}

export function WhyThisExists({ opportunity }: WhyThisExistsProps) {
  return (
    <div className="space-y-4 text-text-primary">
      {opportunity.problem_summary && (
        <div>
          <p className="label-text mb-1.5">Problem</p>
          <p className="text-body text-text-secondary">{opportunity.problem_summary}</p>
        </div>
      )}

      {opportunity.evidence_summary && (
        <div>
          <p className="label-text mb-1.5">Evidence</p>
          <p className="text-body text-text-secondary">{opportunity.evidence_summary}</p>
        </div>
      )}

      {(opportunity.key_pain_drivers ?? []).length > 0 && (
        <div>
          <p className="label-text mb-2">Key Pain Drivers</p>
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
      )}
    </div>
  );
}
