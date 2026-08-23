import React from "react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { EMICalculator } from "@/components/common/EMICalculator";
import { ShieldCheck, CreditCard, Building2, HeartHandshake } from "lucide-react";

export function FinancingSection() {
  const insuranceFeatures = [
    {
      icon: <Building2 className="w-5 h-5 text-pine-800" />,
      title: "Corporate Dental Desk",
      desc: "Direct itemized GST invoices & diagnostic dental documentation for your corporate wellness claims.",
    },
    {
      icon: <CreditCard className="w-5 h-5 text-gold-600" />,
      title: "0% Interest Credit Cards",
      desc: "Split into 3, 6, 9, or 12 monthly instalments across HDFC, ICICI, SBI, Axis, and Amex.",
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-pine-800" />,
      title: "Paperless Bajaj Finserv",
      desc: "Zero downpayment instant approval with Aadhaar and PAN card verification in under 5 minutes.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-stone-50/70 border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Transparent Financing"
          title={
            <>
              World-class care, <br />
              <span className="italic text-pine-900 font-serif">pay in easy instalments.</span>
            </>
          }
          subtitle="Split any treatment across 3–12 months at 0% interest. Instant approval, no paperwork."
        />

        {/* Embedded Interactive EMI Calculator */}
        <EMICalculator />

        {/* 3 Insurance Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
          {insuranceFeatures.map((f, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-stone-200 shadow-soft flex items-start gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center shrink-0">
                {f.icon}
              </div>
              <div>
                <h4 className="text-base font-semibold text-charcoal-950 font-serif">
                  {f.title}
                </h4>
                <p className="text-sm text-stone-500 font-light mt-1 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
