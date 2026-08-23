"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { Sparkles, ShieldCheck, Clock, Loader2 } from "lucide-react";

function BookingContent() {
  const searchParams = useSearchParams();
  const initialTreatment = searchParams.get("treatment") || undefined;
  const initialDoctor = searchParams.get("doctor") || undefined;
  const initialLocation = searchParams.get("location") || undefined;

  return (
    <div className="py-10 sm:py-16 bg-stone-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pine-50 border border-pine-200/60 text-pine-800 text-xs font-semibold uppercase tracking-widest font-sans mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-pine-600" />
            Digital Appointment Concierge
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal-950 font-normal tracking-tight leading-tight">
            Schedule Your Consultation
          </h1>
          <p className="mt-3 text-sm text-stone-500 font-sans leading-relaxed">
            Reserve your 45-minute visit with complimentary 3D optical scan and specialist consultation.
          </p>
        </div>

        {/* Wizard Component */}
        <BookingWizard
          initialTreatmentSlug={initialTreatment}
          initialDoctorSlug={initialDoctor}
          initialLocationId={initialLocation}
        />

        {/* Trust badges — wrap on mobile */}
        <div className="mt-8 max-w-xl mx-auto flex items-center justify-center gap-4 text-xs text-stone-500 font-sans flex-wrap">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-pine-700" />
            <span>Class-B Sterilization</span>
          </div>
          <span className="hidden sm:block">·</span>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-gold-600" />
            <span>Painless Anesthesia</span>
          </div>
          <span className="hidden sm:block">·</span>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-pine-700" />
            <span>Zero Wait Times</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-pine-800" />
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}
