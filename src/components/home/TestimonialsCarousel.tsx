"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { testimonialsData } from "@/data/testimonialsData";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2, Pause, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const total = testimonialsData.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  };

  const current = testimonialsData[currentIndex];

  return (
    <section
      className="py-16 sm:py-24 bg-stone-100/60 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="Patient Testimonials Carousel"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Patient Stories"
          title={
            <>
              Trusted across generations, <br />
              <span className="italic text-pine-900 font-serif">celebrated across India.</span>
            </>
          }
          subtitle="Real experiences from patients who entrusted their smiles, health, and comfort to ORA Dental Studio."
        />

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-elevated border border-stone-200/80 relative">
          <Quote className="w-12 h-12 text-gold-400/30 absolute top-8 right-8 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Rating & Treatment Tag */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < current.rating ? "text-gold-500 fill-gold-500" : "text-stone-300"
                      }`}
                    />
                  ))}
                </div>

                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-pine-100/70 text-pine-900 font-sans">
                  {current.treatment}
                </span>
              </div>

              {/* Headline Quote */}
              <h3 className="font-serif text-xl sm:text-2xl font-medium text-charcoal-950 leading-snug">
                &ldquo;{current.quote}&rdquo;
              </h3>

              {/* Full Review Text */}
              <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
                {current.fullReview}
              </p>

              {/* Patient Identity */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-full overflow-hidden relative border border-stone-200 shrink-0">
                    <Image
                      src={current.avatarUrl}
                      alt={current.patientName}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-serif font-semibold text-charcoal-950 text-base">
                        {current.patientName}
                      </h4>
                      {current.verified && (
                        <span title="Verified Patient Review">
                          <CheckCircle2 className="w-4 h-4 text-pine-700 shrink-0" />
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-stone-500 block">
                      {current.location} • {current.date}
                    </span>
                  </div>
                </div>

                <div className="text-right text-xs text-stone-400 hidden sm:block">
                  Verified Google Review
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Navigation Controls */}
          <div className="flex items-center justify-between pt-8 mt-6 border-t border-stone-100">
            <div className="flex items-center gap-2">
              {testimonialsData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    currentIndex === idx ? "w-8 bg-pine-900" : "w-2 bg-stone-300 hover:bg-stone-400"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="p-2.5 rounded-full border border-stone-200 text-charcoal-700 hover:bg-stone-100 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2.5 rounded-full border border-stone-200 text-charcoal-700 hover:bg-stone-100 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
