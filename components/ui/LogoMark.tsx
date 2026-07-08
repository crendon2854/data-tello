import { cn } from "@/lib/helpers";

type LogoMarkProps = {
  className?: string;
  /** Matches adjacent wordmark scale — ~10% larger than companion text */
  size?: "sm" | "md";
};

/** text-sm (0.875rem) × 1.1 */
const sizeClasses = {
  sm: "text-[0.9625rem]",
  /** text-base (1rem) × 1.1 */
  md: "text-[1.1rem]",
};

export function LogoMark({ className, size = "sm" }: LogoMarkProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 select-none font-cinzel font-bold leading-none tracking-normal text-accent-brand drop-shadow-logo-glow",
        sizeClasses[size],
        className
      )}
      aria-hidden
    >
      D
    </span>
  );
}
