import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { getAllOpportunities } from "@/lib/queries";
import { formatScore } from "@/lib/helpers";

export const dynamic = "force-dynamic";

export default async function AdminOpportunitiesPage() {
  const opportunities = await getAllOpportunities();

  return (
    <PageContainer>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="page-title">Opportunities</h1>
          <p className="text-body text-text-secondary">Manage all opportunities</p>
        </div>
        <Link href="/admin/opportunities/new" className="btn-primary">
          Create New
        </Link>
      </div>

      <div className="glass-card data-table !p-0">
        <table className="w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Score</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {opportunities.map((opportunity) => (
              <tr key={opportunity.id}>
                <td className="font-medium text-text-primary">{opportunity.title}</td>
                <td className="capitalize">
                  <span className="badge-blue">{opportunity.status}</span>
                </td>
                <td className="font-mono font-semibold text-accent-blue">
                  {formatScore(opportunity.overall_score)}
                </td>
                <td>
                  <Link
                    href={`/admin/opportunities/${opportunity.id}`}
                    className="text-sm text-accent-blue hover:text-accent-blue-glow"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageContainer>
  );
}
