"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Star, ShieldCheck, ArrowRight, Calendar, Award } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { clinicConfig } from "@/data/clinicConfig";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:pt-12 lg:pb-24">
      {/* Subtle architectural background accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pine-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold-100/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Typography & Conversion */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Top Pill */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Badge variant="luxury" size="md" dot>
                Flagship Dental Studios • Bengaluru • Mumbai • Gurugram
              </Badge>
            </motion.div>

            {/* Editorial Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-charcoal-950 font-normal leading-[1.12]"
            >
              Modern dentistry. <br />
              <span className="italic text-pine-900 font-serif">Designed around</span> your smile.
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-stone-600 max-w-xl font-light leading-relaxed"
            >
              Where advanced 3D digital precision meets tranquil luxury healthcare. Experience guided dental implants, Invisalign aligners, handcrafted veneers, and single-sitting root canals with computerized painless anesthesia.
            </motion.p>

            {/* Primary & Secondary Actions */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2"
            >
              <Button
                href="/book"
                variant="primary"
                size="lg"
                leftIcon={<Calendar className="w-4 h-4 text-gold-400" />}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Book an Appointment
              </Button>

              <Button
                href="/treatments"
                variant="secondary"
                size="lg"
              >
                Explore Treatments
              </Button>
            </motion.div>

            {/* Social Proof & Trust Strip */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-6 border-t border-stone-200/80 grid grid-cols-3 gap-4 max-w-lg"
            >
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-pine-950 block">
                  12+
                </span>
                <span className="text-[11px] sm:text-xs text-stone-500 font-medium font-sans">
                  Years of Care
                </span>
              </div>

              <div>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-pine-950 block">
                  {clinicConfig.smilesTransformed}
                </span>
                <span className="text-[11px] sm:text-xs text-stone-500 font-medium font-sans">
                  Smiles Transformed
                </span>
              </div>

              <div>
                <div className="flex items-center gap-1">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-pine-950">
                    {clinicConfig.googleRating}
                  </span>
                  <Star className="w-4 h-4 fill-gold-500 text-gold-500" />
                </div>
                <span className="text-[11px] sm:text-xs text-stone-500 font-medium font-sans">
                  {clinicConfig.googleReviewsCount} Reviews
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Visual Composition with Floating Luxury Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Main Hero Clinic Portrait */}
            <div className="relative aspect-[4/5] sm:aspect-[3/4] rounded-3xl overflow-hidden shadow-float border border-stone-200/90 bg-stone-100">
              <Image
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1000&auto=format&fit=crop"
                alt="Modern luxurious clinic suite at Revilen Dental Studio"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                className="object-cover hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent" />

              {/* Bottom Quote inside Image */}
              <div className="absolute bottom-6 left-6 right-6 text-ivory-50">
                <p className="font-serif text-lg font-light italic leading-snug">
                  &ldquo;A calmer, pain-free dental experience that treats you as a whole person.&rdquo;
                </p>
                <span className="text-[11px] tracking-wider uppercase text-gold-300 font-sans font-semibold mt-1 block">
                  Dr. Ananya Sharma • Lead Specialist
                </span>
              </div>
            </div>

            {/* Floating Trust Card 1 (Top Left) */}
            <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-elevated border border-stone-200/80 flex items-center gap-3 hidden sm:flex animate-float-slow">
              <div className="w-10 h-10 rounded-xl bg-pine-100 text-pine-900 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <span className="font-semibold text-charcoal-900 block">Class-B Sterilization</span>
                <span className="text-stone-500 text-[10px]">German EN 13060 Standard</span>
              </div>
            </div>

            {/* Floating Trust Card 2 (Bottom Right) */}
            <div className="absolute -bottom-5 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-elevated border border-stone-200/80 flex items-center gap-3 hidden sm:flex">
              <div className="w-10 h-10 rounded-xl bg-gold-100 text-gold-900 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <span className="font-semibold text-charcoal-900 block">0% Interest Financing</span>
                <span className="text-stone-500 text-[10px]">Instant Paperless Approval</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
