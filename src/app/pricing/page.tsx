import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { treatmentsData } from "@/data/treatmentsData";
import { EMICalculator } from "@/components/common/EMICalculator";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  CreditCard,
  ShieldCheck,
  Building2,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Transparent Pricing & 0% EMI Financing | Revilen Dental Studio",
  description: "View transparent dental treatment pricing in INR (₹) and estimate your 0% interest monthly instalment with Bajaj Finserv and major credit cards.",
};

export default function PricingPage() {
  return (
    <div className="py-12 sm:py-20 bg-stone-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="luxury" size="md" dot className="mb-3">
            Financial Transparency
          </Badge>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-normal tracking-tight">
            Transparent Pricing & 0% EMI Financing
          </h1>
          <p className="mt-4 text-base sm:text-lg text-stone-600 font-light leading-relaxed">
            No surprise add-ons. No hidden laboratory fees. We provide clear digital estimates and interest-free payment options for all major dental procedures.
          </p>
        </div>

        {/* Embedded Interactive Calculator */}
        <div className="mb-16">
          <EMICalculator />
        </div>

        {/* Comprehensive Treatment Price Schedule Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-soft mb-16">
          <div className="flex items-center justify-between pb-6 border-b border-stone-100 flex-wrap gap-3">
            <div>
              <h3 className="font-serif text-2xl text-charcoal-950 font-medium">
                Standard Clinical Treatment Fee Guide
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                All prices include comprehensive digital 3D scans and clinical review.
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 bg-pine-100 text-pine-900 rounded-full">
              INR (₹) All-Inclusive Pricing
            </span>
          </div>

          <div className="overflow-x-auto pt-4">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-stone-200 text-stone-400 font-semibold uppercase text-[10px] tracking-wider">
                  <th className="py-3.5 px-3">Treatment / Clinical Procedure</th>
                  <th className="py-3.5 px-3">Starting Investment</th>
                  <th className="py-3.5 px-3">0% Interest EMI (12 Mo)</th>
                  <th className="py-3.5 px-3">Expected Longevity</th>
                  <th className="py-3.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-charcoal-800">
                {treatmentsData.map((t) => (
                  <tr key={t.slug} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-4 px-3 font-medium text-charcoal-950">
                      <div>
                        <span className="font-semibold block">{t.title}</span>
                        <span className="text-[11px] text-stone-500 font-normal">{t.tag}</span>
                      </div>
                    </td>
                    <td className="py-4 px-3 font-serif font-bold text-pine-900 text-base">
                      {t.priceDisplay}
                    </td>
                    <td className="py-4 px-3 font-semibold text-gold-700">
                      {t.emiDisplay}
                    </td>
                    <td className="py-4 px-3 text-stone-500 text-xs">
                      {t.longevity}
                    </td>
                    <td className="py-4 px-3 text-right">
                      <Link
                        href={`/book?treatment=${t.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-pine-900 hover:text-pine-950 hover:underline"
                      >
                        <span>Book Slot</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3 Steps for 0% EMI Approval */}
        <div className="bg-pine-900 text-ivory-50 rounded-3xl p-8 sm:p-10 border border-pine-800 shadow-elevated">
          <div className="max-w-3xl mb-8">
            <Badge variant="luxury" size="sm" className="mb-2">
              Instant KYC
            </Badge>
            <h3 className="font-serif text-3xl font-normal text-ivory-50">
              How to Avail 0% Interest EMI in 3 Minutes
            </h3>
            <p className="text-xs sm:text-sm text-ivory-300 font-light mt-1.5">
              Zero physical paperwork required. Avail instant approval right during your consultation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-pine-950/60 rounded-2xl border border-pine-800 space-y-2">
              <div className="w-8 h-8 rounded-full bg-gold-500 text-charcoal-950 flex items-center justify-center font-bold text-xs">
                1
              </div>
              <h4 className="font-serif text-base font-semibold text-ivory-50">
                Consultation & Digital Scan
              </h4>
              <p className="text-xs text-ivory-300 font-light leading-relaxed">
                Meet your specialist and receive your transparent itemized digital treatment plan.
              </p>
            </div>

            <div className="p-5 bg-pine-950/60 rounded-2xl border border-pine-800 space-y-2">
              <div className="w-8 h-8 rounded-full bg-gold-500 text-charcoal-950 flex items-center justify-center font-bold text-xs">
                2
              </div>
              <h4 className="font-serif text-base font-semibold text-ivory-50">
                Choose Tenure & Digital OTP
              </h4>
              <p className="text-xs text-ivory-300 font-light leading-relaxed">
                Select 3, 6, 9, or 12 months tenure. Authenticate via instant Aadhaar or card OTP.
              </p>
            </div>

            <div className="p-5 bg-pine-950/60 rounded-2xl border border-pine-800 space-y-2">
              <div className="w-8 h-8 rounded-full bg-gold-500 text-charcoal-950 flex items-center justify-center font-bold text-xs">
                3
              </div>
              <h4 className="font-serif text-base font-semibold text-ivory-50">
                Begin Treatment Same Day
              </h4>
              <p className="text-xs text-ivory-300 font-light leading-relaxed">
                ₹0 initial downpayment for eligible patients. Start your transformation without delay.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
