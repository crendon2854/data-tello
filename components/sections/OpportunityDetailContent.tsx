"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { PersonaSelector } from "@/components/ui/PersonaSelector";
import { OpportunitySnapshot } from "@/components/sections/OpportunitySnapshot";
import { WhyThisExists } from "@/components/sections/WhyThisExists";
import { SignalBreakdown } from "@/components/sections/SignalBreakdown";
import { BuildStrategy } from "@/components/sections/BuildStrategy";
import { ExecutionAngle } from "@/components/sections/ExecutionAngle";
import { CompetitiveAngle } from "@/components/sections/CompetitiveAngle";
import { WhyThisMatters } from "@/components/sections/WhyThisMatters";
import { usePersonaLens } from "@/hooks/usePersonaLens";
import {
  isSectionEmphasized,
  type SectionId,
} from "@/lib/persona-lens";
import type { Opportunity } from "@/types/opportunity";
import { cn } from "@/lib/helpers";

interface OpportunityDetailContentProps {
  opportunity: Opportunity;
}

export function OpportunityDetailContent({
  opportunity,
}: OpportunityDetailContentProps) {
  const { personaId, lens, setPersonaId, ready } = usePersonaLens();

  const renderSection = (sectionId: SectionId) => {
    const emphasized = isSectionEmphasized(lens, sectionId);
    const title = lens.sectionTitles[sectionId];

    switch (sectionId) {
      case "snapshot":
        return (
          <Card key={sectionId} glow={emphasized ? "blue" : "none"}>
            <OpportunitySnapshot
              opportunity={opportunity}
              snapshotAssetLabel={lens.snapshotAssetLabel}
              primaryCta={lens.primaryCta}
            />
          </Card>
        );
      case "whyThisExists":
        return (
          <Card
            key={sectionId}
            title={title}
            glow="none"
            className={cn(emphasized && "ring-1 ring-accent-blue/20")}
          >
            <WhyThisExists opportunity={opportunity} />
          </Card>
        );
      case "signalBreakdown":
        return (
          <Card
            key={sectionId}
            title={title}
            glow={emphasized ? "orange" : "none"}
            className={cn(emphasized && "ring-1 ring-accent-orange/20")}
          >
            <SignalBreakdown
              opportunity={opportunity}
              helperText={lens.signalHelperText}
            />
          </Card>
        );
      case "buildStrategy":
        return (
          <Card
            key={sectionId}
            title={title}
            glow="none"
            className={cn(emphasized && "ring-1 ring-accent-blue/20")}
          >
            <BuildStrategy
              opportunity={opportunity}
              assetPathLabels={lens.assetPathLabels}
            />
          </Card>
        );
      case "executionAngle":
        return (
          <Card
            key={sectionId}
            title={title}
            glow="none"
            className={cn(emphasized && "ring-1 ring-accent-blue/20")}
          >
            <ExecutionAngle opportunity={opportunity} />
          </Card>
        );
      case "competitiveAngle":
        return (
          <Card
            key={sectionId}
            title={title}
            glow="none"
            className={cn(emphasized && "ring-1 ring-accent-blue/20")}
          >
            <CompetitiveAngle opportunity={opportunity} />
          </Card>
        );
      case "whyThisMatters":
        return (
          <Card key={sectionId} title={title} glow="none">
            <WhyThisMatters opportunity={opportunity} />
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Link
        href="/dashboard"
        className="mb-6 inline-flex items-center gap-1 text-sm text-accent-blue transition-colors hover:text-accent-blue-glow"
      >
        &larr; Back to Dashboard
      </Link>

      <div className="mb-5 rounded-lg border border-border-subtle bg-bg-elevated/50 p-4">
        <PersonaSelector value={personaId} onChange={(id) => void setPersonaId(id)} />
      </div>

      {ready && (
        <p className="mb-5 text-body text-text-secondary">{lens.detailIntro}</p>
      )}

      <div className="flex flex-col gap-5">
        {ready && lens.sectionOrder.map((sectionId) => renderSection(sectionId))}
      </div>
    </>
  );
}
