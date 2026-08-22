"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  badge?: string;
  className?: string;
}

export function AccordionItem({
  title,
  children,
  isOpen,
  onToggle,
  badge,
  className,
}: AccordionItemProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = typeof isOpen === "boolean";
  const open = isControlled ? isOpen : internalOpen;

  const handleToggle = () => {
    if (isControlled && onToggle) {
      onToggle();
    } else {
      setInternalOpen(!internalOpen);
    }
  };

  return (
    <div
      className={cn(
        "border-b border-stone-200/80 transition-colors last:border-b-0",
        open && "bg-stone-50/50",
        className
      )}
    >
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={open}
        className="w-full py-5 px-4 sm:px-6 flex items-center justify-between text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-pine-500"
      >
        <div className="flex items-center gap-3 pr-4">
          <span className="font-medium text-base sm:text-lg text-charcoal-900 group-hover:text-pine-800 transition-colors">
            {title}
          </span>
          {badge && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-pine-100 text-pine-800 font-medium">
              {badge}
            </span>
          )}
        </div>
        <div
          className={cn(
            "p-1.5 rounded-full text-stone-400 group-hover:text-charcoal-800 transition-transform duration-200 shrink-0",
            open ? "rotate-180 text-pine-800 bg-pine-100/60" : ""
          )}
        >
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-stone-600 font-normal leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Accordion({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-3xl border border-stone-200/80 bg-white overflow-hidden shadow-soft", className)}>
      {children}
    </div>
  );
}
