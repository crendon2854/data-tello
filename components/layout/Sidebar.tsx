"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ClipboardCheck,
  Database,
  FileSearch,
  Home,
  KeyRound,
  LayoutDashboard,
  LayoutGrid,
  MapPin,
  Radio,
  Settings2,
  SlidersHorizontal,
  Target,
  TrendingUp,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/helpers";
import { LogoMark } from "@/components/ui/LogoMark";

interface SidebarProps {
  variant?: "dashboard" | "admin";
}

type SidebarItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const dashboardItems: SidebarItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard", label: "Opportunities", icon: Target },
  { href: "/preferences", label: "Preferences", icon: SlidersHorizontal },
];

const adminItems: SidebarItem[] = [
  { href: "/admin", label: "Overview", icon: LayoutGrid },
  { href: "/admin/sources", label: "Sources", icon: Database },
  { href: "/admin/opportunities", label: "Opportunities", icon: FileSearch },
  { href: "/admin/signals", label: "Raw Signals", icon: Radio },
  { href: "/admin/problem-zones", label: "Problem Zones", icon: MapPin },
  { href: "/admin/keywords", label: "Keywords", icon: KeyRound },
  { href: "/admin/market-proof", label: "Market Proof", icon: TrendingUp },
  { href: "/admin/friction", label: "Friction", icon: Workflow },
  { href: "/admin/review", label: "Review", icon: ClipboardCheck },
];

export function Sidebar({ variant = "dashboard" }: SidebarProps) {
  const pathname = usePathname();
  const items = variant === "admin" ? adminItems : dashboardItems;
  const sectionLabel = variant === "admin" ? "Admin Console" : "Command Center";

  return (
    <aside className="sidebar-rail">
      <div className="border-b border-emerald-500/10 px-4 py-4">
        <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
          <LogoMark />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-text-primary">DataTello</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-dim">
              {sectionLabel}
            </p>
          </div>
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
        <p className="label-text mb-2 px-2">
          {variant === "admin" ? "Workspace" : "Navigation"}
        </p>
        {items.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" &&
              item.href !== "/admin" &&
              pathname.startsWith(item.href));

          const Icon = item.icon;

          return (
            <Link
              key={`${item.href}-${item.label}`}
              href={item.href}
              className={cn(isActive ? "sidebar-link-active" : "sidebar-link")}
            >
              <span className="sidebar-link-icon">
                <Icon className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-emerald-500/10 p-3">
        <Link
          href={variant === "admin" ? "/preferences" : "/"}
          className="sidebar-link text-xs"
        >
          <span className="sidebar-link-icon !h-7 !w-7">
            {variant === "admin" ? (
              <Settings2 className="h-3.5 w-3.5" strokeWidth={1.75} />
            ) : (
              <Home className="h-3.5 w-3.5" strokeWidth={1.75} />
            )}
          </span>
          <span>{variant === "admin" ? "Settings" : "View site"}</span>
        </Link>
      </div>
    </aside>
  );
}
