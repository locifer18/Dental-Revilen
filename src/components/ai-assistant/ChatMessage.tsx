"use client";

import React from "react";
import Link from "next/link";
import { AIChatMessage } from "@/lib/services/ai/types";
import { InChatBookingCard } from "./InChatBookingCard";
import { QuickActionsBar } from "./QuickActionsBar";
import { Sparkles, User, ArrowRight, MessageCircle, Phone, ShieldAlert, Calendar } from "lucide-react";
import { getWhatsAppLink } from "@/lib/utils";
import { clinicConfig } from "@/data/clinicConfig";
import { cn } from "@/lib/utils";

export interface ChatMessageProps {
  message: AIChatMessage;
  onSelectSuggestion?: (suggestion: string) => void;
  onSelectQuickAction?: (actionText: string) => void;
}

export function ChatMessage({
  message,
  onSelectSuggestion,
  onSelectQuickAction,
}: ChatMessageProps) {
  const isBot = message.sender === "ora";

  const renderFormattedText = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      // Bold syntax regex **text**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={idx} className={line === "" ? "h-2" : "min-h-[1.2rem]"}>
          {parts.map((part, pIdx) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={pIdx} className="font-semibold text-charcoal-950">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            if (part.startsWith("*") && part.endsWith("*")) {
              return (
                <em key={pIdx} className="italic text-stone-500">
                  {part.slice(1, -1)}
                </em>
              );
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <div
      className={cn(
        "flex gap-2.5 mb-4 max-w-[92%] sm:max-w-[85%]",
        isBot ? "self-start" : "self-end flex-row-reverse"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-serif font-bold shadow-2xs mt-0.5",
          isBot
            ? "bg-pine-900 text-gold-300 border border-gold-500/25"
            : "bg-stone-300 text-charcoal-800"
        )}
      >
        {isBot ? <Sparkles className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
      </div>

      {/* Message Bubble & Interactive Body */}
      <div className="flex flex-col gap-1.5 flex-1 min-w-0">
        <div
          className={cn(
            "p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-2xs",
            isBot
              ? "bg-stone-100/90 text-charcoal-800 rounded-tl-xs border border-stone-200/60"
              : "bg-pine-800 text-ivory-50 rounded-tr-xs"
          )}
        >
          {/* Main Text Content */}
          <div className="space-y-1">{renderFormattedText(message.text)}</div>

          {/* Quick Actions Initial Bar */}
          {isBot && message.type === "quick_actions" && onSelectQuickAction && (
            <div className="mt-3 pt-2 border-t border-stone-200/70">
              <QuickActionsBar onSelectAction={onSelectQuickAction} />
            </div>
          )}

          {/* In-Chat Interactive Booking Card */}
          {isBot && message.type === "booking_flow" && (
            <InChatBookingCard initialDraft={message.bookingDraft} />
          )}

          {/* Emergency Alert Card */}
          {isBot && message.type === "emergency_alert" && (
            <div className="mt-3 p-3 bg-red-50 rounded-xl border border-red-200 text-red-900 space-y-2">
              <div className="flex items-center gap-2 font-semibold">
                <ShieldAlert className="w-4 h-4 text-red-600" />
                <span>Urgent Care Notice</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                If you have uncontrollable bleeding, major trauma, or facial swelling impairing your breathing or swallowing, please contact our emergency line immediately or visit an emergency room.
              </p>
              <a
                href={`tel:${clinicConfig.emergencyPhone.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 text-white font-semibold text-xs shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Emergency Hotline ({clinicConfig.emergencyPhone})</span>
              </a>
            </div>
          )}

          {/* WhatsApp Handoff CTA */}
          {isBot && (message.type === "whatsapp_handoff" || message.whatsappPrefill) && (
            <div className="mt-3 pt-2 border-t border-stone-200/70">
              <a
                href={getWhatsAppLink(
                  clinicConfig.whatsappNumber,
                  message.whatsappPrefill || "Hi ORA Dental Studio, I would like to book a consultation."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366] text-white text-xs font-semibold hover:bg-[#1EBE5D] transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Continue on WhatsApp &rarr;</span>
              </a>
            </div>
          )}

          {/* Action Link Button */}
          {message.actionLink && !message.actionLink.isExternal && (
            <div className="mt-3 pt-2 border-t border-stone-200/60">
              <Link
                href={message.actionLink.href}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pine-900 text-gold-300 hover:bg-pine-950 transition-colors text-xs font-semibold shadow-xs"
              >
                <span>{message.actionLink.label}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          )}
        </div>

        {/* Dynamic Prompt Suggestion Chips */}
        {isBot && message.suggestions && message.suggestions.length > 0 && onSelectSuggestion && (
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {message.suggestions.map((suggestion, sIdx) => (
              <button
                key={sIdx}
                type="button"
                onClick={() => onSelectSuggestion(suggestion)}
                className="text-[11px] py-1 px-3 rounded-full bg-white hover:bg-pine-50 hover:text-pine-900 border border-stone-200 text-charcoal-700 font-medium transition-all shadow-2xs active:scale-95 text-left"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        <span
          className={cn(
            "text-[10px] text-stone-400 px-1",
            isBot ? "text-left" : "text-right"
          )}
        >
          {message.timestamp}
        </span>
      </div>
    </div>
  );
}
