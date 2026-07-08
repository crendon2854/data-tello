"use client";

import { DashboardGuard } from "@/components/dashboard/DashboardGuard";
import { DashboardContent } from "@/components/sections/DashboardContent";
import type { Opportunity } from "@/types/opportunity";

interface DashboardClientProps {
  opportunities: Opportunity[];
}

export function DashboardClient({ opportunities }: DashboardClientProps) {
  return (
    <DashboardGuard>
      <DashboardContent opportunities={opportunities} />
    </DashboardGuard>
  );
}
