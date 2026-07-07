import Link from "next/link";
import type { Opportunity } from "@/types/opportunity";
import { PageContainer } from "@/components/layout/PageContainer";
import { formatScore } from "@/lib/helpers";
import { HeroMockup } from "./HeroMockup";
import { FaqSection } from "./FaqSection";

interface LandingPageProps {
  sampleOpportunity: Opportunity | null;
  opportunities: Opportunity[];
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="label-text mb-3">{children}</p>;
}

function SectionHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`mb-4 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl ${className ?? ""}`}
    >
      {children}
    </h2>
  );
}

function ScoreBar({
  label,
  score,
  color,
}: {
  label: string;
  score: number;
  color: string;
}) {
  const width = score <= 10 ? score * 10 : score;
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="font-medium text-text-primary">{label}</span>
        <span className="font-mono font-semibold text-text-secondary">
          {score <= 10 ? `${formatScore(score)}/10` : formatScore(score)}
        </span>
      </div>
      <div className="progress-bar">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
          style={{ width: `${Math.min(width, 100)}%` }}
        />
      </div>
    </div>
  );
}

const credibilityItems = [
  "Built from public, market, and workflow signals",
  "Tracks pressure, demand, wedge, and friction",
  "Designed for boring but valuable markets",
];

const engineSteps = [
  {
    step: "01",
    title: "Pressure Discovery",
    description: "Where real-world pain is increasing",
    icon: "◉",
  },
  {
    step: "02",
    title: "Demand Validation",
    description: "Whether buyers are actively searching for solutions",
    icon: "◎",
  },
  {
    step: "03",
    title: "Market Wedge Validation",
    description: "Whether there is an underserved product opening",
    icon: "◈",
  },
  {
    step: "04",
    title: "Workflow Friction Signals",
    description: "Where people still struggle to execute manually or with bad tools",
    icon: "◇",
  },
];

const builtForCards = [
  {
    title: "Builders",
    description:
      "Find SaaS, internal tools, templates, and lightweight products to ship fast.",
    note: "Indie hackers, technical founders, and vibe coders",
    accent: "blue",
  },
  {
    title: "Agencies",
    description:
      "Turn opportunities into repeatable client offers, dashboards, and productized services.",
    accent: "orange",
  },
  {
    title: "Consultants",
    description:
      "Use dossiers and source-backed insights to advise clients and spot emerging markets.",
    accent: "green",
  },
  {
    title: "Product Studios / Investors",
    description:
      "Track markets early, compare opportunities, and monitor underserved niches.",
    accent: "blue",
  },
];

const buildPaths = [
  { title: "SaaS", description: "Full product when the wedge supports recurring value" },
  { title: "Automation Workflow", description: "n8n, Zapier, or custom pipelines" },
  { title: "Template / ZIP Product", description: "Spreadsheets, Notion, or downloadable kits" },
  { title: "Dashboard / Internal Tool", description: "Ops visibility without full product scope" },
  { title: "Service + Tool Hybrid", description: "Productized service backed by lightweight tooling" },
];

const comparisonCards = [
  {
    title: "Generic idea lists",
    description: "Broad, recycled, and not tied to real market signals",
    negative: true,
  },
  {
    title: "Trend tools",
    description: "Show attention, but not whether there's a real wedge",
    negative: true,
  },
  {
    title: "Competitor directories",
    description: "Show who exists, but not where you can enter",
    negative: true,
  },
  {
    title: "DataTello",
    description:
      "Shows the problem, buyer, wedge, best first asset, and realistic entry path",
    negative: false,
  },
];

const platformFeatures = [
  "Opportunity snapshots",
  "Full opportunity dossiers",
  "Asset strategy",
  "Builder fit strategy",
  "Competitive differentiator strategy",
  "PDF dossier export",
  "Watchlists and monitoring",
  "Saved opportunities",
];

const monitoringTriggers = [
  "Demand moves",
  "New signals appear",
  "Competitors shift",
  "Friction increases",
  "The market changes",
];

