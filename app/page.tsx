import { LandingPage } from "@/components/landing/LandingPage";
import { getOpportunities } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const opportunities = await getOpportunities();
  const sampleOpportunity = opportunities[0] ?? null;

  return (
    <LandingPage
      sampleOpportunity={sampleOpportunity}
      opportunities={opportunities}
    />
  );
}
