import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { treatmentsData } from "@/data/treatmentsData";
import { doctorsData } from "@/data/doctorsData";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import {
  Sparkles,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  HeartHandshake,
  ArrowRight,
  UserCheck,
  Zap,
  HelpCircle,
} from "lucide-react";

interface TreatmentPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return treatmentsData.map((treatment) => ({
    slug: treatment.slug,
  }));
}

export function generateMetadata({ params }: TreatmentPageProps): Metadata {
  const treatment = treatmentsData.find((t) => t.slug === params.slug);
  if (!treatment) {
    return { title: "Treatment Not Found" };
  }

  return {
    title: `${treatment.title} | Revilen Dental Studio`,
    description: treatment.shortDescription,
    openGraph: {
      title: `${treatment.title} | Revilen Dental Studio`,
      description: treatment.shortDescription,
      images: [{ url: treatment.heroImage }],
    },
  };
}

export default function TreatmentDetailPage({ params }: TreatmentPageProps) {
  const treatment = treatmentsData.find((t) => t.slug === params.slug);

  if (!treatment) {
    notFound();
  }

  const relatedDoctors = doctorsData.filter((doc) =>
    treatment.relatedDoctorSlugs.includes(doc.slug)
  );

  return (
    <div className="py-10 sm:py-16 bg-stone-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-8">
          <Link href="/" className="hover:text-pine-900">
            Home
          </Link>
          <span>/</span>
          <Link href="/treatments" className="hover:text-pine-900">
            Treatments
          </Link>
          <span>/</span>
          <span className="text-charcoal-900 font-medium truncate">
            {treatment.shortTitle}
          </span>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <Badge variant="luxury" size="md" dot>
                {treatment.tag}
              </Badge>
              {treatment.badge && (
                <Badge variant="pine" size="md">
                  {treatment.badge}
                </Badge>
              )}
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-normal leading-[1.15]">
              {treatment.title}
            </h1>

            <p className="text-base sm:text-lg text-stone-600 font-light leading-relaxed">
              {treatment.longDescription}
            </p>

            {/* Pricing & Key Stats Capsule */}
            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-soft grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <span className="text-[10px] uppercase font-semibold text-stone-400 block tracking-wider">
                  Transparent Cost
                </span>
                <span className="font-serif text-lg sm:text-xl font-bold text-pine-900 block mt-0.5">
                  {treatment.priceDisplay}
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-semibold text-stone-400 block tracking-wider">
                  0% Interest EMI
                </span>
                <span className="text-xs sm:text-sm font-semibold text-gold-700 block mt-1">
                  {treatment.emiDisplay}
                </span>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <span className="text-[10px] uppercase font-semibold text-stone-400 block tracking-wider">
                  Comfort Level
                </span>
                <span className="text-xs font-semibold text-pine-800 flex items-center gap-1 mt-1">
                  <Zap className="w-3.5 h-3.5 text-pine-700" />
                  <span>{treatment.painLevel}</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Button
                href={`/book?treatment=${treatment.slug}`}
                variant="primary"
                size="lg"
                leftIcon={<Calendar className="w-4 h-4 text-gold-400" />}
              >
                Book This Treatment
              </Button>

              <Button
                href="/pricing"
                variant="secondary"
                size="lg"
              >
                Calculate 0% EMI
              </Button>
            </div>
          </div>

          {/* Hero Image with Floating Highlights */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-float border border-stone-200 bg-stone-100">
              <Image
                src={treatment.heroImage}
                alt={treatment.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 via-transparent to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 text-ivory-50 text-xs flex items-center justify-between">
                <span className="bg-pine-900/85 px-3 py-1.5 rounded-full backdrop-blur-xs font-medium">
                  {treatment.longevity}
                </span>
                <span className="text-gold-300 font-medium">
                  Est. {treatment.duration.split("(")[0]}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Deep Dive Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content (8 cols) */}
          <div className="lg:col-span-8 space-y-12">
            {/* Clinical Benefits Section */}
            <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-soft space-y-4">
              <h3 className="font-serif text-2xl text-charcoal-950 font-medium">
                Key Clinical Advantages
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {treatment.keyBenefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/60 flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-pine-800 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-charcoal-800 font-medium leading-relaxed">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step-by-Step Procedure Journey */}
            <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-soft space-y-6">
              <div>
                <span className="text-[11px] uppercase font-semibold text-pine-800 tracking-wider font-sans block mb-1">
                  Treatment Workflow
                </span>
                <h3 className="font-serif text-2xl text-charcoal-950 font-medium">
                  Step-by-Step Clinical Procedure
                </h3>
              </div>

              <div className="space-y-4 pt-2">
                {treatment.procedureSteps.map((step) => (
                  <div
                    key={step.stepNumber}
                    className="p-5 rounded-2xl bg-stone-50/70 border border-stone-200/80 flex items-start gap-4"
                  >
                    <div className="w-9 h-9 rounded-xl bg-pine-900 text-gold-300 flex items-center justify-center font-serif text-base font-bold shrink-0">
                      {step.stepNumber}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                        <h4 className="font-serif text-base font-semibold text-charcoal-950">
                          {step.title}
                        </h4>
                        <span className="text-[11px] font-medium text-stone-500 bg-white px-2.5 py-0.5 rounded-full border border-stone-200">
                          {step.duration}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ideal Candidate Profile & Aftercare */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Who is this for? */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-soft space-y-3">
                <h4 className="font-serif text-lg font-semibold text-charcoal-950">
                  Who is this treatment for?
                </h4>
                <ul className="space-y-2 text-xs text-stone-600 font-light">
                  {treatment.idealCandidate.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-pine-700 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Aftercare & Recovery */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-soft space-y-3">
                <h4 className="font-serif text-lg font-semibold text-charcoal-950">
                  Recovery & Home Aftercare
                </h4>
                <ul className="space-y-2 text-xs text-stone-600 font-light">
                  {treatment.aftercareTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-600 mt-1.5 shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Treatment Specific FAQs */}
            {treatment.faqs.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-serif text-2xl text-charcoal-950 font-medium">
                  Frequently Asked Questions
                </h3>
                <Accordion>
                  {treatment.faqs.map((faq, fIdx) => (
                    <AccordionItem key={fIdx} title={faq.question} isOpen={fIdx === 0}>
                      <p>{faq.answer}</p>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </div>

          {/* Sidebar Area (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Direct Booking Widget Card */}
            <div className="bg-pine-900 text-ivory-50 rounded-3xl p-6 sm:p-7 shadow-elevated border border-pine-800 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-[10px] font-semibold uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                <span>Complimentary 3D Scan</span>
              </div>

              <div>
                <h4 className="font-serif text-2xl font-normal text-ivory-50">
                  Schedule {treatment.shortTitle}
                </h4>
                <p className="text-xs text-ivory-300 font-light mt-1 leading-relaxed">
                  Book your comprehensive evaluation at our Bengaluru, Mumbai, or Gurugram studio.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-pine-800 text-xs text-ivory-200">
                <div className="flex items-center justify-between">
                  <span>Standard Price:</span>
                  <span className="font-semibold text-ivory-50">{treatment.priceDisplay}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>0% Interest EMI:</span>
                  <span className="font-semibold text-gold-400">{treatment.emiDisplay}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Anesthesia Protocol:</span>
                  <span className="font-semibold text-ivory-50">{treatment.painLevel}</span>
                </div>
              </div>

              <Button
                href={`/book?treatment=${treatment.slug}`}
                variant="gold"
                size="md"
                className="w-full"
              >
                Proceed to Booking &rarr;
              </Button>
            </div>

            {/* Attending Doctors Profile */}
            {relatedDoctors.length > 0 && (
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-soft space-y-4">
                <h4 className="font-serif text-lg font-semibold text-charcoal-950">
                  Attending Specialists
                </h4>
                <div className="space-y-4">
                  {relatedDoctors.map((doc) => (
                    <div key={doc.slug} className="flex items-start gap-3 pt-2">
                      <div className="w-12 h-12 rounded-2xl overflow-hidden relative shrink-0 border border-stone-200">
                        <Image
                          src={doc.image}
                          alt={doc.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h5 className="font-serif text-sm font-semibold text-charcoal-900 truncate">
                          {doc.name}
                        </h5>
                        <p className="text-[11px] text-pine-800 font-medium truncate">
                          {doc.specialty}
                        </p>
                        <p className="text-[10px] text-stone-400 mt-0.5">
                          {doc.experienceYears}+ Years • {doc.verifiedCasesCount}+ Cases
                        </p>
                        <Link
                          href={`/doctors/${doc.slug}`}
                          className="text-[11px] text-pine-900 font-semibold hover:underline inline-block mt-1"
                        >
                          View Bio &rarr;
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
