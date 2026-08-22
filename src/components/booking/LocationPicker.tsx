import React from "react";
import { clinicLocations } from "@/data/clinicConfig";
import { MapPin, CheckCircle2, Clock, Car } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LocationPickerProps {
  selectedLocationId: string;
  onSelect: (locationId: string) => void;
}

export function LocationPicker({ selectedLocationId, onSelect }: LocationPickerProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-serif text-2xl text-charcoal-900 font-medium">
          Choose a Dental Studio
        </h3>
        <p className="text-sm text-stone-500 mt-1">
          Select your most convenient studio across metropolitan India.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {clinicLocations.map((loc) => {
          const isSelected = selectedLocationId === loc.id;
          return (
            <div
              key={loc.id}
              onClick={() => onSelect(loc.id)}
              className={cn(
                "p-5 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between",
                isSelected
                  ? "border-pine-800 bg-pine-50/40 shadow-subtle ring-1 ring-pine-800"
                  : "border-stone-200/80 bg-white hover:border-stone-300 hover:shadow-soft"
              )}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 text-pine-800">
                  <CheckCircle2 className="w-5 h-5 fill-pine-800 text-white" />
                </div>
              )}

              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-pine-700 bg-pine-100/70 px-2.5 py-0.5 rounded-full inline-block mb-2">
                  {loc.tag}
                </span>
                <h4 className="font-serif text-lg font-semibold text-charcoal-900">
                  {loc.city}
                </h4>
                <p className="text-xs text-stone-600 mt-1 line-clamp-2">
                  {loc.address}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-stone-200/60 space-y-1.5 text-[11px] text-stone-500">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-pine-700 shrink-0" />
                  <span>{loc.hours.weekdays}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-pine-700 shrink-0" />
                  <span className="truncate">{loc.parkingInfo}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
