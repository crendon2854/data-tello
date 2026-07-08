export type Role =
  | "agency"
  | "consultant"
  | "investor"
  | "venture_studio"
  | "general";

export type SignalPreferences = {
  pressure: boolean;
  demand: boolean;
  wedge: boolean;
  friction: boolean;
  complaints: boolean;
  digital_infrastructure: boolean;
};

export type UserPreferences = {
  user_id: string;
  role: Role;
  industries: string[];
  buyer_types: string[];
  signal_preferences: SignalPreferences;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
};

export const DEFAULT_SIGNAL_PREFERENCES: SignalPreferences = {
  pressure: true,
  demand: true,
  wedge: true,
  friction: true,
  complaints: true,
  digital_infrastructure: true,
};

export const INDUSTRY_OPTIONS = [
  { id: "healthcare", label: "Healthcare" },
  { id: "financial_services", label: "Financial services" },
  { id: "compliance", label: "Compliance & regulatory" },
  { id: "hr", label: "HR & people ops" },
  { id: "construction", label: "Construction & trades" },
  { id: "developer_tools", label: "Developer tools" },
  { id: "logistics", label: "Logistics & supply chain" },
  { id: "public_sector", label: "Public sector" },
  { id: "explore", label: "Not sure / explore" },
] as const;

export const BUYER_TYPE_OPTIONS = [
  { id: "smb", label: "SMB / local" },
  { id: "mid_market", label: "Mid-market" },
  { id: "enterprise", label: "Enterprise" },
  { id: "public_sector", label: "Public sector" },
  { id: "no_preference", label: "No preference" },
] as const;

export const SIGNAL_PREFERENCE_OPTIONS = [
  { id: "pressure" as const, label: "Regulatory / compliance pressure" },
  { id: "demand" as const, label: "Search demand & buyer language" },
  { id: "wedge" as const, label: "Market gaps & competition" },
  { id: "friction" as const, label: "Workflow friction" },
  { id: "complaints" as const, label: "Complaint & incident patterns" },
  {
    id: "digital_infrastructure" as const,
    label: "Digital infrastructure signals",
  },
] as const;

export const ROLE_OPTIONS = [
  {
    id: "agency" as const,
    label: "Sell / implement solutions",
    description: "Package and deliver client offers",
  },
  {
    id: "consultant" as const,
    label: "Advise / recommend",
    description: "Frame opportunities for client advisory work",
  },
  {
    id: "investor" as const,
    label: "Invest / validate",
    description: "Evaluate markets for capital allocation",
  },
  {
    id: "venture_studio" as const,
    label: "Build ventures / run studio",
    description: "Validate concepts and prioritize venture bets",
  },
  {
    id: "general" as const,
    label: "Not sure",
    description: "Balanced view across all opportunity types",
  },
] as const;

export function createDefaultUserPreferences(userId: string): UserPreferences {
  const now = new Date().toISOString();
  return {
    user_id: userId,
    role: "general",
    industries: [],
    buyer_types: [],
    signal_preferences: { ...DEFAULT_SIGNAL_PREFERENCES },
    onboarding_completed: false,
    created_at: now,
    updated_at: now,
  };
}
