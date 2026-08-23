"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Phone, X, ShieldCheck } from "lucide-react";
import { clinicConfig } from "@/data/clinicConfig";

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);
  if (!isVisible) return null;

  return (
    <div className="bg-pine-950 text-ivory-100 text-xs py-2.5 px-4 border-b border-gold-400/10 relative z-50">
      {/* Subtle shimmer line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="hidden md:flex items-center gap-2 text-gold-400/80 font-medium font-sans">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span className="text-xs tracking-wide">NABH & German Class-B Sterilization</span>
        </div>

        <div className="flex-1 text-center flex items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 font-light text-ivory-300/80 font-sans">
            <Sparkles className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <span className="text-xs">Free 3D Scan &amp; 0% EMI on all consultations</span>
          </span>
          <Link href="/book" className="text-gold-300 hover:text-gold-200 underline font-semibold ml-1 shrink-0 text-xs font-sans">
            Book →
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${clinicConfig.emergencyPhone.replace(/\s+/g, "")}`}
            className="hidden sm:inline-flex items-center gap-1.5 text-ivory-400/70 hover:text-ivory-200 transition-colors font-medium font-sans text-xs"
          >
            <Phone className="w-3 h-3 text-gold-400" />
            <span>{clinicConfig.emergencyPhone}</span>
          </a>
          <button
            onClick={() => setIsVisible(false)}
            className="text-ivory-400/50 hover:text-ivory-200 p-0.5 rounded transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
