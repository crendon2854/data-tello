"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/helpers";
import { PrimaryButton } from "./landing-ui";

const landingLinks = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#examples", label: "Opportunities" },
  { href: "#built-for", label: "Built For" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

const appLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/admin", label: "Admin" },
];

export function LandingNavbar() {
  const pathname = usePathname();
  const isLanding = pathname === "/";
  const [open, setOpen] = useState(false);

  if (!isLanding) {
    return (
      <header className="glass-nav">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-6">
          <Link href="/" className="shrink-0 text-sm font-bold tracking-wide text-text-primary">
            DataTello
          </Link>
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
          <div className="flex items-center gap-2 rounded-full border border-border-subtle bg-bg-elevated px-3 py-1">
            <span className="status-dot-live" />
            <span className="font-mono text-xs text-text-muted">LIVE</span>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="glass-nav">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0 text-sm font-bold tracking-wide text-text-primary">
          DataTello
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {landingLinks.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          <Link href="/dashboard" className="nav-link">
            Log In
          </Link>
          <PrimaryButton href="/dashboard">Get Access</PrimaryButton>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-text-secondary hover:bg-bg-elevated lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-bg-secondary px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {landingLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link href="/dashboard" className="nav-link mt-2">
              Log In
            </Link>
            <PrimaryButton href="/dashboard" className="mt-2 w-full justify-center">
              Get Access
            </PrimaryButton>
          </nav>
        </div>
      )}
    </header>
  );
}
