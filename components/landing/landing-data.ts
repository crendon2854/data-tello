import {
  Activity,
  BarChart3,
  Bell,
  BookOpen,
  Bot,
  Briefcase,
  Building2,
  ChevronRight,
  ClipboardList,
  Factory,
  FileText,
  Gauge,
  HardHat,
  Layers,
  LayoutDashboard,
  LineChart,
  Radar,
  Search,
  Shield,
  Target,
  TrendingUp,
  Users,
  Workflow,
  Zap,
} from "lucide-react";

export const heroBullets = [
  "A decision engine — not a research dashboard",
  "Tells you what to build or act on first, backed by layered evidence",
  "Role-aware output for agencies, consultants, investors, and venture studios",
];

export const credibilitySignals = [
  { label: "Pressure signals", icon: Activity },
  { label: "Demand signals", icon: TrendingUp },
  { label: "Market wedge signals", icon: Target },
  { label: "Workflow friction signals", icon: Workflow },
];

export const credibilityStats = [
  { value: "12,400+", label: "Signals reviewed" },
  { value: "480+", label: "Candidates analyzed" },
  { value: "5", label: "MVP validation layers" },
  { value: "Weekly", label: "Signal briefs + recommendations" },
];

export const valueProps = [
  {
    title: "Surface operational pain",
    body: "Detect real-world pressure and repeated failures across regulated and operational industries — before demand spikes.",
    icon: Radar,
    accent: "blue" as const,
  },
  {
    title: "Get your recommendation",
    body: "The Decision Layer ranks opportunities for your role and preferences — surfacing one clear 'start here' move with confidence and time-to-value estimates.",
    icon: Gauge,
    accent: "cyan" as const,
  },
  {
    title: "Know what to offer first",
    body: "Agencies and consultants see full execution detail. Investors and studios see Asset Thesis — entry point, expansion ladder, and risk — without the noise.",
    icon: Layers,
    accent: "green" as const,
  },
];

export const sampleOpportunity = {
  title: "OSHA Documentation Workflow for Small Contractors",
  score: 84,
  buyer: "Small contractor owners & safety admins",
  bestFirstAsset: "Template + dashboard",
  timing: "Strong now",
  tags: ["Compliance", "Construction", "Workflow", "SMB"],
  summary:
    "Small contractors face recurring safety documentation pressure, but most existing tools are too complex for their needs. DataTello highlights a simpler entry wedge: audit-ready documentation templates, lightweight tracking, and workflow automation.",
  signals: [
    { label: "Pressure", score: 82, gradient: "from-accent-blue to-accent-blue-glow" },
    { label: "Demand", score: 71, gradient: "from-accent-orange to-orange-400" },
    { label: "Wedge", score: 78, gradient: "from-accent-blue to-accent-blue-glow" },
    { label: "Buildability", score: 88, gradient: "from-accent-green to-green-400" },
    { label: "Asset Fit", score: 85, gradient: "from-accent-blue to-cyan-400" },
  ],
  whyNow:
    "Rising compliance burden, repeated workflow friction, and a gap between enterprise tools and small-operator needs.",
};

export const heroOpportunities = [
  {
    title: "OSHA Doc Workflow",
    score: 84,
    asset: "Template + dashboard",
    tags: ["Compliance", "SMB"],
    featured: true,
  },
  {
    title: "EPA Stormwater Reporting",
    score: 76,
    asset: "Intake form + scorecard",
    tags: ["Environmental"],
    featured: false,
  },
  {
    title: "Field Service Dispatch",
    score: 72,
    asset: "Automation workflow",
    tags: ["Operations"],
    featured: false,
  },
];

