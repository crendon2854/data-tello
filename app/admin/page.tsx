import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";

const adminLinks = [
  { href: "/admin/opportunities", label: "Opportunities", desc: "Create and edit opportunities" },
  { href: "/admin/review", label: "Review", desc: "Approve, reject, or publish drafts" },
  { href: "/admin/sources", label: "Sources", desc: "Source Registry for ingestion" },
  { href: "/admin/signals", label: "Raw Signals", desc: "Explore ingested raw signals" },
  { href: "/admin/problem-zones", label: "Problem Zones", desc: "Group pain patterns and link signals" },
];

export default function AdminPage() {
  return (
    <PageContainer>
      <h1 className="page-title mb-2">Admin</h1>
      <p className="mb-8 text-body text-text-secondary">
        Manage opportunities, sources, signals, and problem zones.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {adminLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="glass-card group transition-all hover:border-border-hover hover:shadow-glow-blue"
          >
            <div className="ambient-glow-blue opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
            <h2 className="relative section-title">{link.label}</h2>
            <p className="relative mt-1 text-body text-text-secondary">{link.desc}</p>
          </Link>
        ))}
      </div>
    </PageContainer>
  );
}
