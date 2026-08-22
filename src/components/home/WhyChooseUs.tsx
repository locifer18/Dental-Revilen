import React from "react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ShieldCheck, Cpu, Heart, Sparkles, Scale, Lock, Clock, Smile } from "lucide-react";

export function WhyChooseUs() {
  const pillars = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-pine-800" />,
      title: "German Class-B Sterilization",
      description: "Fractionated pre-vacuum MELAG autoclave meeting strict European EN 13060 cleanroom standards. Every kit unsealed in front of you.",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-gold-600" />,
      title: "Computerized Painless Anesthesia",
      description: "The Wand® Single Tooth Anesthesia delivers numbing fluid micro-drop by micro-drop below your body's pain perception threshold.",
    },
    {
      icon: <Cpu className="w-6 h-6 text-pine-800" />,
      title: "100% Powderless 3D Impressions",
      description: "No gooey silicone impression trays. Our 3Shape intraoral scanner captures full arches in under 60 seconds with micron accuracy.",
    },
    {
      icon: <Scale className="w-6 h-6 text-gold-600" />,
      title: "Zero Hidden Fees & 0% EMI",
      description: "100% upfront transparent treatment roadmaps. Flexible 0% interest EMI options for 3, 6, 9, or 12 months with paperless approval.",
    },
    {
      icon: <Heart className="w-6 h-6 text-pine-800" />,
      title: "Private Acoustical Luxury Suites",
      description: "Relax in sound-insulated private suites featuring ceiling 4K entertainment screens and noise-cancelling headphones.",
    },
    {
      icon: <Lock className="w-6 h-6 text-gold-600" />,
      title: "Lifelong Warranty Protection",
      description: "Lifetime international manufacturer warranties on Swiss Straumann & Nobel Biocare implants, plus 15-year warranty on zirconia crowns.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="The Revilen Standard"
          title={
            <>
              Six pillars of <br />
              <span className="italic text-pine-900 font-serif">uncompromising dental care.</span>
            </>
          }
          subtitle="Why discerning patients and healthcare leaders choose Revilen Dental Studio for their restorative and cosmetic dentistry."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-stone-50/70 border border-stone-200/80 hover:bg-white hover:shadow-elevated transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-white shadow-soft flex items-center justify-center mb-5 border border-stone-200 group-hover:scale-105 transition-transform">
                {pillar.icon}
              </div>
              <h3 className="font-serif text-xl font-medium text-charcoal-950 mb-2">
                {pillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
