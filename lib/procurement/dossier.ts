import type { ProcurementEvidenceFields } from "@/types/procurement";
import { formatProcurementDossierEvidence } from "@/lib/procurement/integration";

/** Render dossier procurement evidence block from stored fields. */
export function formatProcurementEvidenceDisplay(
  procurement: ProcurementEvidenceFields
): string | null {
  const dossier = formatProcurementDossierEvidence(procurement);

  if (dossier.strength === "none") return null;

  const examples =
    dossier.example_requests.length > 0
      ? dossier.example_requests.join("; ")
      : "No buyer request excerpts on file";

  return `${dossier.label} — ${examples}`;
}
