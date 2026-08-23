import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { equipmentData } from "@/data/equipmentData";
import { Button } from "@/components/ui/Button";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Technology & Equipment | Revilen Dental Studio",
  description: "Hospital-grade German Class-B sterilization, 3Shape 3D scanners, Carl Zeiss microscopes, and robotic CAD/CAM milling.",
};

export default function TechnologyPage() {
  return (
    <div className="py-10 sm:py-16 bg-stone-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pine-50 border border-pine-200/60 text-pine-800 text-xs font-semibold uppercase tracking-widest font-sans mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-pine-600" />
            Digital Dental Laboratory
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal-950 font-normal tracking-tight leading-tight">
            Technology You Can See.<br className="hidden sm:block" /> Precision You Can Trust.
          </h1>
          <p className="mt-3 text-sm sm:text-base text-stone-500 leading-relaxed font-sans">
            Sub-millimeter surgical accuracy, 100% powderless optical impressions, and hospital-grade sterility.
          </p>
        </div>

        {/* Sterilization banner */}
        <div className="bg-pine-900 text-ivory-50 rounded-2xl p-5 sm:p-8 shadow-elevated border border-pine-800 mb-10 sm:mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-9 space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/25 text-gold-300 text-xs font-semibold uppercase tracking-widest font-sans">
                Cleanroom Protocol
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-ivory-50 leading-snug">
                German MELAG Class-B 7-Stage Sterilization
              </h2>
              <p className="text-sm text-ivory-300 font-light leading-relaxed font-sans">
                Every instrument undergoes enzymatic ultrasonic cavitation, thermo-disinfection, chemical barcode tagging, and fractionated pre-vacuum autoclave steam at 134°C (EN 13060 standard).
              </p>
              {/* Stages — 2-col on mobile, 4-col on sm+ */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                {[["Stage 1–2", "Enzymatic Clean"], ["Stage 3–4", "Ultrasonic Bath"], ["Stage 5–6", "Sealed Pouches"], ["Stage 7", "134°C Class-B"]].map(([label, desc]) => (
                  <div key={label} className="p-3 bg-pine-950/60 rounded-xl border border-pine-800">
                    <span className="text-gold-400 font-semibold text-xs block font-sans">{label}</span>
                    <span className="text-xs text-ivory-300 font-sans">{desc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-3 flex justify-center lg:justify-end">
              <div className="inline-flex flex-col items-center bg-pine-950/80 p-5 rounded-2xl border border-pine-800">
                <ShieldCheck className="w-10 h-10 text-gold-400 mb-2" />
                <span className="font-sans text-base font-bold text-ivory-50">100% Sterile</span>
                <span className="text-xs text-ivory-300 font-sans">Unsealed In Front of You</span>
              </div>
            </div>
          </div>
        </div>

        {/* Equipment list — stacked cards, image on top mobile */}
        <div className="space-y-6 sm:space-y-8">
          {equipmentData.map((eq, idx) => (
            <div key={eq.id} className="bg-white rounded-2xl p-4 sm:p-8 border border-stone-200 shadow-soft">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 items-center">
                {/* Image always on top on mobile */}
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-stone-200 bg-stone-100">
                  <Image src={eq.image} alt={eq.name} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                  <div className="absolute top-3 left-3">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-pine-900/80 text-gold-300 border border-pine-700/40 font-sans backdrop-blur-sm">{eq.brand}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <span className="text-[11px] uppercase font-semibold text-pine-700 tracking-widest font-sans">{eq.category}</span>
                  <h3 className="text-lg sm:text-xl font-semibold text-charcoal-950 font-sans leading-snug">{eq.name}</h3>
                  <p className="text-xs text-stone-400 font-sans">{eq.tagline}</p>
                  <p className="text-sm text-stone-500 leading-relaxed font-sans">{eq.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/70">
                      <span className="text-xs font-semibold text-pine-900 block mb-0.5 font-sans">Clinical Impact</span>
                      <p className="text-xs text-stone-500 font-sans leading-relaxed">{eq.clinicalAdvantage}</p>
                    </div>
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/70">
                      <span className="text-xs font-semibold text-gold-700 block mb-0.5 font-sans">Patient Benefit</span>
                      <p className="text-xs text-stone-500 font-sans leading-relaxed">{eq.patientBenefit}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {eq.techSpecs.map((spec, i) => (
                      <div key={i} className="p-2 bg-stone-100/70 rounded-lg border border-stone-200/60">
                        <span className="text-[10px] text-stone-400 block truncate font-sans">{spec.label}</span>
                        <span className="text-xs font-semibold text-charcoal-900 truncate block mt-0.5 font-sans">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA — full width on mobile */}
        <div className="mt-12 text-center">
          <Button href="/book" variant="primary" size="lg" className="w-full sm:w-auto">
            Experience Our Digital Clinic In Person →
          </Button>
        </div>
      </div>
    </div>
  );
}
