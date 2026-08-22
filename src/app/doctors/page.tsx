import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { doctorsData } from "@/data/doctorsData";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Award, Calendar, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Specialist Doctors & Clinicians | Revilen Dental Studio",
  description: "Meet our multidisciplinary dental faculty comprising AIIMS gold medalists, Manipal alumni, and internationally certified fellowship directors.",
};

export default function DoctorsPage() {
  return (
    <div className="py-12 sm:py-20 bg-stone-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="luxury" size="md" dot className="mb-3">
            Multi-Disciplinary Faculty
          </Badge>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-normal tracking-tight">
            Distinguished Specialists & Clinicians
          </h1>
          <p className="mt-4 text-base sm:text-lg text-stone-600 font-light leading-relaxed">
            Every procedure at Revilen Dental Studio is delivered by board-certified MDS super-specialists with prestigious institutional training and international fellowships.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctorsData.map((doctor) => (
            <div
              key={doctor.slug}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-soft hover:shadow-elevated transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Doctor Portrait Header */}
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    className="object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent" />

                  {/* Verification Tag */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-ivory-50 text-xs">
                    <span className="font-medium bg-pine-900/80 px-2.5 py-1 rounded-full backdrop-blur-xs text-[11px] border border-pine-700/50">
                      {doctor.experienceYears}+ Years Clinical Practice
                    </span>
                    <span className="text-[11px] text-gold-300 font-semibold">
                      {doctor.verifiedCasesCount}+ Cases
                    </span>
                  </div>
                </div>

                {/* Doctor Content */}
                <div className="p-6 sm:p-7 space-y-3">
                  <div>
                    <span className="text-[11px] uppercase font-semibold text-pine-800 tracking-wider block font-sans">
                      {doctor.specialty}
                    </span>
                    <h2 className="font-serif text-2xl font-medium text-charcoal-950 mt-0.5 group-hover:text-pine-900 transition-colors">
                      {doctor.name}
                    </h2>
                    <p className="text-xs text-stone-500 font-medium mt-1 line-clamp-1">
                      {doctor.qualification}
                    </p>
                  </div>

                  <p className="text-xs text-stone-600 font-light leading-relaxed line-clamp-3">
                    {doctor.bio}
                  </p>

                  {/* Sub-specialties */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {doctor.subSpecialties.slice(0, 3).map((sub, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] py-1 px-2.5 rounded-md bg-stone-100 text-charcoal-700 font-medium"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-6 sm:px-7 pb-6 pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                <Link
                  href={`/doctors/${doctor.slug}`}
                  className="text-xs font-semibold text-charcoal-700 hover:text-pine-900 transition-colors"
                >
                  View Full Credentials &rarr;
                </Link>

                <Button
                  href={`/book?doctor=${doctor.slug}`}
                  variant="primary"
                  size="sm"
                  leftIcon={<Calendar className="w-3.5 h-3.5 text-gold-400" />}
                >
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
