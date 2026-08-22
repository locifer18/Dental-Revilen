"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ImageComparisonSlider } from "@/components/ui/ImageComparisonSlider";
import { transformationsData } from "@/data/transformationsData";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Sparkles, Calendar, Check, ArrowRight, ShieldCheck, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function SmileComparisonSection() {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const currentCase = transformationsData[activeCaseIndex];

  return (
    <section className="py-16 sm:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Transformation Studio"
          title={
            <>
              Your smile, <br />
              <span className="italic text-pine-900 font-serif">redesigned with art & science.</span>
            </>
          }
          subtitle="Experience real clinical aesthetics. Drag the slider to reveal the precision of our Digital Smile Design and minimal-prep ceramic artistry."
        />

        {/* Case Switcher Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {transformationsData.map((c, idx) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveCaseIndex(idx)}
              className={`text-xs py-2 px-4 rounded-full font-medium transition-all ${
                activeCaseIndex === idx
                  ? "bg-pine-900 text-ivory-50 shadow-sm"
                  : "bg-stone-100 text-charcoal-700 hover:bg-stone-200/70"
              }`}
            >
              Case 0{idx + 1}: {c.treatmentType.split("(")[0]}
            </button>
          ))}
        </div>

        {/* Main Interactive Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center bg-stone-50/70 rounded-3xl p-6 sm:p-10 border border-stone-200/80">
          {/* Left Column: Interactive Slider */}
          <div className="lg:col-span-7 space-y-3">
            <ImageComparisonSlider
              key={currentCase.id}
              beforeImage={currentCase.beforeImage}
              afterImage={currentCase.afterImage}
              beforeLabel="Before Treatment"
              afterLabel="Completed Result"
              aspectRatio="16/9"
            />
            <div className="flex items-center justify-between text-[11px] text-stone-400 px-2">
              <span>← Drag slider horizontally to compare →</span>
              <span>Sample Clinical Case Demonstration</span>
            </div>
          </div>

          {/* Right Column: Case Clinical Dossier */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <span className="text-xs uppercase tracking-widest text-gold-600 font-bold block mb-1">
                Case Study • {currentCase.treatmentType}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-charcoal-950 font-normal leading-snug">
                {currentCase.title}
              </h3>
            </div>

            <p className="text-sm text-stone-600 font-light leading-relaxed">
              {currentCase.description}
            </p>

            {/* Clinical Highlights Grid */}
            <div className="space-y-3 pt-2">
              <div className="p-3.5 bg-white rounded-2xl border border-stone-200/70 space-y-1">
                <span className="text-[10px] uppercase font-semibold text-stone-400 block tracking-wider">
                  Clinical Protocol
                </span>
                <p className="text-xs text-charcoal-800 font-medium">
                  {currentCase.clinicalNotes}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-stone-200/70">
                  <span className="text-[10px] text-stone-400 block">Duration</span>
                  <span className="font-semibold text-pine-950 flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3 h-3 text-pine-700" />
                    <span>{currentCase.duration}</span>
                  </span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-stone-200/70">
                  <span className="text-[10px] text-stone-400 block">Lead Specialist</span>
                  <span className="font-semibold text-pine-950 flex items-center gap-1 mt-0.5 truncate">
                    <UserCheck className="w-3 h-3 text-pine-700 shrink-0" />
                    <span className="truncate">{currentCase.doctorName}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <Button
                href="/book"
                variant="primary"
                size="md"
                className="w-full sm:w-auto"
              >
                Book Your Transformation
              </Button>
              <Link
                href="/smile-gallery"
                className="text-xs text-pine-900 font-semibold hover:underline flex items-center gap-1 py-2"
              >
                <span>View Full Gallery</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
