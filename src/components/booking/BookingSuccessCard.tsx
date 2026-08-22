"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { BookingPayload } from "@/types";
import { CheckCircle2, Calendar, MapPin, Stethoscope, User, Download, Share2, MessageCircle, ArrowRight, Printer } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getGoogleCalendarUrl, getWhatsAppLink } from "@/lib/utils";
import { clinicConfig } from "@/data/clinicConfig";

export interface BookingSuccessCardProps {
  booking: BookingPayload;
  onReset: () => void;
}

export function BookingSuccessCard({ booking, onReset }: BookingSuccessCardProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const googleCalUrl = getGoogleCalendarUrl({
    title: `Dental Consultation: ${booking.treatmentTitle} - Revilen Dental Studio`,
    description: `Confirmed appointment at ${booking.locationName} with ${booking.doctorName}. Booking Ref: ${booking.id}. Please arrive 10 minutes prior for complimentary 3D optical scanning.`,
    location: booking.locationName,
    startDate: booking.appointmentDate,
    timeSlot: booking.timeSlot,
  });

  const whatsappConfirmationText = `Hi Revilen Dental Studio, I have booked consultation ${booking.id} for ${booking.treatmentTitle} on ${booking.appointmentDate} at ${booking.timeSlot}. Please confirm my priority arrival pass.`;
  const whatsappUrl = getWhatsAppLink(clinicConfig.whatsappNumber, whatsappConfirmationText);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-2xl mx-auto text-center">
      {/* Success Badge */}
      <div className="inline-flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-pine-100 text-pine-800 flex items-center justify-center mb-3 shadow-soft border-2 border-pine-200">
          <CheckCircle2 className="w-8 h-8 text-pine-700" />
        </div>
        <span className="text-xs uppercase tracking-widest text-gold-600 font-bold">
          Appointment Confirmed
        </span>
        <h3 className="font-serif text-3xl sm:text-4xl text-charcoal-950 font-normal mt-1">
          Your Smile Session is Reserved
        </h3>
        <p className="text-sm text-stone-600 mt-2 max-w-md">
          A confirmation SMS and WhatsApp message have been sent to{" "}
          <strong className="text-charcoal-900 font-semibold">{booking.patientPhone}</strong>.
        </p>
      </div>

      {/* Digital Appointment Pass */}
      <div
        ref={printRef}
        className="bg-white rounded-3xl shadow-float border-2 border-stone-200 p-6 sm:p-8 text-left relative overflow-hidden"
      >
        {/* Pass Header */}
        <div className="flex items-center justify-between pb-5 border-b border-stone-200/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-pine-900 text-gold-300 flex items-center justify-center font-serif font-bold text-sm">
              R
            </div>
            <div>
              <span className="font-serif font-semibold text-charcoal-950 text-base block">
                Revilen Dental Studio
              </span>
              <span className="text-[9px] uppercase tracking-widest text-stone-500 font-sans block -mt-1">
                Priority Patient Pass
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider block">
              Reference ID
            </span>
            <span className="font-mono text-sm font-bold text-pine-900 bg-pine-50 px-2.5 py-1 rounded-lg border border-pine-200">
              {booking.id}
            </span>
          </div>
        </div>

        {/* Pass Body Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5 border-b border-stone-200/80 text-xs">
          <div className="space-y-1">
            <span className="text-stone-400 font-medium">Patient Name</span>
            <p className="font-semibold text-charcoal-950 text-sm">{booking.patientName}</p>
          </div>

          <div className="space-y-1">
            <span className="text-stone-400 font-medium">Specialist Procedure</span>
            <p className="font-semibold text-pine-900 text-sm flex items-center gap-1">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>{booking.treatmentTitle}</span>
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-stone-400 font-medium">Studio Location</span>
            <p className="font-medium text-charcoal-900 text-xs flex items-start gap-1">
              <MapPin className="w-3.5 h-3.5 text-pine-700 shrink-0 mt-0.5" />
              <span>{booking.locationName}</span>
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-stone-400 font-medium">Scheduled Date & Time</span>
            <p className="font-semibold text-charcoal-950 text-sm flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-gold-600" />
              <span>{booking.appointmentDate} at {booking.timeSlot}</span>
            </p>
          </div>
        </div>

        {/* Pass Footer */}
        <div className="pt-4 flex items-center justify-between">
          <div className="text-[11px] text-stone-500 space-y-0.5">
            <p>• Complimentary Valet Parking included</p>
            <p>• Please arrive 10 minutes prior for digital scanning</p>
          </div>

          {/* QR Code Graphic Placeholder */}
          <div className="w-16 h-16 bg-stone-100 rounded-xl p-1.5 border border-stone-300 flex flex-col items-center justify-center shrink-0">
            <div className="w-full h-full bg-charcoal-900 rounded grid grid-cols-3 gap-0.5 p-1">
              <div className="bg-white rounded-xs" />
              <div className="bg-white rounded-xs" />
              <div className="bg-transparent" />
              <div className="bg-white rounded-xs" />
              <div className="bg-transparent" />
              <div className="bg-white rounded-xs" />
              <div className="bg-white rounded-xs" />
              <div className="bg-white rounded-xs" />
              <div className="bg-white rounded-xs" />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons Hub */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <a
          href={googleCalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-5 py-3 rounded-full bg-pine-900 text-ivory-50 text-xs font-semibold hover:bg-pine-800 transition-colors flex items-center justify-center gap-2 shadow-soft"
        >
          <Calendar className="w-4 h-4 text-gold-400" />
          <span>Add to Google Calendar</span>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-5 py-3 rounded-full bg-[#25D366] text-white text-xs font-semibold hover:bg-[#1EBE5D] transition-colors flex items-center justify-center gap-2 shadow-soft"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>Send to WhatsApp</span>
        </a>

        <button
          onClick={handlePrint}
          className="w-full sm:w-auto px-5 py-3 rounded-full border border-stone-300 hover:bg-stone-100 text-charcoal-800 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <Printer className="w-4 h-4 text-stone-600" />
          <span>Print Pass</span>
        </button>
      </div>

      <div className="pt-4">
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-stone-500 hover:text-pine-900 underline font-medium"
        >
          Book another appointment &rarr;
        </button>
      </div>
    </div>
  );
}
