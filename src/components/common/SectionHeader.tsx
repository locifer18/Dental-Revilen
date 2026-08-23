"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface SectionHeaderProps {
  badge?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
  dark?: boolean;
}

export function SectionHeader({
  badge,
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
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn("flex flex-col max-w-3xl mb-12 sm:mb-16", alignStyles[align], className)}
    >
      {badge && (
        <div className={cn(
          "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.18em] font-sans mb-4 self-start",
          align === "center" && "self-center",
          align === "right" && "self-end",
          dark
            ? "bg-gold-400/10 border border-gold-400/25 text-gold-300"
            : "bg-pine-50 border border-pine-200/60 text-pine-800"
        )}>
          <span className={cn("w-1.5 h-1.5 rounded-full", dark ? "bg-gold-400" : "bg-pine-600")} />
          {badge}
        </div>
      )}

      <h2 className={cn(
        "font-serif font-light leading-[1.1] tracking-tight",
        dark ? "text-ivory-50" : "text-charcoal-950"
      )}>
        {title}
      </h2>

      {subtitle && (
        <p className={cn(
          "mt-5 text-lg sm:text-xl leading-relaxed font-light font-sans",
          dark ? "text-ivory-300/80" : "text-stone-500"
        )}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
