"use client";

import { useCallback, useEffect, useState } from "react";
import {
  DEFAULT_PERSONA_ID,
  getPersonaLens,
  isPersonaId,
  type PersonaId,
  type PersonaLens,
} from "@/lib/persona-lens";

const STORAGE_KEY = "datatello-persona-lens";

export function usePersonaLens() {
  const [personaId, setPersonaIdState] = useState<PersonaId>(DEFAULT_PERSONA_ID);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && isPersonaId(stored)) {
      setPersonaIdState(stored);
    }
    setReady(true);
  }, []);

  const setPersonaId = useCallback((id: PersonaId) => {
    setPersonaIdState(id);
    localStorage.setItem(STORAGE_KEY, id);
  }, []);

  const lens: PersonaLens = getPersonaLens(personaId);

  return { personaId, lens, setPersonaId, ready };
}
