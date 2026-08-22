"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
  variant?: "pills" | "underline" | "luxury";
  size?: "sm" | "md" | "lg";
}

export function Tabs({
  tabs,
  activeTab,
  onChange,
  className,
  variant = "pills",
  size = "md",
}: TabsProps) {
  const sizeStyles = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-6 py-2.5",
  };

  if (variant === "pills") {
    return (
      <div
        className={cn(
          "inline-flex items-center p-1 bg-stone-200/70 rounded-full border border-stone-300/40 gap-1 overflow-x-auto max-w-full no-scrollbar",
          className
        )}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={cn(
                "relative rounded-full font-medium transition-colors shrink-0 flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-pine-500",
                sizeStyles[size],
                isActive ? "text-ivory-50" : "text-charcoal-700 hover:text-charcoal-900"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabPill"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="absolute inset-0 bg-pine-800 rounded-full shadow-sm -z-10"
                />
              )}
              {tab.icon && <span>{tab.icon}</span>}
              <span>{tab.label}</span>
              {typeof tab.count === "number" && (
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded-full",
                    isActive ? "bg-pine-900/60 text-ivory-200" : "bg-stone-300/60 text-charcoal-600"
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // Underline variant
  return (
    <div className={cn("flex items-center border-b border-stone-200 gap-4 sm:gap-8 overflow-x-auto no-scrollbar", className)}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative pb-3.5 font-medium transition-colors shrink-0 flex items-center gap-2 focus:outline-none",
              sizeStyles[size],
              isActive ? "text-pine-900 font-semibold" : "text-stone-500 hover:text-charcoal-900"
            )}
          >
            {tab.icon && <span>{tab.icon}</span>}
            <span>{tab.label}</span>
            {isActive && (
              <motion.div
                layoutId="activeTabUnderline"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-pine-800 rounded-full"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
