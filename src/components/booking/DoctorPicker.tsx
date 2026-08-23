import React from "react";
import Image from "next/image";
import { doctorsData } from "@/data/doctorsData";
import { CheckCircle2, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DoctorPickerProps {
  selectedDoctorSlug: string;
  onSelect: (doctorSlug: string) => void;
}

export function DoctorPicker({ selectedDoctorSlug, onSelect }: DoctorPickerProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-charcoal-900 font-sans">Choose a Specialist</h3>
        <p className="text-sm text-stone-500 mt-1 font-sans">Pick a doctor or let us assign the best match.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
        {/* Any available */}
        <button
          type="button"
          onClick={() => onSelect("any")}
          className={cn(
            "w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between",
            selectedDoctorSlug === "any"
              ? "border-pine-800 bg-pine-50/50 shadow-subtle ring-1 ring-pine-800"
              : "border-stone-200 bg-white hover:border-stone-300 hover:shadow-soft"
          )}
        >
          {selectedDoctorSlug === "any" && (
            <div className="absolute top-3 right-3">
              <CheckCircle2 className="w-5 h-5 fill-pine-800 text-white" />
            </div>
          )}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-pine-900 text-gold-300 flex items-center justify-center shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-charcoal-900 font-sans">First Available</h4>
              <span className="text-xs text-stone-500 font-sans">Fastest appointment</span>
            </div>
          </div>
          <p className="text-xs text-stone-500 mt-3 pt-3 border-t border-stone-100 font-sans leading-relaxed">
            We assign the most qualified MDS specialist for your procedure.
          </p>
        </button>

        {doctorsData.map((doc) => {
          const isSelected = selectedDoctorSlug === doc.slug;
          return (
            <button
              key={doc.slug}
              type="button"
              onClick={() => onSelect(doc.slug)}
              className={cn(
                "w-full text-left p-4 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between",
                isSelected
                  ? "border-pine-800 bg-pine-50/50 shadow-subtle ring-1 ring-pine-800"
                  : "border-stone-200 bg-white hover:border-stone-300 hover:shadow-soft"
              )}
            >
              {isSelected && (
                <div className="absolute top-3 right-3">
                  <CheckCircle2 className="w-4 h-4 fill-pine-800 text-white" />
                </div>
              )}
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl overflow-hidden relative shrink-0 border border-stone-200">
                  <Image src={doc.image} alt={doc.name} fill sizes="44px" className="object-cover" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-charcoal-900 font-sans truncate">{doc.name}</h4>
                  <span className="text-xs text-pine-700 font-medium block font-sans">{doc.specialty}</span>
                  <span className="text-xs text-stone-400 font-sans">{doc.experienceYears}+ yrs · {doc.verifiedCasesCount}+ cases</span>
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs font-sans">
                <span className="text-stone-500 truncate">{doc.qualification.split(",")[0]}</span>
                <span className="font-semibold text-pine-900 shrink-0 ml-2">₹{doc.consultationFee}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
