"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Card } from "@/components/ui/Card";
import { PersonaSelector } from "@/components/ui/PersonaSelector";
import { OpportunitySnapshot } from "@/components/sections/OpportunitySnapshot";
import { WhyThisExists } from "@/components/sections/WhyThisExists";
import { SignalBreakdown } from "@/components/sections/SignalBreakdown";
import { BuildStrategy } from "@/components/sections/BuildStrategy";
import { ExecutionAngle } from "@/components/sections/ExecutionAngle";
import { CompetitiveAngle } from "@/components/sections/CompetitiveAngle";
import { WhyThisMatters } from "@/components/sections/WhyThisMatters";
import { GeneralMultiLens } from "@/components/sections/GeneralMultiLens";
import { SaveToWatchlist } from "@/components/watchlists/SaveToWatchlist";
import { usePersonaLens } from "@/hooks/usePersonaLens";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import {
  isSectionEmphasized,
  type SectionId,
} from "@/lib/persona-lens";
import { getSectionContent } from "@/lib/dossier-content";
import { computePersonaScore } from "@/lib/scoring";
import type { Opportunity } from "@/types/opportunity";
import { cn } from "@/lib/helpers";

interface OpportunityDetailContentProps {
  opportunity: Opportunity;
}

export function OpportunityDetailContent({
  opportunity,
}: OpportunityDetailContentProps) {
  const { personaId, lens, setPersonaId, ready } = usePersonaLens();
  const { preferences, ready: prefsReady } = useUserPreferences();

  const scoreResult = useMemo(() => {
    if (!prefsReady) return null;
    return computePersonaScore(
      opportunity,
      personaId,
      preferences?.signal_preferences
    );
  }, [opportunity, personaId, preferences, prefsReady]);

  const renderSection = (sectionId: SectionId) => {
    const emphasized = isSectionEmphasized(lens, sectionId);
    const title = lens.sectionTitles[sectionId];
    const content = getSectionContent(personaId, sectionId);

    switch (sectionId) {
      case "snapshot":
        return (
          <Card key={sectionId} glow={emphasized ? "blue" : "none"}>
            <OpportunitySnapshot
              opportunity={opportunity}
              snapshotAssetLabel={lens.snapshotAssetLabel}
              primaryCta={lens.primaryCta}
              content={content}
              personaScore={scoreResult?.persona_score}
              personaScoreDelta={scoreResult?.persona_score_delta}
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
            <WhyThisExists opportunity={opportunity} content={content} />
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
              content={content}
              personaId={personaId}
              signalPreferences={preferences?.signal_preferences}
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
              content={content}
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
            <ExecutionAngle opportunity={opportunity} content={content} />
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
            <CompetitiveAngle opportunity={opportunity} content={content} />
          </Card>
        );
      case "whyThisMatters":
        return (
          <Card key={sectionId} title={title} glow="none">
            <WhyThisMatters opportunity={opportunity} content={content} />
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

      <div className="mb-5 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border-subtle bg-bg-elevated/50 p-4">
        <PersonaSelector value={personaId} onChange={(id) => void setPersonaId(id)} />
        <SaveToWatchlist opportunity={opportunity} />
      </div>

      {ready && (
        <p className="mb-5 text-body text-text-secondary">{lens.detailIntro}</p>
      )}

      {ready && personaId === "general" && scoreResult?.persona_angles && (
        <Card title="Multi-perspective read" glow="blue" className="mb-5">
          <GeneralMultiLens angles={scoreResult.persona_angles} />
        </Card>
      )}

      <div className="flex flex-col gap-5">
        {ready && lens.sectionOrder.map((sectionId) => renderSection(sectionId))}
      </div>
    </>
  );
}
