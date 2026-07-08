"use client";

import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";
import { useUserPreferences } from "@/hooks/useUserPreferences";

export default function PreferencesPage() {
  const { preferences, ready, updatePreferences } = useUserPreferences();

  if (!ready) {
    return (
      <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center text-text-muted">
        Loading preferences…
      </div>
    );
  }

  return (
    <OnboardingFlow
      mode="preferences"
      initialPreferences={preferences}
      onComplete={updatePreferences}
      redirectTo="/dashboard"
    />
  );
}
