import React from "react";
import { getAvailableDates, getTimeSlotsForDate } from "@/lib/services/bookingService";
import { Sun, Sunset, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SlotMatrixProps {
  selectedDate: string;
  selectedTimeSlot: string;
  onSelectDate: (dateStr: string) => void;
  onSelectSlot: (slotTime: string) => void;
}

export function SlotMatrix({ selectedDate, selectedTimeSlot, onSelectDate, onSelectSlot }: SlotMatrixProps) {
  const dates = getAvailableDates(10);
  const currentDate = selectedDate || dates[0].dateStr;
  const timeSlots = getTimeSlotsForDate(currentDate);

  const morningSlots = timeSlots.filter((s) => s.period === "morning");
  const afternoonSlots = timeSlots.filter((s) => s.period === "afternoon");
  const eveningSlots = timeSlots.filter((s) => s.period === "evening");

  const SlotGroup = ({ label, icon: Icon, slots }: { label: string; icon: React.ElementType; slots: typeof timeSlots }) => (
    <div className="p-3 sm:p-4 bg-stone-50 rounded-2xl border border-stone-200/60">
      <div className="flex items-center gap-2 text-xs font-semibold text-charcoal-700 mb-3 font-sans">
        <Icon className="w-4 h-4 text-gold-600" />
        <span>{label}</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {slots.map((slot) => {
          const isSelected = selectedTimeSlot === slot.time;
          return (
            <button
              key={slot.time}
              type="button"
              disabled={!slot.available}
              onClick={() => onSelectSlot(slot.time)}
              className={cn(
                "py-2.5 px-2 rounded-xl text-xs font-semibold transition-all border text-center font-sans",
                !slot.available && "opacity-35 line-through bg-stone-100 text-stone-400 border-stone-200 cursor-not-allowed",
                slot.available && !isSelected && "bg-white text-charcoal-800 border-stone-200 hover:border-pine-700 hover:bg-pine-50",
                isSelected && "bg-pine-800 text-ivory-50 border-pine-800 shadow-sm"
              )}
            >
              {slot.time}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-charcoal-900 font-sans">Pick a Date & Time</h3>
        <p className="text-sm text-stone-500 mt-1 font-sans">Choose your preferred appointment slot.</p>
      </div>

      {/* Date carousel */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2.5 font-sans">Available Dates</p>
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {dates.map((d) => {
            const isSelected = currentDate === d.dateStr;
            return (
              <button
                key={d.dateStr}
                type="button"
                onClick={() => onSelectDate(d.dateStr)}
                className={cn(
                  "py-3 px-3 sm:px-4 rounded-2xl border text-center transition-all shrink-0 min-w-[72px] sm:min-w-[88px] flex flex-col items-center",
                  isSelected
                    ? "bg-pine-900 text-ivory-50 border-pine-900 shadow-sm"
                    : "bg-white text-charcoal-800 border-stone-200 hover:border-stone-300 hover:bg-stone-50"
                )}
              >
                <span className="text-[10px] font-semibold uppercase tracking-wider opacity-70 font-sans">{d.dayOfWeek}</span>
                <span className="text-lg font-bold font-sans mt-0.5">{d.displayLabel.split(" ")[1]}</span>
                <span className="text-[10px] opacity-80 font-sans">{d.displayLabel.split(" ")[2]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time slots */}
      <div className="space-y-3">
        <SlotGroup label="Morning · 9:30 AM – 1:00 PM" icon={Sun} slots={morningSlots} />
        <SlotGroup label="Afternoon · 2:00 PM – 5:00 PM" icon={Sunset} slots={afternoonSlots} />
        <SlotGroup label="Evening · 5:00 PM – 8:00 PM" icon={Moon} slots={eveningSlots} />
      </div>
    </div>
  );
}
