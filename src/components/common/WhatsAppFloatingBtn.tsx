"use client";

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { clinicConfig } from "@/data/clinicConfig";
import { getWhatsAppLink } from "@/lib/utils";

export function WhatsAppFloatingBtn() {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl = getWhatsAppLink(
    clinicConfig.whatsappNumber,
    clinicConfig.whatsappDefaultMessage
  );

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center gap-3">
      {/* Tooltip badge */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md text-charcoal-900 px-3.5 py-2 rounded-2xl shadow-float border border-stone-200 text-xs animate-fade-in font-medium">
          <span>Chat with Clinic Concierge</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowTooltip(false);
            }}
            className="text-stone-400 hover:text-charcoal-800 p-0.5 rounded transition-colors"
            aria-label="Dismiss message"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-13 h-13 p-3.5 rounded-full bg-[#25D366] text-white shadow-float hover:scale-105 active:scale-95 transition-all flex items-center justify-center group focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40"
        aria-label="Chat with ORA Dental Studio on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white text-[#25D366]" />
      </a>
    </div>
  );
}
