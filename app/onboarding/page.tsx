"use client";

import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";
import { useUserPreferences } from "@/hooks/useUserPreferences";

export default function OnboardingPage() {
  const { updatePreferences } = useUserPreferences();

  return <OnboardingFlow onComplete={updatePreferences} />;
}
