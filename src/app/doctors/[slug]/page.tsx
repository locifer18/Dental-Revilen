import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { doctorsData } from "@/data/doctorsData";
import { clinicLocations } from "@/data/clinicConfig";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Award,
  GraduationCap,
  Calendar,
  Sparkles,
  CheckCircle2,
  MapPin,
  Clock,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

interface DoctorPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return doctorsData.map((doc) => ({
    slug: doc.slug,
  }));
}

export function generateMetadata({ params }: DoctorPageProps): Metadata {
  const doctor = doctorsData.find((d) => d.slug === params.slug);
  if (!doctor) {
    return { title: "Doctor Not Found" };
  }

  return {
    title: `${doctor.name} - ${doctor.title} | Revilen Dental Studio`,
    description: doctor.bio,
    openGraph: {
      title: `${doctor.name} | Revilen Dental Studio`,
      description: doctor.bio,
      images: [{ url: doctor.image }],
    },
  };
}

export default function DoctorDetailPage({ params }: DoctorPageProps) {
  const doctor = doctorsData.find((d) => d.slug === params.slug);

  if (!doctor) {
    notFound();
  }

  const assignedLocations = clinicLocations.filter((loc) =>
    doctor.locations.includes(loc.id)
  );

  return (
    <div className="py-10 sm:py-16 bg-stone-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-8">
          <Link href="/" className="hover:text-pine-900">
            Home
          </Link>
          <span>/</span>
          <Link href="/doctors" className="hover:text-pine-900">
            Specialists
          </Link>
          <span>/</span>
          <span className="text-charcoal-900 font-medium">{doctor.name}</span>
        </div>

        {/* Hero Profile Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-soft mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Portrait */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-float border border-stone-200 bg-stone-100">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content Dossier */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <Badge variant="luxury" size="md" dot className="mb-2.5">
                  {doctor.specialty}
                </Badge>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal-950 font-normal">
                  {doctor.name}
                </h1>
                <p className="text-sm font-semibold text-pine-900 mt-1">
                  {doctor.title}
                </p>
                <p className="text-xs text-stone-500 mt-0.5">
                  {doctor.qualification}
                </p>
              </div>

              {/* Stats Highlights */}
              <div className="grid grid-cols-3 gap-3 py-4 border-y border-stone-100">
                <div>
                  <span className="font-serif text-2xl font-bold text-pine-950 block">
                    {doctor.experienceYears}+
                  </span>
                  <span className="text-[11px] text-stone-500">Years Experience</span>
                </div>
                <div>
                  <span className="font-serif text-2xl font-bold text-pine-950 block">
                    {doctor.verifiedCasesCount}+
                  </span>
                  <span className="text-[11px] text-stone-500">Verified Cases</span>
                </div>
                <div>
                  <span className="font-serif text-2xl font-bold text-pine-950 block">
                    ₹{doctor.consultationFee}
                  </span>
                  <span className="text-[11px] text-stone-500">Consultation Fee</span>
                </div>
              </div>

              <p className="text-sm text-stone-600 font-light leading-relaxed">
                {doctor.fullBio}
              </p>

              {/* Sub-specialties */}
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 block mb-2">
                  Clinical Focus Areas
                </span>
                <div className="flex flex-wrap gap-2">
                  {doctor.subSpecialties.map((sub, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-xs py-1 px-3 rounded-full bg-stone-100 text-charcoal-800 font-medium"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

              {/* Booking CTA */}
              <div className="pt-2">
                <Button
                  href={`/book?doctor=${doctor.slug}`}
                  variant="primary"
                  size="lg"
                  leftIcon={<Calendar className="w-4 h-4 text-gold-400" />}
                >
                  Book Direct Consultation with {doctor.name.split(" ")[1]}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Credentials Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Education & Awards */}
          <div className="lg:col-span-8 space-y-8">
            {/* Education History */}
            <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-soft space-y-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-pine-800" />
                <h3 className="font-serif text-2xl text-charcoal-950 font-medium">
                  Education & International Training
                </h3>
              </div>
              <div className="space-y-4 pt-2">
                {doctor.education.map((edu, eIdx) => (
                  <div
                    key={eIdx}
                    className="p-4 rounded-2xl bg-stone-50 border border-stone-200/60 flex items-start justify-between gap-4"
                  >
                    <div>
                      <h4 className="font-semibold text-charcoal-900 text-sm">
                        {edu.degree}
                      </h4>
                      <p className="text-xs text-stone-500 mt-0.5">{edu.institution}</p>
                    </div>
                    <span className="text-xs font-mono font-medium text-pine-900 bg-white px-2.5 py-1 rounded-md border border-stone-200 shrink-0">
                      {edu.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Awards & Memberships */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-soft space-y-3">
                <div className="flex items-center gap-2 text-gold-700 font-semibold text-sm">
                  <Award className="w-4 h-4" />
                  <span>Honors & Recognitions</span>
                </div>
                <ul className="space-y-2 text-xs text-stone-600 font-light">
                  {doctor.awards.map((award, aIdx) => (
                    <li key={aIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 mt-0.5 shrink-0" />
                      <span>{award}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-soft space-y-3">
                <div className="flex items-center gap-2 text-pine-800 font-semibold text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Professional Affiliations</span>
                </div>
                <ul className="space-y-2 text-xs text-stone-600 font-light">
                  {doctor.memberships.map((mem, mIdx) => (
                    <li key={mIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-pine-700 mt-0.5 shrink-0" />
                      <span>{mem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Studio Availability & Schedule */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-soft space-y-4">
              <h4 className="font-serif text-lg font-semibold text-charcoal-950">
                Clinic Availability
              </h4>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-stone-400 font-medium block">Consultation Days</span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {doctor.availableDays.map((day) => (
                      <span
                        key={day}
                        className="py-1 px-2.5 rounded-lg bg-pine-50 text-pine-900 font-semibold border border-pine-200"
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100">
                  <span className="text-stone-400 font-medium block">Assigned Studios</span>
                  <div className="space-y-2 mt-2">
                    {assignedLocations.map((loc) => (
                      <div key={loc.id} className="p-3 bg-stone-50 rounded-xl">
                        <span className="font-semibold text-charcoal-900 block">
                          {loc.name}
                        </span>
                        <span className="text-[11px] text-stone-500 block">
                          {loc.address}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Button
                href={`/book?doctor=${doctor.slug}`}
                variant="primary"
                size="md"
                className="w-full"
              >
                Schedule Appointment &rarr;
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
