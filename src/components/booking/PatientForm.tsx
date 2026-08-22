import React from "react";
import { BookingPayload } from "@/types";
import { isValidIndianPhone, isValidEmail } from "@/lib/utils";
import { User, Phone, Mail, FileText, CheckCircle2, ShieldCheck, MapPin, Calendar, Clock, Stethoscope } from "lucide-react";

export interface PatientFormProps {
  payload: BookingPayload;
  onChange: (fields: Partial<BookingPayload>) => void;
  errors: Record<string, string>;
}

export function PatientForm({ payload, onChange, errors }: PatientFormProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-serif text-2xl text-charcoal-900 font-medium">
          Patient Information & Review
        </h3>
        <p className="text-sm text-stone-500 mt-1">
          Please provide contact details to confirm your appointment.
        </p>
      </div>

      {/* Appointment Summary Capsule */}
      <div className="p-4 bg-pine-50/60 rounded-2xl border border-pine-200/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div>
          <span className="text-stone-400 font-medium block">Studio Location</span>
          <span className="font-semibold text-pine-950 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3 text-pine-700 shrink-0" />
            <span className="truncate">{payload.locationName}</span>
          </span>
        </div>

        <div>
          <span className="text-stone-400 font-medium block">Procedure</span>
          <span className="font-semibold text-pine-950 flex items-center gap-1 mt-0.5">
            <Stethoscope className="w-3 h-3 text-pine-700 shrink-0" />
            <span className="truncate">{payload.treatmentTitle}</span>
          </span>
        </div>

        <div>
          <span className="text-stone-400 font-medium block">Specialist</span>
          <span className="font-semibold text-pine-950 flex items-center gap-1 mt-0.5">
            <User className="w-3 h-3 text-pine-700 shrink-0" />
            <span className="truncate">{payload.doctorName}</span>
          </span>
        </div>

        <div>
          <span className="text-stone-400 font-medium block">Date & Time</span>
          <span className="font-semibold text-pine-950 flex items-center gap-1 mt-0.5">
            <Calendar className="w-3 h-3 text-pine-700 shrink-0" />
            <span className="truncate">{payload.appointmentDate} @ {payload.timeSlot}</span>
          </span>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="space-y-1 sm:col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700">
            Full Patient Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={payload.patientName}
              onChange={(e) => onChange({ patientName: e.target.value })}
              placeholder="e.g. Vikramaditya Rathore"
              className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-charcoal-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-pine-500 transition-all ${
                errors.patientName ? "border-red-400 bg-red-50/20" : "border-stone-200 bg-white"
              }`}
            />
          </div>
          {errors.patientName && (
            <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.patientName}</p>
          )}
        </div>

        {/* Indian Phone Number */}
        <div className="space-y-1">
          <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700">
            Mobile Number (India +91) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1 text-stone-500 font-medium text-xs pointer-events-none border-r border-stone-200 pr-2">
              <Phone className="w-3.5 h-3.5 text-stone-400" />
              <span>+91</span>
            </div>
            <input
              type="tel"
              value={payload.patientPhone}
              onChange={(e) => onChange({ patientPhone: e.target.value })}
              placeholder="98801 94820"
              maxLength={12}
              className={`w-full pl-20 pr-4 py-3 rounded-xl border text-sm text-charcoal-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-pine-500 transition-all ${
                errors.patientPhone ? "border-red-400 bg-red-50/20" : "border-stone-200 bg-white"
              }`}
            />
          </div>
          {errors.patientPhone ? (
            <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.patientPhone}</p>
          ) : (
            <p className="text-[11px] text-stone-400 mt-0.5">We will send your digital appointment pass via SMS & WhatsApp</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="email"
              value={payload.patientEmail}
              onChange={(e) => onChange({ patientEmail: e.target.value })}
              placeholder="name@company.com"
              className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-charcoal-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-pine-500 transition-all ${
                errors.patientEmail ? "border-red-400 bg-red-50/20" : "border-stone-200 bg-white"
              }`}
            />
          </div>
          {errors.patientEmail && (
            <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.patientEmail}</p>
          )}
        </div>

        {/* First Visit Toggle */}
        <div className="sm:col-span-2 pt-1">
          <label className="flex items-center gap-3 p-3.5 rounded-xl border border-stone-200 bg-stone-50/50 cursor-pointer hover:bg-stone-100/60 transition-colors">
            <input
              type="checkbox"
              checked={payload.isFirstVisit}
              onChange={(e) => onChange({ isFirstVisit: e.target.checked })}
              className="w-4 h-4 rounded text-pine-800 focus:ring-pine-500 accent-pine-800"
            />
            <div className="text-xs">
              <span className="font-semibold text-charcoal-900 block">
                This is my first time visiting ORA Dental Studio
              </span>
              <span className="text-stone-500">
                You will receive a complimentary 3D optical scan & diagnostic evaluation.
              </span>
            </div>
          </label>
        </div>

        {/* Symptoms / Notes */}
        <div className="space-y-1 sm:col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700">
            Specific Symptoms / Clinical Notes (Optional)
          </label>
          <div className="relative">
            <textarea
              rows={3}
              value={payload.notes || ""}
              onChange={(e) => onChange({ notes: e.target.value })}
              placeholder="Describe any toothache, cosmetic goals, dental anxiety, or questions for the doctor..."
              className="w-full p-3.5 rounded-xl border border-stone-200 text-sm text-charcoal-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-pine-500 bg-white transition-all resize-none"
            />
          </div>
        </div>
      </div>

      <div className="p-3 bg-stone-100 rounded-xl flex items-center gap-2 text-xs text-stone-600">
        <ShieldCheck className="w-4 h-4 text-pine-800 shrink-0" />
        <span>Your health data is protected with 256-bit encryption & strict patient confidentiality.</span>
      </div>
    </div>
  );
}
