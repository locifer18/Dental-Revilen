import React from "react";
import Link from "next/link";
import Image from "next/image";
import { doctorsData } from "@/data/doctorsData";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Award, Sparkles, ArrowRight, Calendar, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function DoctorShowcase() {
  return (
    <section className="py-16 sm:py-24 bg-stone-50/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Specialist Faculty"
          title={
            <>
              Guided by master clinicians, <br />
              <span className="italic text-pine-900 font-serif">driven by empathy.</span>
            </>
          }
          subtitle="Our multi-disciplinary team brings together AIIMS gold medalists, international dental fellows, and seasoned restorative masters."
        />

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctorsData.slice(0, 3).map((doctor) => (
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
                    <h3 className="font-serif text-2xl font-medium text-charcoal-950 mt-0.5 group-hover:text-pine-900 transition-colors">
                      {doctor.name}
                    </h3>
                    <p className="text-xs text-stone-500 font-medium mt-1 line-clamp-1">
                      {doctor.qualification}
                    </p>
                  </div>

                  <p className="text-xs text-stone-600 font-light leading-relaxed line-clamp-3">
                    {doctor.bio}
                  </p>

                  {/* Super-specialties */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {doctor.subSpecialties.slice(0, 2).map((sub, sIdx) => (
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
                  View Profile &rarr;
                </Link>

                <Button
                  href={`/book?doctor=${doctor.slug}`}
                  variant="primary"
                  size="sm"
                  leftIcon={<Calendar className="w-3.5 h-3.5 text-gold-400" />}
                >
                  Book Specialist
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Doctors Footer */}
        <div className="mt-12 text-center">
          <Button
            href="/doctors"
            variant="outline"
            size="lg"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Meet All 6 Faculty Specialists
          </Button>
        </div>
      </div>
    </section>
  );
}
