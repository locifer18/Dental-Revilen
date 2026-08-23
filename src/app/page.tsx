import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustBar } from "@/components/home/TrustBar";
import { TreatmentShowcase } from "@/components/home/TreatmentShowcase";
import { SmileComparisonSection } from "@/components/home/SmileComparisonSection";
import { DoctorShowcase } from "@/components/home/DoctorShowcase";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { CtaBanner } from "@/components/home/CtaBanner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <TreatmentShowcase />
      <SmileComparisonSection />
      <DoctorShowcase />
      <TestimonialsCarousel />
      <CtaBanner />
    </>
  );
}