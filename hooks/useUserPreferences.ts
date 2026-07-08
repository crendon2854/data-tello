"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getOrCreateUserId,
  loadLocalUserPreferences,
  saveLocalUserPreferences,
} from "@/lib/user-preferences-client";
import { saveUserPreferences } from "@/lib/queries";
import { normalizeRole } from "@/lib/persona-lens";
import {
  createDefaultUserPreferences,
  type UserPreferences,
} from "@/types/user-preferences";

export function useUserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const local = loadLocalUserPreferences();
    setPreferences(local);
    setReady(true);
  }, []);

  const updatePreferences = useCallback(
    async (next: UserPreferences) => {
      const migrated: UserPreferences = {
        ...next,
        role: normalizeRole(next.role),
        updated_at: new Date().toISOString(),
      };

      setPreferences(migrated);
      saveLocalUserPreferences(migrated);

      try {
        await saveUserPreferences(migrated);
      } catch (error) {
        console.error("Failed to sync user preferences:", error);
      }
    },
    []
  );

  const resetPreferences = useCallback(async () => {
    const userId = getOrCreateUserId();
    const defaults = createDefaultUserPreferences(userId);
    await updatePreferences(defaults);
  }, [updatePreferences]);

  return {
    preferences,
    ready,
    updatePreferences,
    resetPreferences,
  };
}
