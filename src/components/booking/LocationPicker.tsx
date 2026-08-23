import React from "react";
import { clinicLocations } from "@/data/clinicConfig";
import { MapPin, Clock, Car, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LocationPickerProps {
  selectedLocationId: string;
  onSelect: (locationId: string) => void;
}

export function LocationPicker({ selectedLocationId, onSelect }: LocationPickerProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-charcoal-900 font-sans">Choose a Studio</h3>
        <p className="text-sm text-stone-500 mt-1 font-sans">Select your most convenient location.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 pt-1">
        {clinicLocations.map((loc) => {
          const isSelected = selectedLocationId === loc.id;
          return (
            <button
              key={loc.id}
              type="button"
              onClick={() => onSelect(loc.id)}
              className={cn(
                "w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between min-h-[140px]",
                isSelected
                  ? "border-pine-800 bg-pine-50/50 shadow-subtle ring-1 ring-pine-800"
                  : "border-stone-200 bg-white hover:border-stone-300 hover:shadow-soft"
              )}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 text-pine-800">
                  <CheckCircle2 className="w-5 h-5 fill-pine-800 text-white" />
                </div>
              )}
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-pine-700 bg-pine-100/70 px-2 py-0.5 rounded-full inline-block mb-2 font-sans">
                  {loc.tag}
                </span>
                <h4 className="text-base font-semibold text-charcoal-900 font-sans">{loc.city}</h4>
                <p className="text-xs text-stone-500 mt-1 line-clamp-2 font-sans leading-relaxed">{loc.address}</p>
              </div>
              <div className="mt-3 pt-3 border-t border-stone-200/60 space-y-1 text-xs text-stone-500 font-sans">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-pine-700 shrink-0" />
                  <span>{loc.hours.weekdays}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-pine-700 shrink-0" />
                  <span className="truncate">{loc.parkingInfo}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
