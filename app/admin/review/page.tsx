import { PageContainer } from "@/components/layout/PageContainer";
import { getDraftOpportunities } from "@/lib/queries";
import { ReviewActions } from "@/components/admin/ReviewActions";

export default async function ReviewPage() {
  const drafts = await getDraftOpportunities();

  return (
    <PageContainer>
      <h1 className="page-title mb-2">Review Queue</h1>
      <p className="mb-8 text-body text-text-secondary">
        Approve, reject, or publish draft opportunities
      </p>

      <div className="flex flex-col gap-4">
        {drafts.length === 0 ? (
          <p className="text-body text-text-muted">No drafts pending review.</p>
        ) : (
          drafts.map((opportunity) => (
            <div
              key={opportunity.id}
              className="glass-card flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h2 className="section-title">{opportunity.title}</h2>
                {opportunity.short_summary && (
                  <p className="mt-1 text-body text-text-secondary">
                    {opportunity.short_summary}
                  </p>
                )}
              </div>
              <ReviewActions opportunity={opportunity} />
            </div>
          ))
        )}
      </div>
    </PageContainer>
  );
}
