import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Heart,
  VolumeX,
  Tv,
  Sparkles,
  ShieldCheck,
  Zap,
  Coffee,
  CheckCircle2,
  Calendar,
} from "lucide-react";

export const metadata: Metadata = {
  title: "The Anxiety-Free Patient Experience | Revilen Dental Studio",
  description: "Experience serene dental visits with computerized painless anesthesia, noise-cancelling entertainment, conscious sedation, and private acoustical suites.",
};

export default function PatientExperiencePage() {
  const amenities = [
    {
      icon: <Zap className="w-6 h-6 text-gold-600" />,
      title: "Computerized STA Local Anesthesia",
      description: "The Wand® delivers anesthetic micro-drop by micro-drop with dynamic pressure sensors, eliminating the pain of traditional needles and preventing facial numbness.",
    },
    {
      icon: <VolumeX className="w-6 h-6 text-pine-800" />,
      title: "Acoustical Isolation & Noise Cancellation",
      description: "Our private treatment suites are engineered with acoustic wall treatments to buffer all clinical sounds. Put on Bose headphones and listen to your favourite playlist.",
    },
    {
      icon: <Tv className="w-6 h-6 text-gold-600" />,
      title: "Ceiling 4K Entertainment Screens",
      description: "Lie back in ultra-plush memory foam dental chairs and stream Netflix, Apple TV, or calming 4K nature cinematography while we take care of your smile.",
    },
    {
      icon: <Heart className="w-6 h-6 text-pine-800" />,
      title: "Conscious Nitrous Relaxation",
      description: "For patients with heightened dental phobia or sensitive gag reflexes, sweet-air nitrous oxide conscious sedation provides gentle, immediate tranquility.",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-gold-600" />,
      title: "Aromatherapy & Sensory Calming",
      description: "We eliminate the sterile medical smell. Subtle natural scents of bergamot, lavender, and eucalyptus create a tranquil spa-like atmosphere from the moment you enter.",
    },
    {
      icon: <Coffee className="w-6 h-6 text-pine-800" />,
      title: "Bespoke Beverage & Refreshment Lounge",
      description: "Enjoy artisanal green teas, infused waters, and warm lemon-scented towel service before and after your treatment.",
    },
  ];

  return (
    <div className="py-12 sm:py-20 bg-stone-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="luxury" size="md" dot className="mb-3">
            Hospitality Meets Healthcare
          </Badge>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-normal tracking-tight">
            Anxiety-Free Dentistry. A Calmer Experience.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-stone-600 font-light leading-relaxed">
            We have redesigned every sensory touchpoint to ensure your dental visit feels like a restorative wellness retreat rather than a clinical procedure.
          </p>
        </div>

        {/* Hero Visual Composition */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-soft grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-6 space-y-4">
            <Badge variant="pine" size="sm">
              Sensory Architecture
            </Badge>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-950 font-normal">
              Private Treatment Suites Built for Total Peace
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
              No crowded open bays or rattling instruments. Each patient at Revilen Dental Studio is welcomed into a private, sound-insulated suite with individualized lighting, temperature control, and personalized entertainment.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Button href="/book" variant="primary" size="lg" leftIcon={<Calendar className="w-4 h-4 text-gold-400" />}>
                Experience It In Person
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-[16/11] rounded-2xl overflow-hidden shadow-elevated border border-stone-200">
            <Image
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=900&auto=format&fit=crop"
              alt="Private dental suite"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* 6 Amenities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {amenities.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white border border-stone-200 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center mb-5 border border-stone-200 group-hover:scale-105 transition-transform">
                  {item.icon}
                </div>
                <h3 className="font-serif text-xl font-medium text-charcoal-950 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Booking Trigger */}
        <div className="mt-16 text-center">
          <Button href="/book" variant="gold" size="xl">
            Book Your Calm Dental Visit &rarr;
          </Button>
        </div>
      </div>
    </div>
  );
}
