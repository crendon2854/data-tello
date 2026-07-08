"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/helpers";

const appLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/admin", label: "Admin" },
];

const landingLinks = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#examples", label: "Examples" },
  { href: "#built-for", label: "Built For" },
  { href: "#pricing", label: "Pricing" },
];

export function Navbar() {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  return (
    <header className="glass-nav">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-6">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-blue to-accent-blue-glow text-sm font-bold text-white">
            D
          </span>
          <span className="text-sm font-bold tracking-wide text-text-primary">
            DataTello
          </span>
        </Link>

        {isLanding ? (
          <>
            <nav className="hidden items-center gap-1 lg:flex">
              {landingLinks.map((link) => (
                <a key={link.href} href={link.href} className="nav-link">
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="#sample-dossier"
                className="hidden text-xs font-medium text-text-muted transition-colors hover:text-text-primary sm:inline"
              >
                View Sample Dossier
              </Link>
              <Link href="/dashboard" className="nav-link hidden sm:inline-flex">
                Login
              </Link>
              <Link href="/dashboard" className="btn-primary px-4 py-2 text-xs sm:px-5">
                Get Access
              </Link>
            </div>
          </>
        ) : (
          <>
            <nav className="hidden items-center gap-1 md:flex">
              {appLinks.map((link) => {
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
          </>
        )}
      </div>
    </header>
  );
}
