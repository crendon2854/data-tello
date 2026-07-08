import { getOpportunities } from "@/lib/queries";
import { DashboardClient } from "@/components/dashboard/DashboardClient";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const opportunities = await getOpportunities();

  return <DashboardClient opportunities={opportunities} />;
}
