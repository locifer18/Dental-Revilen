import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "pine" | "gold" | "stone" | "outline" | "luxury";
  size?: "sm" | "md";
  dot?: boolean;
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  dot = false,
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center font-medium uppercase tracking-wider rounded-full select-none";

  const sizeStyles = {
    sm: "text-[10px] px-2.5 py-0.5 gap-1.5",
    md: "text-xs px-3 py-1 gap-1.5",
  };

  const variantStyles = {
    default: "bg-stone-200 text-charcoal-800",
    pine: "bg-pine-100 text-pine-900 border border-pine-200/60",
    gold: "bg-gold-100 text-gold-900 border border-gold-300/60",
    stone: "bg-stone-100 text-stone-700 border border-stone-200",
    outline: "bg-transparent text-charcoal-700 border border-stone-300",
    luxury: "bg-pine-900 text-gold-300 border border-gold-500/30",
  };

  return (
    <span
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full",
            variant === "pine" && "bg-pine-600",
            variant === "gold" && "bg-gold-600",
            variant === "luxury" && "bg-gold-400 animate-pulse",
            variant !== "pine" && variant !== "gold" && variant !== "luxury" && "bg-stone-500"
          )}
        />
      )}
      {children}
    </span>
  );
}
