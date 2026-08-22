"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Phone, X, ShieldCheck } from "lucide-react";
import { clinicConfig } from "@/data/clinicConfig";

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-pine-900 text-ivory-100 text-xs py-2 px-4 border-b border-pine-800 relative z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left item */}
        <div className="hidden md:flex items-center gap-2 text-gold-300 font-medium">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>NABH & German Class-B Sterilization Standard</span>
        </div>

        {/* Center message */}
        <div className="flex-1 text-center flex items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 font-normal text-ivory-200">
            <Sparkles className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <span>Complimentary 3D Optical Scan & 0% Interest EMI with all Consultations</span>
          </span>
          <Link
            href="/book"
            className="text-gold-300 hover:text-gold-200 underline font-semibold ml-1 shrink-0"
          >
            Reserve Slot &rarr;
          </Link>
        </div>

        {/* Right item */}
        <div className="flex items-center gap-3">
          <a
            href={`tel:${clinicConfig.emergencyPhone.replace(/\s+/g, "")}`}
            className="hidden sm:inline-flex items-center gap-1.5 text-ivory-300 hover:text-white transition-colors font-medium"
          >
            <Phone className="w-3 h-3 text-gold-400" />
            <span>Concierge: {clinicConfig.emergencyPhone}</span>
          </a>
          <button
            onClick={() => setIsVisible(false)}
            className="text-ivory-400 hover:text-white p-0.5 rounded transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
