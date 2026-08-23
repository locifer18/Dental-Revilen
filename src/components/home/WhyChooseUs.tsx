"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ShieldCheck, Cpu, Heart, Sparkles, Scale, Lock } from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    color: "pine",
    title: "Hospital-grade sterilization",
    description: "Every instrument is sterilized in our German MELAG autoclave and opened in front of you. Same standard as a surgical theatre.",
  },
  {
    icon: Sparkles,
    color: "gold",
    title: "Completely painless injections",
    description: "The Wand® system delivers numbing fluid so slowly you won't feel a thing. Most patients are surprised it's already done.",
  },
  {
    icon: Cpu,
    color: "pine",
    title: "3D scans, not gooey trays",
    description: "Our intraoral scanner maps your full mouth in under 60 seconds. No mess, no gagging, and far more accurate results.",
  },
  {
    icon: Scale,
    color: "gold",
    title: "Clear pricing & 0% EMI",
    description: "You get a full cost breakdown before we start. Split payments across 3–12 months at zero interest, approved instantly.",
  },
  {
    icon: Heart,
    color: "pine",
    title: "Private suites, not open bays",
    description: "Sound-insulated rooms with 4K ceiling screens and noise-cancelling headphones. Designed for people who hate the dentist.",
  },
  {
    icon: Lock,
    color: "gold",
    title: "Lifetime implant warranty",
    description: "Swiss Straumann & Nobel Biocare implants carry a lifetime international warranty. Zirconia crowns are guaranteed for 15 years.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="The Revilen Standard"
          title={
            <>
              Six things that make
              <br />
              <em className="not-italic shimmer-text">us different.</em>
            </>
          }
          subtitle="We built every part of this clinic around one goal — making you feel safe, informed, and completely at ease."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group p-8 rounded-3xl glass-apple hover:shadow-elevated hover:border-gold-400/25 transition-all duration-400 hover:-translate-y-1.5"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 ${
                pillar.color === "gold"
                  ? "bg-gold-50 border border-gold-200/60"
                  : "bg-pine-50 border border-pine-200/60"
              }`}>
                <pillar.icon className={`w-5 h-5 ${pillar.color === "gold" ? "text-gold-600" : "text-pine-700"}`} />
              </div>

              {/* Clear readable title */}
              <h3 className="font-sans text-lg font-semibold text-charcoal-900 mb-2.5 leading-snug">
                {pillar.title}
              </h3>

              {/* Readable body */}
              <p className="text-base text-stone-500 leading-relaxed font-sans font-normal">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
