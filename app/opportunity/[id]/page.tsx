import { PageContainer } from "@/components/layout/PageContainer";
import { OpportunityDetailContent } from "@/components/sections/OpportunityDetailContent";
import { getOpportunityById } from "@/lib/queries";
import { notFound } from "next/navigation";

interface OpportunityPageProps {
  params: { id: string };
}

export default async function OpportunityPage({ params }: OpportunityPageProps) {
  const opportunity = await getOpportunityById(params.id);

  if (!opportunity) {
    notFound();
  }

  return (
    <PageContainer className="max-w-4xl">
      <OpportunityDetailContent opportunity={opportunity} />
    </PageContainer>
  );
}
