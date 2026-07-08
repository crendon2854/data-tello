import {
  createDefaultUserPreferences,
  type UserPreferences,
} from "@/types/user-preferences";
import { normalizeRole } from "@/lib/persona-lens";

const USER_ID_KEY = "datatello-user-id";
const PREFERENCES_KEY = "datatello-user-preferences";

export function getOrCreateUserId(): string {
  if (typeof window === "undefined") {
    return "anonymous";
  }

  let id = localStorage.getItem(USER_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(USER_ID_KEY, id);
  }

  return id;
}

function migratePreferences(raw: UserPreferences): UserPreferences {
  return {
    ...raw,
    role: normalizeRole(raw.role),
  };
}

export function loadLocalUserPreferences(): UserPreferences {
  const userId = getOrCreateUserId();

  if (typeof window === "undefined") {
    return createDefaultUserPreferences(userId);
  }

  const stored = localStorage.getItem(PREFERENCES_KEY);
  if (!stored) {
    return createDefaultUserPreferences(userId);
  }

  try {
    const parsed = JSON.parse(stored) as UserPreferences;
    return migratePreferences({ ...parsed, user_id: userId });
  } catch {
    return createDefaultUserPreferences(userId);
  }
}

export function saveLocalUserPreferences(preferences: UserPreferences): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(
    PREFERENCES_KEY,
    JSON.stringify(migratePreferences(preferences))
  );
}
