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
  Lightbulb,
  LineChart,
  Radar,
  Search,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
  Zap,
} from "lucide-react";

export const heroBullets = [
  "Real-world signals, not recycled idea lists",
  "Clear buyer, wedge, and best first asset",
  "Built for builders, agencies, consultants, and product teams",
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
  { value: "4", label: "Signal pipelines" },
  { value: "Weekly", label: "New briefs" },
];

export const valueProps = [
  {
    title: "Spot the problem",
    body: "We detect real-world pressure across markets where pain is forming—not just where attention is loud.",
    icon: Radar,
    accent: "blue" as const,
  },
  {
    title: "Validate the opportunity",
    body: "We check whether demand, competitive gaps, and workflow friction support a real product opportunity.",
    icon: Gauge,
    accent: "cyan" as const,
  },
  {
    title: "Know what to build first",
    body: "Every opportunity includes a buyer, wedge, and recommended best first asset—whether that's software, an automation, a template, a dashboard, or a workflow tool.",
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
    caption: "Where real-world pain is increasing",
    icon: Activity,
  },
  {
    step: 2,
    title: "Demand Validation",
    caption: "Whether buyers are actively looking for solutions",
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
    caption: "Where people are still struggling to execute",
    icon: Workflow,
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
    title: "Builders",
    body: "Find your next SaaS, internal tool, template, or workflow product. Great for indie hackers, technical founders, and vibe coders.",
    icon: Lightbulb,
    accent: "blue" as const,
  },
  {
    title: "Agencies",
    body: "Turn opportunities into repeatable client offers, automations, dashboards, and productized services.",
    icon: Briefcase,
    accent: "cyan" as const,
  },
  {
    title: "Consultants",
    body: "Use source-backed opportunity dossiers to advise clients and spot underserved markets earlier.",
    icon: Users,
    accent: "green" as const,
  },
  {
    title: "Product Studios",
    body: "Track opportunity spaces, compare bets, and identify niches with strong build potential.",
    icon: Sparkles,
    accent: "amber" as const,
  },
];

export const buildPaths = [
  { title: "SaaS", description: "Full product when recurring value is clear", icon: Layers },
  { title: "Automation workflow", description: "n8n, Zapier, or custom pipelines", icon: Zap },
  { title: "Template / ZIP product", description: "Spreadsheets, Notion, downloadable kits", icon: FileText },
  { title: "Dashboard / internal tool", description: "Ops visibility without full product scope", icon: LayoutDashboard },
  { title: "Service + tool hybrid", description: "Productized service backed by lightweight tooling", icon: Bot },
];

export const comparisonCards = [
  {
    title: "Generic idea lists",
    body: "Broad, recycled, and rarely tied to real market pressure.",
    highlight: false,
  },
  {
    title: "Trend tools",
    body: "Useful for attention, but weak on buyer, wedge, and execution clarity.",
    highlight: false,
  },
  {
    title: "Asking AI for ideas",
    body: "Great for possibilities. Weak for filtering signal from noise.",
    highlight: false,
  },
  {
    title: "DataTello",
    body: "Combines multiple signal layers to surface clearer, more actionable build opportunities.",
    highlight: true,
  },
];

export const platformFeatures = [
  "Opportunity snapshots",
  "Full opportunity dossiers",
  "Asset strategy",
  "Competitive differentiator strategy",
  "Builder-fit recommendations",
  "Watchlists and monitoring",
  "PDF dossier export",
  "Saved opportunities",
];

export const monitoringUpdates = [
  "Demand moves",
  "New signals appear",
  "Competitor pricing changes",
  "Workflow friction increases",
  "Market conditions shift",
];

export const pricingPlans = [
  {
    name: "Builder",
    price: 19,
    description: "For solo builders and indie makers",
    features: [
      "Weekly signal briefs",
      "Opportunity snapshots",
      "Bookmarks",
      "Basic monitoring",
    ],
    popular: false,
  },
  {
    name: "Consultant",
    price: 49,
    description: "For advisors and specialists",
    features: [
      "Full dossiers",
      "PDF export",
      "Source-backed insight",
      "Client-ready summary mode",
    ],
    popular: true,
  },
  {
    name: "Agency / Automation",
    price: 79,
    description: "For service businesses and operators",
    features: [
      "Full dossiers",
      "White-label exports",
      "Team sharing",
      "Execution-oriented defaults",
    ],
    popular: false,
  },
  {
    name: "Product Studio",
    price: 99,
    description: "For teams evaluating multiple bets",
    features: [
      "Compare opportunities",
      "Shared workspace",
      "Portfolio watchlists",
      "Team notes and evaluation flow",
    ],
    popular: false,
  },
];

export const faqs = [
  {
    q: "What makes DataTello different from trend tools?",
    a: "Trend tools mostly show attention. DataTello combines pressure, demand, market wedge, and workflow friction to surface more actionable build opportunities.",
  },
  {
    q: "Are these only SaaS ideas?",
    a: "No. DataTello recommends the best first asset for each opportunity, which could be software, an automation, a template, a dashboard, or a service-assisted tool.",
  },
  {
    q: "Who is this for?",
    a: "Builders, agencies, consultants, automation operators, and product teams who want clearer opportunities and better starting points.",
  },
  {
    q: "How often are opportunities updated?",
    a: "New signals and opportunity updates are added regularly, with monitoring features that help you track changes over time.",
  },
  {
    q: "Can I download dossiers as PDFs?",
    a: "Yes. Paid plans include downloadable Opportunity Dossiers built from structured opportunity data.",
  },
  {
    q: "Can I just use AI instead?",
    a: "AI is great for exploring possibilities. DataTello is built to filter structured market signal from noise and turn it into more actionable opportunities.",
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
