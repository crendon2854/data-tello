import SimpleOpportunityForm from "@/components/admin/SimpleOpportunityForm";

interface EditOpportunityPageProps {
  params: { id: string };
}

export default function EditOpportunityPage({ params }: EditOpportunityPageProps) {
  return <SimpleOpportunityForm params={params} />;
}