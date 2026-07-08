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

export function SectionLabel({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <p className={cn("landing-section-label", dark && "!text-blue-300")}>{children}</p>
  );
}

export function SectionHeading({
  children,
  className,
  dark,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <h2 className={cn("landing-section-title", dark && "!text-white", className)}>
      {children}
    </h2>
  );
}

export function SectionSubheading({
  children,
  className,
  dark,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <p
      className={cn(
        "mt-4 max-w-2xl text-base leading-relaxed",
        dark ? "text-slate-400" : "text-slate-600",
        className
      )}
    >
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
    <Link href={href} className={cn("landing-btn-primary", className)}>
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
    <Link href={href} className={cn("landing-btn-secondary", className)}>
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
    blue: "bg-blue-500/25",
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
  return <div className={cn("landing-hero-grid", className)} aria-hidden />;
}

export function ScoreBar({
  label,
  score,
  colorClass,
  dark,
}: {
  label: string;
  score: number;
  colorClass: string;
  dark?: boolean;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className={cn("font-semibold", dark ? "text-slate-300" : "text-slate-700")}>
          {label}
        </span>
        <span className={cn("font-mono font-bold", dark ? "text-slate-400" : "text-slate-500")}>
          {score}
        </span>
      </div>
      <div className={cn("h-2.5 overflow-hidden rounded-full", dark ? "bg-slate-700" : "bg-slate-100")}>
        <div
          className={cn("h-full rounded-full", colorClass)}
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
    <div className={cn("landing-card", !hover && "hover:transform-none hover:shadow-none", className)}>
      {children}
    </div>
  );
}

export function IconBox({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl",
        className
      )}
    >
      {children}
    </div>
  );
}
