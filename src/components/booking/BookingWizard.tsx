"use client";

import React, { useState } from "react";
import { BookingStep, BookingPayload } from "@/types";
import { LocationPicker } from "@/components/booking/LocationPicker";
import { ServicePicker } from "@/components/booking/ServicePicker";
import { DoctorPicker } from "@/components/booking/DoctorPicker";
import { SlotMatrix } from "@/components/booking/SlotMatrix";
import { PatientForm } from "@/components/booking/PatientForm";
import { BookingSuccessCard } from "@/components/booking/BookingSuccessCard";
import { clinicLocations } from "@/data/clinicConfig";
import { treatmentsData } from "@/data/treatmentsData";
import { doctorsData } from "@/data/doctorsData";
import { submitBooking } from "@/lib/services/bookingService";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { isValidIndianPhone, isValidEmail } from "@/lib/utils";

export interface BookingWizardProps {
  initialTreatmentSlug?: string;
  initialDoctorSlug?: string;
  initialLocationId?: string;
}

export function BookingWizard({
  initialTreatmentSlug,
  initialDoctorSlug,
  initialLocationId,
}: BookingWizardProps) {
  const toast = useToast();
  const [currentStep, setCurrentStep] = useState<BookingStep>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [bookingPayload, setBookingPayload] = useState<BookingPayload>(() => {
    const loc = clinicLocations.find((l) => l.id === initialLocationId) || clinicLocations[0];
    const treat = treatmentsData.find((t) => t.slug === initialTreatmentSlug) || treatmentsData[0];
    const doc = doctorsData.find((d) => d.slug === initialDoctorSlug);
    return {
      locationId: loc.id,
      locationName: loc.name,
      treatmentSlug: treat.slug,
      treatmentTitle: treat.title,
      doctorSlug: doc ? doc.slug : "any",
      doctorName: doc ? doc.name : "First Available Specialist",
      appointmentDate: "",
      timeSlot: "",
      patientName: "",
      patientPhone: "",
      patientEmail: "",
      isFirstVisit: true,
      notes: "",
    };
  });

  const [confirmedBooking, setConfirmedBooking] = useState<BookingPayload | null>(null);

  // Update Payload Helpers
  const handleLocationSelect = (locId: string) => {
    const loc = clinicLocations.find((l) => l.id === locId);
    setBookingPayload((prev) => ({
      ...prev,
      locationId: locId,
      locationName: loc ? loc.name : locId,
    }));
  };

  const handleTreatmentSelect = (slug: string) => {
    const treatment = treatmentsData.find((t) => t.slug === slug);
    setBookingPayload((prev) => ({
      ...prev,
      treatmentSlug: slug,
      treatmentTitle: treatment ? treatment.title : slug,
    }));
  };

  const handleDoctorSelect = (docSlug: string) => {
    const doc = doctorsData.find((d) => d.slug === docSlug);
    setBookingPayload((prev) => ({
      ...prev,
      doctorSlug: docSlug,
      doctorName: doc ? doc.name : "First Available Specialist",
    }));
  };

  const handleFormChange = (fields: Partial<BookingPayload>) => {
    setBookingPayload((prev) => ({ ...prev, ...fields }));
    // Clear field-specific error if modified
    const updatedErrors = { ...errors };
    Object.keys(fields).forEach((key) => {
      delete updatedErrors[key];
    });
    setErrors(updatedErrors);
  };

  // Step Validation before progressing
  const validateCurrentStep = (): boolean => {
    if (currentStep === 1) {
      if (!bookingPayload.locationId) {
        toast.error("Please select a studio location.");
        return false;
      }
    }
    if (currentStep === 2) {
      if (!bookingPayload.treatmentSlug) {
        toast.error("Please choose a clinical procedure.");
        return false;
      }
    }
    if (currentStep === 4) {
      if (!bookingPayload.appointmentDate) {
        toast.error("Please select an appointment date.");
        return false;
      }
      if (!bookingPayload.timeSlot) {
        toast.error("Please select a time slot.");
        return false;
      }
    }
    if (currentStep === 5) {
      const newErrors: Record<string, string> = {};
      if (!bookingPayload.patientName || bookingPayload.patientName.trim().length < 2) {
        newErrors.patientName = "Please enter full name.";
      }
      if (!isValidIndianPhone(bookingPayload.patientPhone)) {
        newErrors.patientPhone = "Please enter a valid 10-digit Indian phone number (e.g. 9880194820).";
      }
      if (!isValidEmail(bookingPayload.patientEmail)) {
        newErrors.patientEmail = "Please enter a valid email address.";
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        toast.error("Please complete the required form fields.");
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;
    if (currentStep < 5) {
      setCurrentStep((prev) => (prev + 1) as BookingStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as BookingStep);
    }
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;
    setIsSubmitting(true);

    try {
      const result = await submitBooking(bookingPayload);
      if (result.success && result.data) {
        setConfirmedBooking(result.data);
        setCurrentStep(6);
        toast.success("Your appointment has been scheduled!", "Booking Confirmed");
      } else {
        toast.error(result.error || "Failed to schedule appointment. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("A network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setBookingPayload({
      locationId: clinicLocations[0].id,
      locationName: clinicLocations[0].name,
      treatmentSlug: treatmentsData[0].slug,
      treatmentTitle: treatmentsData[0].title,
      doctorSlug: "any",
      doctorName: "First Available Specialist",
      appointmentDate: "",
      timeSlot: "",
      patientName: "",
      patientPhone: "",
      patientEmail: "",
      isFirstVisit: true,
      notes: "",
    });
    setConfirmedBooking(null);
    setCurrentStep(1);
  };

  const stepLabels = [
    "Studio",
    "Procedure",
    "Specialist",
    "Date & Time",
    "Details",
  ];

  return (
    <div className="bg-white rounded-3xl shadow-elevated border border-stone-200/90 p-6 sm:p-10 max-w-4xl mx-auto">
      {/* Step Progress Bar (Hidden on Step 6) */}
      {currentStep < 6 && (
        <div className="mb-8 pb-6 border-b border-stone-100">
          <div className="flex items-center justify-between">
            {stepLabels.map((label, idx) => {
              const stepNum = idx + 1;
              const isPassed = currentStep > stepNum;
              const isCurrent = currentStep === stepNum;
              return (
                <div key={label} className="flex flex-col items-center gap-1.5 flex-1 relative">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                      isPassed
                        ? "bg-pine-800 text-ivory-50"
                        : isCurrent
                        ? "bg-pine-900 text-gold-300 ring-4 ring-pine-100"
                        : "bg-stone-100 text-stone-400"
                    }`}
                  >
                    {isPassed ? <Check className="w-4 h-4" /> : stepNum}
                  </div>
                  <span
                    className={`text-[11px] font-medium hidden sm:block ${
                      isCurrent ? "text-pine-900 font-semibold" : "text-stone-400"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Dynamic Step View */}
      <div className="min-h-[380px]">
        {currentStep === 1 && (
          <LocationPicker
            selectedLocationId={bookingPayload.locationId}
            onSelect={(id) => {
              handleLocationSelect(id);
              // Auto advance
              setTimeout(() => setCurrentStep(2), 250);
            }}
          />
        )}

        {currentStep === 2 && (
          <ServicePicker
            selectedTreatmentSlug={bookingPayload.treatmentSlug}
            onSelect={(slug) => {
              handleTreatmentSelect(slug);
              // Auto advance
              setTimeout(() => setCurrentStep(3), 250);
            }}
          />
        )}

        {currentStep === 3 && (
          <DoctorPicker
            selectedDoctorSlug={bookingPayload.doctorSlug}
            onSelect={(slug) => {
              handleDoctorSelect(slug);
              // Auto advance
              setTimeout(() => setCurrentStep(4), 250);
            }}
          />
        )}

        {currentStep === 4 && (
          <SlotMatrix
            selectedDate={bookingPayload.appointmentDate}
            selectedTimeSlot={bookingPayload.timeSlot}
            onSelectDate={(d) => handleFormChange({ appointmentDate: d })}
            onSelectSlot={(s) => handleFormChange({ timeSlot: s })}
          />
        )}

        {currentStep === 5 && (
          <PatientForm
            payload={bookingPayload}
            onChange={handleFormChange}
            errors={errors}
          />
        )}

        {currentStep === 6 && confirmedBooking && (
          <BookingSuccessCard
            booking={confirmedBooking}
            onReset={handleReset}
          />
        )}
      </div>

      {/* Footer Navigation Actions (Step 1-5) */}
      {currentStep < 6 && (
        <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="px-4 py-2.5 rounded-full text-xs font-semibold text-charcoal-700 hover:text-charcoal-950 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous Step</span>
          </button>

          <div className="flex items-center gap-3">
            {currentStep < 5 ? (
              <Button
                type="button"
                onClick={handleNext}
                variant="primary"
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Continue
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                isLoading={isSubmitting}
                variant="gold"
                size="lg"
                rightIcon={<Check className="w-4 h-4" />}
              >
                Confirm Appointment
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