export const engineSteps = [
  {
    step: 1,
    title: "Pressure Discovery",
    caption: "OSHA, EPA ECHO, Federal Register — where compliance pressure is forming",
    icon: Activity,
  },
  {
    step: 2,
    title: "Demand Validation",
    caption: "DataForSEO — whether buyers are actively seeking solutions",
    icon: Search,
  },
  {
    step: 3,
    title: "Market Wedge Validation",
    caption: "Competitor gaps, pricing pages, G2 and Capterra when relevant",
    icon: Target,
  },
  {
    step: 4,
    title: "Workflow Friction",
    caption: "Job postings, procurement language, and RFP patterns",
    icon: Workflow,
  },
  {
    step: 5,
    title: "Procurement Validation",
    caption: "SAM.gov and USAspending — buyer intent and budget proof",
    icon: Shield,
  },
];

export const expansionSignalLayers = [
  {
    step: 6,
    title: "Complaint & Incident Signals",
    caption: "Phase 2 — real-world failure clusters across regulated industries",
    icon: Shield,
  },
  {
    step: 7,
    title: "Additional Verticals & Sources",
    caption: "Healthcare, developer friction, expanded procurement — after MVP quality bar",
    icon: LineChart,
  },
];

export const signalSources = [
  {
    title: "Pressure Discovery",
    bullets: [
      "OSHA enforcement and safety pressure",
      "EPA ECHO environmental compliance",
      "Federal Register rulemaking",
    ],
    icon: Shield,
  },
  {
    title: "Demand Validation",
    bullets: [
      "DataForSEO search demand",
      "Commercial intent and CPC",
      "Keyword ecosystems",
      "Demand movement over time",
    ],
    icon: LineChart,
  },
  {
    title: "Market Wedge Validation",
    bullets: [
      "Manual competitor research",
      "Pricing page gaps",
      "G2 and Capterra reviews",
      "Underserved buyer segments",
    ],
    icon: BarChart3,
  },
  {
    title: "Workflow Friction",
    bullets: [
      "Targeted job postings",
      "Procurement language patterns",
      "RFP workflow gaps",
      "Repeated manual workarounds",
    ],
    icon: ClipboardList,
  },
  {
    title: "Procurement Validation",
    bullets: [
      "SAM.gov active solicitations",
      "USAspending budget signals",
      "Buyer intent and recurrence",
      "Public-sector workflow proof",
    ],
    icon: Building2,
  },
];

export const focusedMarkets = [
  { name: "Environmental & compliance", icon: Shield },
  { name: "Construction & contractors", icon: HardHat },
  { name: "Public sector & infrastructure", icon: Building2 },
  { name: "Industrial & field services", icon: Factory },
];

export const builtForCards = [
  {
    title: "Agencies",
    body: "Get a ranked recommendation with full execution detail — build strategy, tool stack, and how to package the offer for contractor and environmental clients.",
    icon: Briefcase,
    accent: "blue" as const,
  },
  {
    title: "Consultants",
    body: "See what to recommend first with source-backed dossiers and client-ready framing. The Decision Layer matches opportunities to your industries and buyer focus.",
    icon: Users,
    accent: "cyan" as const,
  },
  {
    title: "Investors & Studios",
    body: "Evaluate Asset Thesis — entry point, expansion ladder, monetization logic, and risk — without tool-stack noise. Compare and monitor validated opportunities.",
    icon: Layers,
    accent: "green" as const,
  },
];

export const buildPaths = [
  { title: "Software product", description: "When recurring value and market wedge are clear", icon: Layers },
  { title: "Automation workflow", description: "Operational pipelines and integrations", icon: Zap },
  { title: "Template / toolkit", description: "Spreadsheets, documentation kits, audit-ready packs", icon: FileText },
  { title: "Dashboard / internal tool", description: "Ops visibility without full product scope", icon: LayoutDashboard },
  { title: "Service + tool hybrid", description: "Productized service backed by lightweight tooling", icon: Bot },
];

