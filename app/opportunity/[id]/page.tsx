import Link from "next/link";
import { notFound } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/Card";
import { OpportunitySnapshot } from "@/components/sections/OpportunitySnapshot";
import { WhyThisExists } from "@/components/sections/WhyThisExists";
import { SignalBreakdown } from "@/components/sections/SignalBreakdown";
import { BuildStrategy } from "@/components/sections/BuildStrategy";
import { ExecutionAngle } from "@/components/sections/ExecutionAngle";
import { CompetitiveAngle } from "@/components/sections/CompetitiveAngle";
import { WhyThisMatters } from "@/components/sections/WhyThisMatters";
import { getOpportunityById } from "@/lib/queries";

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
      <Link
        href="/dashboard"
        className="mb-6 inline-flex items-center gap-1 text-sm text-accent-blue transition-colors hover:text-accent-blue-glow"
      >
        &larr; Back to Dashboard
      </Link>

      <p className="mb-5 text-body text-text-secondary">
        Decision brief — everything you need to decide what to build and how to
        enter.
      </p>

      <div className="flex flex-col gap-5">
        <Card glow="blue">
          <OpportunitySnapshot opportunity={opportunity} />
        </Card>

        <Card title="Is this real?">
          <WhyThisExists opportunity={opportunity} />
        </Card>

        <Card title="Signal Check" glow="orange">
          <SignalBreakdown opportunity={opportunity} />
        </Card>

        <Card title="What to Build">
          <BuildStrategy opportunity={opportunity} />
        </Card>

        <Card title="How to Launch">
          <ExecutionAngle opportunity={opportunity} />
        </Card>

        <Card title="How to Win">
          <CompetitiveAngle opportunity={opportunity} />
        </Card>

        <Card title="Why Now">
          <WhyThisMatters opportunity={opportunity} />
        </Card>
      </div>
    </PageContainer>
  );
}
