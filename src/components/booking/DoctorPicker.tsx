import React from "react";
import Image from "next/image";
import { doctorsData } from "@/data/doctorsData";
import { CheckCircle2, UserCheck, Award } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DoctorPickerProps {
  selectedDoctorSlug: string;
  onSelect: (doctorSlug: string) => void;
}

export function DoctorPicker({ selectedDoctorSlug, onSelect }: DoctorPickerProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-serif text-2xl text-charcoal-900 font-medium">
          Select Attending Specialist
        </h3>
        <p className="text-sm text-stone-500 mt-1">
          Choose a specific doctor or select the first available specialist for your case.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-1">
        {/* Option: Any Available Specialist */}
        <div
          onClick={() => onSelect("any")}
          className={cn(
            "p-5 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between",
            selectedDoctorSlug === "any"
              ? "border-pine-800 bg-pine-50/40 shadow-subtle ring-1 ring-pine-800"
              : "border-stone-200/80 bg-white hover:border-stone-300 hover:shadow-soft"
          )}
        >
          {selectedDoctorSlug === "any" && (
            <div className="absolute top-4 right-4 text-pine-800">
              <CheckCircle2 className="w-5 h-5 fill-pine-800 text-white" />
            </div>
          )}

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-pine-900 text-gold-300 flex items-center justify-center font-serif text-lg">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-base font-semibold text-charcoal-900">
                First Available Specialist
              </h4>
              <span className="text-xs text-stone-500 font-sans">
                Fastest appointment matching
              </span>
            </div>
          </div>

          <p className="text-xs text-stone-600 mt-3 pt-3 border-t border-stone-100">
            Our clinical triage will automatically assign the most qualified MDS specialist for your procedure.
          </p>
        </div>

        {/* Doctor List */}
        {doctorsData.map((doc) => {
          const isSelected = selectedDoctorSlug === doc.slug;
          return (
            <div
              key={doc.slug}
              onClick={() => onSelect(doc.slug)}
              className={cn(
                "p-4 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between",
                isSelected
                  ? "border-pine-800 bg-pine-50/40 shadow-subtle ring-1 ring-pine-800"
                  : "border-stone-200/80 bg-white hover:border-stone-300 hover:shadow-soft"
              )}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 text-pine-800">
                  <CheckCircle2 className="w-5 h-5 fill-pine-800 text-white" />
                </div>
              )}

              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl overflow-hidden relative shrink-0 border border-stone-200">
                  <Image
                    src={doc.image}
                    alt={doc.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-charcoal-900">
                    {doc.name}
                  </h4>
                  <span className="text-[11px] text-pine-800 font-medium block">
                    {doc.specialty}
                  </span>
                  <span className="text-[10px] text-stone-400">
                    {doc.experienceYears}+ Years Exp • {doc.verifiedCasesCount}+ Cases
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                <span className="text-stone-600 truncate">{doc.qualification.split(",")[0]}</span>
                <span className="font-semibold text-pine-900 shrink-0">₹{doc.consultationFee}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
