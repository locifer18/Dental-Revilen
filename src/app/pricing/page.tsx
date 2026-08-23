import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { treatmentsData } from "@/data/treatmentsData";
import { EMICalculator } from "@/components/common/EMICalculator";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Transparent Pricing & 0% EMI | Revilen Dental Studio",
  description: "View transparent dental treatment pricing in INR and estimate your 0% interest monthly instalment.",
};

export default function PricingPage() {
  return (
    <div className="py-10 sm:py-16 bg-stone-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pine-50 border border-pine-200/60 text-pine-800 text-xs font-semibold uppercase tracking-widest font-sans mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-pine-600" />
            Financial Transparency
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal-950 font-normal tracking-tight leading-tight">
            Transparent Pricing & 0% EMI
          </h1>
          <p className="mt-3 text-sm sm:text-base text-stone-500 leading-relaxed font-sans">
            No surprise add-ons. No hidden fees. Clear digital estimates and interest-free payment options.
          </p>
        </div>

        {/* EMI Calculator */}
        <div className="mb-10 sm:mb-14">
          <EMICalculator />
        </div>

        {/* Price table — horizontal scroll on mobile */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-soft mb-10 sm:mb-14 overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-charcoal-950 font-sans">Standard Clinical Fee Guide</h3>
              <p className="text-xs text-stone-400 mt-0.5 font-sans">All prices include 3D scans and clinical review.</p>
            </div>
            <span className="text-xs font-semibold px-3 py-1.5 bg-pine-100 text-pine-900 rounded-full font-sans self-start sm:self-auto">
              INR (₹) All-Inclusive
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[560px]">
              <thead>
                <tr className="border-b border-stone-100 text-stone-400 font-semibold text-[11px] uppercase tracking-wider font-sans">
                  <th className="py-3 px-4">Treatment</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">0% EMI / mo</th>
                  <th className="py-3 px-4">Longevity</th>
                  <th className="py-3 px-4 text-right">Book</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-charcoal-800">
                {treatmentsData.map((t) => (
                  <tr key={t.slug} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="text-sm font-semibold text-charcoal-900 block font-sans">{t.title}</span>
                      <span className="text-xs text-stone-400 font-sans">{t.tag}</span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-pine-900 text-sm font-sans">{t.priceDisplay}</td>
                    <td className="py-3.5 px-4 font-semibold text-gold-700 text-sm font-sans">{t.emiDisplay}</td>
                    <td className="py-3.5 px-4 text-xs text-stone-500 font-sans">{t.longevity}</td>
                    <td className="py-3.5 px-4 text-right">
                      <Link href={`/book?treatment=${t.slug}`} className="inline-flex items-center gap-1 text-xs font-semibold text-pine-900 hover:underline font-sans">
                        Book <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 0% EMI steps — 1-col mobile, 3-col md+ */}
        <div className="bg-pine-900 text-ivory-50 rounded-2xl p-5 sm:p-8 border border-pine-800 shadow-elevated">
          <div className="mb-6 sm:mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/25 text-gold-300 text-xs font-semibold uppercase tracking-widest font-sans mb-3">
              Instant KYC
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-ivory-50 leading-snug">
              Get 0% EMI in 3 Minutes
            </h3>
            <p className="text-sm text-ivory-300 font-light mt-1.5 font-sans">
              Zero physical paperwork. Instant approval during your consultation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { n: "1", title: "Consultation & 3D Scan", desc: "Meet your specialist and receive a transparent itemized digital treatment plan." },
              { n: "2", title: "Choose Tenure & OTP", desc: "Select 3, 6, 9, or 12 months. Authenticate via instant Aadhaar or card OTP." },
              { n: "3", title: "Begin Treatment Same Day", desc: "₹0 initial downpayment for eligible patients. Start your transformation without delay." },
            ].map((step) => (
              <div key={step.n} className="p-4 sm:p-5 bg-pine-950/60 rounded-2xl border border-pine-800 space-y-2">
                <div className="w-8 h-8 rounded-full bg-gold-500 text-charcoal-950 flex items-center justify-center font-bold text-sm font-sans">{step.n}</div>
                <h4 className="text-sm font-semibold text-ivory-50 font-sans">{step.title}</h4>
                <p className="text-xs text-ivory-300 font-light leading-relaxed font-sans">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Apply button — full width on mobile */}
          <div className="mt-6 flex justify-center sm:justify-start">
            <Button href="/book" variant="gold" size="md" leftIcon={<Calendar className="w-4 h-4" />} className="w-full sm:w-auto">
              Apply for 0% EMI Now
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
