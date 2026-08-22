"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, MessageCircle, Calendar, ArrowRight, ShieldCheck } from "lucide-react";
import { clinicConfig } from "@/data/clinicConfig";
import { treatmentsData } from "@/data/treatmentsData";
import { getWhatsAppLink } from "@/lib/utils";
import { cn } from "@/lib/utils";

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "All Treatments (12)", href: "/treatments" },
    { label: "Specialist Doctors", href: "/doctors" },
    { label: "Digital Technology", href: "/technology" },
    { label: "Smile Gallery (Before/After)", href: "/smile-gallery" },
    { label: "Patient Experience", href: "/patient-experience" },
    { label: "Pricing & 0% EMI", href: "/pricing" },
    { label: "Locations & Contact", href: "/contact" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-ivory-100 flex flex-col justify-between overflow-y-auto"
        >
          {/* Header */}
          <div className="p-5 border-b border-stone-200/80 flex items-center justify-between sticky top-0 bg-ivory-100/95 backdrop-blur-md z-10">
            <Link
              href="/"
              onClick={onClose}
              className="flex items-center gap-2.5 focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-pine-900 text-gold-300 flex items-center justify-center font-serif text-lg tracking-tight shadow-sm border border-gold-500/20">
                R
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-semibold tracking-tight text-charcoal-950">
                  Revilen
                </span>
                <span className="text-[8px] tracking-[0.2em] uppercase font-semibold text-stone-500 -mt-1 font-sans">
                  Dental Studio
                </span>
              </div>
            </Link>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-stone-200/60 text-charcoal-900 hover:bg-stone-300 transition-colors"
              aria-label="Close navigation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="px-6 py-6 space-y-1">
            {navItems.map((item, idx) => {
              const isActive = pathname === item.href;
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center justify-between py-3.5 px-3 rounded-2xl text-lg font-medium transition-colors",
                      isActive
                        ? "bg-pine-900 text-ivory-50 font-serif"
                        : "text-charcoal-900 hover:bg-stone-200/50"
                    )}
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-4 h-4 opacity-50" />
                  </Link>
                </motion.div>
              );
            })}

            {/* Popular Treatments Quick Pills */}
            <div className="pt-6 pb-2">
              <span className="text-xs uppercase font-semibold tracking-wider text-stone-400 block mb-3 px-3">
                Quick Treatments
              </span>
              <div className="flex flex-wrap gap-2 px-3">
                {treatmentsData.slice(0, 5).map((t) => (
                  <Link
                    key={t.slug}
                    href={`/treatments/${t.slug}`}
                    onClick={onClose}
                    className="text-xs py-2 px-3.5 rounded-full bg-stone-200/70 text-charcoal-800 hover:bg-pine-800 hover:text-white transition-colors"
                  >
                    {t.shortTitle}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-stone-200 bg-stone-100/70 space-y-3">
            <Link
              href="/book"
              onClick={onClose}
              className="w-full py-4 rounded-full bg-pine-900 text-ivory-50 text-center font-medium shadow-elevated flex items-center justify-center gap-2 text-base"
            >
              <Calendar className="w-4 h-4 text-gold-400" />
              <span>Book an Appointment</span>
            </Link>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <a
                href={`tel:${clinicConfig.emergencyPhone.replace(/\s+/g, "")}`}
                className="py-3 px-4 rounded-full bg-white text-charcoal-900 border border-stone-200 text-xs font-semibold flex items-center justify-center gap-2 shadow-soft"
              >
                <Phone className="w-3.5 h-3.5 text-pine-800" />
                <span>Call Clinic</span>
              </a>
              <a
                href={getWhatsAppLink(clinicConfig.whatsappNumber, clinicConfig.whatsappDefaultMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-full bg-white text-[#25D366] border border-stone-200 text-xs font-semibold flex items-center justify-center gap-2 shadow-soft"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-[#25D366]" />
                <span>WhatsApp</span>
              </a>
            </div>

            <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-stone-500">
              <ShieldCheck className="w-3.5 h-3.5 text-pine-700" />
              <span>German Class-B Sterilization Standard</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
