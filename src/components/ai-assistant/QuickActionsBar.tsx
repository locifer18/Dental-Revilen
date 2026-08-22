"use client";

import React from "react";
import { Sparkles, Calendar, HelpCircle, MapPin, ShieldAlert, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface QuickActionsBarProps {
  onSelectAction: (actionText: string) => void;
}

export function QuickActionsBar({ onSelectAction }: QuickActionsBarProps) {
  const actions = [
    {
      id: "treatments",
      label: "Explore Treatments",
      icon: <Sparkles className="w-3.5 h-3.5 text-pine-700" />,
      query: "What treatments do you offer and what are their costs?",
    },
    {
      id: "booking",
      label: "Book an Appointment",
      icon: <Calendar className="w-3.5 h-3.5 text-gold-600" />,
      query: "I would like to book an appointment.",
    },
    {
      id: "questions",
      label: "Ask a Dental Question",
      icon: <HelpCircle className="w-3.5 h-3.5 text-pine-700" />,
      query: "Is root canal treatment painful and how long does it take?",
    },
    {
      id: "clinic",
      label: "Clinic Information",
      icon: <MapPin className="w-3.5 h-3.5 text-stone-600" />,
      query: "Where are your clinic locations and what are the operating hours?",
    },
    {
      id: "emergency",
      label: "Emergency / Urgent Help",
      icon: <ShieldAlert className="w-3.5 h-3.5 text-red-600" />,
      query: "I have urgent dental pain or a dental emergency.",
      isUrgent: true,
    },
  ];

  return (
    <div className="pt-2 pb-1 space-y-1.5">
      <span className="text-[10px] uppercase font-semibold tracking-wider text-stone-400 block px-1">
        Quick Action Hub
      </span>
      <div className="grid grid-cols-1 gap-1.5">
        {actions.map((action) => (
          <button
            key={action.id}
            type="button"
            onClick={() => onSelectAction(action.query)}
            className={cn(
              "w-full px-3.5 py-2.5 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between group shadow-2xs",
              action.isUrgent
                ? "bg-red-50/70 border-red-200 text-red-900 hover:bg-red-100/80"
                : "bg-white border-stone-200/80 text-charcoal-800 hover:bg-pine-50/70 hover:border-pine-300 hover:text-pine-900"
            )}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="shrink-0 p-1 rounded-lg bg-stone-100/80 group-hover:bg-white transition-colors">
                {action.icon}
              </div>
              <span className="truncate">{action.label}</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-pine-800 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
          </button>
        ))}
      </div>
    </div>
  );
}
