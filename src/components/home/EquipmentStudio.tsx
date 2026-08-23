"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { equipmentData } from "@/data/equipmentData";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Cpu, ShieldCheck, Heart, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function EquipmentStudio() {
  const [selectedEquipmentId, setSelectedEquipmentId] = useState(equipmentData[0].id);
  const currentEquipment =
    equipmentData.find((eq) => eq.id === selectedEquipmentId) || equipmentData[0];

  return (
    <section className="py-16 sm:py-24 bg-pine-950 text-ivory-50 relative overflow-hidden">
      {/* Single lightweight glow */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gold-600/8 rounded-full blur-[60px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          dark
          badge="Digital Clinical Lab"
          title={
            <>
              Technology you can see. <br />
              <span className="italic text-gold-300 font-serif">Precision you can trust.</span>
            </>
          }
          subtitle="Hospital-grade German sterilization, 3D bone mapping, and 25x surgical magnification. No guesswork."
        />

        {/* Mobile: horizontal scroll equipment selector */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 mb-6 lg:hidden">
          {equipmentData.map((eq) => (
            <button
              key={eq.id}
              type="button"
              onClick={() => setSelectedEquipmentId(eq.id)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                eq.id === selectedEquipmentId
                  ? "bg-gold-400 text-charcoal-950 border-gold-400"
                  : "bg-pine-900/60 text-ivory-300 border-pine-800"
              }`}
            >
              {eq.name.split(" ").slice(0, 2).join(" ")}
            </button>
          ))}
        </div>

        {/* Main Equipment Interactive Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Interactive Equipment Visual & Specs Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentEquipment.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="bg-pine-900/80 border border-pine-800 rounded-3xl overflow-hidden shadow-float backdrop-blur-sm"
              >
                {/* Equipment Photo */}
                <div className="relative aspect-[16/10] overflow-hidden bg-pine-950">
                  <Image
                    src={currentEquipment.image}
                    alt={currentEquipment.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 700px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pine-950 via-pine-950/30 to-transparent" />

                  {/* Brand Pill */}
                  <div className="absolute top-4 left-4">
                    <Badge variant="luxury" size="sm">
                      {currentEquipment.brand}
                    </Badge>
                  </div>
                </div>

                {/* Body Specs */}
                <div className="p-6 sm:p-8 space-y-5">
                  <div>
                    <span className="text-[11px] uppercase tracking-widest text-gold-400 font-semibold font-sans block mb-1">
                      {currentEquipment.category}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-ivory-50 font-normal">
                      {currentEquipment.name}
                    </h3>
                    <p className="text-sm text-ivory-300 font-light mt-2 leading-relaxed">
                      {currentEquipment.description}
                    </p>
                  </div>

                  {/* Dual Clinical vs Patient Advantage */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-pine-800/80">
                    <div className="p-4 bg-pine-950/60 rounded-2xl border border-pine-800/60 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-gold-300 font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Clinical Advantage</span>
                      </div>
                      <p className="text-xs text-ivory-300 font-light leading-relaxed">
                        {currentEquipment.clinicalAdvantage}
                      </p>
                    </div>

                    <div className="p-4 bg-pine-950/60 rounded-2xl border border-pine-800/60 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-gold-300 font-semibold">
                        <Heart className="w-3.5 h-3.5" />
                        <span>Patient Benefit</span>
                      </div>
                      <p className="text-xs text-ivory-300 font-light leading-relaxed">
                        {currentEquipment.patientBenefit}
                      </p>
                    </div>
                  </div>

                  {/* Technical Spec Matrix */}
                  <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {currentEquipment.techSpecs.map((spec, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-2.5 bg-pine-950/40 rounded-xl border border-pine-800/40"
                      >
                        <span className="text-[10px] text-ivory-400 block font-light truncate">
                          {spec.label}
                        </span>
                        <span className="font-semibold text-ivory-100 mt-0.5 block truncate">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Equipment Selector List — desktop only */}
          <div className="lg:col-span-5 space-y-3 hidden lg:block">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-400 block mb-2">
              Select Dental Equipment
            </span>

            {equipmentData.map((eq) => {
              const isSelected = eq.id === selectedEquipmentId;
              return (
                <button
                  key={eq.id}
                  type="button"
                  onClick={() => setSelectedEquipmentId(eq.id)}
                  className={`w-full p-4 rounded-2xl border transition-all text-left flex items-center justify-between group ${
                    isSelected
                      ? "bg-pine-900 border-gold-500/50 shadow-elevated"
                      : "bg-pine-950/60 border-pine-900 hover:bg-pine-900/40 text-ivory-300"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0 pr-2">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "bg-gold-500 text-charcoal-950 font-bold"
                          : "bg-pine-900 text-ivory-300 group-hover:text-gold-300"
                      }`}
                    >
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h4
                        className={`text-sm font-semibold truncate ${
                          isSelected ? "text-ivory-50" : "text-ivory-200 group-hover:text-white"
                        }`}
                      >
                        {eq.name}
                      </h4>
                      <p className="text-xs text-ivory-400 font-light truncate mt-0.5">
                        {eq.tagline}
                      </p>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected
                        ? "text-gold-400 translate-x-1"
                        : "text-pine-700 opacity-0 group-hover:opacity-100"
                    }`}
                  />
                </button>
              );
            })}

            <div className="pt-4">
              <Button
                href="/technology"
                variant="outline"
                size="md"
                className="w-full text-ivory-50 border-pine-700 hover:bg-pine-900"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Full Facility & Sterilization Protocol
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
