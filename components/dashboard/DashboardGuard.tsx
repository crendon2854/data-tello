"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserPreferences } from "@/hooks/useUserPreferences";

interface DashboardGuardProps {
  children: React.ReactNode;
}

export function DashboardGuard({ children }: DashboardGuardProps) {
  const router = useRouter();
  const { preferences, ready } = useUserPreferences();

  useEffect(() => {
    if (ready && preferences && !preferences.onboarding_completed) {
      router.replace("/onboarding");
    }
  }, [ready, preferences, router]);

  if (!ready) {
    return (
      <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center text-text-muted">
        Loading your preferences…
      </div>
    );
  }

  if (!preferences?.onboarding_completed) {
    return null;
  }

  return <>{children}</>;
}
