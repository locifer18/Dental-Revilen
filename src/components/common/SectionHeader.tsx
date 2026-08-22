import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

export interface SectionHeaderProps {
  badge?: string;
  badgeVariant?: "default" | "pine" | "gold" | "stone" | "luxury";
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
  dark?: boolean;
}

export function SectionHeader({
  badge,
  badgeVariant = "pine",
  title,
  subtitle,
  align = "center",
  className,
  dark = false,
}: SectionHeaderProps) {
  const alignStyles = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <div className={cn("flex flex-col max-w-3xl mb-12 sm:mb-16", alignStyles[align], className)}>
      {badge && (
        <Badge
          variant={dark ? "luxury" : badgeVariant}
          size="md"
          dot
          className="mb-3.5"
        >
          {badge}
        </Badge>
      )}

      <h2
        className={cn(
          "font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.15] font-normal",
          dark ? "text-ivory-50" : "text-charcoal-950"
        )}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base sm:text-lg leading-relaxed font-light",
            dark ? "text-ivory-300" : "text-stone-600"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
