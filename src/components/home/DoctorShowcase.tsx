"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { doctorsData } from "@/data/doctorsData";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function DoctorShowcase() {
  return (
    <section className="py-12 sm:py-16 bg-ivory-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Specialist Faculty"
          title={
            <>
              Meet the doctors{" "}
              <br />
              <em className="not-italic shimmer-text">behind your smile.</em>
            </>
          }
          subtitle="AIIMS gold medalists, international fellows, and restorative masters — all under one roof."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctorsData.slice(0, 3).map((doctor, idx) => (
            <motion.div
              key={doctor.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-white rounded-3xl overflow-hidden border border-stone-200/60 shadow-soft hover:shadow-elevated transition-all duration-400 flex flex-col hover:-translate-y-1.5 hover:border-gold-400/30"
            >
              {/* Portrait */}
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-ivory-50 text-xs">
                  <span className="font-medium bg-pine-900/75 px-2.5 py-1 rounded-full backdrop-blur-sm text-xs border border-pine-700/40 font-sans">
                    {doctor.experienceYears}+ Years Clinical Practice
                  </span>
                  <span className="text-xs text-gold-300 font-semibold font-sans">{doctor.verifiedCasesCount}+ Cases</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-7 space-y-3 flex-1">
                <div>
                  <span className="text-[11px] uppercase font-semibold text-pine-700 tracking-widest block font-sans">{doctor.specialty}</span>
                  <h3 className="font-sans text-lg font-semibold text-charcoal-950 mt-0.5 group-hover:text-pine-900 transition-colors">
                    {doctor.name}
                  </h3>
                  <p className="text-xs text-stone-400 font-medium mt-1 line-clamp-1 font-sans">{doctor.qualification}</p>
                </div>
                <p className="text-sm text-stone-500 font-light leading-relaxed line-clamp-3 font-sans">{doctor.bio}</p>
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {doctor.subSpecialties.slice(0, 2).map((sub, sIdx) => (
                    <span key={sIdx} className="text-xs py-1 px-2.5 rounded-lg bg-stone-100 text-charcoal-600 font-medium font-sans">
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="px-6 sm:px-7 pb-6 pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                <Link href={`/doctors/${doctor.slug}`} className="text-xs font-semibold text-charcoal-600 hover:text-pine-900 transition-colors font-sans">
                  View Profile →
                </Link>
                <Button href={`/book?doctor=${doctor.slug}`} variant="primary" size="sm" leftIcon={<Calendar className="w-3.5 h-3.5 text-gold-400" />}>
                  Book Specialist
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button href="/doctors" variant="outline" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Meet All 6 Faculty Specialists
          </Button>
        </div>
      </div>
    </section>
  );
}
