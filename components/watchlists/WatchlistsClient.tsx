"use client";

import { DashboardGuard } from "@/components/dashboard/DashboardGuard";
import { WatchlistsContent } from "@/components/sections/WatchlistsContent";
import type { Opportunity } from "@/types/opportunity";

interface WatchlistsClientProps {
  opportunities: Opportunity[];
}

export function WatchlistsClient({ opportunities }: WatchlistsClientProps) {
  return (
    <DashboardGuard>
      <WatchlistsContent opportunities={opportunities} />
    </DashboardGuard>
  );
}
