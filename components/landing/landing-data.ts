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
  "Evidence-backed build opportunities — not intelligence feeds",
  "Compliance pressure, procurement signals, and workflow friction in every dossier",
  "Built for builders, agencies, and consultants in environmental & contractor compliance",
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
  { value: "Weekly", label: "Opportunity briefs" },
];

export const valueProps = [
  {
    title: "Surface operational pain",
    body: "Detect real-world pressure and repeated failures across regulated and operational industries — before demand spikes.",
    icon: Radar,
    accent: "blue" as const,
  },
  {
    title: "Validate the build opportunity",
    body: "Structured scoring across demand, competitive gaps, procurement signals, and workflow friction — with guardrails and human review.",
    icon: Gauge,
    accent: "cyan" as const,
  },
  {
    title: "Know what to offer first",
    body: "Every dossier includes buyer context, market wedge, and a recommended best first asset — software, service package, template, dashboard, or workflow tool.",
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
    title: "Builders",
    body: "Find compliance- and procurement-backed workflows worth building first. Every dossier includes build strategy, wedge clarity, and a recommended first asset.",
    icon: Layers,
    accent: "green" as const,
  },
  {
    title: "Agencies",
    body: "Identify new services and productized offers for contractor and environmental clients. Package repeatable engagements from scored build opportunities.",
    icon: Briefcase,
    accent: "blue" as const,
  },
  {
    title: "Consultants",
    body: "Advise clients with source-backed opportunity dossiers. Spot underserved compliance markets and operational pain earlier than generic research.",
    icon: Users,
    accent: "cyan" as const,
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
    body: "Discovers overlooked compliance- and procurement-backed workflow problems and converts them into buildable assets.",
    highlight: true,
  },
];

export const platformFeatures = [
  "Opportunity snapshots",
  "Full opportunity dossiers",
  "Build strategy",
  "Competitive differentiator",
  "Procurement validation evidence",
  "SAM.gov and USAspending signals",
  "PDF dossier export",
  "Saved opportunities",
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
    name: "Builder",
    price: 299,
    description: "Solo builders and indie operators",
    features: [
      "Weekly opportunity briefs",
      "Full opportunity dossiers",
      "PDF export",
      "Source-backed evidence stacks",
      "Build strategy recommendations",
    ],
    popular: false,
  },
  {
    name: "Consultant",
    price: 599,
    description: "Advisors serving contractor and environmental clients",
    features: [
      "Everything in Builder",
      "Client-ready summary mode",
      "Procurement validation panels",
      "Priority dossier access",
      "Compliance wedge focus",
    ],
    popular: true,
  },
  {
    name: "Agency",
    price: 999,
    description: "Service firms and delivery teams",
    features: [
      "Everything in Consultant",
      "Team sharing",
      "Execution-oriented defaults",
      "Offer packaging templates",
      "Multi-client workflow views",
    ],
    popular: false,
  },
];

export const faqs = [
  {
    q: "What makes DataTello different from government intelligence tools?",
    a: "HigherGov and GovSignals sell intelligence. DataTello validates build opportunities — what to build, how to win, and what asset to ship first — backed by compliance pressure, procurement signals, and structured scoring.",
  },
  {
    q: "Is this only for software opportunities?",
    a: "No. DataTello recommends the best first asset for each opportunity — which may be a service package, template, dashboard, workflow tool, or software product depending on build strategy fit.",
  },
  {
    q: "Who is this for?",
    a: "Builders, agencies serving compliance-heavy industries, and consultants serving contractor and environmental businesses. Not a general market intelligence platform.",
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
