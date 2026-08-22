"use client";

import React, { useState } from "react";
import { BookingPayload } from "@/types";
import { clinicLocations } from "@/data/clinicConfig";
import { treatmentsData } from "@/data/treatmentsData";
import { doctorsData } from "@/data/doctorsData";
import { getAvailableDates, getTimeSlotsForDate, submitBooking } from "@/lib/services/bookingService";
import { isValidIndianPhone, isValidEmail, getGoogleCalendarUrl, getWhatsAppLink } from "@/lib/utils";
import { clinicConfig } from "@/data/clinicConfig";
import { trackChatEvent } from "@/lib/services/ai/analytics";
import {
  Calendar,
  Clock,
  MapPin,
  Stethoscope,
  User,
  Phone,
  Mail,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface InChatBookingCardProps {
  initialDraft?: Partial<BookingPayload>;
  onComplete?: (booking: BookingPayload) => void;
}

export function InChatBookingCard({ initialDraft, onComplete }: InChatBookingCardProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState<BookingPayload>(() => {
    const loc = clinicLocations.find((l) => l.id === initialDraft?.locationId) || clinicLocations[0];
    const treat = treatmentsData.find((t) => t.slug === initialDraft?.treatmentSlug) || treatmentsData[0];
    return {
      locationId: loc.id,
      locationName: loc.name,
      treatmentSlug: treat.slug,
      treatmentTitle: treat.title,
      doctorSlug: "any",
      doctorName: "First Available Specialist",
      appointmentDate: "",
      timeSlot: "",
      patientName: initialDraft?.patientName || "",
      patientPhone: initialDraft?.patientPhone || "",
      patientEmail: initialDraft?.patientEmail || "",
      isFirstVisit: true,
      notes: "",
    };
  });

  const [confirmedBooking, setConfirmedBooking] = useState<BookingPayload | null>(null);

  const dates = getAvailableDates(7);
  const currentDate = form.appointmentDate || dates[0].dateStr;
  const timeSlots = getTimeSlotsForDate(currentDate).filter((s) => s.available).slice(0, 6);

  const handleNext = () => {
    if (step === 3) {
      if (!form.appointmentDate) {
        setForm((prev) => ({ ...prev, appointmentDate: dates[0].dateStr }));
      }
      if (!form.timeSlot) {
        setForm((prev) => ({ ...prev, timeSlot: "10:30 AM" }));
      }
    }

    if (step === 4) {
      const newErrors: Record<string, string> = {};
      if (!form.patientName || form.patientName.trim().length < 2) {
        newErrors.patientName = "Please enter your name";
      }
      if (!isValidIndianPhone(form.patientPhone)) {
        newErrors.patientPhone = "Valid 10-digit mobile required";
      }
      if (!isValidEmail(form.patientEmail)) {
        newErrors.patientEmail = "Valid email required";
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
    }

    setStep((prev) => (prev + 1) as any);
    trackChatEvent("booking_step_completed", { step });
  };

  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);
    try {
      const result = await submitBooking(form);
      if (result.success && result.data) {
        setConfirmedBooking(result.data);
        setStep(6);
        trackChatEvent("booking_completed", { bookingId: result.data.id });
        if (onComplete) onComplete(result.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="my-3 p-4 bg-white rounded-2xl border-2 border-pine-800/40 shadow-soft text-xs space-y-3 animate-fade-in">
      {/* Mini Progress */}
      {step < 6 && (
        <div className="flex items-center justify-between pb-2 border-b border-stone-100 text-[10px] text-stone-400 font-semibold uppercase tracking-wider">
          <span className="text-pine-900 flex items-center gap-1 font-serif text-xs capitalize">
            <Sparkles className="w-3 h-3 text-gold-500" />
            <span>Step {step} of 5: {step === 1 ? "Location" : step === 2 ? "Procedure" : step === 3 ? "Slot" : step === 4 ? "Patient Details" : "Review"}</span>
          </span>
          <span>In-Chat Request</span>
        </div>
      )}

      {/* STEP 1: Location */}
      {step === 1 && (
        <div className="space-y-2">
          <p className="font-semibold text-charcoal-900">Select Studio Location:</p>
          <div className="space-y-1.5">
            {clinicLocations.map((loc) => (
              <button
                key={loc.id}
                type="button"
                onClick={() => {
                  setForm((p) => ({ ...p, locationId: loc.id, locationName: loc.name }));
                  setStep(2);
                }}
                className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                  form.locationId === loc.id
                    ? "bg-pine-50 border-pine-800 text-pine-950 font-semibold"
                    : "bg-stone-50 border-stone-200 text-charcoal-800 hover:bg-stone-100"
                }`}
              >
                <div>
                  <span className="block font-medium">{loc.city}</span>
                  <span className="text-[10px] text-stone-500 font-light truncate block">{loc.address}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2: Treatment */}
      {step === 2 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-charcoal-900">Choose Dental Procedure:</p>
            <button
              onClick={() => setStep(1)}
              className="text-[10px] text-stone-400 hover:text-charcoal-800 underline"
            >
              Change Studio
            </button>
          </div>

          <div className="grid grid-cols-1 gap-1.5 max-h-48 overflow-y-auto pr-1">
            {treatmentsData.slice(0, 6).map((t) => (
              <button
                key={t.slug}
                type="button"
                onClick={() => {
                  setForm((p) => ({ ...p, treatmentSlug: t.slug, treatmentTitle: t.title }));
                  setStep(3);
                }}
                className={`p-2 rounded-xl border text-left flex items-center justify-between transition-all ${
                  form.treatmentSlug === t.slug
                    ? "bg-pine-50 border-pine-800 text-pine-950 font-semibold"
                    : "bg-stone-50 border-stone-200 text-charcoal-800 hover:bg-stone-100"
                }`}
              >
                <div className="min-w-0 pr-2">
                  <span className="font-medium truncate block">{t.shortTitle}</span>
                  <span className="text-[10px] text-stone-500 font-light block">{t.priceDisplay}</span>
                </div>
                <ArrowRight className="w-3 h-3 text-stone-400 shrink-0" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3: Date & Slot */}
      {step === 3 && (
        <div className="space-y-3">
          <p className="font-semibold text-charcoal-900">Choose Date & Preferred Time:</p>

          {/* Mini Date Row */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {dates.slice(0, 5).map((d) => {
              const isSelected = (form.appointmentDate || dates[0].dateStr) === d.dateStr;
              return (
                <button
                  key={d.dateStr}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, appointmentDate: d.dateStr }))}
                  className={`py-1.5 px-2.5 rounded-lg border text-center shrink-0 text-[11px] ${
                    isSelected
                      ? "bg-pine-900 text-ivory-50 border-pine-900 font-semibold"
                      : "bg-stone-50 text-charcoal-700 border-stone-200 hover:bg-stone-100"
                  }`}
                >
                  <span className="block text-[9px] uppercase opacity-75">{d.dayOfWeek}</span>
                  <span className="font-bold">{d.displayLabel.split(" ")[1]}</span>
                </button>
              );
            })}
          </div>

          {/* Mini Slots */}
          <div className="grid grid-cols-3 gap-1.5">
            {timeSlots.map((slot) => {
              const isSelected = form.timeSlot === slot.time;
              return (
                <button
                  key={slot.time}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, timeSlot: slot.time }))}
                  className={`py-1.5 px-2 rounded-lg border text-center text-[11px] font-medium transition-all ${
                    isSelected
                      ? "bg-pine-800 text-ivory-50 border-pine-800 font-semibold shadow-xs"
                      : "bg-white text-charcoal-800 border-stone-200 hover:bg-pine-50"
                  }`}
                >
                  {slot.time}
                </button>
              );
            })}
          </div>

          <div className="flex justify-between pt-1">
            <button onClick={() => setStep(2)} className="text-stone-400 hover:text-charcoal-800">
              ← Back
            </button>
            <Button size="sm" onClick={handleNext}>
              Next: Details &rarr;
            </Button>
          </div>
        </div>
      )}

      {/* STEP 4: Patient Info */}
      {step === 4 && (
        <div className="space-y-2.5">
          <p className="font-semibold text-charcoal-900">Your Contact Details:</p>

          <div>
            <input
              type="text"
              value={form.patientName}
              onChange={(e) => {
                setForm((p) => ({ ...p, patientName: e.target.value }));
                setErrors((er) => ({ ...er, patientName: "" }));
              }}
              placeholder="Full Name *"
              className={`w-full p-2 rounded-lg border text-xs text-charcoal-900 ${
                errors.patientName ? "border-red-400 bg-red-50/20" : "border-stone-200"
              }`}
            />
            {errors.patientName && <p className="text-[10px] text-red-600 mt-0.5">{errors.patientName}</p>}
          </div>

          <div>
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400 text-[11px] font-medium pointer-events-none">
                +91
              </span>
              <input
                type="tel"
                value={form.patientPhone}
                onChange={(e) => {
                  setForm((p) => ({ ...p, patientPhone: e.target.value }));
                  setErrors((er) => ({ ...er, patientPhone: "" }));
                }}
                maxLength={10}
                placeholder="10-digit Phone Number *"
                className={`w-full pl-10 pr-2 py-2 rounded-lg border text-xs text-charcoal-900 ${
                  errors.patientPhone ? "border-red-400 bg-red-50/20" : "border-stone-200"
                }`}
              />
            </div>
            {errors.patientPhone && <p className="text-[10px] text-red-600 mt-0.5">{errors.patientPhone}</p>}
          </div>

          <div>
            <input
              type="email"
              value={form.patientEmail}
              onChange={(e) => {
                setForm((p) => ({ ...p, patientEmail: e.target.value }));
                setErrors((er) => ({ ...er, patientEmail: "" }));
              }}
              placeholder="Email Address *"
              className={`w-full p-2 rounded-lg border text-xs text-charcoal-900 ${
                errors.patientEmail ? "border-red-400 bg-red-50/20" : "border-stone-200"
              }`}
            />
            {errors.patientEmail && <p className="text-[10px] text-red-600 mt-0.5">{errors.patientEmail}</p>}
          </div>

          <div className="flex justify-between pt-1">
            <button onClick={() => setStep(3)} className="text-stone-400 hover:text-charcoal-800">
              ← Back
            </button>
            <Button size="sm" onClick={handleNext}>
              Review Summary &rarr;
            </Button>
          </div>
        </div>
      )}

      {/* STEP 5: Review Summary */}
      {step === 5 && (
        <div className="space-y-3">
          <p className="font-semibold text-charcoal-900 text-sm">Here&apos;s what I have:</p>

          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5 text-xs text-charcoal-800">
            <div className="flex justify-between">
              <span className="text-stone-400 font-medium">Patient:</span>
              <span className="font-semibold text-charcoal-950">{form.patientName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400 font-medium">Treatment:</span>
              <span className="font-semibold text-pine-900">{form.treatmentTitle}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400 font-medium">Studio:</span>
              <span className="font-medium text-charcoal-900">{form.locationName.split("-")[0]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400 font-medium">Date & Time:</span>
              <span className="font-semibold text-charcoal-950">
                {form.appointmentDate || dates[0].dateStr} at {form.timeSlot || "10:30 AM"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400 font-medium">Mobile:</span>
              <span className="text-charcoal-900">+91 {form.patientPhone}</span>
            </div>
          </div>

          <p className="text-[11px] text-stone-500 font-light">
            Would you like me to submit this appointment request?
          </p>

          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={() => setStep(4)}
              className="text-stone-500 hover:text-charcoal-800 underline text-xs"
            >
              Edit Details
            </button>
            <Button
              size="sm"
              variant="gold"
              onClick={handleConfirmSubmit}
              isLoading={isSubmitting}
            >
              Confirm Request &rarr;
            </Button>
          </div>
        </div>
      )}

      {/* STEP 6: Success Pass */}
      {step === 6 && confirmedBooking && (
        <div className="space-y-3 text-center py-2">
          <div className="w-10 h-10 rounded-full bg-pine-100 text-pine-800 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-pine-700" />
          </div>

          <div>
            <span className="font-serif text-base font-semibold text-charcoal-950 block">
              Appointment Request Received!
            </span>
            <p className="text-[11px] text-stone-500 mt-0.5">
              Ref: <strong className="text-pine-900 font-mono">{confirmedBooking.id}</strong>
            </p>
          </div>

          <p className="text-xs text-stone-600 font-light leading-relaxed">
            Our clinic receptionist will contact you via SMS & WhatsApp to confirm your slot.
          </p>

          <div className="flex flex-col gap-2 pt-2">
            <a
              href={getGoogleCalendarUrl({
                title: `Consultation: ${confirmedBooking.treatmentTitle} - ORA Dental Studio`,
                description: `Confirmed appointment ref: ${confirmedBooking.id} at ${confirmedBooking.locationName}`,
                location: confirmedBooking.locationName,
                startDate: confirmedBooking.appointmentDate,
                timeSlot: confirmedBooking.timeSlot,
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 rounded-lg bg-pine-900 text-ivory-50 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5 text-gold-400" />
              <span>Add to Google Calendar</span>
            </a>

            <a
              href={getWhatsAppLink(
                clinicConfig.whatsappNumber,
                `Hi ORA Dental Studio, I submitted appointment request ${confirmedBooking.id} for ${confirmedBooking.treatmentTitle}.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 rounded-lg bg-[#25D366] text-white text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>Send to WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
