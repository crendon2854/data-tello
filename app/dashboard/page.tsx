import { getOpportunities } from "@/lib/queries";
import { DashboardContent } from "@/components/sections/DashboardContent";

export default async function DashboardPage() {
  const opportunities = await getOpportunities();

  return <DashboardContent opportunities={opportunities} />;
}
