"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
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
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-blue to-blue-600 text-sm font-bold text-white shadow-glow-blue">
              D
            </span>
            <span className="text-sm font-bold tracking-wide text-text-primary">DataTello</span>
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
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-sm font-bold text-white shadow-lg shadow-blue-500/25">
            D
          </span>
          <span className="text-base font-bold tracking-tight text-slate-900">DataTello</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {landingLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
          >
            Log In
          </Link>
          <PrimaryButton href="/dashboard" className="px-5 py-2.5">
            Get Access
          </PrimaryButton>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-white px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {landingLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link href="/dashboard" className="mt-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Log In
            </Link>
            <PrimaryButton href="/dashboard" className="mt-2 w-full">
              Get Access
            </PrimaryButton>
          </nav>
        </div>
      )}
    </header>
  );
}
