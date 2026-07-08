"use client";

import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { MainShell } from "@/components/layout/MainShell";
import { cn } from "@/lib/helpers";

export function ThemeShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  useEffect(() => {
    document.body.dataset.theme = isLanding ? "landing" : "app";
    return () => {
      delete document.body.dataset.theme;
    };
  }, [isLanding]);

  return (
    <>
      {!isLanding && (
        <div className="pointer-events-none fixed inset-0 grid-bg" aria-hidden />
      )}
      <div className={cn("relative z-10", isLanding && "landing-shell")}>
        <LandingNavbar />
        <MainShell>{children}</MainShell>
      </div>
    </>
  );
}
