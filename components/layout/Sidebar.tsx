"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
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

function isItemActive(pathname: string, href: string) {
  return (
    pathname === href ||
    (href !== "/dashboard" && href !== "/admin" && pathname.startsWith(href))
  );
}

export function Sidebar({ variant = "dashboard" }: SidebarProps) {
  const pathname = usePathname();
  const items = variant === "admin" ? adminItems : dashboardItems;
  const sectionLabel = variant === "admin" ? "Admin Console" : "Command Center";
  const footerHref = variant === "admin" ? "/preferences" : "/";
  const footerLabel = variant === "admin" ? "Settings" : "View site";
  const FooterIcon = variant === "admin" ? Settings2 : Home;

  return (
    <aside className="sidebar-rail">
      <div className="sidebar-spine" aria-hidden="true">
        <span className="sidebar-spine-glow" />
      </div>

      <div className="sidebar-panel">
        <div className="sidebar-ambient" aria-hidden="true" />

        <header className="sidebar-header">
          <Link href="/" className="sidebar-brand group">
            <span className="sidebar-monogram" aria-hidden="true">
              DT
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold tracking-tight text-text-primary transition-colors group-hover:text-accent-brand">
                DataTello
              </span>
              <span className="mt-0.5 flex items-center gap-1.5">
                <span className="sidebar-live-dot" aria-hidden="true" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-dim">
                  {sectionLabel}
                </span>
              </span>
            </span>
          </Link>
        </header>

        <nav className="sidebar-nav" aria-label={sectionLabel}>
          <p className="sidebar-nav-label">
            {variant === "admin" ? "Workspace" : "Navigate"}
          </p>
          <ul className="flex flex-col gap-0.5">
            {items.map((item, index) => {
              const isActive = isItemActive(pathname, item.href);
              const Icon = item.icon;
              const indexLabel = String(index + 1).padStart(2, "0");

              return (
                <li key={`${item.href}-${item.label}`}>
                  <Link
                    href={item.href}
                    className={cn(
                      isActive ? "sidebar-link-active" : "sidebar-link"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className="sidebar-link-index">{indexLabel}</span>
                    <Icon className="sidebar-link-icon-svg" strokeWidth={1.75} />
                    <span className="min-w-0 flex-1 truncate">{item.label}</span>
                    <ArrowUpRight
                      className="sidebar-link-arrow"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <footer className="sidebar-footer">
          <Link href={footerHref} className="sidebar-exit">
            <span className="sidebar-exit-icon">
              <FooterIcon className="h-3.5 w-3.5" strokeWidth={1.75} />
            </span>
            <span className="flex-1 truncate">{footerLabel}</span>
            <ArrowUpRight className="h-3 w-3 opacity-40" strokeWidth={1.75} />
          </Link>
        </footer>
      </div>
    </aside>
  );
}
