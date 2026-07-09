import { getOpportunities } from "@/lib/queries";
import { WatchlistsClient } from "@/components/watchlists/WatchlistsClient";

export const dynamic = "force-dynamic";

export default async function WatchlistsPage() {
  const opportunities = await getOpportunities();

  return <WatchlistsClient opportunities={opportunities} />;
}
