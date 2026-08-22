"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { treatmentsData } from "@/data/treatmentsData";
import { TreatmentCategory } from "@/types";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Search, Clock, ArrowRight, CheckCircle2, Sparkles, ShieldCheck } from "lucide-react";

export default function TreatmentsPage() {
  const [activeCategory, setActiveCategory] = useState<TreatmentCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories: { id: TreatmentCategory; label: string }[] = [
    { id: "all", label: "All Treatments (12)" },
    { id: "cosmetic", label: "Aesthetics & Veneers" },
    { id: "orthodontics", label: "Invisalign® & Aligners" },
    { id: "restorative", label: "Implants & Root Canal" },
    { id: "surgical", label: "Oral & Wisdom Surgery" },
    { id: "preventive", label: "Preventive Hygiene" },
  ];

  const filteredTreatments = treatmentsData.filter((treatment) => {
    const matchesCategory =
      activeCategory === "all" || treatment.category === activeCategory;
    const matchesSearch =
      treatment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      treatment.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      treatment.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 sm:py-20 bg-stone-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="luxury" size="md" dot className="mb-3">
            Digital Clinical Specialties
          </Badge>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-normal tracking-tight">
            Comprehensive Dental Treatments
          </h1>
          <p className="mt-4 text-base sm:text-lg text-stone-600 font-light leading-relaxed">
            Every procedure is planned digitally, executed under surgical magnification, and supported by 0% interest EMI options.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 bg-white p-4 rounded-3xl border border-stone-200 shadow-soft">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`text-xs py-2 px-4 rounded-full font-medium transition-all shrink-0 ${
                  activeCategory === cat.id
                    ? "bg-pine-900 text-ivory-50 shadow-sm"
                    : "bg-stone-100 text-charcoal-700 hover:bg-stone-200/70"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72 shrink-0">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search procedures..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-full bg-stone-50 border border-stone-200 text-charcoal-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-pine-500"
            />
          </div>
        </div>

        {/* Treatments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTreatments.map((treatment) => (
            <div
              key={treatment.slug}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-soft hover:shadow-elevated transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                  <Image
                    src={treatment.heroImage}
                    alt={treatment.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    className="object-cover group-hover:scale-104 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent" />

                  {treatment.badge && (
                    <div className="absolute top-4 left-4">
                      <Badge variant="luxury" size="sm">
                        {treatment.badge}
                      </Badge>
                    </div>
                  )}

                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-ivory-50 text-xs">
                    <span className="font-medium bg-charcoal-900/80 px-2.5 py-1 rounded-full backdrop-blur-xs">
                      {treatment.priceDisplay}
                    </span>
                    <span className="text-[11px] text-gold-300 font-semibold">
                      {treatment.emiDisplay}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-7">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-pine-800 font-sans block mb-1">
                    {treatment.tag}
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl font-medium text-charcoal-950 group-hover:text-pine-900 transition-colors">
                    {treatment.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 font-light mt-2 line-clamp-2 leading-relaxed">
                    {treatment.shortDescription}
                  </p>

                  <ul className="mt-4 space-y-1.5 pt-4 border-t border-stone-100">
                    {treatment.keyBenefits.slice(0, 3).map((benefit, bIdx) => (
                      <li
                        key={bIdx}
                        className="text-xs text-charcoal-700 flex items-start gap-2"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-pine-700 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="px-6 sm:px-7 pb-6 pt-3 flex items-center justify-between border-t border-stone-100">
                <span className="text-[11px] text-stone-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{treatment.duration.split("(")[0]}</span>
                </span>

                <Link
                  href={`/treatments/${treatment.slug}`}
                  className="text-xs font-semibold text-pine-900 hover:text-pine-950 flex items-center gap-1 group/link"
                >
                  <span>Procedure Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty Search State */}
        {filteredTreatments.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 max-w-lg mx-auto">
            <h3 className="font-serif text-xl font-medium text-charcoal-900">
              No procedures found matching &ldquo;{searchQuery}&rdquo;
            </h3>
            <p className="text-xs text-stone-500 mt-2">
              Try searching for &quot;implants&quot;, &quot;invisalign&quot;, &quot;veneers&quot;, or &quot;root canal&quot;.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="mt-4 px-4 py-2 rounded-full bg-pine-900 text-ivory-50 text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
