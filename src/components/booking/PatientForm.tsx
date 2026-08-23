import React from "react";
import { BookingPayload } from "@/types";
import { User, Phone, Mail, ShieldCheck, MapPin, Calendar, Stethoscope } from "lucide-react";

export interface PatientFormProps {
  payload: BookingPayload;
  onChange: (fields: Partial<BookingPayload>) => void;
  errors: Record<string, string>;
}

export function PatientForm({ payload, onChange, errors }: PatientFormProps) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-charcoal-900 font-sans">Your Details</h3>
        <p className="text-sm text-stone-500 mt-1 font-sans">Almost done — just confirm your contact info.</p>
      </div>

      {/* Appointment summary — 2-col on mobile, 4-col on sm+ */}
      <div className="p-3 sm:p-4 bg-pine-50/60 rounded-2xl border border-pine-200/60 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-sans">
        <div>
          <span className="text-stone-400 font-medium block mb-0.5">Studio</span>
          <span className="font-semibold text-pine-900 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-pine-700 shrink-0" />
            <span className="truncate">{payload.locationName}</span>
          </span>
        </div>
        <div>
          <span className="text-stone-400 font-medium block mb-0.5">Procedure</span>
          <span className="font-semibold text-pine-900 flex items-center gap-1">
            <Stethoscope className="w-3 h-3 text-pine-700 shrink-0" />
            <span className="truncate">{payload.treatmentTitle}</span>
          </span>
        </div>
        <div>
          <span className="text-stone-400 font-medium block mb-0.5">Doctor</span>
          <span className="font-semibold text-pine-900 flex items-center gap-1">
            <User className="w-3 h-3 text-pine-700 shrink-0" />
            <span className="truncate">{payload.doctorName}</span>
          </span>
        </div>
        <div>
          <span className="text-stone-400 font-medium block mb-0.5">Date & Time</span>
          <span className="font-semibold text-pine-900 flex items-center gap-1">
            <Calendar className="w-3 h-3 text-pine-700 shrink-0" />
            <span className="truncate">{payload.appointmentDate} @ {payload.timeSlot}</span>
          </span>
        </div>
      </div>

      {/* Form fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full name */}
        <div className="sm:col-span-2 space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 font-sans">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={payload.patientName}
              onChange={(e) => onChange({ patientName: e.target.value })}
              placeholder="e.g. Vikramaditya Rathore"
              className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-charcoal-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-pine-500 transition-all font-sans ${
                errors.patientName ? "border-red-400 bg-red-50/20" : "border-stone-200 bg-white"
              }`}
            />
          </div>
          {errors.patientName && <p className="text-xs text-red-600 font-medium font-sans">{errors.patientName}</p>}
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 font-sans">
            Mobile (+91) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1 text-stone-500 text-xs pointer-events-none border-r border-stone-200 pr-2 font-sans">
              <Phone className="w-3.5 h-3.5 text-stone-400" />
              <span>+91</span>
            </div>
            <input
              type="tel"
              value={payload.patientPhone}
              onChange={(e) => onChange({ patientPhone: e.target.value })}
              placeholder="98801 94820"
              maxLength={12}
              className={`w-full pl-20 pr-4 py-3 rounded-xl border text-sm text-charcoal-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-pine-500 transition-all font-sans ${
                errors.patientPhone ? "border-red-400 bg-red-50/20" : "border-stone-200 bg-white"
              }`}
            />
          </div>
          {errors.patientPhone
            ? <p className="text-xs text-red-600 font-medium font-sans">{errors.patientPhone}</p>
            : <p className="text-xs text-stone-400 font-sans">We'll send your confirmation via SMS & WhatsApp</p>
          }
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 font-sans">
            Email <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="email"
              value={payload.patientEmail}
              onChange={(e) => onChange({ patientEmail: e.target.value })}
              placeholder="name@email.com"
              className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-charcoal-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-pine-500 transition-all font-sans ${
                errors.patientEmail ? "border-red-400 bg-red-50/20" : "border-stone-200 bg-white"
              }`}
            />
          </div>
          {errors.patientEmail && <p className="text-xs text-red-600 font-medium font-sans">{errors.patientEmail}</p>}
        </div>

        {/* First visit toggle */}
        <div className="sm:col-span-2">
          <label className="flex items-start gap-3 p-3.5 rounded-xl border border-stone-200 bg-stone-50/50 cursor-pointer hover:bg-stone-100/60 transition-colors">
            <input
              type="checkbox"
              checked={payload.isFirstVisit}
              onChange={(e) => onChange({ isFirstVisit: e.target.checked })}
              className="w-4 h-4 mt-0.5 rounded text-pine-800 focus:ring-pine-500 accent-pine-800 shrink-0"
            />
            <div className="text-sm font-sans">
              <span className="font-semibold text-charcoal-900 block">First visit to Revilen</span>
              <span className="text-stone-500 text-xs">You'll get a complimentary 3D optical scan & diagnostic evaluation.</span>
            </div>
          </label>
        </div>

        {/* Notes */}
        <div className="sm:col-span-2 space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 font-sans">
            Notes for Doctor <span className="text-stone-400 font-normal normal-case">(optional)</span>
          </label>
          <textarea
            rows={3}
            value={payload.notes || ""}
            onChange={(e) => onChange({ notes: e.target.value })}
            placeholder="Describe any pain, cosmetic goals, dental anxiety, or questions..."
            className="w-full p-3.5 rounded-xl border border-stone-200 text-sm text-charcoal-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-pine-500 bg-white transition-all resize-none font-sans"
          />
        </div>
      </div>

      <div className="p-3 bg-stone-100 rounded-xl flex items-center gap-2 text-xs text-stone-600 font-sans">
        <ShieldCheck className="w-4 h-4 text-pine-800 shrink-0" />
        <span>Your data is protected with 256-bit encryption & strict patient confidentiality.</span>
      </div>
    </div>
  );
}
