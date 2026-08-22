import React, { useState } from "react";
import { getAvailableDates, getTimeSlotsForDate } from "@/lib/services/bookingService";
import { Calendar, Sun, Sunset, Moon, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SlotMatrixProps {
  selectedDate: string;
  selectedTimeSlot: string;
  onSelectDate: (dateStr: string) => void;
  onSelectSlot: (slotTime: string) => void;
}

export function SlotMatrix({
  selectedDate,
  selectedTimeSlot,
  onSelectDate,
  onSelectSlot,
}: SlotMatrixProps) {
  const dates = getAvailableDates(10);
  const currentDate = selectedDate || dates[0].dateStr;
  const timeSlots = getTimeSlotsForDate(currentDate);

  const morningSlots = timeSlots.filter((s) => s.period === "morning");
  const afternoonSlots = timeSlots.filter((s) => s.period === "afternoon");
  const eveningSlots = timeSlots.filter((s) => s.period === "evening");

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-serif text-2xl text-charcoal-900 font-medium">
          Select Date & Time Slot
        </h3>
        <p className="text-sm text-stone-500 mt-1">
          Pick your preferred consultation date and available arrival window.
        </p>
      </div>

      {/* Date Carousel */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-stone-400 block mb-2.5">
          Available Dates
        </label>
        <div className="flex gap-2.5 overflow-x-auto pb-2 no-scrollbar">
          {dates.map((d) => {
            const isSelected = currentDate === d.dateStr;
            return (
              <button
                key={d.dateStr}
                type="button"
                onClick={() => onSelectDate(d.dateStr)}
                className={cn(
                  "py-3 px-4 rounded-2xl border text-center transition-all shrink-0 min-w-[95px] flex flex-col items-center justify-center",
                  isSelected
                    ? "bg-pine-900 text-ivory-50 border-pine-900 shadow-sm"
                    : "bg-white text-charcoal-800 border-stone-200 hover:border-stone-300 hover:bg-stone-50"
                )}
              >
                <span className="text-[10px] font-semibold uppercase tracking-wider opacity-70">
                  {d.dayOfWeek}
                </span>
                <span className="text-lg font-serif font-bold mt-0.5">
                  {d.displayLabel.split(" ")[1]}
                </span>
                <span className="text-[10px] opacity-80">
                  {d.displayLabel.split(" ")[2]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slots Divided by Period */}
      <div className="space-y-4 pt-2">
        {/* Morning */}
        <div className="p-4 bg-stone-50/70 rounded-2xl border border-stone-200/60">
          <div className="flex items-center gap-2 text-xs font-semibold text-charcoal-800 mb-3">
            <Sun className="w-4 h-4 text-gold-600" />
            <span>Morning Slots (09:30 AM – 01:00 PM)</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {morningSlots.map((slot) => {
              const isSelected = selectedTimeSlot === slot.time;
              return (
                <button
                  key={slot.time}
                  type="button"
                  disabled={!slot.available}
                  onClick={() => onSelectSlot(slot.time)}
                  className={cn(
                    "py-2.5 px-3 rounded-xl text-xs font-semibold transition-all border text-center",
                    !slot.available && "opacity-35 line-through bg-stone-100 text-stone-400 border-stone-200 cursor-not-allowed",
                    slot.available && !isSelected && "bg-white text-charcoal-800 border-stone-200 hover:border-pine-700 hover:bg-pine-50",
                    isSelected && "bg-pine-800 text-ivory-50 border-pine-800 shadow-sm ring-1 ring-pine-800"
                  )}
                >
                  {slot.time}
                </button>
              );
            })}
          </div>
        </div>

        {/* Afternoon */}
        <div className="p-4 bg-stone-50/70 rounded-2xl border border-stone-200/60">
          <div className="flex items-center gap-2 text-xs font-semibold text-charcoal-800 mb-3">
            <Sunset className="w-4 h-4 text-gold-600" />
            <span>Afternoon Slots (02:00 PM – 05:00 PM)</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {afternoonSlots.map((slot) => {
              const isSelected = selectedTimeSlot === slot.time;
              return (
                <button
                  key={slot.time}
                  type="button"
                  disabled={!slot.available}
                  onClick={() => onSelectSlot(slot.time)}
                  className={cn(
                    "py-2.5 px-3 rounded-xl text-xs font-semibold transition-all border text-center",
                    !slot.available && "opacity-35 line-through bg-stone-100 text-stone-400 border-stone-200 cursor-not-allowed",
                    slot.available && !isSelected && "bg-white text-charcoal-800 border-stone-200 hover:border-pine-700 hover:bg-pine-50",
                    isSelected && "bg-pine-800 text-ivory-50 border-pine-800 shadow-sm ring-1 ring-pine-800"
                  )}
                >
                  {slot.time}
                </button>
              );
            })}
          </div>
        </div>

        {/* Evening */}
        <div className="p-4 bg-stone-50/70 rounded-2xl border border-stone-200/60">
          <div className="flex items-center gap-2 text-xs font-semibold text-charcoal-800 mb-3">
            <Moon className="w-4 h-4 text-pine-700" />
            <span>Evening Slots (05:00 PM – 08:00 PM)</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {eveningSlots.map((slot) => {
              const isSelected = selectedTimeSlot === slot.time;
              return (
                <button
                  key={slot.time}
                  type="button"
                  disabled={!slot.available}
                  onClick={() => onSelectSlot(slot.time)}
                  className={cn(
                    "py-2.5 px-3 rounded-xl text-xs font-semibold transition-all border text-center",
                    !slot.available && "opacity-35 line-through bg-stone-100 text-stone-400 border-stone-200 cursor-not-allowed",
                    slot.available && !isSelected && "bg-white text-charcoal-800 border-stone-200 hover:border-pine-700 hover:bg-pine-50",
                    isSelected && "bg-pine-800 text-ivory-50 border-pine-800 shadow-sm ring-1 ring-pine-800"
                  )}
                >
                  {slot.time}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
