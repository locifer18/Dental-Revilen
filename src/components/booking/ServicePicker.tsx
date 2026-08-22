import React, { useState } from "react";
import { treatmentsData } from "@/data/treatmentsData";
import { TreatmentCategory } from "@/types";
import { Sparkles, CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ServicePickerProps {
  selectedTreatmentSlug: string;
  onSelect: (slug: string) => void;
}

export function ServicePicker({ selectedTreatmentSlug, onSelect }: ServicePickerProps) {
  const [activeCategory, setActiveCategory] = useState<TreatmentCategory>("all");

  const categories: { id: TreatmentCategory; label: string }[] = [
    { id: "all", label: "All Procedures" },
    { id: "cosmetic", label: "Aesthetic & Veneers" },
    { id: "orthodontics", label: "Invisalign® & Aligners" },
    { id: "restorative", label: "Implants & Root Canal" },
    { id: "surgical", label: "Wisdom Tooth Surgery" },
    { id: "preventive", label: "Hygiene & Pediatric" },
  ];

  const filteredTreatments = treatmentsData.filter((t) => {
    if (activeCategory === "all") return true;
    return t.category === activeCategory;
  });

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-serif text-2xl text-charcoal-900 font-medium">
          Select Clinical Treatment
        </h3>
        <p className="text-sm text-stone-500 mt-1">
          Choose a specialized dental procedure or initial diagnostic consultation.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "text-xs py-2 px-3.5 rounded-full font-medium transition-all shrink-0",
              activeCategory === cat.id
                ? "bg-pine-900 text-ivory-50 shadow-sm"
                : "bg-stone-100 text-charcoal-700 hover:bg-stone-200/70"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Treatments Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 max-h-[380px] overflow-y-auto p-1">
        {filteredTreatments.map((treatment) => {
          const isSelected = selectedTreatmentSlug === treatment.slug;
          return (
            <div
              key={treatment.slug}
              onClick={() => onSelect(treatment.slug)}
              className={cn(
                "p-4 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between",
                isSelected
                  ? "border-pine-800 bg-pine-50/40 shadow-subtle ring-1 ring-pine-800"
                  : "border-stone-200/80 bg-white hover:border-stone-300 hover:shadow-soft"
              )}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 text-pine-800">
                  <CheckCircle2 className="w-4 h-4 fill-pine-800 text-white" />
                </div>
              )}

              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500 block mb-1">
                  {treatment.tag}
                </span>
                <h4 className="font-serif text-base font-semibold text-charcoal-900 leading-snug">
                  {treatment.title}
                </h4>
                <p className="text-xs text-stone-600 mt-1 line-clamp-2">
                  {treatment.shortDescription}
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                <span className="font-semibold text-pine-900">
                  {treatment.priceDisplay.split(" ")[0] === "From" ? treatment.priceDisplay : `From ${treatment.priceDisplay}`}
                </span>
                <span className="text-stone-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{treatment.duration.split("(")[0]}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
