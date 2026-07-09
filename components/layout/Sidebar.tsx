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
  Bookmark,
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
  { href: "/watchlists", label: "Watchlists", icon: Bookmark },
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
  const sectionLabel = variant === "admin" ? "Admin" : "Dashboard";
  const footerHref = variant === "admin" ? "/preferences" : "/";
  const footerLabel = variant === "admin" ? "Settings" : "View site";
  const FooterIcon = variant === "admin" ? Settings2 : Home;

  return (
    <aside className="sidebar-rail">
      <div className="sidebar-header">
        <Link href="/" className="text-sm font-semibold text-text-primary hover:text-accent-brand">
          DataTello
        </Link>
        <p className="mt-0.5 text-xs text-text-dim">{sectionLabel}</p>
      </div>

      <nav className="sidebar-nav" aria-label={sectionLabel}>
        {items.map((item) => {
          const isActive = isItemActive(pathname, item.href);
          const Icon = item.icon;

          return (
            <Link
              key={`${item.href}-${item.label}`}
              href={item.href}
              className={cn(isActive ? "sidebar-link-active" : "sidebar-link")}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <Link href={footerHref} className="sidebar-link">
          <FooterIcon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
          <span>{footerLabel}</span>
        </Link>
      </div>
    </aside>
  );
}
