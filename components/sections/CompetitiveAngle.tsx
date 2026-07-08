import type { Opportunity } from "@/types/opportunity";
import type { SectionContentConfig } from "@/lib/dossier-content";

interface CompetitiveAngleProps {
  opportunity: Pick<
    Opportunity,
    | "underserved_segment"
    | "competitor_summary"
    | "avoid"
    | "differentiation"
    | "entry_strategy"
  >;
  content?: SectionContentConfig;
}

const DEFAULT_ORDER = [
  "underserved_segment",
  "competitor_summary",
  "differentiation",
  "avoid",
  "entry_strategy",
];

const DEFAULT_LABELS: Record<string, string> = {
  underserved_segment: "Underserved segment",
  competitor_summary: "Market reality",
  differentiation: "Do this",
  avoid: "Avoid",
  entry_strategy: "Entry strategy",
};

export function CompetitiveAngle({ opportunity, content }: CompetitiveAngleProps) {
  const order = content?.fieldOrder ?? DEFAULT_ORDER;
  const labels = { ...DEFAULT_LABELS, ...content?.fieldLabels };

  const renderField = (key: string) => {
    const value = opportunity[key as keyof typeof opportunity];
    if (!value || typeof value !== "string") return null;

    if (key === "differentiation" || key === "avoid") {
      const isDo = key === "differentiation";
      return (
        <div
          key={key}
          className={
            isDo
              ? "rounded-lg border border-accent-green/30 bg-accent-green/10 px-4 py-3"
              : "rounded-lg border border-accent-crimson/30 bg-accent-crimson/10 px-4 py-3"
          }
        >
          <p
            className={`label-text mb-1 ${isDo ? "text-accent-green" : "text-accent-crimson"}`}
          >
            {labels[key]}
          </p>
          <p className="text-body text-text-primary">{value}</p>
        </div>
      );
    }

    return (
      <div key={key}>
        <p className="label-text mb-1">{labels[key]}</p>
        <p className="text-body text-text-secondary">{value}</p>
      </div>
    );
  };

  const items = order.map(renderField).filter(Boolean);
  const gridStart = order.findIndex(
    (k) => k === "differentiation" || k === "avoid"
  );

  if (gridStart === -1) {
    return (
      <div className="space-y-4">
        {content?.intro && (
          <p className="text-body text-text-muted">{content.intro}</p>
        )}
        {items}
      </div>
    );
  }

  const beforeGrid = order.slice(0, gridStart).map(renderField).filter(Boolean);
  const gridItems = order
    .slice(gridStart)
    .filter((k) => k === "differentiation" || k === "avoid")
    .map(renderField)
    .filter(Boolean);
  const afterGrid = order
    .slice(gridStart)
    .filter((k) => k !== "differentiation" && k !== "avoid")
    .map(renderField)
    .filter(Boolean);

  return (
    <div className="space-y-4">
      {content?.intro && (
        <p className="text-body text-text-muted">{content.intro}</p>
      )}
      {beforeGrid}
      {gridItems.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2">{gridItems}</div>
      )}
      {afterGrid}
    </div>
  );
}
