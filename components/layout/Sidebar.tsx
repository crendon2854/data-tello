"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/helpers";

interface SidebarProps {
  variant?: "dashboard" | "admin";
}

const dashboardItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard", label: "Opportunities" },
];

const adminItems = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/opportunities", label: "Opportunities" },
  { href: "/admin/signals", label: "Signals" },
  { href: "/admin/zones", label: "Zones" },
  { href: "/admin/review", label: "Review" },
];

export function Sidebar({ variant = "dashboard" }: SidebarProps) {
  const pathname = usePathname();
  const items = variant === "admin" ? adminItems : dashboardItems;

  return (
    <aside className="w-56 shrink-0 border-r border-border bg-bg-primary/50 p-4 backdrop-blur-sm">
      <p className="label-text mb-3 px-3">
        {variant === "admin" ? "Admin" : "Navigation"}
      </p>
      <nav className="flex flex-col gap-0.5">
        {items.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" &&
              item.href !== "/admin" &&
              pathname.startsWith(item.href));

          return (
            <Link
              key={`${item.href}-${item.label}`}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-all",
                isActive
                  ? "nav-link-active px-3 py-2"
                  : "nav-link px-3 py-2"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
