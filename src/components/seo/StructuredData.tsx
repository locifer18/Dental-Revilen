import React from "react";
import { clinicConfig, clinicLocations } from "@/data/clinicConfig";
import { faqsData } from "@/data/faqsData";

export function StructuredData() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": "https://revilendental.com/#dentist",
    name: clinicConfig.name,
    description: clinicConfig.subTagline,
    url: "https://revilendental.com",
    telephone: clinicConfig.emergencyPhone,
    priceRange: "₹₹₹",
    openingHours: "Mo-Sa 09:00-20:30, Su 10:00-16:00",
    hasMap: clinicLocations[0].directionsUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: clinicLocations[0].address,
      addressLocality: clinicLocations[0].city,
      addressRegion: "Karnataka",
      postalCode: "560038",
      addressCountry: "IN",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: clinicConfig.googleRating,
      reviewCount: clinicConfig.googleReviewsCount.replace("+", ""),
      bestRating: "5",
      worstRating: "1",
    },
    medicalSpecialty: [
      "Dentistry",
      "Prosthodontics",
      "Orthodontics",
      "Endodontics",
      "Oral and Maxillofacial Surgery",
      "Pediatric Dentistry",
      "Periodontics",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqsData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
