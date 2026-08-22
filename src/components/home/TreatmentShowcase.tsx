"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { treatmentsData } from "@/data/treatmentsData";
import { TreatmentCategory } from "@/types";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Clock, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function TreatmentShowcase() {
  const [activeCategory, setActiveCategory] = useState<TreatmentCategory>("all");

  const categories: { id: TreatmentCategory; label: string }[] = [
    { id: "all", label: "All Treatments" },
    { id: "cosmetic", label: "Cosmetic & Veneers" },
    { id: "orthodontics", label: "Invisalign® & Aligners" },
    { id: "restorative", label: "Implants & Crowns" },
    { id: "surgical", label: "Oral Surgery" },
    { id: "preventive", label: "Preventive Hygiene" },
  ];

  const filteredTreatments = treatmentsData.filter((t) => {
    if (activeCategory === "all") return true;
    return t.category === activeCategory;
  });

  return (
    <section className="py-16 sm:py-24 bg-stone-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Clinical Excellence"
          title={
            <>
              Advanced treatments, <br />
              <span className="italic text-pine-900 font-serif">thoughtfully delivered.</span>
            </>
          }
          subtitle="Every procedure is planned using 3D digital simulation and carried out with micro-surgical precision for lasting biological health and elegance."
        />

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`text-xs sm:text-sm py-2.5 px-5 rounded-full font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-pine-900 text-ivory-50 shadow-sm"
                  : "bg-white text-charcoal-700 hover:bg-stone-200/60 border border-stone-200/80"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Treatments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredTreatments.slice(0, 6).map((treatment) => (
            <div
              key={treatment.slug}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-soft hover:shadow-elevated transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Treatment Image Header */}
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                  <Image
                    src={treatment.heroImage}
                    alt={treatment.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 via-transparent to-transparent" />

                  {/* Badge */}
                  {treatment.badge && (
                    <div className="absolute top-4 left-4">
                      <Badge variant="luxury" size="sm">
                        {treatment.badge}
                      </Badge>
                    </div>
                  )}

                  {/* Pricing Over Image */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-ivory-50 text-xs">
                    <span className="font-medium bg-charcoal-900/80 px-2.5 py-1 rounded-full backdrop-blur-xs">
                      {treatment.priceDisplay}
                    </span>
                    <span className="text-[11px] text-gold-300 font-semibold">
                      {treatment.emiDisplay}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-7">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-pine-800 font-sans block mb-1">
                    {treatment.tag}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-charcoal-950 group-hover:text-pine-900 transition-colors">
                    {treatment.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 font-light mt-2 line-clamp-2 leading-relaxed">
                    {treatment.shortDescription}
                  </p>

                  {/* Benefits Mini-List */}
                  <ul className="mt-4 space-y-1.5 pt-4 border-t border-stone-100">
                    {treatment.keyBenefits.slice(0, 2).map((benefit, bIdx) => (
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

              {/* Card Footer */}
              <div className="px-6 sm:px-7 pb-6 pt-2 flex items-center justify-between border-t border-stone-100/80">
                <span className="text-[11px] text-stone-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{treatment.duration.split("(")[0]}</span>
                </span>

                <Link
                  href={`/treatments/${treatment.slug}`}
                  className="text-xs font-semibold text-pine-900 hover:text-pine-950 flex items-center gap-1 group/link"
                >
                  <span>Explore Procedure</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Button
            href="/treatments"
            variant="outline"
            size="lg"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            View All 12 Dental Procedures
          </Button>
        </div>
      </div>
    </section>
  );
}
