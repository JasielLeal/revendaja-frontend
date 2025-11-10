import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
    icon?: LucideIcon;
    title: string;
    description?: string;
    action?: React.ReactNode;
    className?: string;
    variant?: "default" | "card";
}

export function EmptyState({
    icon: Icon,
    title,
    description,
    action,
    className,
    variant = "default",
}: EmptyStateProps) {
    const baseClasses = "flex flex-col items-center justify-center text-center";

    const variantClasses = {
        default: "py-12",
        card: "py-8 px-6 border border-dashed border-border rounded-lg bg-muted/30",
    };

    return (
        <div
            className={cn(
                baseClasses,
                variantClasses[variant],
                className
            )}
        >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                {Icon && <Icon className="h-10 w-10 text-muted-foreground" />}
            </div>
            <div className="mt-6 space-y-2">
                <h3 className="text-lg font-semibold">{title}</h3>
                {description && (
                    <p className="text-sm text-muted-foreground max-w-sm">
                        {description}
                    </p>
                )}
            </div>
            {action && <div className="mt-6">{action}</div>}
        </div>
    );
}