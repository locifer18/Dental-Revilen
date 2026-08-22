"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatINR, calculateEMIMonthly } from "@/lib/utils";
import { Calculator, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface PresetTreatment {
  name: string;
  cost: number;
}

const presets: PresetTreatment[] = [
  { name: "Single Sitting Root Canal", cost: 9500 },
  { name: "Laser Teeth Whitening", cost: 12500 },
  { name: "Guided Dental Implant", cost: 38000 },
  { name: "Invisalign® Aligners", cost: 75000 },
  { name: "E-max Veneers (4 Teeth)", cost: 88000 },
  { name: "Full Digital Smile Makeover", cost: 120000 },
];

export function EMICalculator() {
  const [cost, setCost] = useState<number>(75000);
  const [tenure, setTenure] = useState<number>(12);

  const monthlyEMI = calculateEMIMonthly(cost, tenure);

  return (
    <div className="bg-white rounded-3xl shadow-elevated border border-stone-200/80 p-6 sm:p-10 max-w-4xl mx-auto">
      <div className="flex items-center justify-between pb-6 border-b border-stone-100 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-pine-100 text-pine-900 flex items-center justify-center">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-2xl font-medium text-charcoal-900">
              0% Interest EMI Estimator
            </h3>
            <p className="text-xs text-stone-500 font-sans">
              Instant paperless approvals with Bajaj Finserv, HDFC, ICICI & leading cards
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pine-50 border border-pine-200 text-pine-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>0% Interest • ₹0 Downpayment</span>
        </div>
      </div>

      {/* Preset Quick Selectors */}
      <div className="py-6">
        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">
          Or Select a Popular Procedure
        </label>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => {
            const isSelected = cost === preset.cost;
            return (
              <button
                key={preset.name}
                type="button"
                onClick={() => setCost(preset.cost)}
                className={`text-xs py-2 px-3.5 rounded-full transition-all border ${
                  isSelected
                    ? "bg-pine-900 text-ivory-50 border-pine-900 shadow-sm"
                    : "bg-stone-50 text-charcoal-700 border-stone-200 hover:bg-stone-100"
                }`}
              >
                {preset.name} ({formatINR(preset.cost)})
              </button>
            );
          })}
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 pb-8">
        {/* Treatment Amount Slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-baseline">
            <label className="text-sm font-medium text-charcoal-800">
              Estimated Treatment Cost
            </label>
            <span className="text-xl font-serif font-bold text-pine-900">
              {formatINR(cost)}
            </span>
          </div>

          <input
            type="range"
            min="5000"
            max="250000"
            step="2500"
            value={cost}
            onChange={(e) => setCost(Number(e.target.value))}
            className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-pine-800 focus:outline-none"
          />

          <div className="flex justify-between text-[11px] text-stone-400">
            <span>₹5,000</span>
            <span>₹1,25,000</span>
            <span>₹2,50,000+</span>
          </div>
        </div>

        {/* Tenure Selection */}
        <div className="space-y-4">
          <div className="flex justify-between items-baseline">
            <label className="text-sm font-medium text-charcoal-800">
              Financing Tenure
            </label>
            <span className="text-base font-semibold text-pine-900">
              {tenure} Months (0% Interest)
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[3, 6, 9, 12].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setTenure(m)}
                className={`py-2.5 text-xs font-semibold rounded-2xl border transition-all ${
                  tenure === m
                    ? "bg-pine-800 text-ivory-50 border-pine-800 shadow-sm"
                    : "bg-white text-charcoal-700 border-stone-200 hover:bg-stone-50"
                }`}
              >
                {m} Mo
              </button>
            ))}
          </div>

          <div className="text-[11px] text-pine-800 flex items-center gap-1.5 font-medium pt-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-pine-700" />
            <span>No hidden compounding, zero pre-closure penalty</span>
          </div>
        </div>
      </div>

      {/* Result Calculation Card */}
      <div className="bg-pine-900 text-ivory-50 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-gold-300 font-semibold block mb-1">
            Your Monthly Investment
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-ivory-50">
              {formatINR(monthlyEMI)}
            </span>
            <span className="text-xs text-ivory-300">/ month for {tenure} months</span>
          </div>
          <p className="text-xs text-ivory-300 mt-2 flex items-center gap-1">
            <span>Total Payable: {formatINR(cost)}</span>
            <span className="text-gold-400 font-semibold ml-2">(Zero Interest Charged)</span>
          </p>
        </div>

        <div className="w-full sm:w-auto">
          <Button
            href="/book"
            variant="gold"
            size="lg"
            className="w-full sm:w-auto"
          >
            Apply for 0% EMI & Book
          </Button>
        </div>
      </div>

      {/* Insurance Partners & Security Note */}
      <div className="pt-6 mt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-pine-700 shrink-0" />
          <span>Paperless instant KYC with Aadhaar / PAN card</span>
        </div>
        <span className="text-[11px] text-stone-400">
          Partnered with Bajaj Finserv, HDFC Bank, ICICI Bank, Axis Bank
        </span>
      </div>
    </div>
  );
}
