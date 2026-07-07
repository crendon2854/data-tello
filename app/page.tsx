import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { OpportunityCard } from "@/components/cards/OpportunityCard";
import { getOpportunities } from "@/lib/queries";

export default async function HomePage() {
  const opportunities = await getOpportunities();
  const sample = opportunities[0];

  return (
    <>
      <section className="relative border-b border-border">
        <div className="pointer-events-none absolute inset-0 bg-gradient-blue-area opacity-40" aria-hidden />
        <PageContainer className="relative py-20 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-elevated px-3 py-1">
            <span className="status-dot-live" />
            <span className="font-mono text-xs text-text-muted">LIVE</span>
            <span className="text-border-subtle">|</span>
            <span className="text-xs font-medium text-accent-blue">
              Market Intelligence Active
            </span>
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-text-primary">
            Find your next market opportunity
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-sm text-text-secondary">
            DataTello surfaces scored opportunities with build strategy, signal
            breakdown, and execution angles — so you can move from insight to
            action.
          </p>
          <Link href="/dashboard" className="btn-primary px-8 py-3">
            Explore Opportunities
          </Link>
        </PageContainer>
      </section>

      {sample && (
        <PageContainer className="py-12">
          <h2 className="section-title mb-6">Sample Opportunity</h2>
          <div className="max-w-2xl">
            <OpportunityCard opportunity={sample} />
          </div>
        </PageContainer>
      )}

      <footer className="border-t border-border py-8">
        <PageContainer>
          <p className="text-center text-meta">
            &copy; {new Date().getFullYear()} DataTello. All rights reserved.
          </p>
        </PageContainer>
      </footer>
    </>
  );
}
