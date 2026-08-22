import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustBar } from "@/components/home/TrustBar";
import { TreatmentShowcase } from "@/components/home/TreatmentShowcase";
import { SmileComparisonSection } from "@/components/home/SmileComparisonSection";
import { EquipmentStudio } from "@/components/home/EquipmentStudio";
import { DoctorShowcase } from "@/components/home/DoctorShowcase";
import { PatientJourney } from "@/components/home/PatientJourney";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { FinancingSection } from "@/components/home/FinancingSection";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { FAQSection } from "@/components/home/FAQSection";
import { CtaBanner } from "@/components/home/CtaBanner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <TreatmentShowcase />
      <SmileComparisonSection />
      <EquipmentStudio />
      <DoctorShowcase />
      <PatientJourney />
      <WhyChooseUs />
      <FinancingSection />
      <TestimonialsCarousel />
      <FAQSection />
      <CtaBanner />
    </>
  );
}
