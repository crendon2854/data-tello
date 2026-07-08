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
    <div className={cn("relative mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="label-text mb-3">{children}</p>;
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
        "text-2xl font-bold tracking-tight text-text-primary sm:text-3xl sm:leading-[1.15]",
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
    <p className={cn("mt-4 max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base", className)}>
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
    <Link href={href} className={cn("btn-primary px-6 py-3 text-sm", className)}>
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
    <Link href={href} className={cn("btn-secondary px-6 py-3 text-sm", className)}>
      {children}
    </Link>
  );
}

export function GlowOrb({
  className,
  color = "blue",
}: {
  className?: string;
  color?: "blue" | "orange" | "crimson";
}) {
  const colors = {
    blue: "bg-accent-blue/10",
    orange: "bg-accent-orange/10",
    crimson: "bg-accent-crimson/10",
  };
  return (
    <div
      className={cn("pointer-events-none absolute rounded-full blur-3xl", colors[color], className)}
      aria-hidden
    />
  );
}

export function ScoreBar({
  label,
  score,
  gradient,
}: {
  label: string;
  score: number;
  gradient: string;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="font-medium text-text-primary">{label}</span>
        <span className="font-mono font-semibold text-text-secondary">{score}</span>
      </div>
      <div className="progress-bar">
        <div
          className={cn("h-full rounded-full bg-gradient-to-r", gradient)}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

export function LandingCard({
  children,
  className,
  glow = "blue",
}: {
  children: ReactNode;
  className?: string;
  glow?: "blue" | "orange" | "crimson" | "none";
}) {
  const glowClass =
    glow === "blue"
      ? "ambient-glow-blue"
      : glow === "orange"
        ? "ambient-glow-orange"
        : glow === "crimson"
          ? "ambient-glow-crimson"
          : null;

  return (
    <div
      className={cn(
        "glass-card group transition-all hover:border-accent-blue/30 hover:shadow-glow-blue",
        className
      )}
    >
      {glowClass && (
        <div className={cn(glowClass, "opacity-0 transition-opacity group-hover:opacity-100")} aria-hidden />
      )}
      <div className="relative">{children}</div>
    </div>
  );
}

export function IconBox({
  children,
  variant = "blue",
}: {
  children: ReactNode;
  variant?: "blue" | "orange" | "crimson" | "green";
}) {
  const variants = {
    blue: "icon-box-blue",
    orange: "bg-accent-orange/10 text-accent-orange icon-box",
    crimson: "bg-accent-crimson/10 text-accent-crimson icon-box",
    green: "bg-accent-green/10 text-accent-green icon-box",
  };
  return <div className={cn("mb-4", variants[variant], "h-11 w-11")}>{children}</div>;
}
