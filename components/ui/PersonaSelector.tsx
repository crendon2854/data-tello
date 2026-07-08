"use client";

import { PERSONA_LIST, type PersonaId } from "@/lib/persona-lens";
import { cn } from "@/lib/helpers";

interface PersonaSelectorProps {
  value: PersonaId;
  onChange: (id: PersonaId) => void;
  compact?: boolean;
}

export function PersonaSelector({
  value,
  onChange,
  compact = false,
}: PersonaSelectorProps) {
  return (
    <div className={compact ? "space-y-2" : "space-y-3"}>
      {!compact && (
        <div>
          <p className="label-text mb-1">Execution lens</p>
          <p className="text-xs text-text-muted">
            Same opportunity data — different emphasis for how you act on it.
          </p>
        </div>
      )}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as PersonaId)}
        className={cn(
          "w-full rounded-md border border-border-subtle bg-bg-elevated px-3 py-2 text-sm text-text-primary",
          "focus:border-accent-blue/50 focus:outline-none focus:ring-1 focus:ring-accent-blue/30"
        )}
        aria-label="Select execution lens"
      >
        {PERSONA_LIST.map((persona) => (
          <option key={persona.id} value={persona.id}>
            {persona.label} — {persona.roleLabel}
          </option>
        ))}
      </select>
      {!compact && (
        <p className="text-xs text-text-muted">
          {PERSONA_LIST.find((persona) => persona.id === value)?.description}
        </p>
      )}
    </div>
  );
}
