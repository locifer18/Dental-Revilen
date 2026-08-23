"use client";

import React, { useState } from "react";
import { transformationsData } from "@/data/transformationsData";
import { ImageComparisonSlider } from "@/components/ui/ImageComparisonSlider";
import { Button } from "@/components/ui/Button";
import { Calendar, ShieldAlert } from "lucide-react";

export default function SmileGalleryPage() {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filters = [
    { id: "all", label: "All" },
    { id: "porcelain-veneers", label: "Veneers" },
    { id: "invisalign-aligners", label: "Invisalign" },
    { id: "dental-implants", label: "Implants" },
    { id: "teeth-whitening", label: "Whitening" },
  ];

  const filtered = transformationsData.filter((c) => selectedFilter === "all" || c.treatmentSlug === selectedFilter);

  return (
    <div className="py-10 sm:py-16 bg-stone-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pine-50 border border-pine-200/60 text-pine-800 text-xs font-semibold uppercase tracking-widest font-sans mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-pine-600" />
            Smile Transformations
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal-950 font-normal tracking-tight leading-tight">
            Before & After Results
          </h1>
          <p className="mt-3 text-sm sm:text-base text-stone-500 leading-relaxed font-sans">
            Drag the slider on each case to see the real transformation.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="mb-8 max-w-3xl mx-auto p-3.5 rounded-xl bg-gold-50/80 border border-gold-200/60 flex items-start gap-3 text-xs text-charcoal-700 font-sans">
          <ShieldAlert className="w-4 h-4 text-gold-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed"><strong>Sample Demonstration:</strong> Individual results may vary based on bone health, jaw alignment, and hygiene maintenance.</p>
        </div>

        {/* Filter pills — horizontal scroll on mobile */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 mb-8 justify-start sm:justify-center">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setSelectedFilter(f.id)}
              className={`text-xs py-2 px-4 rounded-full font-medium transition-all shrink-0 font-sans ${
                selectedFilter === f.id
                  ? "bg-pine-900 text-ivory-50"
                  : "bg-white text-charcoal-700 hover:bg-stone-100 border border-stone-200"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Cases grid — 1-col mobile, 2-col sm+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {filtered.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-4 sm:p-6 border border-stone-200 shadow-soft flex flex-col">
              <ImageComparisonSlider
                beforeImage={item.beforeImage}
                afterImage={item.afterImage}
                beforeLabel="Before"
                afterLabel="After"
                aspectRatio="16/9"
              />

              <div className="mt-4 space-y-2 flex-1">
                <span className="text-[11px] uppercase font-semibold text-pine-700 tracking-widest font-sans">{item.treatmentType}</span>
                <h3 className="text-base font-semibold text-charcoal-950 font-sans leading-snug">{item.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed font-sans">{item.description}</p>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/60">
                  <span className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider block font-sans">Clinical Protocol</span>
                  <p className="text-xs font-medium text-charcoal-700 mt-0.5 font-sans">{item.clinicalNotes}</p>
                </div>
              </div>

              {/* Footer — stack on mobile */}
              <div className="mt-4 pt-3 border-t border-stone-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:justify-between">
                <span className="text-xs text-stone-400 flex items-center gap-1 font-sans">
                  <Calendar className="w-3.5 h-3.5 text-pine-700" />
                  {item.duration}
                </span>
                <Button href={`/book?treatment=${item.treatmentSlug}`} variant="primary" size="sm" className="w-full sm:w-auto justify-center">
                  Book This Treatment
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 sm:mt-14 text-center">
          <Button href="/book" variant="gold" size="lg" className="w-full sm:w-auto">
            Schedule Your Smile Consultation →
          </Button>
        </div>
      </div>
    </div>
  );
}
