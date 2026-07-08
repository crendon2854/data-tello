import Link from "next/link";
import { cn } from "@/lib/helpers";
import type { ReactNode } from "react";

export function LandingContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
      {children}
    </p>
  );
}

export function SectionHeading({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl sm:leading-[1.15]",
        className
      )}
    >
      {children}
    </h2>
  );
}

export function SectionSubheading({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("mt-4 max-w-2xl text-base leading-relaxed text-slate-600", className)}>
      {children}
    </p>
  );
}

export function PrimaryButton({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/30",
        className
      )}
    >
      {children}
    </Link>
  );
}

export function SecondaryButton({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50",
        className
      )}
    >
      {children}
    </Link>
  );
}

export function GlowOrb({
  className,
  color = "blue",
}: {
  className?: string;
  color?: "blue" | "cyan" | "green";
}) {
  const colors = {
    blue: "bg-blue-400/20",
    cyan: "bg-cyan-400/20",
    green: "bg-emerald-400/15",
  };
  return (
    <div
      className={cn("pointer-events-none absolute rounded-full blur-3xl", colors[color], className)}
      aria-hidden
    />
  );
}

export function GridPattern({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 opacity-[0.35]",
        className
      )}
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(148, 163, 184, 0.12) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(148, 163, 184, 0.12) 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
      }}
      aria-hidden
    />
  );
}

export function ScoreBar({
  label,
  score,
  colorClass,
}: {
  label: string;
  score: number;
  colorClass: string;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="font-mono font-semibold text-slate-500">{score}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className={cn("h-full rounded-full transition-all", colorClass)}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

export function LandingCard({
  children,
  className,
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm",
        hover && "transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
}
