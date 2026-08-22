"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { Badge } from "@/components/ui/Badge";
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
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Badge variant="luxury" size="md" dot className="mb-3">
            Digital Appointment Concierge
          </Badge>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal-950 font-normal tracking-tight">
            Schedule Your Smile Consultation
          </h1>
          <p className="mt-3 text-sm sm:text-base text-stone-600 font-light leading-relaxed">
            Reserve your 45-minute comprehensive visit with complimentary 3D optical scan, low-dose digital diagnostics, and bespoke specialist consultation.
          </p>
        </div>

        {/* Wizard Component */}
        <BookingWizard
          initialTreatmentSlug={initialTreatment}
          initialDoctorSlug={initialDoctor}
          initialLocationId={initialLocation}
        />

        {/* Trust Badges under Form */}
        <div className="mt-12 max-w-2xl mx-auto flex items-center justify-center gap-6 text-xs text-stone-500 font-light flex-wrap">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-pine-700" />
            <span>German Class-B Sterilization</span>
          </div>
          <div>•</div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-gold-600" />
            <span>Painless Computerized Anesthesia</span>
          </div>
          <div>•</div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-pine-700" />
            <span>Zero Waiting Room Delays</span>
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
