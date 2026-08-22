import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { clinicConfig } from "@/data/clinicConfig";
import { ShieldCheck, Heart, Sparkles, Award, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About Revilen Dental Studio | Philosophy & Standards",
  description: "Learn about our founding philosophy: merging master clinical craftsmanship with serene hospitality, 100% digital workflows, and German sterilization.",
};

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-20 bg-stone-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="luxury" size="md" dot className="mb-3">
            Our Story & Philosophy
          </Badge>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-normal tracking-tight">
            Elevating Indian Dentistry Through Art & Science
          </h1>
          <p className="mt-4 text-base sm:text-lg text-stone-600 font-light leading-relaxed">
            Founded with a singular conviction: that world-class dental healthcare should be precise, anxiety-free, and grounded in uncompromising clinical ethics.
          </p>
        </div>

        {/* Studio Manifesto Story */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-soft mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <Badge variant="pine" size="sm">
              The Manifesto
            </Badge>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-950 font-normal leading-snug">
              &ldquo;We don&apos;t just fix teeth. We engineer confidence.&rdquo;
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
              Traditional dentistry in India has long been associated with sterile hospital corridors, intimidating drills, and uncertain treatment timelines. Revilen Dental Studio was established to dismantle these fears.
            </p>
            <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
              By combining AIIMS-trained master prosthodontists, German Carl Zeiss microscopes, and luxury private suites, we deliver an experience that honors your biology and values your time.
            </p>
          </div>

          <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-elevated border border-stone-200 bg-stone-100">
            <Image
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=900&auto=format&fit=crop"
              alt="Dental specialist collaborating in studio"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* 4 Core Tenets Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-soft space-y-2">
            <span className="font-serif text-3xl font-bold text-pine-900/40 block">01</span>
            <h3 className="font-serif text-lg font-semibold text-charcoal-950">
              Less But Better
            </h3>
            <p className="text-xs text-stone-600 font-light leading-relaxed">
              Minimally invasive dentistry that preserves 90%+ of natural tooth structure rather than aggressive grinding.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-soft space-y-2">
            <span className="font-serif text-3xl font-bold text-pine-900/40 block">02</span>
            <h3 className="font-serif text-lg font-semibold text-charcoal-950">
              Technology You See
            </h3>
            <p className="text-xs text-stone-600 font-light leading-relaxed">
              Real-time 3D scans and trial smile previews so you are a collaborator in your treatment, not a passive bystander.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-soft space-y-2">
            <span className="font-serif text-3xl font-bold text-pine-900/40 block">03</span>
            <h3 className="font-serif text-lg font-semibold text-charcoal-950">
              Hospital Cleanroom
            </h3>
            <p className="text-xs text-stone-600 font-light leading-relaxed">
              European Class-B 7-stage autoclaves and HEPA-14 medical filtration ensuring complete peace of mind.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-soft space-y-2">
            <span className="font-serif text-3xl font-bold text-pine-900/40 block">04</span>
            <h3 className="font-serif text-lg font-semibold text-charcoal-950">
              Total Transparency
            </h3>
            <p className="text-xs text-stone-600 font-light leading-relaxed">
              Fixed upfront itemized costs and 0% interest EMI options. No surprises at checkout.
            </p>
          </div>
        </div>

        {/* Revilen Showcase Card */}
        <div className="bg-pine-900 text-ivory-50 rounded-3xl p-8 sm:p-10 border border-pine-800 shadow-elevated flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Flagship Experience</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-ivory-50 font-normal">
              Built as a flagship showcase for elite dental practices.
            </h3>
            <p className="text-xs sm:text-sm text-ivory-300 font-light max-w-xl">
              Revilen Dental Studio demonstrates modern digital patient acquisition, in-chat AI reception, 3D diagnostics showcase, and aesthetic healthcare branding.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <Button href="/book" variant="gold" size="lg" className="w-full sm:w-auto">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
