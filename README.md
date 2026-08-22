# Revilen Dental Studio — Flagship Sales & Demo Platform

**Revilen Dental Studio** is a production-grade, ultra-premium dental clinic web application designed for **Revilen** to pitch luxury dental clinics across metropolitan India (Bengaluru, Mumbai, Delhi-NCR).

---

## 💎 Design Philosophy & Standards

* **Editorial Luxury Aesthetic**: Warm ivory (`#FBF9F5`), deep forest green (`#0F382C`), and understated champagne gold (`#C5A880`).
* **100% Working Interactions**:
  * Draggable Before & After transformation comparison sliders (touch, mouse & keyboard accessible).
  * Interactive 3D Dental Equipment Studio with live specs and clinical advantage switches.
  * Interactive 0% Interest EMI Financing Calculator with instant tenure calculation.
  * Complete 6-step Appointment Booking Engine with validation, +91 Indian phone check, and printable confirmation pass with QR code and Google Calendar sync.
  * "Ask Revilen" AI Dental Receptionist with clinical triage, emergency detection, in-chat booking, and WhatsApp handoff.
  * Multi-city Studio Switcher with Google Maps embeds and direct WhatsApp concierge links.
* **Separation of Concerns**: All clinic details, doctors, treatments, equipment, and pricing are modularly stored in `src/data/` for rapid white-labeling.

---

## 🚀 Quick Start

### 1. Installation

```bash
cd ora-dental-studio
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build

```bash
npm run build
npm run start
```

---

## 🗺️ Routes & Experience Architecture

| Route | Page Description |
|---|---|
| `/` | Flagship Editorial Homepage (Hero, Trust Bar, 12 Treatments, Before/After Slider, 3D Equipment Studio, Doctors, Journey, Testimonials, FAQ) |
| `/treatments` | Full Clinical Treatments Index with search and category filtering |
| `/treatments/[slug]` | 12 Dedicated Master Treatment Pages with step-by-step procedures, pricing, and FAQs |
| `/doctors` | Specialist Faculty Directory (AIIMS & Manipal alumni, International Fellows) |
| `/doctors/[slug]` | Detailed Doctor Profiles with education timeline, awards, and consultation schedule |
| `/technology` | 3D Equipment Studio & German MELAG Class-B 7-Stage Cleanroom Sterilization Protocol |
| `/smile-gallery` | Interactive Smile Transformation Gallery with draggable comparison sliders |
| `/patient-experience` | Anxiety-Free & Sedation Dentistry Amenities (The Wand® Painless STA, Netflix Ceiling Screens) |
| `/pricing` | Transparent Fee Schedule & Interactive 0% EMI Calculator |
| `/about` | Clinic Manifesto, Philosophy, and Revilen Showcase Credentials |
| `/contact` | Bengaluru (Indiranagar), Mumbai (Bandra West) & Gurugram (Golf Course Rd) Studios with Maps & Valet |
| `/book` | Standalone Multi-Step Appointment Booking Engine |

---

## 🛡️ Medical Safety & Compliance

* **Emergency Triage**: If a patient describes emergency symptoms (e.g. trauma, severe bleeding, breathing distress) in the "Ask Revilen" AI Receptionist, it immediately triggers the Emergency Hotline notice (`+91 80 4965 8800`).
* **Ethical Disclaimers**: Clear sample demo disclosures are included on all transformation cases and medical copy.

---

## 🛠️ Tech Stack

* **Framework**: Next.js 14 (App Router)
* **Language**: TypeScript
* **Styling**: Tailwind CSS
* **Animations**: Framer Motion
* **Icons**: Lucide React
* **Typography**: Playfair Display (Serif) & Plus Jakarta Sans (Sans)

---

*Crafted by Revilen for premier dental practices.*
