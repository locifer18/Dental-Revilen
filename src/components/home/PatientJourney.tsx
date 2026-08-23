import React from "react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Sparkles, Scan, Eye, FileSpreadsheet, HeartPulse, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function PatientJourney() {
  const steps = [
    {
      number: "01",
      icon: <Scan className="w-5 h-5 text-pine-800" />,
      title: "3D Optical Scan & Welcome",
      description:
        "Arrive at our serene lounge. In under 60 seconds, our 3Shape intraoral wand maps your teeth in full 3D with zero gagging or paste.",
    },
    {
      number: "02",
      icon: <Eye className="w-5 h-5 text-gold-600" />,
      title: "Digital Smile Preview",
      description:
        "Watch your simulated future smile on high-resolution 4K screens. Test drive your aesthetic veneer or aligner outcome before treatment begins.",
    },
    {
      number: "03",
      icon: <FileSpreadsheet className="w-5 h-5 text-pine-800" />,
      title: "Transparent Roadmap & 0% EMI",
      description:
        "Receive a clear digital roadmap with itemized pricing, zero hidden surprises, and instant paperless 0% EMI approval.",
    },
    {
      number: "04",
      icon: <HeartPulse className="w-5 h-5 text-gold-600" />,
      title: "Painless Precision Care",
      description:
        "Relax in ergonomic chairs with noise-cancelling entertainment. Computerized anesthesia ensures your visit is completely comfortable.",
    },
    {
      number: "05",
      icon: <ShieldCheck className="w-5 h-5 text-pine-800" />,
      title: "Lifelong Maintenance & Smile Care",
      description:
        "Enjoy comprehensive warranties on restorations and ongoing biannual Swiss EMS AirFlow dental wellness checks.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="The Patient Journey"
          title={
            <>
              From first scan <br />
              <span className="italic text-pine-900 font-serif">to lasting smile.</span>
            </>
          }
          subtitle="Five simple steps. No jargon, no surprises. Just a calm, well-planned visit from start to finish."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 relative pt-4">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className="p-6 rounded-3xl bg-stone-50/70 border border-stone-200/80 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between relative group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-serif text-3xl font-bold text-pine-900/30 group-hover:text-pine-900 transition-colors">
                    {step.number}
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-white shadow-soft flex items-center justify-center border border-stone-200">
                    {step.icon}
                  </div>
                </div>

                <h4 className="font-serif text-xl font-semibold text-charcoal-950 mb-2.5 leading-snug">
                  {step.title}
                </h4>
                <p className="text-sm text-stone-600 font-light leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-200/50 flex items-center gap-1 text-[11px] text-pine-800 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Step {idx + 1} of 5</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>

        {/* Journey Bottom Action */}
        <div className="mt-12 text-center">
          <Button
            href="/patient-experience"
            variant="primary"
            size="lg"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Explore Our Anxiety-Free Amenities
          </Button>
        </div>
      </div>
    </section>
  );
}
