import { cn } from "@/lib/utils";

interface GradientCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "feature" | "pricing";
}

export function GradientCard({
  children,
  className,
  variant = "default"
}: GradientCardProps) {
  const variants = {
    default: "bg-gradient-to-br from-background to-muted/30",
    feature: "bg-gradient-to-br from-background via-background to-muted/20 hover:to-muted/40",
    pricing: "bg-gradient-to-br from-background to-primary/5 border-primary/20"
  };

  return (
    <div
      className={cn(
        "group transition-all duration-500 hover:-translate-y-1 hover:shadow-xl",
        variants[variant],
        className
      )}
    >
      {children}
    </div>
  );
}