"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, Calendar, ChevronDown, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { clinicConfig } from "@/data/clinicConfig";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
});

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden hero-gradient-bg">
      {/* Static background image — no parallax on mobile for perf */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1400&auto=format&fit=crop"
          alt="Revilen Dental Studio"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-pine-950/85 via-pine-900/65 to-pine-950/95" />
      </div>

      {/* Single subtle orb — GPU-friendly */}
      <div className="absolute top-1/3 right-1/4 w-72 h-72 sm:w-[500px] sm:h-[500px] rounded-full bg-gold-400/5 blur-[80px] pointer-events-none z-0" />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full py-16 sm:py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">

            {/* Left: Text */}
            <div className="lg:col-span-7 space-y-6">

              {/* Eyebrow */}
              <motion.div {...fadeUp(0)}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-gold-400/25 text-gold-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse shrink-0" />
                  <span className="text-xs font-medium tracking-[0.15em] uppercase font-sans">
                    Bengaluru · Mumbai · Gurugram
                  </span>
                </div>
              </motion.div>

              {/* Headline */}
              <motion.h1 {...fadeUp(0.1)} className="font-serif font-light text-ivory-50 leading-[1.04]">
                Modern dentistry.
                <br />
                <em className="not-italic shimmer-text">Designed around</em>
                <br />
                <span className="text-ivory-100">your smile.</span>
              </motion.h1>

              {/* Subtext */}
              <motion.p
                {...fadeUp(0.2)}
                className="text-base sm:text-lg text-ivory-300/80 max-w-lg font-light leading-relaxed font-sans"
              >
                No pain. No surprises. A calm, precise dental visit — with 3D scanning, invisible aligners, and implants that last a lifetime.
              </motion.p>

              {/* CTAs */}
              <motion.div
                {...fadeUp(0.3)}
                className="flex flex-col sm:flex-row gap-3 pt-1"
              >
                <Button
                  href="/book"
                  variant="gold"
                  size="lg"
                  leftIcon={<Calendar className="w-4 h-4" />}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="w-full sm:w-auto"
                >
                  Book an Appointment
                </Button>
                <Button href="/treatments" variant="glass-dark" size="lg" className="w-full sm:w-auto">
                  Explore Treatments
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div
                {...fadeUp(0.4)}
                className="pt-6 border-t border-white/10 grid grid-cols-3 gap-3"
              >
                {[
                  { value: "12+", label: "Years" },
                  { value: clinicConfig.smilesTransformed, label: "Smiles" },
                  { value: `${clinicConfig.googleRating}★`, label: `${clinicConfig.googleReviewsCount} Reviews` },
                ].map((stat, i) => (
                  <div key={i}>
                    <span className="font-serif text-2xl sm:text-4xl font-light text-ivory-50 block shimmer-text">
                      {stat.value}
                    </span>
                    <span className="text-xs text-ivory-400/70 font-sans font-medium mt-0.5 block">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Image — hidden on mobile to save load time */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative hidden lg:block"
            >
              <div className="relative aspect-[4/5] rounded-4xl overflow-hidden border border-white/10 shadow-glass-dark">
                <Image
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop"
                  alt="Revilen Dental Studio suite"
                  fill
                  sizes="40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pine-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-5 right-5">
                  <div className="glass rounded-2xl p-4 border border-white/10">
                    <p className="font-serif text-base font-light italic text-ivory-100 leading-snug">
                      &ldquo;A calmer, pain-free experience that treats you as a whole person.&rdquo;
                    </p>
                    <span className="text-xs tracking-widest uppercase text-gold-300 font-sans font-semibold mt-2 block">
                      Dr. Ananya Sharma · Lead Specialist
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating cards — desktop only */}
              <div className="absolute -top-5 -left-8 glass-card rounded-2xl p-3.5 shadow-glass flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-pine-800/60 text-gold-300 flex items-center justify-center border border-gold-400/20 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-charcoal-900 block">Class-B Sterilization</span>
                  <span className="text-xs text-stone-500">German EN 13060</span>
                </div>
              </div>

              <div className="absolute -bottom-5 -right-8 glass-card rounded-2xl p-3.5 shadow-glass flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gold-400/15 text-gold-600 flex items-center justify-center border border-gold-400/25 shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-charcoal-900 block">0% Interest EMI</span>
                  <span className="text-xs text-stone-500">Instant Approval</span>
                </div>
              </div>

              <div className="absolute top-1/2 -right-7 -translate-y-1/2 glass-card rounded-2xl p-3 shadow-glass flex flex-col items-center gap-1">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-charcoal-900 font-serif">{clinicConfig.googleRating}</span>
                <span className="text-xs text-stone-500 font-sans">Google</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

    </section>
  );
}
