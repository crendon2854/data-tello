import Link from "next/link";
import {
  Check,
  ChevronRight,
  BookOpen,
  Sparkles,
  Radar,
} from "lucide-react";
import {
  accentStyles,
  buildPaths,
  builtForCards,
  comparisonCards,
  credibilitySignals,
  credibilityStats,
  engineSteps,
  focusedMarkets,
  footerLinks,
  monitoringUpdates,
  platformFeatures,
  pricingPlans,
  sampleOpportunity,
  signalSources,
  valueProps,
} from "./landing-data";
import { FaqSection } from "./FaqSection";
import { HeroDashboard } from "./HeroDashboard";
import {
  IconBox,
  GlowOrb,
  GridPattern,
  LandingCard,
  LandingContainer,
  PrimaryButton,
  ScoreBar,
  SecondaryButton,
  SectionHeading,
  SectionLabel,
  SectionSubheading,
} from "./landing-ui";

export function LandingPage() {
  return (
    <div className="landing-page">
      {/* Hero */}
      <section className="landing-hero">
        <GridPattern />
        <GlowOrb className="-left-20 top-20 h-80 w-80" color="blue" />
        <GlowOrb className="-right-10 top-32 h-72 w-72" color="cyan" />

        <LandingContainer>
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div className="landing-fade-up text-center lg:text-left">
              <div className="landing-badge">
                <Radar className="h-3.5 w-3.5" />
                Evidence-backed build intelligence
              </div>

              <h1 className="landing-h1 mt-6">
                Discover evidence-backed build opportunities before everyone else does.
              </h1>

              <p className="landing-lead mx-auto mt-5 max-w-xl lg:mx-0">
                DataTello turns real-world market signals into clear opportunities to build SaaS,
                automations, templates, dashboards, and workflow tools.
              </p>

              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
                <PrimaryButton href="/dashboard">Get Access</PrimaryButton>
                <SecondaryButton href="#examples">View Sample Opportunity</SecondaryButton>
              </div>

              <ul className="mx-auto mt-10 max-w-lg space-y-3 text-left lg:mx-0">
                {[
                  "Real-world signals, not recycled idea lists",
                  "Clear buyer, wedge, and best first asset",
                  "Built for builders, agencies, consultants, and product teams",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
                    <span className="landing-check mt-0.5">
                      <Check className="h-3 w-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="landing-fade-up" style={{ animationDelay: "0.15s" }}>
              <HeroDashboard />
            </div>
          </div>
        </LandingContainer>
      </section>

      {/* Credibility strip */}
      <section className="landing-section-white py-14 sm:py-16">
        <LandingContainer>
          <div className="text-center">
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Built for higher-signal markets
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              DataTello focuses on markets where operational, regulatory, demand, and workflow
              signals are easier to detect—and more useful to build from.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {credibilitySignals.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3.5"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
                  <Icon className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-slate-700">{label}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-2 gap-6 border-t border-slate-100 pt-10 sm:grid-cols-4">
            {credibilityStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="landing-stat-value">{stat.value}</p>
                <p className="mt-1 text-xs text-slate-500 sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </LandingContainer>
      </section>

      {/* What DataTello gives you */}
      <section className="landing-section-muted py-20 sm:py-24">
        <LandingContainer>
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>Clarity first</SectionLabel>
            <SectionHeading>
              Not trends. Not guesswork. Real opportunities worth building for.
            </SectionHeading>
            <SectionSubheading className="mx-auto">
              DataTello helps you move from raw market signal to clear build direction—so
              you&apos;re not guessing what to make next.
            </SectionSubheading>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {valueProps.map(({ title, body, icon: Icon, accent }) => {
              const styles = accentStyles[accent];
              return (
                <LandingCard key={title}>
                  <IconBox className={styles.icon}>
                    <Icon className="h-6 w-6" />
                  </IconBox>
                  <h3 className="mb-2 text-lg font-bold text-slate-900">{title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{body}</p>
                </LandingCard>
              );
            })}
          </div>
        </LandingContainer>
      </section>

      {/* Example opportunity */}
      <section id="examples" className="landing-section-dark py-20 sm:py-24">
        <GridPattern className="opacity-[0.06]" />
        <GlowOrb className="right-0 top-0 h-96 w-96 opacity-30" color="blue" />

        <LandingContainer className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel dark>Product output</SectionLabel>
            <SectionHeading dark>See what an opportunity looks like</SectionHeading>
            <SectionSubheading dark className="mx-auto">
              Every opportunity is turned into a clear, actionable brief—not just an idea.
            </SectionSubheading>
          </div>

          <div className="mx-auto mt-14 max-w-4xl">
            <div className="overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-800/50 shadow-2xl backdrop-blur-sm">
              <div className="border-b border-slate-700/60 bg-slate-800/80 px-6 py-6 sm:px-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Opportunity snapshot
                    </p>
                    <h3 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                      {sampleOpportunity.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
                      {sampleOpportunity.summary}
                    </p>
                  </div>
                  <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/40">
                    <span className="font-mono text-2xl font-bold text-white">{sampleOpportunity.score}</span>
                    <span className="text-[9px] font-semibold uppercase tracking-wider text-blue-100">/100</span>
                  </div>
                </div>
              </div>

              <div className="grid gap-0 lg:grid-cols-2">
                <div className="space-y-5 border-slate-700/60 p-6 sm:p-8 lg:border-r">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Buyer</p>
                    <p className="mt-1 text-sm font-medium text-slate-200">{sampleOpportunity.buyer}</p>
                  </div>
                  <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-300">
                      Best first asset
                    </p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {sampleOpportunity.bestFirstAsset}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                      Timing: {sampleOpportunity.timing}
                    </span>
                    {sampleOpportunity.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-600 bg-slate-700/50 px-3 py-1 text-xs text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                    <p className="text-xs font-semibold text-amber-300">Why now</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-300">
                      {sampleOpportunity.whyNow}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 p-6 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Signal breakdown
                  </p>
                  {sampleOpportunity.signals.map((s) => (
                    <ScoreBar
                      key={s.label}
                      label={s.label}
                      score={s.score}
                      colorClass={s.color}
                      dark
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </LandingContainer>
      </section>

      {/* How the engine works */}
      <section id="how-it-works" className="py-20 sm:py-24">
        <LandingContainer>
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>The engine</SectionLabel>
            <SectionHeading>How DataTello finds opportunities others miss</SectionHeading>
            <SectionSubheading className="mx-auto">
              We don&apos;t rely on a single signal. We combine multiple evidence layers before
              surfacing a build opportunity.
            </SectionSubheading>
          </div>

          <div className="relative mt-16">
            <div
              className="absolute left-[12.5%] right-[12.5%] top-12 hidden h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent lg:block"
              aria-hidden
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {engineSteps.map(({ step, title, caption, icon: Icon }) => (
                <div key={title} className="relative text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white shadow-sm">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <span className="font-mono text-xs font-semibold text-blue-600">
                    Step {step}
                  </span>
                  <h3 className="mt-2 text-sm font-semibold text-slate-900">{title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{caption}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-12 text-center text-sm text-slate-500">
            The result is a build opportunity with a clear entry angle—not just another idea list.
          </p>
        </LandingContainer>
      </section>

      {/* Signal sources */}
      <section className="landing-section-white py-20 sm:py-24">
        <LandingContainer>
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>Differentiation</SectionLabel>
            <SectionHeading>Built on real-world signals—not AI guesswork</SectionHeading>
            <SectionSubheading className="mx-auto">
              DataTello doesn&apos;t generate ideas from generic internet noise. It detects
              opportunities from structured signals across markets, demand patterns, competitive
              gaps, and real workflow pain.
            </SectionSubheading>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {signalSources.map(({ title, bullets, icon: Icon }) => (
              <LandingCard key={title} className="flex flex-col">
                <div className="mb-4 inline-flex rounded-xl bg-blue-50 p-3 text-blue-600">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-3 text-sm font-semibold text-slate-900">{title}</h3>
                <ul className="space-y-2">
                  {bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-xs leading-relaxed text-slate-600">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-500" />
                      {b}
                    </li>
                  ))}
                </ul>
              </LandingCard>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50/50 p-6 text-center sm:p-8">
            <p className="text-base font-semibold text-slate-900">
              Most tools show trends. DataTello shows where problems, demand, gaps, and execution
              friction overlap.
            </p>
            <p className="mt-3 text-sm text-slate-600">
              That&apos;s why the output is more actionable than a generic AI search or a noisy
              trend feed.
            </p>
          </div>

          {/* Noise vs signal mini visual */}
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 opacity-70">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Noise</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {[0.4, 0.6, 0.35, 0.7, 0.45, 0.55, 0.5, 0.65, 0.38, 0.72, 0.42, 0.58].map(
                  (opacity, i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-slate-300"
                      style={{ opacity }}
                    />
                  )
                )}
              </div>
              <p className="mt-3 text-[11px] text-slate-500">Broad chatter, weak structure</p>
            </div>
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">Signal</p>
              <div className="mt-3 flex items-center justify-center">
                <div className="relative flex h-16 w-16 items-center justify-center">
                  <span className="absolute h-16 w-16 animate-pulse rounded-full border border-blue-200" />
                  <span className="absolute h-10 w-10 rounded-full border border-blue-300" />
                  <span className="relative h-3 w-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" />
                </div>
              </div>
              <p className="mt-3 text-center text-[11px] text-blue-700">Structured, layered evidence</p>
            </div>
          </div>
        </LandingContainer>
      </section>

      {/* Focused markets */}
      <section className="py-20 sm:py-24">
        <LandingContainer>
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>Market focus</SectionLabel>
            <SectionHeading>Focused on markets where signal is clearer</SectionHeading>
            <SectionSubheading className="mx-auto">
              Some industries generate cleaner operational and workflow signals than noisy
              trend-driven categories. That makes them better environments for finding real build
              opportunities.
            </SectionSubheading>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {focusedMarkets.map(({ name, icon: Icon }) => (
              <div
                key={name}
                className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-5 py-3 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
              >
                <Icon className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-slate-700">{name}</span>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-slate-500">
            These markets tend to produce clearer pressure, demand, and workflow signals than
            fast-moving consumer trend categories.
          </p>
        </LandingContainer>
      </section>

      {/* Built for */}
      <section id="built-for" className="landing-section-muted py-20 sm:py-24">
        <LandingContainer>
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>Audience</SectionLabel>
            <SectionHeading>Built for different types of builders</SectionHeading>
            <SectionSubheading className="mx-auto">
              The same opportunity can lead to different execution paths depending on who you are
              and what you want to build.
            </SectionSubheading>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {builtForCards.map(({ title, body, icon: Icon, accent }) => {
              const styles = accentStyles[accent];
              return (
                <LandingCard key={title} className={`${styles.bg} ${styles.border}`}>
                  <div className={`mb-4 inline-flex rounded-xl p-3 ${styles.icon}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 font-semibold text-slate-900">{title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{body}</p>
                </LandingCard>
              );
            })}
          </div>
        </LandingContainer>
      </section>

      {/* Build paths */}
      <section className="py-20 sm:py-24">
        <LandingContainer>
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>Asset strategy</SectionLabel>
            <SectionHeading>Not every opportunity should start as software</SectionHeading>
            <SectionSubheading className="mx-auto">
              DataTello recommends the best first asset based on the market, workflow, and fastest
              path to value.
            </SectionSubheading>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {buildPaths.map(({ title, description, icon: Icon }) => (
              <LandingCard key={title} className="text-center">
                <div className="mx-auto mb-3 inline-flex rounded-xl bg-slate-100 p-3 text-slate-700">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-1.5 text-sm font-semibold text-slate-900">{title}</h3>
                <p className="text-xs leading-relaxed text-slate-500">{description}</p>
              </LandingCard>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-3xl text-center text-sm leading-relaxed text-slate-600">
            Some opportunities deserve a full product. Others are better as lightweight tools,
            workflow automations, templates, or repeatable service-assisted assets. DataTello helps
            you choose the smartest starting point.
          </p>
        </LandingContainer>
      </section>

      {/* Comparison */}
      <section className="landing-section-dark py-20 sm:py-24">
        <LandingContainer>
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel dark>Why DataTello</SectionLabel>
            <SectionHeading dark>
              Why builders use DataTello instead of random idea lists
            </SectionHeading>
            <SectionSubheading dark className="mx-auto">
              Most idea tools stop at attention. DataTello goes further—showing whether there&apos;s
              a real problem, a real buyer, a realistic wedge, and a better starting point.
            </SectionSubheading>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {comparisonCards.map(({ title, body, highlight }) => (
              <div
                key={title}
                className={`rounded-2xl border p-6 transition-all ${
                  highlight
                    ? "landing-highlight-card"
                    : "border-slate-700/60 bg-slate-800/40 opacity-85"
                }`}
              >
                <h3
                  className={`mb-2 text-sm font-semibold ${
                    highlight ? "text-blue-300" : "text-slate-300"
                  }`}
                >
                  {title}
                </h3>
                <p className="text-xs leading-relaxed text-slate-400">{body}</p>
              </div>
            ))}
          </div>
        </LandingContainer>
      </section>

      {/* Inside the platform */}
      <section className="py-20 sm:py-24">
        <LandingContainer>
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <SectionLabel>Platform</SectionLabel>
              <SectionHeading>Inside the platform</SectionHeading>
              <SectionSubheading>
                From quick snapshots to full dossiers, DataTello helps you evaluate, monitor, and
                act on better opportunities.
              </SectionSubheading>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {platformFeatures.map((feature) => (
                  <div key={feature} className="flex items-center gap-2.5 text-sm text-slate-600">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-blue-100">
                      <Check className="h-3 w-3 text-blue-600" />
                    </span>
                    {feature}
                  </div>
                ))}
              </div>

              <PrimaryButton href="/dashboard" className="mt-8">
                Explore the platform
              </PrimaryButton>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Saved opportunities", bars: 3, accent: "blue" },
                { label: "Watchlist", bars: 4, accent: "cyan" },
                { label: "Dossier preview", bars: 5, accent: "green" },
                { label: "Signal movement", bars: 2, accent: "amber", sparkline: true },
              ].map((panel) => (
                <div
                  key={panel.label}
                  className={`rounded-xl border border-slate-200 bg-white p-4 shadow-sm ${
                    panel.sparkline ? "col-span-2" : ""
                  }`}
                >
                  {panel.sparkline ? (
                    <div className="flex h-12 items-end gap-1">
                      {[40, 55, 45, 70, 60, 85, 75].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-sm bg-gradient-to-t from-blue-500 to-cyan-400 opacity-80"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  ) : (
                    <>
                      {Array.from({ length: panel.bars }).map((_, i) => (
                        <div
                          key={i}
                          className="mb-2 h-1.5 rounded-full bg-slate-100"
                          style={{ width: `${100 - i * 12}%` }}
                        />
                      ))}
                    </>
                  )}
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-slate-400">
                    {panel.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </LandingContainer>
      </section>

      {/* Monitoring */}
      <section className="landing-section-white py-20 sm:py-24">
        <LandingContainer>
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>Retention</SectionLabel>
            <SectionHeading>Don&apos;t just find opportunities. Track them.</SectionHeading>
            <SectionSubheading className="mx-auto">
              Watch opportunities over time and get notified when the market changes.
            </SectionSubheading>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {monitoringUpdates.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                {item}
              </div>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-xl text-center text-sm text-slate-500">
            This helps turn one-time discovery into ongoing opportunity intelligence.
          </p>
        </LandingContainer>
      </section>

      {/* Sample dossier */}
      <section id="sample-dossier" className="py-20 sm:py-24">
        <LandingContainer>
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>Premium deliverable</SectionLabel>
            <SectionHeading>See what a full Opportunity Dossier looks like</SectionHeading>
            <SectionSubheading className="mx-auto">
              Paid users get deeper insight, clearer strategy, and downloadable dossier-style
              outputs built from structured opportunity data.
            </SectionSubheading>
          </div>

          <div className="relative mx-auto mt-14 max-w-4xl">
            <div className="absolute -left-4 top-8 hidden h-[calc(100%-2rem)] w-full rotate-[-2deg] rounded-2xl border border-slate-200 bg-white shadow-lg sm:block" aria-hidden />
            <div className="absolute -right-4 top-4 hidden h-[calc(100%-1rem)] w-full rotate-[1.5deg] rounded-2xl border border-slate-200 bg-white shadow-md sm:block" aria-hidden />

            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
              <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-blue-50/50 px-8 py-10 text-center">
                <BookOpen className="mx-auto mb-3 h-8 w-8 text-blue-600" />
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Opportunity Dossier
                </p>
                <h3 className="mt-2 text-2xl font-bold text-slate-900">{sampleOpportunity.title}</h3>
                <p className="mt-1 text-sm text-slate-500">DataTello Intelligence Report</p>
              </div>

              <div className="grid gap-0 md:grid-cols-3">
                <div className="border-slate-100 p-6 md:border-r">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Executive summary
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {sampleOpportunity.summary.slice(0, 120)}…
                  </p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Score breakdown
                  </p>
                  <p className="mt-1 font-mono text-3xl font-bold text-blue-600">
                    {sampleOpportunity.score}
                    <span className="text-base text-slate-400">/100</span>
                  </p>
                </div>
                <div className="border-slate-100 p-6 md:border-r">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Buyer + wedge
                  </p>
                  <p className="mt-2 text-sm text-slate-700">{sampleOpportunity.buyer}</p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Best first asset
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {sampleOpportunity.bestFirstAsset}
                  </p>
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Competitive angle
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    Enterprise tools are too complex. Entry via simplicity, audit-ready outputs,
                    and fast time-to-value.
                  </p>
                  <div className="mt-4 space-y-2">
                    {sampleOpportunity.signals.slice(0, 3).map((s) => (
                      <ScoreBar key={s.label} label={s.label} score={s.score} colorClass={s.color} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 bg-slate-50 px-8 py-6 text-center">
                <PrimaryButton href="#examples">
                  View Sample Dossier
                  <ChevronRight className="ml-1 h-4 w-4" />
                </PrimaryButton>
              </div>
            </div>
          </div>
        </LandingContainer>
      </section>

      {/* Pricing */}
      <section id="pricing" className="landing-section-muted py-20 sm:py-24">
        <LandingContainer>
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>Pricing</SectionLabel>
            <SectionHeading>Choose the right plan for how you build</SectionHeading>
            <SectionSubheading className="mx-auto">
              From solo builders to teams, DataTello gives you the opportunity intelligence depth
              that fits your workflow.
            </SectionSubheading>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border p-6 ${
                  plan.popular ? "landing-pricing-popular landing-card" : "landing-card"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-semibold text-slate-900">{plan.name}</h3>
                <p className="mt-1 text-xs text-slate-500">{plan.description}</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-mono text-4xl font-bold text-slate-900">${plan.price}</span>
                  <span className="text-sm text-slate-500">/mo</span>
                </div>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-slate-600">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <PrimaryButton
                  href="/dashboard"
                  className={`mt-6 w-full ${plan.popular ? "" : "!bg-slate-900 !from-slate-800 !to-slate-900 !shadow-slate-900/20"}`}
                >
                  Get Access
                </PrimaryButton>
              </div>
            ))}
          </div>
        </LandingContainer>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 sm:py-24">
        <LandingContainer>
          <div className="mb-12 text-center">
            <SectionLabel>FAQ</SectionLabel>
            <SectionHeading>Frequently asked questions</SectionHeading>
          </div>
          <FaqSection />
        </LandingContainer>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden border-t border-slate-200/60 py-20 sm:py-28">
        <GridPattern />
        <GlowOrb className="left-1/2 top-0 h-80 w-80 -translate-x-1/2" color="blue" />
        <LandingContainer className="relative text-center">
          <Sparkles className="mx-auto mb-4 h-8 w-8 text-blue-600" />
          <SectionHeading className="mx-auto max-w-2xl">
            Find your next build opportunity with real signal behind it
          </SectionHeading>
          <SectionSubheading className="mx-auto">
            Stop guessing what to build. Start with a market showing pressure, demand, a real wedge,
            and a smarter path to execution.
          </SectionSubheading>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <PrimaryButton href="/dashboard" className="px-10 py-3.5">
              Get Access
            </PrimaryButton>
            <SecondaryButton href="#examples" className="px-10 py-3.5">
              View Sample Opportunity
            </SecondaryButton>
          </div>
        </LandingContainer>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-900 py-14 text-slate-400">
        <LandingContainer>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link href="/" className="mb-4 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-sm font-bold text-white">
                  D
                </span>
                <span className="text-base font-bold text-white">DataTello</span>
              </Link>
              <p className="text-sm leading-relaxed">
                Evidence-backed build opportunities for builders, agencies, and product teams.
              </p>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Product
              </p>
              <ul className="space-y-2 text-sm">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="transition-colors hover:text-white">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Account
              </p>
              <ul className="space-y-2 text-sm">
                {footerLinks.account.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Legal
              </p>
              <ul className="space-y-2 text-sm">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="transition-colors hover:text-white">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-slate-800 pt-8 text-center text-xs text-slate-500">
            &copy; {new Date().getFullYear()} DataTello. All rights reserved.
          </div>
        </LandingContainer>
      </footer>
    </div>
  );
}
