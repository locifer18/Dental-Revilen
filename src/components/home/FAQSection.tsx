"use client";

import React, { useState } from "react";
import { faqsData } from "@/data/faqsData";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { HelpCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Questions" },
    { id: "treatments", label: "Treatments & Time" },
    { id: "safety", label: "Painless Anesthesia & Safety" },
    { id: "financing", label: "0% EMI & Insurance" },
    { id: "appointment", label: "First Visit & Booking" },
  ];

  const filteredFaqs = faqsData.filter((faq) => {
    if (activeCategory === "all") return true;
    return faq.category === activeCategory;
  });

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Clear Answers"
          title={
            <>
              Frequently asked <br />
              <span className="italic text-pine-900 font-serif">patient questions.</span>
            </>
          }
          subtitle="Everything you need to know about our painless clinical protocols, treatments, pricing, and first appointment experience."
        />

        {/* Category Selector Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`text-xs py-2 px-4 rounded-full font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-pine-900 text-ivory-50 shadow-sm"
                  : "bg-stone-100 text-charcoal-700 hover:bg-stone-200/70"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion Component */}
        <Accordion>
          {filteredFaqs.map((faq, idx) => (
            <AccordionItem
              key={faq.id}
              title={faq.question}
              isOpen={idx === 0 && activeCategory === "all"}
            >
              <p>{faq.answer}</p>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Still Have Questions Box */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-stone-50 border border-stone-200 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-serif text-lg font-semibold text-charcoal-900">
              Have a specific question about your smile?
            </h4>
            <p className="text-xs text-stone-500 mt-0.5">
              Ask our AI assistant or talk directly with our clinical concierge.
            </p>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <Button href="/book" variant="primary" size="sm">
              Book Consultation
            </Button>
            <Button href="/contact" variant="secondary" size="sm">
              Contact Desk
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
