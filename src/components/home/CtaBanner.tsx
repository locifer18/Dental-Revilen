"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Calendar, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { clinicConfig } from "@/data/clinicConfig";

export function CtaBanner() {
  return (
    <section className="py-20 sm:py-28 hero-gradient-bg relative overflow-hidden">
      {/* Decorative rings */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full border border-gold-400/8 pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full border border-gold-400/5 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_50%,rgba(197,168,128,0.07)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass-apple-dark rounded-4xl p-10 sm:p-16 border border-white/8 shadow-glass-dark text-center space-y-7"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-400/10 border border-gold-400/25 text-gold-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-sm font-semibold uppercase tracking-[0.18em] font-sans">Priority Consultation Booking</span>
          </div>

          <h2 className="font-serif font-light text-ivory-50 leading-[1.08]">
            Your best smile is
            <br className="hidden sm:block" />
            <em className="not-italic shimmer-text">one visit away.</em>
          </h2>

          <p className="text-lg sm:text-xl text-ivory-300/70 max-w-xl mx-auto font-light leading-relaxed font-sans">
            Book a 45-minute consultation. We'll scan your teeth in 3D, show you a treatment plan, and answer every question — no pressure.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button href="/book" variant="gold" size="xl" leftIcon={<Calendar className="w-5 h-5" />}>
              Book Your Consultation
            </Button>
            <a
              href={`tel:${clinicConfig.emergencyPhone.replace(/\s+/g, "")}`}
              className="w-full sm:w-auto px-8 py-4 rounded-full glass border border-white/10 hover:bg-white/10 text-ivory-200 transition-all font-medium text-sm flex items-center justify-center gap-2 font-sans"
            >
              <Phone className="w-4 h-4 text-gold-400" />
              <span>Call Concierge ({clinicConfig.emergencyPhone})</span>
            </a>
          </div>

          <div className="pt-4 flex items-center justify-center gap-6 text-xs text-ivory-400/50 font-light flex-wrap font-sans">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-gold-400/60" />
              <span>German Class-B Sterilization</span>
            </div>
            <span>·</span>
            <span>Zero Hidden Fees</span>
            <span>·</span>
            <span>0% Interest EMI Options</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