export const comparisonCards = [
  {
    title: "Government intelligence (HigherGov, GovSignals)",
    body: "Useful for procurement awareness — but they sell intelligence, not validated build opportunities with asset fit.",
    highlight: false,
  },
  {
    title: "Market monitoring (Contify, Crayon, Klue)",
    body: "Strong for competitive tracking — weak on what to build, how to win, and what asset to ship first.",
    highlight: false,
  },
  {
    title: "Trend tools (Exploding Topics)",
    body: "Useful for attention — but weak on compliance pressure, procurement proof, and buildable workflow evidence.",
    highlight: false,
  },
  {
    title: "DataTello",
    body: "A decision engine that tells each user what to build or act on first — backed by compliance pressure, procurement proof, and layered validation.",
    highlight: true,
  },
];

export const platformFeatures = [
  "Recommended for You — personalized top pick",
  "Top Opportunities This Week",
  "Full opportunity dossiers",
  "Role-aware output (execution vs Asset Thesis)",
  "Build strategy & competitive differentiator",
  "Procurement validation evidence",
  "Weekly Signal Brief",
  "PDF dossier export",
];

export const monitoringUpdates = [
  "Demand moves",
  "New compliance pressure signals",
  "Procurement solicitations appear",
  "Competitor pricing changes",
  "Workflow friction increases",
  "Market conditions change",
];

export const pricingPlans = [
  {
    name: "Consultant",
    price: 299,
    description: "Advisors serving contractor and environmental clients",
    features: [
      "Recommended for You — top pick",
      "Weekly Signal Brief",
      "Full execution dossiers",
      "PDF export",
      "Client advisory framing",
    ],
    popular: false,
  },
  {
    name: "Agency",
    price: 599,
    description: "Service firms and delivery teams",
    features: [
      "Everything in Consultant",
      "Builder fit & tool stack detail",
      "Offer packaging templates",
      "Team sharing",
      "Procurement validation panels",
    ],
    popular: true,
  },
  {
    name: "Investor / Studio",
    price: 999,
    description: "Investment teams and venture studios",
    features: [
      "Everything in Agency",
      "Asset Thesis view",
      "Compare & monitor tools",
      "Venture bet prioritization",
      "Multi-portfolio workflow views",
    ],
    popular: false,
  },
];

export const faqs = [
  {
    q: "What makes DataTello different from government intelligence tools?",
    a: "HigherGov and GovSignals sell intelligence. DataTello is a decision engine — it tells you what to build or act on first, with role-aware output and a personalized top recommendation.",
  },
  {
    q: "Is this only for software opportunities?",
    a: "No. DataTello recommends the best first asset for each opportunity — which may be a service package, template, dashboard, workflow tool, or software product depending on build strategy fit.",
  },
  {
    q: "Who is this for?",
    a: "Agencies, consultants, investors, and venture studios working in compliance-heavy industries. Each role sees tailored output — execution detail or Asset Thesis — plus a personalized recommendation.",
  },
  {
    q: "What industries does the MVP focus on?",
    a: "Environmental compliance, contractor safety, and public-sector compliance workflows. Additional verticals expand after the MVP consistently produces high-quality opportunities.",
  },
  {
    q: "Can I download dossiers as PDFs?",
    a: "Yes. Paid plans include downloadable Opportunity Dossiers built from structured opportunity data.",
  },
  {
    q: "How is this different from trend tools?",
    a: "Trend tools show attention. DataTello combines compliance pressure, procurement validation, demand, market wedge, and workflow friction with guardrails and human review to produce buildable opportunities.",
  },
];

export const footerLinks = {
  product: [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Sample Dossier", href: "#sample-dossier" },
    { label: "FAQ", href: "#faq" },
  ],
  account: [
    { label: "Log In", href: "/dashboard" },
    { label: "Get Access", href: "/dashboard" },
    { label: "Contact", href: "#" },
  ],
  legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
};

export type AccentColor = "blue" | "cyan" | "green" | "amber";

export const accentStyles: Record<
  AccentColor,
  { icon: string }
> = {
  blue: { icon: "icon-box-blue" },
  cyan: { icon: "icon-box-blue" },
  green: { icon: "bg-accent-green/10 text-accent-green icon-box" },
  amber: { icon: "bg-accent-orange/10 text-accent-orange icon-box" },
};

export { BookOpen, ChevronRight, Bell };
