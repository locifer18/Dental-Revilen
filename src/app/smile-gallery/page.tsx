"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { transformationsData } from "@/data/transformationsData";
import { ImageComparisonSlider } from "@/components/ui/ImageComparisonSlider";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Sparkles, Calendar, UserCheck, ShieldAlert, ArrowRight } from "lucide-react";

export default function SmileGalleryPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filters = [
    { id: "all", label: "All Cases" },
    { id: "porcelain-veneers", label: "Porcelain Veneers" },
    { id: "invisalign-aligners", label: "Invisalign Aligners" },
    { id: "dental-implants", label: "Dental Implants" },
    { id: "teeth-whitening", label: "Teeth Whitening" },
  ];

  const filteredCases = transformationsData.filter((c) => {
    if (selectedFilter === "all") return true;
    return c.treatmentSlug === selectedFilter;
  });

  return (
    <div className="py-12 sm:py-20 bg-stone-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="luxury" size="md" dot className="mb-3">
            Smile Transformations
          </Badge>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-normal tracking-tight">
            Before & After Clinical Transformations
          </h1>
          <p className="mt-4 text-base sm:text-lg text-stone-600 font-light leading-relaxed">
            Drag the comparison slider on each case study to inspect how minimal-prep ceramics, digital clear aligners, and guided implants transform real aesthetics.
          </p>
        </div>

        {/* Ethical Demo Notice Strip */}
        <div className="mb-10 max-w-4xl mx-auto p-4 rounded-2xl bg-gold-50/80 border border-gold-200/80 flex items-center gap-3 text-xs text-charcoal-800">
          <ShieldAlert className="w-5 h-5 text-gold-700 shrink-0" />
          <p className="leading-relaxed font-light">
            <strong>Sample Clinical Demonstration:</strong> In compliance with ethical healthcare standards, individual patient dental results may vary based on starting bone health, jaw alignment, and hygiene maintenance.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setSelectedFilter(f.id)}
              className={`text-xs sm:text-sm py-2 px-4 rounded-full font-medium transition-all ${
                selectedFilter === f.id
                  ? "bg-pine-900 text-ivory-50 shadow-sm"
                  : "bg-white text-charcoal-700 hover:bg-stone-200/70 border border-stone-200"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {filteredCases.map((caseItem) => (
            <div
              key={caseItem.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-soft flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Slider */}
                <ImageComparisonSlider
                  beforeImage={caseItem.beforeImage}
                  afterImage={caseItem.afterImage}
                  beforeLabel="Before"
                  afterLabel="After Result"
                  aspectRatio="16/9"
                />

                <div>
                  <span className="text-[11px] uppercase font-semibold text-pine-800 tracking-wider font-sans block mb-1">
                    {caseItem.treatmentType}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-charcoal-950">
                    {caseItem.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 font-light mt-1.5 leading-relaxed">
                    {caseItem.description}
                  </p>
                </div>

                <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/60 text-xs">
                  <span className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider block">
                    Clinical Protocol
                  </span>
                  <p className="font-medium text-charcoal-800 mt-0.5">{caseItem.clinicalNotes}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-stone-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-pine-700" />
                  <span>{caseItem.duration}</span>
                </span>

                <Button
                  href={`/book?treatment=${caseItem.treatmentSlug}`}
                  variant="primary"
                  size="sm"
                >
                  Book This Treatment
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Button href="/book" variant="gold" size="lg">
            Schedule Your Smile Transformation Consultation &rarr;
          </Button>
        </div>
      </div>
    </div>
  );
}
