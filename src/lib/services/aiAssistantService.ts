import { ChatMessage } from "@/types";
import { treatmentsData } from "@/data/treatmentsData";
import { clinicConfig } from "@/data/clinicConfig";

export const initialBotMessage: ChatMessage = {
  id: "msg-welcome",
  sender: "ora",
  text: `Hello, I'm **ORA**, your AI dental concierge. \n\nI can help you explore our treatments, explain procedures like Invisalign or Dental Implants, estimate treatment timelines, or guide you in booking a consultation with our specialists. \n\n*Please note: I provide general dental information and cannot replace a medical diagnosis.* How may I assist you today?`,
  timestamp: "Just now",
  suggestions: [
    "How much do Dental Implants cost?",
    "Does Single-Sitting Root Canal hurt?",
    "How does Invisalign work?",
    "Do you offer 0% EMI financing?",
  ],
};

export async function processUserMessage(userText: string): Promise<ChatMessage> {
  const query = userText.toLowerCase().trim();

  // 1. Emergency Triage Check
  const emergencyKeywords = [
    "severe bleeding",
    "uncontrolled bleeding",
    "fever with swelling",
    "can't breathe",
    "cannot breathe",
    "swallowing difficulty",
    "broken jaw",
    "severe trauma",
    "knocked out tooth",
    "accident",
  ];

  const isEmergency = emergencyKeywords.some((k) => query.includes(k));
  if (isEmergency) {
    return {
      id: `ora-${Date.now()}`,
      sender: "ora",
      text: `⚠️ **Dental Emergency Notice**\n\nBased on the symptoms you described, please seek immediate emergency care or contact our urgent clinical care hotline right away.\n\n📞 **Direct Emergency Hotline:** [${clinicConfig.emergencyPhone}](tel:${clinicConfig.emergencyPhone.replace(/\s+/g, "")})\n\nIf you have difficulty breathing, severe continuous bleeding, or swelling closing your eye/throat, please visit the nearest hospital emergency room immediately.`,
      timestamp: "Just now",
      suggestions: [
        "Call Emergency Desk",
        "Book Priority Emergency Slot",
      ],
      actionLink: {
        label: "Call Clinic Concierge Now",
        href: `tel:${clinicConfig.emergencyPhone.replace(/\s+/g, "")}`,
      },
    };
  }

  // 2. Pricing & EMI Queries
  if (query.includes("cost") || query.includes("price") || query.includes("emi") || query.includes("fees") || query.includes("charges") || query.includes("finance") || query.includes("insurance")) {
    return {
      id: `ora-${Date.now()}`,
      sender: "ora",
      text: `We maintain 100% transparent pricing with zero hidden charges:\n\n• **Guided Dental Implants:** From ₹38,000 / implant (0% EMI from ₹3,166/mo)\n• **Invisalign® Clear Aligners:** From ₹75,000 complete (0% EMI from ₹6,250/mo)\n• **Handcrafted E-max Veneers:** From ₹22,000 / tooth\n• **Microscopic Root Canal:** From ₹9,500 (Single sitting)\n• **Laser Teeth Whitening:** From ₹12,500 / session\n\n💳 **0% Interest EMI** is available for 3, 6, 9, & 12 months with Bajaj Finserv & major credit cards with instant 5-minute approval.`,
      timestamp: "Just now",
      suggestions: [
        "View 0% EMI Calculator",
        "Book a Consultation",
        "How long does an implant take?",
      ],
      actionLink: {
        label: "Open 0% EMI Calculator",
        href: "/pricing",
      },
    };
  }

  // 3. Treatment-Specific Matching
  if (query.includes("implant") || query.includes("missing tooth") || query.includes("denture")) {
    const treatment = treatmentsData.find((t) => t.slug === "dental-implants");
    return {
      id: `ora-${Date.now()}`,
      sender: "ora",
      text: `**Guided Dental Implants at ORA Dental Studio:**\n\nWe utilize 3D CBCT bone mapping and custom surgical guides for sub-millimeter precision. \n\n• **Material:** Swiss Nobel Biocare & Straumann medical-grade titanium/zirconia\n• **Comfort:** Painless computerized STA local anesthesia\n• **Duration:** 30–45 mins surgical placement, followed by 8–10 weeks bone integration\n• **Longevity:** Designed to last 25+ years to a lifetime\n\nWould you like to book a 3D scan and diagnostic consultation with Dr. Ananya Sharma?`,
      timestamp: "Just now",
      suggestions: [
        "Book Implant Consultation",
        "Are implants painful?",
        "What is the cost?",
      ],
      actionLink: {
        label: "Explore Dental Implants",
        href: "/treatments/dental-implants",
      },
    };
  }

  if (query.includes("invisalign") || query.includes("aligner") || query.includes("braces") || query.includes("straighten") || query.includes("crowd")) {
    return {
      id: `ora-${Date.now()}`,
      sender: "ora",
      text: `**Invisalign® & Clear Digital Aligners:**\n\nDiscreet, comfortable teeth straightening without metal brackets or wires.\n\n• **Technology:** 60-second iTero 5D optical scan with instant 3D smile outcome simulator\n• **Duration:** Average treatment time is 6 to 12 months\n• **Comfort:** 100% removable for dining, zero mouth ulcers\n• **Doctor:** Led by Dr. Rohan Kapoor (Invisalign Platinum Elite Provider)\n\nYou can see your future smile in 3D during your very first visit!`,
      timestamp: "Just now",
      suggestions: [
        "Book 3D Smile Scan",
        "Can aligners fix deep bites?",
        "Compare Veneers vs Aligners",
      ],
      actionLink: {
        label: "Explore Clear Aligners",
        href: "/treatments/invisalign-aligners",
      },
    };
  }

  if (query.includes("veneer") || query.includes("smile makeover") || query.includes("gap") || query.includes("chip") || query.includes("stain")) {
    return {
      id: `ora-${Date.now()}`,
      sender: "ora",
      text: `**Handcrafted Porcelain Veneers & Digital Smile Design:**\n\nCustom 0.3mm ultra-thin E-max ceramic laminates sculpted by master ceramists.\n\n• **The ORA Difference:** You get to 'test drive' your new smile with an in-mouth 3D Trial Mockup before any permanent bonding.\n• **Preservation:** Ultra-conservative micro-preparation preserves over 90% natural enamel.\n• **Stain Resistance:** Impervious to coffee, tea, wine, and turmeric.\n• **Timeline:** Completed in 2 to 3 appointments over 7 to 10 days.`,
      timestamp: "Just now",
      suggestions: [
        "See Before & After Veneers",
        "Book Aesthetic Consultation",
        "Do veneers ruin teeth?",
      ],
      actionLink: {
        label: "View Porcelain Veneers",
        href: "/treatments/porcelain-veneers",
      },
    };
  }

  if (query.includes("root canal") || query.includes("rct") || query.includes("toothache") || query.includes("pain") || query.includes("infection")) {
    return {
      id: `ora-${Date.now()}`,
      sender: "ora",
      text: `**Microscopic Single-Sitting Root Canal:**\n\nWe have re-engineered root canals to be 100% comfortable and anxiety-free.\n\n• **Precision:** Carl Zeiss 25x operating microscope disinfects microscopic accessory canals.\n• **Speed:** Over 92% of cases are completed in a single 60-minute session.\n• **Painless:** The Wand® computerized single-tooth numbing prevents needle sting.\n• **Comfort:** Relax in ergonomic chairs with ceiling 4K streaming entertainment.`,
      timestamp: "Just now",
      suggestions: [
        "Book Painless RCT",
        "Do I need a crown after RCT?",
        "Consult Dr. Meera Nambiar",
      ],
      actionLink: {
        label: "Learn About Microscopic RCT",
        href: "/treatments/root-canal",
      },
    };
  }

  if (query.includes("whitening") || query.includes("yellow") || query.includes("bright")) {
    return {
      id: `ora-${Date.now()}`,
      sender: "ora",
      text: `**Laser Power Teeth Whitening:**\n\nAchieve up to 8 shades whiter enamel in a single 45-minute lounge appointment.\n\n• **Safe:** Cold diode laser activation with potassium nitrate buffers prevents nerve sensitivity.\n• **Enamel Friendly:** Includes post-treatment nano-mineral glaze to lock in shine.\n• **Bonus:** Comes with a customized take-home maintenance kit for lasting brilliance.`,
      timestamp: "Just now",
      suggestions: [
        "Book Whitening Session",
        "How long does whitening last?",
        "Check Pricing",
      ],
      actionLink: {
        label: "Explore Teeth Whitening",
        href: "/treatments/teeth-whitening",
      },
    };
  }

  if (query.includes("book") || query.includes("appointment") || query.includes("consult") || query.includes("schedule") || query.includes("timing") || query.includes("visit")) {
    return {
      id: `ora-${Date.now()}`,
      sender: "ora",
      text: `Booking a consultation at ORA Dental Studio is quick and seamless:\n\n1. Select your preferred studio: **Bengaluru (Indiranagar)**, **Mumbai (Bandra West)**, or **Gurugram (Golf Course Rd)**.\n2. Choose your treatment & specialist.\n3. Pick your preferred date & time slot.\n\nYour first visit includes a 3D digital scan, digital X-rays, and a complete discussion with our specialists.`,
      timestamp: "Just now",
      suggestions: [
        "Book Online Now",
        "Call Concierge Desk",
        "Clinic Locations",
      ],
      actionLink: {
        label: "Open Booking Wizard",
        href: "/book",
      },
    };
  }

  if (query.includes("location") || query.includes("address") || query.includes("bangalore") || query.includes("mumbai") || query.includes("gurgaon") || query.includes("parking") || query.includes("metro")) {
    return {
      id: `ora-${Date.now()}`,
      sender: "ora",
      text: `We have 3 flagship studios across metropolitan India:\n\n📍 **Bengaluru (Indiranagar):** 100 Feet Road (Opp. Fabindia) | Purple Line Metro (400m)\n📍 **Mumbai (Bandra West):** The Pavilion, Turner Road | Valet Parking available\n📍 **Gurugram (NCR):** Horizon Centre Plaza, Golf Course Road | Sector 42-43 Metro\n\nAll locations feature dedicated valet parking and private treatment suites.`,
      timestamp: "Just now",
      suggestions: [
        "View Maps & Directions",
        "Book at Bengaluru Studio",
        "Book at Mumbai Studio",
      ],
      actionLink: {
        label: "View All Locations & Contact",
        href: "/contact",
      },
    };
  }

  // Default Fallback
  return {
    id: `ora-${Date.now()}`,
    sender: "ora",
    text: `Thank you for your question. At ORA Dental Studio, our multidisciplinary team specializes in guided implants, Invisalign aligners, porcelain veneers, microscopic root canals, and pediatric care.\n\nWould you like to speak directly with our clinic concierge, check treatment pricing, or schedule a diagnostic 3D scan?`,
    timestamp: "Just now",
    suggestions: [
      "Book an Appointment",
      "View All Treatments",
      "Explore 0% EMI Options",
      "Contact Clinic Desk",
    ],
    actionLink: {
      label: "Book a Consultation",
      href: "/book",
    },
  };
}
