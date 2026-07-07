import { cn } from "@/lib/helpers";

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  glow?: "blue" | "orange" | "none";
}

export function Card({
  title,
  children,
  className,
  glow = "blue",
}: CardProps) {
  return (
    <div
      className={cn(
        "glass-card animate-slide-in opacity-0",
        className
      )}
    >
      {glow === "blue" && <div className="ambient-glow-blue" aria-hidden />}
      {glow === "orange" && <div className="ambient-glow-orange" aria-hidden />}
      {title && <h2 className="section-title mb-4">{title}</h2>}
      <div className="relative text-body">{children}</div>
    </div>
  );
}
