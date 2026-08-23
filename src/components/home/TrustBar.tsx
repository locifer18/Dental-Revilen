"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Award, Sparkles, Star, Cpu } from "lucide-react";

const trustPoints = [
  { icon: Shield, title: "German MELAG Class-B", subtitle: "7-Stage Sterile Protocol", gold: false },
  { icon: Award, title: "AIIMS & Manipal Specialists", subtitle: "MDS Super-Specialists", gold: true },
  { icon: Cpu, title: "100% 3D Digital Workflow", subtitle: "3Shape & Sirona CBCT", gold: false },
  { icon: Sparkles, title: "Painless Anesthesia", subtitle: "The Wand® Computerised STA", gold: true },
  { icon: Star, title: "4.9★ Google Rating", subtitle: "1,240+ Verified Reviews", gold: true },
];

export function TrustBar() {
  return (
    <div className="relative bg-pine-950 border-y border-gold-400/10 py-5 overflow-hidden">
      {/* Subtle gradient accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_100%_at_50%_0%,rgba(197,168,128,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile: horizontal scroll. Desktop: grid */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar lg:grid lg:grid-cols-5 lg:items-center">
          {trustPoints.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="flex items-center gap-3 shrink-0 lg:shrink lg:border-r border-white/5 last:border-r-0 px-2 py-1"
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                item.gold
                  ? "bg-gold-400/10 border border-gold-400/20"
                  : "bg-pine-800/60 border border-pine-700/40"
              }`}>
                <item.icon className={`w-4 h-4 ${item.gold ? "text-gold-400" : "text-pine-300"}`} />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-semibold text-ivory-100 truncate font-sans">{item.title}</h4>
                <p className="text-xs text-ivory-400/60 font-light truncate font-sans">{item.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
