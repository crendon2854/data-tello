import { cn } from "@/lib/helpers";

type LogoMarkProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: "text-[1.625rem]",
  md: "text-[1.875rem]",
  lg: "text-[2.25rem]",
};

export function LogoMark({ className, size = "sm" }: LogoMarkProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 select-none font-bold leading-none tracking-tight text-accent-brand drop-shadow-logo-glow",
        sizeClasses[size],
        className
      )}
      aria-hidden
    >
      D
    </span>
  );
}
