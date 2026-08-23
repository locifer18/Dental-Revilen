import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { doctorsData } from "@/data/doctorsData";
import { Button } from "@/components/ui/Button";
import { Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Specialist Doctors | Revilen Dental Studio",
  description: "Meet our multidisciplinary dental faculty comprising AIIMS gold medalists, Manipal alumni, and internationally certified fellowship directors.",
};

export default function DoctorsPage() {
  return (
    <div className="py-10 sm:py-16 bg-stone-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pine-50 border border-pine-200/60 text-pine-800 text-xs font-semibold uppercase tracking-widest font-sans mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-pine-600" />
            Multi-Disciplinary Faculty
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal-950 font-normal tracking-tight leading-tight">
            Meet Our Specialists
          </h1>
          <p className="mt-3 text-sm sm:text-base text-stone-500 leading-relaxed font-sans">
            Every procedure is delivered by board-certified MDS super-specialists with prestigious institutional training and international fellowships.
          </p>
        </div>

        {/* Grid — 1 col mobile, 2 col sm, 3 col lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {doctorsData.map((doctor) => (
            <div
              key={doctor.slug}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-soft hover:shadow-elevated transition-all duration-300 flex flex-col group hover:-translate-y-1"
            >
              {/* Portrait */}
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-ivory-50">
                  <span className="text-xs font-medium bg-pine-900/80 px-2.5 py-1 rounded-full backdrop-blur-sm border border-pine-700/40 font-sans">
                    {doctor.experienceYears}+ yrs
                  </span>
                  <span className="text-xs text-gold-300 font-semibold font-sans">{doctor.verifiedCasesCount}+ cases</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 flex-1 space-y-2">
                <span className="text-[11px] uppercase font-semibold text-pine-700 tracking-widest block font-sans">{doctor.specialty}</span>
                <h2 className="text-base sm:text-lg font-semibold text-charcoal-950 font-sans group-hover:text-pine-900 transition-colors">{doctor.name}</h2>
                <p className="text-xs text-stone-400 font-sans line-clamp-1">{doctor.qualification}</p>
                <p className="text-sm text-stone-500 leading-relaxed line-clamp-3 font-sans">{doctor.bio}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {doctor.subSpecialties.slice(0, 2).map((sub, i) => (
                    <span key={i} className="text-xs py-0.5 px-2.5 rounded-md bg-stone-100 text-charcoal-600 font-medium font-sans">{sub}</span>
                  ))}
                </div>
              </div>

              {/* Actions — stack on mobile */}
              <div className="p-4 sm:p-5 pt-3 border-t border-stone-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:justify-between">
                <Link href={`/doctors/${doctor.slug}`} className="text-sm font-semibold text-charcoal-600 hover:text-pine-900 transition-colors font-sans text-center sm:text-left">
                  View Full Credentials →
                </Link>
                <Button href={`/book?doctor=${doctor.slug}`} variant="primary" size="sm" leftIcon={<Calendar className="w-3.5 h-3.5 text-gold-400" />} className="w-full sm:w-auto justify-center">
                  Book Slot
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
