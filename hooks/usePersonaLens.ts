"use client";

import { useCallback, useMemo } from "react";
import {
  DEFAULT_PERSONA_ID,
  getPersonaLens,
  normalizeRole,
  type PersonaId,
  type PersonaLens,
} from "@/lib/persona-lens";
import { useUserPreferences } from "@/hooks/useUserPreferences";

export function loadPersonaPreference(
  storedValue?: string | null
): PersonaId {
  return normalizeRole(storedValue);
}

export function usePersonaLens() {
  const { preferences, ready, updatePreferences } = useUserPreferences();

  const personaId: PersonaId = useMemo(() => {
    if (!preferences) {
      return DEFAULT_PERSONA_ID;
    }
    return normalizeRole(preferences.role);
  }, [preferences]);

  const setPersonaId = useCallback(
    async (id: PersonaId) => {
      if (!preferences) {
        return;
      }

      const role = normalizeRole(id);
      await updatePreferences({
        ...preferences,
        role,
      });
    },
    [preferences, updatePreferences]
  );

  const lens: PersonaLens = getPersonaLens(personaId);

  return { personaId, lens, setPersonaId, ready };
}
