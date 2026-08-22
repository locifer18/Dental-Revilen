import { AIProvider, AIChatMessage, SessionContext, AIProviderResponse } from "./types";
import { clinicConfig, clinicLocations } from "@/data/clinicConfig";
import { treatmentsData } from "@/data/treatmentsData";
import { doctorsData } from "@/data/doctorsData";
import { faqsData } from "@/data/faqsData";

export class MockAIProvider implements AIProvider {
  name = "MockStructuredKnowledgeProvider";

  async generateResponse(
    messages: AIChatMessage[],
    context: SessionContext
  ): Promise<AIProviderResponse> {
    const lastUserMessage = [...messages].reverse().find((m) => m.sender === "user");
    const userText = lastUserMessage?.text.trim() || "";
    const query = userText.toLowerCase();

    const newContext: SessionContext = {
      ...context,
      turnCount: (context.turnCount || 0) + 1,
    };

    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // 1. EMERGENCY TRIAGE (Strict Medical Safety Rule)
    const emergencyKeywords = [
      "severe bleeding",
      "uncontrolled bleeding",
      "fever with swelling",
      "can't breathe",
      "cannot breathe",
      "trouble breathing",
      "swallowing difficulty",
      "broken jaw",
      "severe trauma",
      "knocked out tooth",
      "accident",
      "unbearable pain",
    ];

    const isEmergency = emergencyKeywords.some((k) => query.includes(k));
    if (isEmergency) {
      newContext.isEmergency = true;
      return {
        message: {
          id: `msg-emergency-${Date.now()}`,
          sender: "ora",
          type: "emergency_alert",
          text: `⚠️ **Urgent Dental / Medical Advisory**\n\nBased on the symptoms you've described, please seek immediate professional care right away. Facial swelling with breathing difficulty, uncontrolled bleeding, or major trauma requires urgent attention.\n\n📞 **24/7 Clinical Emergency Hotline:** [${clinicConfig.emergencyPhone}](tel:${clinicConfig.emergencyPhone.replace(/\s+/g, "")})\n\nIf symptoms are rapidly worsening or affecting your airway, please proceed to the nearest hospital emergency department immediately.`,
          timestamp,
          suggestions: [
            "Call Emergency Desk",
            "Book Priority Urgent Slot",
            "Clinic Address & Directions",
          ],
          actionLink: {
            label: `Call ${clinicConfig.emergencyPhone}`,
            href: `tel:${clinicConfig.emergencyPhone.replace(/\s+/g, "")}`,
            isExternal: true,
          },
        },
        updatedContext: newContext,
      };
    }

    // 2. DIRECT IN-CHAT BOOKING TRIGGER
    const bookingIntentKeywords = [
      "book appointment",
      "book consultation",
      "schedule visit",
      "book a slot",
      "appointment booking",
      "i want to book",
      "book now",
      "reserve slot",
    ];

    if (bookingIntentKeywords.some((k) => query.includes(k)) || query === "book an appointment") {
      newContext.bookingIntentDetected = true;
      const targetTreatment = treatmentsData.find(
        (t) => t.slug === newContext.activeTreatmentSlug
      );

      return {
        message: {
          id: `msg-booking-${Date.now()}`,
          sender: "ora",
          type: "booking_flow",
          text: `I'll be happy to help you schedule a consultation at Revilen Dental Studio. \n\nYou can customize your preferred studio location, treatment, specialist, and arrival time right below:`,
          timestamp,
          treatmentSlug: targetTreatment?.slug,
          bookingDraft: {
            treatmentSlug: targetTreatment?.slug || treatmentsData[0].slug,
            treatmentTitle: targetTreatment?.title || treatmentsData[0].title,
            locationId: newContext.activeLocationId || clinicLocations[0].id,
            locationName: clinicLocations[0].name,
            doctorSlug: newContext.activeDoctorSlug || "any",
            doctorName: "First Available Specialist",
          },
          suggestions: [
            "Explore 0% EMI Financing",
            "What should I bring to my visit?",
            "Speak with WhatsApp Concierge",
          ],
        },
        updatedContext: newContext,
      };
    }

    // 3. WHATSAPP HANDOFF REQUEST
    if (query.includes("whatsapp") || query.includes("chat on phone") || query.includes("message on whatsapp")) {
      const treatmentName = newContext.activeTreatmentSlug
        ? treatmentsData.find((t) => t.slug === newContext.activeTreatmentSlug)?.shortTitle
        : "a consultation";

      const prefillText = `Hi Revilen Dental Studio, I was chatting with Revilen on your website regarding ${treatmentName} and would like to continue our conversation.`;

      return {
        message: {
          id: `msg-wa-${Date.now()}`,
          sender: "ora",
          type: "whatsapp_handoff",
          text: `Certainly! You can continue chatting directly with our human concierge desk on WhatsApp. We'll have your consultation details ready.`,
          timestamp,
          whatsappPrefill: prefillText,
          suggestions: [
            "Book on Website Instead",
            "View Studio Locations",
            "Treatment Pricing",
          ],
        },
        updatedContext: newContext,
      };
    }

    // 4. SYMPTOM-BASED TRIAGE & GUIDANCE (Non-Diagnostic)
    if (query.includes("broken tooth") || query.includes("chipped tooth") || query.includes("cracked tooth")) {
      return {
        message: {
          id: `msg-symptom-${Date.now()}`,
          sender: "ora",
          text: `I'm sorry you're dealing with that. A chipped or broken tooth can have several causes, and the appropriate treatment depends on how deeply the tooth structure is affected.\n\n• **Minor Chips / Enamel Wear:** Can often be conservatively restored with bonding or minimal-prep porcelain veneers.\n• **Deeper Breaks:** May require an all-ceramic zirconia crown or endodontic evaluation to protect the nerve.\n\nA dentist should examine the tooth in person with a 3D digital scan before determining treatment. Would you like to schedule a consultation?`,
          timestamp,
          suggestions: [
            "Book a Consultation",
            "Learn About Porcelain Veneers",
            "Learn About Dental Crowns",
          ],
          actionLink: {
            label: "Book Diagnostic Scan",
            href: "/book",
          },
        },
        updatedContext: newContext,
      };
    }

    if (query.includes("bleeding gums") || query.includes("swollen gums") || query.includes("bad breath") || query.includes("gum pain")) {
      newContext.activeTreatmentSlug = "gum-treatment";
      return {
        message: {
          id: `msg-gum-${Date.now()}`,
          sender: "ora",
          text: `Bleeding or tender gums are often an early sign of bacterial biofilm buildup or gingival inflammation. \n\n• **Swiss EMS AirFlow® Dental Spa:** Painless warm-water cleaning that removes 100% of bacterial biofilm without metallic scraping.\n• **Laser Periodontal Therapy:** Gentle diode laser decontamination for deeper gum pockets.\n\nWe recommend having a periodontist check your gum health to prevent bone loss.`,
          timestamp,
          suggestions: [
            "Book AirFlow Dental Spa",
            "Learn About Gum Laser Treatment",
            "Consult Dr. Shalini Reddy",
          ],
          actionLink: {
            label: "Explore Gum Care",
            href: "/treatments/gum-treatment",
          },
        },
        updatedContext: newContext,
      };
    }

    if (query.includes("wisdom tooth") || query.includes("wisdom teeth") || query.includes("jaw pain back")) {
      newContext.activeTreatmentSlug = "wisdom-tooth-removal";
      return {
        message: {
          id: `msg-wisdom-${Date.now()}`,
          sender: "ora",
          text: `Impacted wisdom teeth often cause recurring pressure, gum swelling, or food entrapment behind the second molars.\n\n• **Our Protocol:** Performed by board-certified Oral & Maxillofacial Surgeons using 3D CBCT nerve mapping.\n• **Painless:** The Wand® computerized anesthesia + PRF biological healing membrane for rapid recovery in 24–48 hours.\n\nWould you like to have our surgeon evaluate your wisdom tooth with a low-radiation 3D scan?`,
          timestamp,
          suggestions: [
            "Book Wisdom Tooth Scan",
            "Is wisdom tooth removal painful?",
            "Check Surgery Cost",
          ],
          actionLink: {
            label: "Explore Wisdom Tooth Removal",
            href: "/treatments/wisdom-tooth-removal",
          },
        },
        updatedContext: newContext,
      };
    }

    // 5. TREATMENT-SPECIFIC REASONING
    // Dental Implants
    if (query.includes("implant") || query.includes("missing tooth") || query.includes("denture") || (context.activeTreatmentSlug === "dental-implants" && (query.includes("cost") || query.includes("time") || query.includes("pain") || query.includes("how")))) {
      newContext.activeTreatmentSlug = "dental-implants";
      return {
        message: {
          id: `msg-implant-${Date.now()}`,
          sender: "ora",
          text: `**Guided Dental Implants at Revilen Dental Studio:**\n\n• **What it is:** Permanent, bio-compatible titanium and zirconia roots placed with 3D computer-milled surgical guides for sub-millimeter precision.\n• **Starting Investment:** From ₹38,000 / implant (0% EMI from ₹3,166/month).\n• **Timeline:** 30–45 mins surgical placement, followed by 8–10 weeks bone integration (temporary same-day aesthetic tooth provided).\n• **Comfort:** Painless computerized STA local anesthesia. Most patients resume normal work the next day.\n• **Warranty:** Lifetime global manufacturer warranty on Swiss Straumann & Nobel Biocare fixtures.`,
          timestamp,
          treatmentSlug: "dental-implants",
          suggestions: [
            "Book Implant Consultation",
            "What if I have low bone density?",
            "Apply for 0% Interest EMI",
          ],
          actionLink: {
            label: "Book Dental Implant Slot",
            href: "/book?treatment=dental-implants",
          },
        },
        updatedContext: newContext,
      };
    }

    // Clear Aligners / Invisalign
    if (query.includes("invisalign") || query.includes("aligner") || query.includes("braces") || query.includes("straighten") || query.includes("crooked") || (context.activeTreatmentSlug === "invisalign-aligners" && (query.includes("cost") || query.includes("time") || query.includes("how")))) {
      newContext.activeTreatmentSlug = "invisalign-aligners";
      return {
        message: {
          id: `msg-invisalign-${Date.now()}`,
          sender: "ora",
          text: `**Invisalign® Clear Aligners at Revilen:**\n\n• **What it is:** Custom transparent SmartTrack® medical aligners that discreetly straighten crowded or spaced teeth without visible metal wires.\n• **Starting Investment:** From ₹75,000 complete package (0% EMI from ₹6,250/month).\n• **Duration:** 6 to 14 months (average case is 8 months).\n• **3D Smile Simulator:** Using our 60-second iTero 5D optical scan, you can see an interactive 3D simulation of your completed smile at your very first visit!\n• **Lead Orthodontist:** Led by Dr. Rohan Kapoor (Invisalign Platinum Elite Provider).`,
          timestamp,
          treatmentSlug: "invisalign-aligners",
          suggestions: [
            "Book 3D Smile Scan",
            "Do aligners hurt?",
            "Compare Aligners vs Veneers",
          ],
          actionLink: {
            label: "Book Invisalign 3D Scan",
            href: "/book?treatment=invisalign-aligners",
          },
        },
        updatedContext: newContext,
      };
    }

    // Porcelain Veneers / Smile Makeover
    if (query.includes("veneer") || query.includes("smile makeover") || query.includes("gap") || query.includes("discolor") || (context.activeTreatmentSlug === "porcelain-veneers" && (query.includes("cost") || query.includes("time") || query.includes("damage")))) {
      newContext.activeTreatmentSlug = "porcelain-veneers";
      return {
        message: {
          id: `msg-veneer-${Date.now()}`,
          sender: "ora",
          text: `**Handcrafted Porcelain Veneers & Smile Makeovers:**\n\n• **What it is:** Artisan-sculpted 0.3mm ultra-thin E-max ceramic laminates bonded over natural teeth to correct gaps, chips, uneven edges, and deep discoloration.\n• **Starting Investment:** From ₹22,000 / tooth (0% EMI from ₹1,833/month).\n• **The Revilen Trial Smile:** You test drive a physical 3D mock-up directly in your mouth before any permanent bonding begins.\n• **Enamel Preservation:** Minimal-prep micro-shaping preserves over 90% of natural tooth biology.\n• **Timeline:** 2 to 3 appointments over 7 to 10 days.`,
          timestamp,
          treatmentSlug: "porcelain-veneers",
          suggestions: [
            "Book Trial Smile Consultation",
            "Do veneers stain with turmeric/coffee?",
            "See Before & After Cases",
          ],
          actionLink: {
            label: "Book Smile Design Session",
            href: "/book?treatment=porcelain-veneers",
          },
        },
        updatedContext: newContext,
      };
    }

    // Root Canal Treatment
    if (query.includes("root canal") || query.includes("rct") || query.includes("toothache") || query.includes("pain") || query.includes("sensitive") || (context.activeTreatmentSlug === "root-canal" && (query.includes("cost") || query.includes("time") || query.includes("sitting")))) {
      newContext.activeTreatmentSlug = "root-canal";
      return {
        message: {
          id: `msg-rct-${Date.now()}`,
          sender: "ora",
          text: `**Microscopic Single-Sitting Root Canal at Revilen:**\n\n• **Pain-Free Care:** The Wand® computerized single-tooth anesthesia administers numbing fluid micro-drop by micro-drop with zero needle sting.\n• **Single-Sitting Speed:** Over 92% of root canals are completed in a single 60-minute appointment.\n• **Magnification:** Carl Zeiss 25x operating microscopes locate and sterilize 99.9% of micro-canals for lifetime tooth preservation.\n• **Starting Investment:** From ₹9,500 / tooth (0% EMI from ₹792/month).`,
          timestamp,
          treatmentSlug: "root-canal",
          suggestions: [
            "Book Painless Root Canal",
            "Do I need a crown after RCT?",
            "Consult Dr. Meera Nambiar",
          ],
          actionLink: {
            label: "Book Root Canal Visit",
            href: "/book?treatment=root-canal",
          },
        },
        updatedContext: newContext,
      };
    }

    // Teeth Whitening
    if (query.includes("whitening") || query.includes("yellow") || query.includes("bright") || query.includes("stains")) {
      newContext.activeTreatmentSlug = "teeth-whitening";
      return {
        message: {
          id: `msg-whitening-${Date.now()}`,
          sender: "ora",
          text: `**Laser Power Teeth Whitening:**\n\n• **Results:** Up to 8 shades whiter in a single 45-minute lounge appointment.\n• **Zero Sensitivity:** Buffered with potassium nitrate and cold diode laser activation to protect natural enamel.\n• **Starting Investment:** From ₹12,500 full session (includes custom take-home touch-up kit).`,
          timestamp,
          treatmentSlug: "teeth-whitening",
          suggestions: [
            "Book Whitening Session",
            "How long do results last?",
            "Explore 0% EMI",
          ],
          actionLink: {
            label: "Book Whitening Appointment",
            href: "/book?treatment=teeth-whitening",
          },
        },
        updatedContext: newContext,
      };
    }

    // 6. GENERAL PRICING & FINANCING INQUIRIES
    if (query.includes("cost") || query.includes("price") || query.includes("emi") || query.includes("fee") || query.includes("charges") || query.includes("insurance")) {
      return {
        message: {
          id: `msg-pricing-${Date.now()}`,
          sender: "ora",
          type: "text",
          text: `We maintain 100% transparent pricing across all clinical procedures:\n\n• **Guided Dental Implants:** From ₹38,000 / tooth (0% EMI: ₹3,166/mo)\n• **Invisalign® Clear Aligners:** From ₹75,000 complete (0% EMI: ₹6,250/mo)\n• **Handcrafted E-max Veneers:** From ₹22,000 / tooth (0% EMI: ₹1,833/mo)\n• **Microscopic Root Canal:** From ₹9,500 (Single-sitting)\n• **Laser Teeth Whitening:** From ₹12,500 / session\n• **Swiss EMS AirFlow Clean:** From ₹3,500\n\n💳 **0% Interest EMI** is available for 3, 6, 9, or 12 months with Bajaj Finserv & major credit cards with zero downpayment. Corporate dental reimbursement invoices are provided.`,
          timestamp,
          suggestions: [
            "Open 0% EMI Calculator",
            "Book Consultation",
            "Insurance Assistance",
          ],
          actionLink: {
            label: "Open 0% EMI Calculator",
            href: "/pricing",
          },
        },
        updatedContext: newContext,
      };
    }

    // 7. CLINIC LOCATIONS & TIMINGS
    if (query.includes("location") || query.includes("address") || query.includes("bangalore") || query.includes("mumbai") || query.includes("gurgaon") || query.includes("timing") || query.includes("hours") || query.includes("metro") || query.includes("valet") || query.includes("parking") || query.includes("where")) {
      return {
        message: {
          id: `msg-locations-${Date.now()}`,
          sender: "ora",
          type: "text",
          text: `Revilen Dental Studio has 3 flagship locations across metropolitan India:\n\n📍 **Bengaluru (Indiranagar):** 428, 100 Feet Road (Opp. Fabindia) | 400m from Metro\n📍 **Mumbai (Bandra West):** Level 3, The Pavilion, Turner Road | Valet Parking available\n📍 **Gurugram (NCR):** Unit 204, Horizon Centre Plaza, Golf Course Rd | Sector 42-43 Metro\n\n🕒 **Hours:** Mon–Sat: 09:00 AM – 08:30 PM | Sun: 10:00 AM – 04:00 PM\nAll studios feature complimentary valet parking and private acoustic suites.`,
          timestamp,
          suggestions: [
            "Book at Bengaluru",
            "Book at Mumbai",
            "Book at Gurugram",
          ],
          actionLink: {
            label: "View All Locations & Maps",
            href: "/contact",
          },
        },
        updatedContext: newContext,
      };
    }

    // 8. FIRST VISIT INQUIRIES
    if (query.includes("first visit") || query.includes("what should i bring") || query.includes("first appointment") || query.includes("consultation process")) {
      return {
        message: {
          id: `msg-firstvisit-${Date.now()}`,
          sender: "ora",
          text: `**What happens at your first visit at Revilen:**\n\n1. **Welcome & Refreshments:** Relax in our sensory lounge with artisanal herbal teas.\n2. **60-Second 3D Optical Scan:** 100% digital, zero goop or gagging.\n3. **Low-Radiation Digital Radiographs:** High-definition bone and tooth analysis.\n4. **One-on-One Specialist Consultation:** Review your 3D digital smile simulation and receive a clear, itemized treatment roadmap.\n\n*What to bring:* Any previous dental records or your corporate insurance ID if applicable.`,
          timestamp,
          suggestions: [
            "Book Your First Visit",
            "Explore 0% EMI Options",
            "Meet Our Doctors",
          ],
          actionLink: {
            label: "Schedule First Visit",
            href: "/book",
          },
        },
        updatedContext: newContext,
      };
    }

    // 9. DOCTORS / FACULTY INQUIRIES
    if (query.includes("doctor") || query.includes("dentist") || query.includes("specialist") || query.includes("ananya") || query.includes("rohan") || query.includes("meera")) {
      return {
        message: {
          id: `msg-doctors-${Date.now()}`,
          sender: "ora",
          text: `Our clinical faculty is led by board-certified MDS super-specialists with training from AIIMS, Manipal, and European institutions:\n\n• **Dr. Ananya Sharma:** Lead Aesthetic Prosthodontist & Implantologist (AIIMS New Delhi, DSD Certified Madrid)\n• **Dr. Rohan Kapoor:** Chief Orthodontist (Manipal, Invisalign Platinum Elite Provider)\n• **Dr. Meera Nambiar:** Head of Microscopic Endodontics (Carl Zeiss Micro-Endo Fellow)\n• **Dr. Vikramaditya Rathore:** Senior Maxillofacial & Craniofacial Surgeon (KGMU)\n\nEvery doctor is available for private one-on-one diagnostic sessions.`,
          timestamp,
          suggestions: [
            "Book with Dr. Ananya",
            "Book with Dr. Rohan",
            "View Full Faculty",
          ],
          actionLink: {
            label: "Meet All Specialists",
            href: "/doctors",
          },
        },
        updatedContext: newContext,
      };
    }

    // 10. DEFAULT BALANCED RESPONSE
    return {
      message: {
        id: `msg-default-${Date.now()}`,
        sender: "ora",
        text: `Thank you for reaching out to Revilen Dental Studio. \n\nI can help you explore specific procedures (like guided implants, Invisalign, or porcelain veneers), estimate treatment timelines, check pricing and 0% EMI options, or book a consultation with our specialists.\n\nHow can I best guide you today?`,
        timestamp,
        suggestions: [
          "Explore Treatments",
          "Book an Appointment",
          "Treatment Pricing & 0% EMI",
          "Clinic Locations & Timings",
        ],
        actionLink: {
          label: "Book a Consultation",
          href: "/book",
        },
      },
      updatedContext: newContext,
    };
  }
}
