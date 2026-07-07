"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/helpers";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/admin", label: "Admin" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="glass-nav">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-blue to-blue-600 text-sm font-bold text-white shadow-glow-blue">
            D
          </span>
          <div>
            <span className="text-sm font-bold tracking-wide text-text-primary">
              DATATELLO
            </span>
            <span className="ml-1 font-mono text-xs text-text-muted">
              INTELLIGENCE
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const isActive = pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-1.5 text-xs font-medium transition-all",
                  isActive ? "nav-link-active" : "nav-link"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-border-subtle bg-bg-elevated px-3 py-1">
            <span className="status-dot-live" />
            <span className="font-mono text-xs text-text-muted">LIVE</span>
          </div>
        </div>
      </div>
    </header>
  );
}