const pricingTiers = [
  {
    name: "Builder",
    audience: "For solo builders and indie makers",
    highlight: false,
  },
  {
    name: "Consultant",
    audience: "For advisors and specialists",
    highlight: false,
  },
  {
    name: "Agency / Automation",
    audience: "For service businesses and workflow operators",
    highlight: true,
  },
  {
    name: "Product Studio",
    audience: "For teams evaluating multiple bets",
    highlight: false,
  },
];

export function LandingPage({ sampleOpportunity, opportunities }: LandingPageProps) {
  const sample = sampleOpportunity;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 bg-gradient-blue-area opacity-50" aria-hidden />
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-accent-blue/5 blur-3xl"
          aria-hidden
        />
        <PageContainer className="relative py-16 sm:py-24 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="text-center lg:text-left">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-elevated/80 px-3 py-1 backdrop-blur-sm">
                <span className="status-dot-live" />
                <span className="font-mono text-xs text-text-muted">SIGNAL-DRIVEN</span>
              </div>
              <h1 className="mb-5 text-4xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-5xl lg:text-[3.25rem]">
                Discover evidence-backed build opportunities before everyone else does.
              </h1>
              <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-text-secondary lg:mx-0">
                DataTello turns hidden market signals into clear opportunities to build SaaS,
                automations, templates, dashboards, and workflow tools.
              </p>
              <div className="mb-10 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
                <Link href="/dashboard" className="btn-primary px-8 py-3 text-sm">
                  Get Access
                </Link>
                <Link
                  href={sample ? `/opportunity/${sample.id}` : "#examples"}
                  className="btn-secondary px-8 py-3 text-sm"
                >
                  View Sample Opportunity
                </Link>
              </div>
              <ul className="mx-auto max-w-lg space-y-2.5 text-left lg:mx-0">
                {[
                  "Real-world signals, not recycled startup ideas",
                  "Clear buyer, wedge, and best first asset",
                  "Built for builders, agencies, consultants, and product teams",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-text-secondary">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-green/10 text-xs text-accent-green">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <HeroMockup featured={sample} opportunities={opportunities} />
          </div>
        </PageContainer>
      </section>

      {/* Credibility strip */}
      <section className="border-b border-border bg-bg-secondary/50">
        <PageContainer className="py-8">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 md:justify-start">
              {credibilityItems.map((item) => (
                <span key={item} className="flex items-center gap-2 text-sm text-text-secondary">
                  <span className="h-1 w-1 rounded-full bg-accent-blue" />
                  {item}
                </span>
              ))}
            </div>
            <div className="flex gap-8 border-t border-border-subtle pt-6 md:border-t-0 md:pt-0">
              {[
                { label: "Signal lanes", value: "4" },
                { label: "Score dimensions", value: "5" },
                { label: "Asset paths", value: "5+" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-mono text-2xl font-bold text-accent-blue">{stat.value}</p>
                  <p className="text-xs text-text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </PageContainer>
      </section>

      {/* What DataTello gives you */}
      <section className="border-b border-border py-20 sm:py-24">
        <PageContainer>
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>Clarity first</SectionLabel>
            <SectionHeading>
              Not trends. Not guesswork. Actual opportunities worth building for.
            </SectionHeading>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Spot the problem",
                description: "We detect real pressure in the market.",
                icon: "▲",
              },
              {
                title: "Validate the opportunity",
                description: "We check demand, competition, and workflow friction.",
                icon: "◆",
              },
              {
                title: "Know what to build first",
                description: 'We recommend the best first asset, not just "build SaaS."',
                icon: "●",
              },
            ].map((item) => (
              <div key={item.title} className="glass-card group text-center transition-all hover:border-accent-blue/30">
                <div className="ambient-glow-blue opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                <div className="relative">
                  <div className="icon-box-blue mx-auto mb-4 h-12 w-12 text-lg">{item.icon}</div>
                  <h3 className="mb-2 text-base font-semibold text-text-primary">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-text-secondary">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-text-muted">
            Every opportunity comes with a clear buyer, wedge, and recommended path to execution.
          </p>
        </PageContainer>
      </section>

      {/* Example opportunity snapshot */}
      <section id="examples" className="relative border-b border-border bg-bg-secondary/30 py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-0 bg-gradient-orange-area opacity-20" aria-hidden />
        <PageContainer className="relative">
          <div className="mb-12 text-center">
            <SectionLabel>See it in action</SectionLabel>
            <SectionHeading>Example opportunity snapshot</SectionHeading>
            <p className="mx-auto max-w-2xl text-sm text-text-secondary">
              Every dossier includes scores, buyer context, and a recommended first move — not just a
              headline idea.
            </p>
          </div>

          {sample ? (
            <div className="mx-auto max-w-4xl">
              <div className="glass-card overflow-hidden p-0">
                <div className="border-b border-border-subtle bg-bg-elevated/60 px-6 py-5 sm:px-8">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="label-text mb-2">Opportunity</p>
                      <h3 className="text-xl font-bold text-text-primary">{sample.title}</h3>
                      {sample.short_summary && (
                        <p className="mt-2 max-w-2xl text-sm text-text-secondary">
                          {sample.short_summary}
                        </p>
                      )}
                    </div>
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-blue to-blue-600 shadow-glow-blue">
                      <span className="font-mono text-2xl font-bold text-white">
                        {formatScore(sample.overall_score)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid gap-0 lg:grid-cols-2">
                  <div className="space-y-5 border-border-subtle p-6 sm:p-8 lg:border-r">
                    <div>
                      <p className="label-text mb-1">Buyer</p>
                      <p className="text-sm font-medium text-text-primary">
                        {sample.target_buyer ?? "—"}
                      </p>
                    </div>
                    <div className="rounded-lg border border-accent-blue/20 bg-accent-blue/5 p-4">
                      <p className="label-text mb-1">Best First Asset</p>
                      <p className="text-sm font-semibold text-text-primary">
                        {sample.best_first_asset}
                      </p>
                      {sample.initial_wedge && (
                        <p className="mt-2 text-xs text-text-secondary">
                          Wedge: {sample.initial_wedge}
                        </p>
                      )}
                    </div>
                    {sample.strategic_importance && (
                      <div>
                        <p className="label-text mb-1">Why now</p>
                        <p className="text-sm leading-relaxed text-text-secondary">
                          {sample.strategic_importance}
                        </p>
                      </div>
                    )}
                    {sample.differentiation && (
                      <div>
                        <p className="label-text mb-1">Differentiation angle</p>
                        <p className="text-sm leading-relaxed text-text-secondary">
                          {sample.differentiation}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4 p-6 sm:p-8">
                    <p className="label-text">Signal breakdown</p>
                    <ScoreBar
                      label="Pressure"
                      score={sample.pressure_score ?? 0}
                      color="from-accent-blue to-blue-400"
                    />
                    <ScoreBar
                      label="Demand"
                      score={sample.demand_score ?? 0}
                      color="from-accent-orange to-orange-400"
                    />
                    <ScoreBar
                      label="Wedge"
                      score={sample.wedge_score ?? 0}
                      color="from-accent-blue to-blue-400"
                    />
                    <ScoreBar
                      label="Buildability"
                      score={sample.buildability_score ?? 0}
                      color="from-accent-green to-green-400"
                    />
                    <ScoreBar
                      label="Asset Strategy"
                      score={sample.asset_fit_score ?? 0}
                      color="from-accent-blue to-blue-400"
                    />
                    {(sample.tags ?? []).length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {(sample.tags ?? []).map((tag) => (
                          <span key={tag} className="badge-blue">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t border-border-subtle bg-bg-elevated/40 px-6 py-4 sm:px-8">
                  <Link
                    href={`/opportunity/${sample.id}`}
                    className="text-sm font-medium text-accent-blue hover:underline"
                  >
                    View full opportunity dossier →
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-sm text-text-muted">Sample opportunity coming soon.</p>
          )}
        </PageContainer>
      </section>

      {/* How the engine works */}
      <section id="how-it-works" className="border-b border-border py-20 sm:py-24">
        <PageContainer>
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>The engine</SectionLabel>
            <SectionHeading>How DataTello finds opportunities others miss</SectionHeading>
          </div>
          <div className="relative mt-14">
            <div className="absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-border-subtle to-transparent lg:block" aria-hidden />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {engineSteps.map((step, i) => (
                <div
                  key={step.title}
                  className="glass-card relative text-center transition-all hover:border-accent-blue/30"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <span className="mb-3 block font-mono text-xs text-accent-blue">{step.step}</span>
                  <div className="icon-box-blue mx-auto mb-3 h-10 w-10">{step.icon}</div>
                  <h3 className="mb-2 text-sm font-semibold text-text-primary">{step.title}</h3>
                  <p className="text-xs leading-relaxed text-text-secondary">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-10 text-center text-sm text-text-muted">
            The result is a build opportunity with a clear entry angle, not just another idea list.
          </p>
        </PageContainer>
      </section>

      {/* Built for */}
      <section id="built-for" className="border-b border-border bg-bg-secondary/30 py-20 sm:py-24">
        <PageContainer>
          <div className="mb-12 text-center">
            <SectionLabel>Audience</SectionLabel>
            <SectionHeading>Built for different types of builders</SectionHeading>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {builtForCards.map((card) => (
              <div
                key={card.title}
                className="glass-card group flex flex-col transition-all hover:border-accent-blue/30 hover:shadow-glow-blue"
              >
                <h3 className="mb-2 text-base font-semibold text-text-primary">{card.title}</h3>
                <p className="flex-1 text-sm leading-relaxed text-text-secondary">
                  {card.description}
                </p>
                {card.note && (
                  <p className="mt-3 border-t border-border-subtle pt-3 text-xs text-text-muted">
                    {card.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Build paths */}
      <section className="border-b border-border py-20 sm:py-24">
        <PageContainer>
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>Asset strategy</SectionLabel>
            <SectionHeading>Not every opportunity should start as software</SectionHeading>
            <p className="mt-3 text-sm text-text-secondary">
              DataTello recommends the best first asset based on the market, the workflow, and the
              fastest path to value.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {buildPaths.map((path) => (
              <div
                key={path.title}
                className="rounded-xl border border-border-subtle bg-bg-elevated/50 p-5 transition-all hover:border-accent-blue/30 hover:bg-bg-elevated"
              >
                <h3 className="mb-2 text-sm font-semibold text-text-primary">{path.title}</h3>
                <p className="text-xs leading-relaxed text-text-muted">{path.description}</p>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Why it's better */}
      <section className="border-b border-border bg-bg-secondary/30 py-20 sm:py-24">
        <PageContainer>
          <div className="mb-12 text-center">
            <SectionLabel>Competitive edge</SectionLabel>
            <SectionHeading>
              Why builders use DataTello instead of random idea lists
            </SectionHeading>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {comparisonCards.map((card) => (
              <div
                key={card.title}
                className={`rounded-xl border p-6 transition-all ${
                  card.negative
                    ? "border-border-subtle bg-bg-elevated/30 opacity-80"
                    : "border-accent-blue/40 bg-accent-blue/5 shadow-glow-blue"
                }`}
              >
                <h3
                  className={`mb-2 text-sm font-semibold ${
                    card.negative ? "text-text-secondary" : "text-accent-blue"
                  }`}
                >
                  {card.title}
                </h3>
                <p className="text-xs leading-relaxed text-text-secondary">{card.description}</p>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Inside the platform */}
      <section className="border-b border-border py-20 sm:py-24">
        <PageContainer>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionLabel>Platform</SectionLabel>
              <SectionHeading>Inside the platform</SectionHeading>
              <p className="mb-8 text-sm text-text-secondary">
                Everything you need to evaluate, compare, and act on build opportunities — from quick
                snapshots to full dossiers.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {platformFeatures.map((feature) => (
                  <div key={feature} className="flex items-center gap-2.5 text-sm text-text-secondary">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-accent-blue/10 text-[10px] text-accent-blue">
                      ✓
                    </span>
                    {feature}
                  </div>
                ))}
              </div>
              <Link href="/dashboard" className="btn-primary mt-8 inline-flex px-6 py-2.5 text-sm">
                Explore the platform
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["Snapshots", "Dossiers", "Watchlists", "Exports"].map((label, i) => (
                <div
                  key={label}
                  className={`rounded-xl border border-border-subtle bg-bg-elevated/60 p-6 ${
                    i === 1 ? "col-span-2 sm:col-span-1" : ""
                  }`}
                >
                  <div className="mb-3 h-2 w-12 rounded bg-accent-blue/30" />
                  <div className="mb-2 h-1.5 w-full rounded bg-border-subtle" />
                  <div className="mb-2 h-1.5 w-4/5 rounded bg-border-subtle" />
                  <div className="h-1.5 w-3/5 rounded bg-border-subtle" />
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-wider text-text-muted">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Monitoring */}
      <section className="border-b border-border bg-bg-secondary/30 py-20 sm:py-24">
        <PageContainer>
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>Retention</SectionLabel>
            <SectionHeading>Don&apos;t just find opportunities. Track them.</SectionHeading>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary">
              Watch any opportunity and get updates when:
            </p>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {monitoringTriggers.map((trigger) => (
              <span
                key={trigger}
                className="rounded-full border border-border-subtle bg-bg-elevated px-4 py-2 text-sm text-text-secondary"
              >
                {trigger}
              </span>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Sample dossier preview */}
      <section id="sample-dossier" className="border-b border-border py-20 sm:py-24">
        <PageContainer>
          <div className="mb-12 text-center">
            <SectionLabel>Premium deliverable</SectionLabel>
            <SectionHeading>See what a full Opportunity Dossier looks like</SectionHeading>
          </div>
          <div className="mx-auto max-w-4xl">
            <div className="relative overflow-hidden rounded-2xl border border-border-subtle bg-bg-secondary shadow-2xl">
              <div className="border-b border-border-subtle bg-bg-elevated px-8 py-10 text-center">
                <p className="label-text mb-2">Opportunity Dossier</p>
                <h3 className="text-2xl font-bold text-text-primary">
                  {sample?.title ?? "Sample Opportunity"}
                </h3>
                <p className="mt-2 text-sm text-text-muted">DataTello Intelligence Report</p>
              </div>
              <div className="grid gap-0 md:grid-cols-3">
                <div className="border-border-subtle p-6 md:border-r">
                  <p className="label-text mb-2">Score summary</p>
                  <p className="font-mono text-4xl font-bold text-accent-blue">
                    {sample ? formatScore(sample.overall_score) : "—"}
                  </p>
                  <div className="mt-4 space-y-2">
                    {["Pressure", "Demand", "Wedge"].map((label) => (
                      <div key={label} className="h-1.5 rounded-full bg-bg-elevated">
                        <div className="h-full w-3/4 rounded-full bg-accent-blue/60" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-border-subtle p-6 md:border-r">
                  <p className="label-text mb-2">Buyer + wedge</p>
                  <p className="text-sm text-text-secondary">
                    {sample?.target_buyer ?? "Target buyer profile"}
                  </p>
                  <p className="mt-3 text-xs text-text-muted">
                    {sample?.initial_wedge ?? "Initial market wedge"}
                  </p>
                </div>
                <div className="p-6">
                  <p className="label-text mb-2">Best first asset</p>
                  <p className="text-sm font-medium text-text-primary">
                    {sample?.best_first_asset ?? "Recommended starting point"}
                  </p>
                  <p className="label-text mb-2 mt-4">Competitive angle</p>
                  <p className="text-xs text-text-secondary">
                    {sample?.differentiation ?? "Differentiation strategy"}
                  </p>
                </div>
              </div>
              <div className="border-t border-border-subtle bg-bg-elevated/50 px-8 py-6 text-center">
                <Link
                  href={sample ? `/opportunity/${sample.id}` : "/dashboard"}
                  className="btn-primary px-8 py-3 text-sm"
                >
                  View Sample Dossier
                </Link>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-b border-border bg-bg-secondary/30 py-20 sm:py-24">
        <PageContainer>
          <div className="mb-12 text-center">
            <SectionLabel>Pricing</SectionLabel>
            <SectionHeading>Choose the plan that fits how you build</SectionHeading>
            <p className="mt-3 text-sm text-text-secondary">
              Focused on outcomes — not feature checklists.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`flex flex-col rounded-xl border p-6 transition-all ${
                  tier.highlight
                    ? "border-accent-blue/40 bg-accent-blue/5 shadow-glow-blue"
                    : "border-border-subtle bg-bg-elevated/50 hover:border-accent-blue/20"
                }`}
              >
                <h3 className="mb-1 text-base font-semibold text-text-primary">{tier.name}</h3>
                <p className="mb-6 flex-1 text-xs leading-relaxed text-text-muted">
                  {tier.audience}
                </p>
                <Link
                  href="/dashboard"
                  className={tier.highlight ? "btn-primary text-center text-sm" : "btn-secondary text-center text-sm"}
                >
                  Get Access
                </Link>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* FAQ */}
      <section className="border-b border-border py-20 sm:py-24">
        <PageContainer>
          <div className="mb-12 text-center">
            <SectionLabel>FAQ</SectionLabel>
            <SectionHeading>Common questions</SectionHeading>
          </div>
          <FaqSection />
        </PageContainer>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0 bg-gradient-blue-area opacity-40" aria-hidden />
        <PageContainer className="relative text-center">
          <h2 className="mx-auto mb-4 max-w-2xl text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Find your next build opportunity with real signal behind it
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-sm leading-relaxed text-text-secondary">
            Stop guessing what to build. Start with a market that already shows pressure, demand, and
            a real wedge.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/dashboard" className="btn-primary px-10 py-3.5 text-sm">
              Get Access
            </Link>
            <Link
              href={sample ? `/opportunity/${sample.id}` : "#examples"}
              className="btn-secondary px-10 py-3.5 text-sm"
            >
              View Sample Opportunity
            </Link>
          </div>
        </PageContainer>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-bg-secondary/50 py-12">
        <PageContainer>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link href="/" className="mb-4 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-blue to-blue-600 text-sm font-bold text-white">
                  D
                </span>
                <span className="text-sm font-bold text-text-primary">DataTello</span>
              </Link>
              <p className="text-xs leading-relaxed text-text-muted">
                Evidence-backed build opportunities from real market signals.
              </p>
            </div>
            <div>
              <p className="label-text mb-3">Product</p>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><Link href="#how-it-works" className="hover:text-text-primary">How It Works</Link></li>
                <li><Link href="#examples" className="hover:text-text-primary">Examples</Link></li>
                <li><Link href="#sample-dossier" className="hover:text-text-primary">Sample Dossier</Link></li>
                <li><Link href="/dashboard" className="hover:text-text-primary">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <p className="label-text mb-3">Account</p>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><Link href="#pricing" className="hover:text-text-primary">Pricing</Link></li>
                <li><Link href="/dashboard" className="hover:text-text-primary">Login</Link></li>
                <li><Link href="/dashboard" className="hover:text-text-primary">Get Access</Link></li>
              </ul>
            </div>
            <div>
              <p className="label-text mb-3">Legal</p>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><span className="text-text-muted">Terms</span></li>
                <li><span className="text-text-muted">Privacy</span></li>
                <li><span className="text-text-muted">Contact</span></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-border-subtle pt-8 text-center">
            <p className="text-meta">
              &copy; {new Date().getFullYear()} DataTello. All rights reserved.
            </p>
          </div>
        </PageContainer>
      </footer>
    </>
  );
}
