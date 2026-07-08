"use client";

import type { ReactNode } from "react";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { MainShell } from "@/components/layout/MainShell";

export function ThemeShell({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 grid-bg" aria-hidden />
      <div className="relative z-10">
        <LandingNavbar />
        <MainShell>{children}</MainShell>
      </div>
    </>
  );
}
