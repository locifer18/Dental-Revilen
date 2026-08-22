import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Calendar, Phone, Sparkles, ShieldCheck } from "lucide-react";
import { clinicConfig } from "@/data/clinicConfig";

export function CtaBanner() {
  return (
    <section className="py-16 sm:py-20 bg-pine-950 text-ivory-50 relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border border-pine-800/40 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full border border-gold-500/10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Priority Consultation Booking</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.15] font-normal text-ivory-50 max-w-2xl mx-auto">
          Ready to experience a calmer, <br />
          <span className="italic text-gold-300 font-serif">more precise dental visit?</span>
        </h2>

        <p className="text-sm sm:text-base text-ivory-300 max-w-xl mx-auto font-light leading-relaxed">
          Reserve your 45-minute comprehensive visit with 3D intraoral optical scanning, low-dose digital diagnostics, and bespoke specialist consultation.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            href="/book"
            variant="gold"
            size="xl"
            leftIcon={<Calendar className="w-5 h-5" />}
          >
            Book Your Consultation
          </Button>

          <a
            href={`tel:${clinicConfig.emergencyPhone.replace(/\s+/g, "")}`}
            className="w-full sm:w-auto px-8 py-4 rounded-full border border-pine-700 hover:bg-pine-900 text-ivory-200 transition-colors font-medium text-base flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-gold-400" />
            <span>Call Concierge ({clinicConfig.emergencyPhone})</span>
          </a>
        </div>

        <div className="pt-6 flex items-center justify-center gap-6 text-xs text-ivory-400 font-light flex-wrap">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-gold-400" />
            <span>German Class-B Sterilization</span>
          </div>
          <div>•</div>
          <div>Zero Hidden Fees</div>
          <div>•</div>
          <div>0% Interest EMI Options</div>
        </div>
      </div>
    </section>
  );
}
