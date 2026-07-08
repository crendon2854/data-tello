"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { cn } from "@/lib/helpers";
import { getOrCreateUserId } from "@/lib/user-preferences-client";
import {
  BUYER_TYPE_OPTIONS,
  DEFAULT_SIGNAL_PREFERENCES,
  INDUSTRY_OPTIONS,
  ROLE_OPTIONS,
  SIGNAL_PREFERENCE_OPTIONS,
  type Role,
  type UserPreferences,
} from "@/types/user-preferences";

type OnboardingStep = 1 | 2 | 3 | 4 | 5;

type OnboardingDraft = {
  role: Role;
  industries: string[];
  buyer_types: string[];
  signal_preferences: UserPreferences["signal_preferences"];
};

function toggleValue(values: string[], value: string): string[] {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

interface OnboardingFlowProps {
  onComplete: (preferences: UserPreferences) => Promise<void>;
  initialPreferences?: UserPreferences | null;
  mode?: "onboarding" | "preferences";
  redirectTo?: string;
}

function draftFromPreferences(
  preferences?: UserPreferences | null
): OnboardingDraft {
  if (!preferences) {
    return {
      role: "general",
      industries: [],
      buyer_types: [],
      signal_preferences: { ...DEFAULT_SIGNAL_PREFERENCES },
    };
  }

  return {
    role: preferences.role,
    industries: preferences.industries,
    buyer_types: preferences.buyer_types,
    signal_preferences: { ...preferences.signal_preferences },
  };
}

export function OnboardingFlow({
  onComplete,
  initialPreferences = null,
  mode = "onboarding",
  redirectTo = "/dashboard",
}: OnboardingFlowProps) {
  const router = useRouter();
  const [step, setStep] = useState<OnboardingStep>(1);
  const [saving, setSaving] = useState(false);
  const [draft, setDraft] = useState<OnboardingDraft>(() =>
    draftFromPreferences(initialPreferences)
  );

  const canContinue = useMemo(() => {
    switch (step) {
      case 1:
        return Boolean(draft.role);
      case 2:
        return draft.industries.length > 0;
      case 3:
        return draft.buyer_types.length > 0;
      default:
        return true;
    }
  }, [draft, step]);

  const handleFinish = async () => {
    setSaving(true);
    const now = new Date().toISOString();
    const userId = getOrCreateUserId();

    await onComplete({
      user_id: userId,
      role: draft.role,
      industries: draft.industries,
      buyer_types: draft.buyer_types,
      signal_preferences: draft.signal_preferences,
      onboarding_completed: true,
      created_at: initialPreferences?.created_at ?? now,
      updated_at: now,
    });

    router.push(redirectTo);
    setSaving(false);
  };

  const title = mode === "preferences" ? "Update your preferences" : "Set up your focus";
  const finishLabel =
    mode === "preferences" ? "Save preferences" : "Show me opportunities";

  return (
    <PageContainer className="mx-auto max-w-2xl py-12">
      <div className="mb-8">
        <p className="command-meta mb-2">Personalization</p>
        <h1 className="page-title">{title}</h1>
        <p className="mt-2 text-body text-text-muted">
          Step {step} of 5 — same opportunity engine, tuned to how you work.
        </p>
      </div>

      <div className="glass-card space-y-6 !p-6">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-text-primary">
              What are you here to do?
            </h2>
            <div className="space-y-2">
              {ROLE_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() =>
                    setDraft((prev) => ({ ...prev, role: option.id }))
                  }
                  className={cn(
                    "w-full rounded-md border px-4 py-3 text-left transition-colors",
                    draft.role === option.id
                      ? "border-accent-blue bg-accent-blue/10"
                      : "border-border-subtle hover:border-accent-blue/40"
                  )}
                >
                  <p className="font-medium text-text-primary">{option.label}</p>
                  <p className="text-sm text-text-muted">{option.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-text-primary">
              Which industries matter to you?
            </h2>
            <p className="text-sm text-text-muted">Select at least one.</p>
            <div className="flex flex-wrap gap-2">
              {INDUSTRY_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() =>
                    setDraft((prev) => ({
                      ...prev,
                      industries: toggleValue(prev.industries, option.id),
                    }))
                  }
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-sm transition-colors",
                    draft.industries.includes(option.id)
                      ? "border-accent-blue bg-accent-blue/10 text-text-primary"
                      : "border-border-subtle text-text-muted hover:border-accent-blue/40"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-text-primary">
              Who do you focus on?
            </h2>
            <div className="flex flex-wrap gap-2">
              {BUYER_TYPE_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() =>
                    setDraft((prev) => ({
                      ...prev,
                      buyer_types: toggleValue(prev.buyer_types, option.id),
                    }))
                  }
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-sm transition-colors",
                    draft.buyer_types.includes(option.id)
                      ? "border-accent-blue bg-accent-blue/10 text-text-primary"
                      : "border-border-subtle text-text-muted hover:border-accent-blue/40"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-text-primary">
              Signal preferences
            </h2>
            <p className="text-sm text-text-muted">
              Optional — all signals are on by default. Turn off any you want to
              de-emphasize.
            </p>
            <div className="space-y-3">
              {SIGNAL_PREFERENCE_OPTIONS.map((option) => (
                <label
                  key={option.id}
                  className="flex cursor-pointer items-center justify-between rounded-md border border-border-subtle px-4 py-3"
                >
                  <span className="text-sm text-text-primary">{option.label}</span>
                  <input
                    type="checkbox"
                    checked={draft.signal_preferences[option.id]}
                    onChange={(event) =>
                      setDraft((prev) => ({
                        ...prev,
                        signal_preferences: {
                          ...prev.signal_preferences,
                          [option.id]: event.target.checked,
                        },
                      }))
                    }
                    className="h-4 w-4 accent-accent-blue"
                  />
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-text-primary">
              Confirm your setup
            </h2>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-text-muted">Role</dt>
                <dd className="font-medium text-text-primary">
                  {ROLE_OPTIONS.find((option) => option.id === draft.role)?.label}
                </dd>
              </div>
              <div>
                <dt className="text-text-muted">Industries</dt>
                <dd className="font-medium text-text-primary">
                  {draft.industries
                    .map(
                      (id) =>
                        INDUSTRY_OPTIONS.find((option) => option.id === id)?.label
                    )
                    .join(", ")}
                </dd>
              </div>
              <div>
                <dt className="text-text-muted">Buyer focus</dt>
                <dd className="font-medium text-text-primary">
                  {draft.buyer_types
                    .map(
                      (id) =>
                        BUYER_TYPE_OPTIONS.find((option) => option.id === id)
                          ?.label
                    )
                    .join(", ")}
                </dd>
              </div>
              <div>
                <dt className="text-text-muted">Signals</dt>
                <dd className="font-medium text-text-primary">
                  {SIGNAL_PREFERENCE_OPTIONS.filter(
                    (option) => draft.signal_preferences[option.id]
                  )
                    .map((option) => option.label)
                    .join(", ")}
                </dd>
              </div>
            </dl>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-border-subtle pt-4">
          <button
            type="button"
            onClick={() => setStep((prev) => (prev > 1 ? ((prev - 1) as OnboardingStep) : prev))}
            disabled={step === 1}
            className="btn-secondary disabled:opacity-40"
          >
            Back
          </button>

          {step < 5 ? (
            <button
              type="button"
              onClick={() =>
                setStep((prev) => (prev < 5 ? ((prev + 1) as OnboardingStep) : prev))
              }
              disabled={!canContinue}
              className="btn-primary disabled:opacity-40"
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              disabled={saving}
              className="btn-primary disabled:opacity-40"
            >
              {saving ? "Saving…" : finishLabel}
            </button>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
