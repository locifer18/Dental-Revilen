import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Heart, VolumeX, Tv, Sparkles, ShieldCheck, Zap, Coffee, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Anxiety-Free Patient Experience | Revilen Dental Studio",
  description: "Computerized painless anesthesia, noise-cancelling entertainment, conscious sedation, and private acoustical suites.",
};

const amenities = [
  { icon: Zap, color: "gold", title: "Computerized Painless Anesthesia", description: "The Wand® delivers anesthetic micro-drop by micro-drop, eliminating needle pain and preventing facial numbness." },
  { icon: VolumeX, color: "pine", title: "Acoustic Isolation & Noise Cancellation", description: "Private suites with acoustic wall treatments. Put on Bose headphones and listen to your favourite playlist." },
  { icon: Tv, color: "gold", title: "Ceiling 4K Entertainment Screens", description: "Stream Netflix, Apple TV, or calming 4K nature cinematography while we take care of your smile." },
  { icon: Heart, color: "pine", title: "Conscious Nitrous Relaxation", description: "For patients with dental phobia, sweet-air nitrous oxide provides gentle, immediate tranquility." },
  { icon: Sparkles, color: "gold", title: "Aromatherapy & Sensory Calming", description: "Subtle bergamot, lavender, and eucalyptus scents create a spa-like atmosphere from the moment you enter." },
  { icon: Coffee, color: "pine", title: "Refreshment Lounge", description: "Artisanal green teas, infused waters, and warm lemon-scented towel service before and after treatment." },
];

export default function PatientExperiencePage() {
  return (
    <div className="py-10 sm:py-16 bg-stone-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pine-50 border border-pine-200/60 text-pine-800 text-xs font-semibold uppercase tracking-widest font-sans mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-pine-600" />
            Hospitality Meets Healthcare
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal-950 font-normal tracking-tight leading-tight">
            Anxiety-Free Dentistry.<br className="hidden sm:block" /> A Calmer Experience.
          </h1>
          <p className="mt-3 text-sm sm:text-base text-stone-500 leading-relaxed font-sans">
            Every sensory touchpoint redesigned so your dental visit feels like a wellness retreat.
          </p>
        </div>

        {/* Hero card — image stacks on top on mobile */}
        <div className="bg-white rounded-2xl p-4 sm:p-8 border border-stone-200 shadow-soft mb-10 sm:mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 items-center">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pine-50 border border-pine-200/60 text-pine-800 text-xs font-semibold uppercase tracking-widest font-sans">
                Sensory Architecture
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-charcoal-950 font-normal leading-snug">
                Private Suites Built for Total Peace
              </h2>
              <p className="text-sm text-stone-500 leading-relaxed font-sans">
                No crowded open bays. Each patient is welcomed into a private, sound-insulated suite with individualized lighting, temperature control, and personalized entertainment.
              </p>
              {/* Full-width on mobile */}
              <Button href="/book" variant="primary" size="md" leftIcon={<Calendar className="w-4 h-4 text-gold-400" />} className="w-full sm:w-auto">
                Experience It In Person
              </Button>
            </div>
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-stone-200 order-first lg:order-last">
              <Image
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=900&auto=format&fit=crop"
                alt="Private dental suite"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Amenities grid — 1-col mobile, 2-col sm, 3-col lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {amenities.map((item, idx) => (
            <div key={idx} className="p-5 sm:p-6 rounded-2xl bg-white border border-stone-200 shadow-soft hover:shadow-elevated transition-all group hover:-translate-y-1">
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-4 border ${
                item.color === "gold" ? "bg-gold-50 border-gold-200/60" : "bg-pine-50 border-pine-200/60"
              }`}>
                <item.icon className={`w-5 h-5 ${item.color === "gold" ? "text-gold-600" : "text-pine-700"}`} />
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-charcoal-900 mb-2 font-sans leading-snug">{item.title}</h3>
              <p className="text-sm text-stone-500 leading-relaxed font-sans">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA — full width on mobile */}
        <div className="mt-10 sm:mt-14 text-center">
          <Button href="/book" variant="gold" size="lg" className="w-full sm:w-auto">
            Book Your Calm Dental Visit →
          </Button>
        </div>
      </div>
    </div>
  );
}
