import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { equipmentData } from "@/data/equipmentData";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, Cpu, Sparkles, CheckCircle2, Zap, ArrowRight, HeartHandshake } from "lucide-react";

export const metadata: Metadata = {
  title: "Technology, Equipment & Sterilization | Revilen Dental Studio",
  description: "Explore our hospital-grade German Class-B cleanroom sterilization, 3Shape 3D intraoral scanners, Carl Zeiss operating microscopes, and robotic CAD/CAM milling.",
};

export default function TechnologyPage() {
  return (
    <div className="py-12 sm:py-20 bg-stone-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="luxury" size="md" dot className="mb-3">
            Digital Dental Laboratory & Facility
          </Badge>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-normal tracking-tight">
            Technology You Can See. Precision You Can Trust.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-stone-600 font-light leading-relaxed">
            By eliminating outdated analog techniques, we provide sub-millimeter surgical accuracy, 100% powderless optical impressions, and hospital-grade sterility.
          </p>
        </div>

        {/* 7-Stage Sterilization Cleanroom Feature Banner */}
        <div className="bg-pine-900 text-ivory-50 rounded-3xl p-8 sm:p-12 shadow-elevated border border-pine-800 mb-16 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <Badge variant="luxury" size="sm">
                Cleanroom Protocol
              </Badge>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-ivory-50">
                German MELAG Class-B 7-Stage Sterilization
              </h2>
              <p className="text-sm sm:text-base text-ivory-300 font-light leading-relaxed max-w-2xl">
                Every instrument undergoes enzymatic ultrasonic cavitation, thermo-disinfection, chemical barcode tagging, and fractionated pre-vacuum autoclave steam processing at 134°C (EN 13060 European standard).
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs text-ivory-200">
                <div className="p-3 bg-pine-950/60 rounded-xl border border-pine-800">
                  <span className="text-gold-400 font-semibold block">Stage 1-2</span>
                  <span>Enzymatic Clean</span>
                </div>
                <div className="p-3 bg-pine-950/60 rounded-xl border border-pine-800">
                  <span className="text-gold-400 font-semibold block">Stage 3-4</span>
                  <span>Ultrasonic Bath</span>
                </div>
                <div className="p-3 bg-pine-950/60 rounded-xl border border-pine-800">
                  <span className="text-gold-400 font-semibold block">Stage 5-6</span>
                  <span>Sealed Pouches</span>
                </div>
                <div className="p-3 bg-pine-950/60 rounded-xl border border-pine-800">
                  <span className="text-gold-400 font-semibold block">Stage 7</span>
                  <span>134°C Class-B</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 text-center lg:text-right">
              <div className="inline-flex flex-col items-center bg-pine-950/80 p-6 rounded-2xl border border-pine-800">
                <ShieldCheck className="w-12 h-12 text-gold-400 mb-2" />
                <span className="font-serif text-xl font-bold text-ivory-50">100% Sterile</span>
                <span className="text-xs text-ivory-300">Unsealed In Front of You</span>
              </div>
            </div>
          </div>
        </div>

        {/* Full Equipment Grid */}
        <div className="space-y-12">
          {equipmentData.map((eq, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={eq.id}
                className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-soft grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Visual */}
                <div className={`lg:col-span-6 relative ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-subtle border border-stone-200 bg-stone-100">
                    <Image
                      src={eq.image}
                      alt={eq.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="luxury" size="sm">
                        {eq.brand}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`lg:col-span-6 space-y-4 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                  <div>
                    <span className="text-xs uppercase font-semibold text-pine-800 tracking-wider font-sans block mb-1">
                      {eq.category}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal-950">
                      {eq.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-500 font-medium mt-1">
                      {eq.tagline}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                    {eq.description}
                  </p>

                  {/* Dual Specs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/70">
                      <span className="text-[11px] font-semibold text-pine-900 block mb-0.5">
                        Clinical Impact
                      </span>
                      <p className="text-xs text-stone-600 font-light">{eq.clinicalAdvantage}</p>
                    </div>

                    <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/70">
                      <span className="text-[11px] font-semibold text-gold-800 block mb-0.5">
                        Patient Experience
                      </span>
                      <p className="text-xs text-stone-600 font-light">{eq.patientBenefit}</p>
                    </div>
                  </div>

                  {/* Tech Specs */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
                    {eq.techSpecs.map((spec, sIdx) => (
                      <div key={sIdx} className="p-2 bg-stone-100/70 rounded-lg border border-stone-200/60">
                        <span className="text-[10px] text-stone-400 block truncate">{spec.label}</span>
                        <span className="font-semibold text-charcoal-900 truncate block mt-0.5">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Booking Trigger */}
        <div className="mt-16 text-center">
          <Button href="/book" variant="primary" size="xl">
            Experience Our Digital Clinic in Person &rarr;
          </Button>
        </div>
      </div>
    </div>
  );
}
