"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { testimonialsData } from "@/data/testimonialsData";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Star, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = testimonialsData.length;

  const nextSlide = useCallback(() => setCurrentIndex((p) => (p + 1) % total), [total]);
  const prevSlide = useCallback(() => setCurrentIndex((p) => (p - 1 + total) % total), [total]);

  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(nextSlide, 6000);
    return () => clearInterval(t);
  }, [isPaused, nextSlide]);

  const current = testimonialsData[currentIndex];

  return (
    <section
      className="py-12 sm:py-16 bg-pine-950 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background accents */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_100%,rgba(197,168,128,0.06)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          dark
          badge="Patient Stories"
          title={
            <>
              Trusted across generations,{" "}
              <br />
              <em className="not-italic shimmer-text">celebrated across India.</em>
            </>
          }
          subtitle="Real experiences from patients who entrusted their smiles, health, and comfort to Revilen Dental Studio."
        />

        <div className="max-w-4xl mx-auto">
          {/* Glass card */}
          <div className="glass-apple-dark rounded-3xl p-6 sm:p-10 border border-white/8 shadow-glass-dark relative overflow-hidden">
            {/* Giant decorative quote */}
            <div className="absolute top-6 right-8 font-serif text-[8rem] leading-none text-gold-400/8 select-none pointer-events-none">
              &ldquo;
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                {/* Stars + treatment */}
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < current.rating ? "text-gold-400 fill-gold-400" : "text-white/20"}`} />
                    ))}
                  </div>
                  <span className="text-2xs font-semibold px-3 py-1.5 rounded-full bg-pine-800/60 text-pine-200 border border-pine-700/40 font-sans tracking-wide uppercase">
                    {current.treatment}
                  </span>
                </div>

                {/* Quote */}
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-ivory-50 leading-snug">
                  &ldquo;{current.quote}&rdquo;
                </h3>

                <p className="text-base sm:text-lg text-ivory-300/70 font-light leading-relaxed font-sans">
                  {current.fullReview}
                </p>

                {/* Patient */}
                <div className="pt-5 border-t border-white/8 flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full overflow-hidden relative border border-white/15 shrink-0">
                      <Image src={current.avatarUrl} alt={current.patientName} fill sizes="48px" className="object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-serif font-medium text-ivory-100 text-base">{current.patientName}</h4>
                        {current.verified && <CheckCircle2 className="w-4 h-4 text-pine-400 shrink-0" />}
                      </div>
                      <span className="text-2xs text-ivory-400/60 font-sans">{current.location} · {current.date}</span>
                    </div>
                  </div>
                  <span className="text-2xs text-ivory-400/40 hidden sm:block font-sans">Verified Google Review</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="flex items-center justify-between pt-7 mt-5 border-t border-white/8">
              <div className="flex items-center gap-2">
                {testimonialsData.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentIndex === idx ? "w-8 bg-gold-400" : "w-1.5 bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className="p-2.5 rounded-full border border-white/10 text-ivory-300 hover:bg-white/8 hover:text-ivory-50 transition-all"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-2.5 rounded-full border border-white/10 text-ivory-300 hover:bg-white/8 hover:text-ivory-50 transition-all"
                  aria-label="Next"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
