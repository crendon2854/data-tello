"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getOrCreateUserId,
  loadLocalUserPreferences,
  mergeUserPreferences,
  saveLocalUserPreferences,
} from "@/lib/user-preferences-client";
import { getUserPreferences, saveUserPreferences } from "@/lib/queries";
import { normalizeRole } from "@/lib/persona-lens";
import {
  createDefaultUserPreferences,
  type UserPreferences,
} from "@/types/user-preferences";

export function useUserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      const userId = getOrCreateUserId();
      const local = loadLocalUserPreferences();
      let remote: UserPreferences | null = null;

      try {
        remote = await getUserPreferences(userId);
      } catch (error) {
        console.error("Failed to load remote user preferences:", error);
      }

      const merged = mergeUserPreferences(local, remote);
      if (!cancelled) {
        setPreferences(merged);
        saveLocalUserPreferences(merged);
        setReady(true);
      }
    }

    void hydrate();

    return () => {
      cancelled = true;
    };
  }, []);

  const updatePreferences = useCallback(
    async (next: UserPreferences) => {
      const migrated: UserPreferences = {
        ...next,
        user_id: getOrCreateUserId(),
        role: normalizeRole(next.role),
        updated_at: new Date().toISOString(),
      };

      setPreferences(migrated);
      saveLocalUserPreferences(migrated);

      try {
        const saved = await saveUserPreferences(migrated);
        setPreferences(saved);
        saveLocalUserPreferences(saved);
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
