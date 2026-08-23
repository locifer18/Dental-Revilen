"use client";

import React, { useState } from "react";
import { treatmentsData } from "@/data/treatmentsData";
import { TreatmentCategory } from "@/types";
import { CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ServicePickerProps {
  selectedTreatmentSlug: string;
  onSelect: (slug: string) => void;
}

export function ServicePicker({ selectedTreatmentSlug, onSelect }: ServicePickerProps) {
  const [activeCategory, setActiveCategory] = useState<TreatmentCategory>("all");

  const categories: { id: TreatmentCategory; label: string }[] = [
    { id: "all", label: "All" },
    { id: "cosmetic", label: "Cosmetic" },
    { id: "orthodontics", label: "Invisalign®" },
    { id: "restorative", label: "Implants" },
    { id: "surgical", label: "Surgery" },
    { id: "preventive", label: "Hygiene" },
  ];

  const filtered = treatmentsData.filter((t) => activeCategory === "all" || t.category === activeCategory);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-charcoal-900 font-sans">Select Treatment</h3>
        <p className="text-sm text-stone-500 mt-1 font-sans">Choose the procedure you need.</p>
      </div>

      {/* Filter pills — horizontal scroll on mobile */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "text-xs py-2 px-4 rounded-full font-medium transition-all shrink-0 font-sans",
              activeCategory === cat.id
                ? "bg-pine-900 text-ivory-50"
                : "bg-stone-100 text-charcoal-700 hover:bg-stone-200"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid — no fixed height, natural scroll */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {filtered.map((treatment) => {
          const isSelected = selectedTreatmentSlug === treatment.slug;
          return (
            <button
              key={treatment.slug}
              type="button"
              onClick={() => onSelect(treatment.slug)}
              className={cn(
                "w-full text-left p-4 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between",
                isSelected
                  ? "border-pine-800 bg-pine-50/50 shadow-subtle ring-1 ring-pine-800"
                  : "border-stone-200 bg-white hover:border-stone-300 hover:shadow-soft"
              )}
            >
              {isSelected && (
                <div className="absolute top-3 right-3">
                  <CheckCircle2 className="w-4 h-4 fill-pine-800 text-white" />
                </div>
              )}
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400 block mb-1 font-sans">{treatment.tag}</span>
                <h4 className="text-sm font-semibold text-charcoal-900 leading-snug font-sans">{treatment.title}</h4>
                <p className="text-xs text-stone-500 mt-1 line-clamp-2 font-sans leading-relaxed">{treatment.shortDescription}</p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs font-sans">
                <span className="font-semibold text-pine-900">{treatment.priceDisplay}</span>
                <span className="text-stone-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{treatment.duration.split("(")[0].trim()}</span>
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
