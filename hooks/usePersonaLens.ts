"use client";

import { useCallback, useEffect, useState } from "react";
import {
  DEFAULT_PERSONA_ID,
  getPersonaLens,
  normalizeRole,
  type PersonaId,
  type PersonaLens,
} from "@/lib/persona-lens";
import { loadLocalUserPreferences } from "@/lib/user-preferences-client";

const STORAGE_KEY = "datatello-persona-lens";

function readStoredPersonaId(): PersonaId {
  if (typeof window === "undefined") {
    return DEFAULT_PERSONA_ID;
  }

  const preferences = loadLocalUserPreferences();
  if (preferences.onboarding_completed) {
    return normalizeRole(preferences.role);
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  return normalizeRole(stored);
}

function persistPersonaId(id: PersonaId) {
  localStorage.setItem(STORAGE_KEY, id);
}

export function loadPersonaPreference(
  storedValue?: string | null
): PersonaId {
  return normalizeRole(storedValue);
}

export function usePersonaLens() {
  const [personaId, setPersonaIdState] = useState<PersonaId>(DEFAULT_PERSONA_ID);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const normalized = readStoredPersonaId();
    setPersonaIdState(normalized);

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && stored !== normalized) {
      persistPersonaId(normalized);
    }

    setReady(true);
  }, []);

  const setPersonaId = useCallback((id: PersonaId) => {
    const normalized = normalizeRole(id);
    setPersonaIdState(normalized);
    persistPersonaId(normalized);
  }, []);

  const lens: PersonaLens = getPersonaLens(personaId);

  return { personaId, lens, setPersonaId, ready };
}
