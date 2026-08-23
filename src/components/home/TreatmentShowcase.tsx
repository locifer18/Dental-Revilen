"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { treatmentsData } from "@/data/treatmentsData";
import { TreatmentCategory } from "@/types";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

const categories: { id: TreatmentCategory; label: string }[] = [
  { id: "all", label: "All Treatments" },
  { id: "cosmetic", label: "Cosmetic & Veneers" },
  { id: "orthodontics", label: "Invisalign®" },
  { id: "restorative", label: "Implants & Crowns" },
  { id: "surgical", label: "Oral Surgery" },
  { id: "preventive", label: "Preventive" },
];

export function TreatmentShowcase() {
  const [activeCategory, setActiveCategory] = useState<TreatmentCategory>("all");

  const filtered = treatmentsData.filter(
    (t) => activeCategory === "all" || t.category === activeCategory
  );

  return (
    <section className="py-12 sm:py-16 bg-ivory-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Clinical Excellence"
          title={
            <>
              Every treatment,{" "}
              <br />
              <em className="not-italic shimmer-text">done right the first time.</em>
            </>
          }
          subtitle="12 specialist procedures, planned with 3D scans and delivered with precision. Clear pricing, no surprises."
        />

        {/* Category filters */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-7">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`text-xs sm:text-sm py-2.5 px-5 rounded-full font-medium transition-all duration-300 font-sans ${
                activeCategory === cat.id
                  ? "bg-pine-900 text-ivory-50 shadow-subtle"
                  : "bg-white text-charcoal-600 hover:bg-stone-100 border border-stone-200/80 hover:border-stone-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filtered.slice(0, 6).map((treatment, idx) => (
            <motion.div
              key={treatment.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/treatments/${treatment.slug}`}
                className="group bg-white rounded-3xl overflow-hidden border border-stone-200/60 shadow-soft hover:shadow-elevated transition-all duration-400 flex flex-col justify-between hover:-translate-y-1.5 hover:border-gold-400/30 block"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                  <Image
                    src={treatment.heroImage}
                    alt={treatment.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/65 via-transparent to-transparent" />

                  {treatment.badge && (
                    <div className="absolute top-4 left-4">
                      <Badge variant="luxury" size="sm">{treatment.badge}</Badge>
                    </div>
                  )}

                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-ivory-50 text-xs">
                    <span className="font-medium bg-charcoal-900/75 px-2.5 py-1 rounded-full backdrop-blur-sm font-sans text-xs">
                      {treatment.priceDisplay}
                    </span>
                    <span className="text-xs text-gold-300 font-semibold font-sans">{treatment.emiDisplay}</span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 sm:p-7 flex-1">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-pine-700 font-sans block mb-1.5">
                    {treatment.tag}
                  </span>
                  <h3 className="font-sans text-base sm:text-lg font-semibold text-charcoal-950 group-hover:text-pine-900 transition-colors leading-snug">
                    {treatment.title}
                  </h3>
                  <p className="text-sm text-stone-500 mt-2 line-clamp-2 leading-relaxed font-sans">
                    {treatment.shortDescription}
                  </p>

                  <ul className="mt-4 space-y-2 pt-4 border-t border-stone-100">
                    {treatment.keyBenefits.slice(0, 2).map((benefit, bIdx) => (
                      <li key={bIdx} className="text-sm text-charcoal-600 flex items-start gap-2 font-sans">
                        <CheckCircle2 className="w-4 h-4 text-pine-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer */}
                <div className="px-6 sm:px-7 pb-6 pt-2 flex items-center justify-between border-t border-stone-100/80">
                  <span className="text-xs text-stone-400 flex items-center gap-1 font-sans">
                    <Clock className="w-3 h-3" />
                    <span>{treatment.duration.split("(")[0]}</span>
                  </span>
                  <span className="text-xs font-semibold text-pine-900 flex items-center gap-1 group-hover:gap-2 transition-all font-sans">
                    <span>Explore Procedure</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button href="/treatments" variant="outline" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
            View All 12 Dental Procedures
          </Button>
        </div>
      </div>
    </section>
  );
}
