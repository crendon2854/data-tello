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
  HeartPulse,
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
  "Source-backed signals, not recycled idea lists",
  "Operational pain, market wedge, and evidence in every dossier",
  "Built for agencies, consultants, and investors",
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
  { value: "6", label: "Signal layers" },
  { value: "Weekly", label: "Intelligence briefs" },
];

export const valueProps = [
  {
    title: "Surface operational pain",
    body: "Detect real-world pressure and repeated failures across regulated and operational industries — before demand spikes.",
    icon: Radar,
    accent: "blue" as const,
  },
  {
    title: "Validate the opportunity",
    body: "Structured scoring across demand, competitive gaps, and workflow friction — with guardrails and human review.",
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
    title: "Vendor Risk Portal",
    score: 76,
    asset: "Intake form + scorecard",
    tags: ["Healthcare"],
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
    caption: "Where real-world operational pain is increasing",
    icon: Activity,
  },
  {
    step: 2,
    title: "Demand Validation",
    caption: "Whether buyers are actively seeking solutions",
    icon: Search,
  },
  {
    step: 3,
    title: "Market Wedge Validation",
    caption: "Where existing solutions fall short",
    icon: Target,
  },
  {
    step: 4,
    title: "Workflow Friction Signals",
    caption: "Where execution still breaks down",
    icon: Workflow,
  },
];

export const expansionSignalLayers = [
  {
    step: 5,
    title: "Complaint & Incident Signals",
    caption: "Where real users repeatedly experience failure",
    icon: Shield,
  },
  {
    step: 6,
    title: "Emerging Digital Infrastructure",
    caption: "Infrastructure shift patterns and friction",
    icon: LineChart,
  },
];

export const signalSources = [
  {
    title: "Pressure Discovery",
    bullets: [
      "Regulatory and compliance movement",
      "Procurement and spending activity",
      "Labor and operational pressure",
      "Emerging structural pain",
    ],
    icon: Shield,
  },
  {
    title: "Demand Validation",
    bullets: [
      "Search demand",
      "Commercial intent",
      "Keyword ecosystems",
      "Demand movement over time",
    ],
    icon: LineChart,
  },
  {
    title: "Market Wedge Validation",
    bullets: [
      "Competitor landscape",
      "Pricing gaps",
      "Review complaint patterns",
      "Underserved buyer segments",
    ],
    icon: BarChart3,
  },
  {
    title: "Workflow Friction Signals",
    bullets: [
      "Repeated workflow issues",
      "Manual workarounds",
      "Job posting patterns",
      "Implementation questions",
    ],
    icon: ClipboardList,
  },
  {
    title: "Complaint & Incident Signals",
    bullets: [
      "Repeated real-world failures",
      "Operational pain before demand spikes",
      "Incident and complaint clusters",
      "Regulated industry patterns",
    ],
    icon: Shield,
  },
  {
    title: "Emerging Digital Infrastructure",
    bullets: [
      "Agent Commerce Signals",
      "Stablecoin Workflow Signals",
      "Onchain Developer Tool Friction",
      "Tokenized Data / Pay-Per-Use Data",
    ],
    icon: Bot,
  },
];

export const focusedMarkets = [
  { name: "Construction & contractors", icon: HardHat },
  { name: "Environmental & compliance", icon: Shield },
  { name: "Healthcare operations", icon: HeartPulse },
  { name: "Public sector & infrastructure", icon: Building2 },
  { name: "Industrial & field services", icon: Factory },
];

export const builtForCards = [
  {
    title: "Agencies",
    body: "Identify new services and productized offers backed by source evidence. Package repeatable client engagements from scored opportunities.",
    icon: Briefcase,
    accent: "blue" as const,
  },
  {
    title: "Consultants",
    body: "Advise clients with source-backed opportunity dossiers. Spot underserved markets and operational pain earlier than generic research.",
    icon: Users,
    accent: "cyan" as const,
  },
  {
    title: "Investors",
    body: "Evaluate where new markets and opportunities are forming. Use structured scoring, guardrails, and evidence stacks for diligence.",
    icon: TrendingUp,
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
    title: "Generic idea lists",
    body: "Broad, recycled, and rarely tied to operational pain or source evidence.",
    highlight: false,
  },
  {
    title: "Trend tools",
    body: "Useful for attention, but weak on buyer context, market wedge, and defensible evidence.",
    highlight: false,
  },
  {
    title: "Asking AI for ideas",
    body: "Strong for exploration. Weak for structured scoring, guardrails, and source traceability.",
    highlight: false,
  },
  {
    title: "DataTello",
    body: "Combines structured signal layers, scoring, and human review to surface evidence-backed build opportunities.",
    highlight: true,
  },
];

export const platformFeatures = [
  "Opportunity snapshots",
  "Full opportunity dossiers",
  "Asset strategy",
  "Competitive differentiator strategy",
  "Delivery fit recommendations",
  "Complaint & incident analytical panels",
  "Emerging infrastructure signal views",
  "Watchlists and monitoring",
  "PDF dossier export",
  "Saved opportunities",
];

export const monitoringUpdates = [
  "Demand moves",
  "New signals appear",
  "Competitor pricing changes",
  "Workflow friction increases",
  "Incident patterns shift",
  "Market conditions change",
];

export const pricingPlans = [
  {
    name: "Professional",
    price: 299,
    description: "Individual advisors and analysts",
    features: [
      "Weekly intelligence briefs",
      "Full opportunity dossiers",
      "PDF export",
      "Source-backed evidence stacks",
      "Watchlists",
    ],
    popular: false,
  },
  {
    name: "Advisory",
    price: 599,
    description: "Consultants and specialist practices",
    features: [
      "Everything in Professional",
      "Client-ready summary mode",
      "Complaint & incident panels",
      "Priority dossier access",
      "Advanced monitoring",
    ],
    popular: true,
  },
  {
    name: "Agency",
    price: 999,
    description: "Service firms and delivery teams",
    features: [
      "Everything in Advisory",
      "White-label exports",
      "Team sharing",
      "Execution-oriented defaults",
      "Offer packaging templates",
    ],
    popular: false,
  },
  {
    name: "Investor",
    price: 1499,
    description: "Investment teams and market analysts",
    features: [
      "Everything in Agency",
      "Portfolio watchlists",
      "Market formation tracking",
      "Infrastructure signal views",
      "Team evaluation workspace",
    ],
    popular: false,
  },
];

export const faqs = [
  {
    q: "What makes DataTello different from trend tools?",
    a: "Trend tools show attention. DataTello combines operational pain, demand, market wedge, workflow friction, and structured scoring with guardrails and human review to produce evidence-backed build opportunities.",
  },
  {
    q: "Is this only for software opportunities?",
    a: "No. DataTello recommends the best first asset for each opportunity — which may be a service package, template, dashboard, workflow tool, or software product depending on asset fit.",
  },
  {
    q: "Who is this for?",
    a: "Agencies evaluating new offers, consultants advising clients, and investors tracking where markets and opportunities are forming.",
  },
  {
    q: "How do Complaint & Incident Signals work?",
    a: "They detect where real users repeatedly experience failure — revealing operational pain before demand spikes. They appear as analytical panels and inform review; final opportunities are determined by the scoring engine and human review.",
  },
  {
    q: "Can I download dossiers as PDFs?",
    a: "Yes. Paid plans include downloadable Opportunity Dossiers built from structured opportunity data.",
  },
  {
    q: "Can I just use AI instead?",
    a: "AI is useful for exploration. DataTello is built to apply structured signals, scoring, guardrails, and source traceability — producing decision-ready intelligence, not idea lists.",
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
