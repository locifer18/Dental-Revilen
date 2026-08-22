import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  bordered?: boolean;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  variant?: "default" | "stone" | "pine" | "glass";
}

export function Card({
  className,
  hoverEffect = false,
  bordered = true,
  padding = "lg",
  variant = "default",
  children,
  ...props
}: CardProps) {
  const paddingStyles = {
    none: "p-0",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10",
  };

  const variantStyles = {
    default: "bg-white text-charcoal-900",
    stone: "bg-stone-100 text-charcoal-900",
    pine: "bg-pine-900 text-ivory-50 border-pine-800",
    glass: "bg-white/80 backdrop-blur-md text-charcoal-900",
  };

  return (
    <div
      className={cn(
        "rounded-2xl transition-all duration-300 relative",
        bordered && (variant === "pine" ? "border border-pine-800" : "border border-stone-200/80"),
        variantStyles[variant],
        paddingStyles[padding],
        hoverEffect && "hover:shadow-elevated hover:translate-y-[-2px]",
        !hoverEffect && "shadow-soft",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
