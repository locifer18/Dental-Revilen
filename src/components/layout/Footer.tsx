import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Sparkles, Shield, ArrowUpRight } from "lucide-react";
import { clinicConfig, clinicLocations } from "@/data/clinicConfig";
import { treatmentsData } from "@/data/treatmentsData";

export function Footer() {
  return (
    <footer className="bg-pine-950 text-ivory-100 border-t border-pine-900 pt-16 pb-12 overflow-hidden relative">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Highlight Banner */}
        <div className="bg-pine-900/60 border border-pine-800/80 rounded-3xl p-8 sm:p-10 mb-16 flex flex-col lg:flex-row items-center justify-between gap-6 backdrop-blur-sm">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Complimentary First Consultation Scan</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-ivory-50 tracking-tight">
              Experience the future of Indian dentistry.
            </h3>
            <p className="text-sm text-ivory-300 max-w-xl mt-1.5 font-light">
              Book your comprehensive 3D optical evaluation, digital radiographs, and bespoke treatment consultation today.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <Link
              href="/book"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gold-500 text-charcoal-950 font-semibold hover:bg-gold-400 transition-all text-center shadow-gold text-sm"
            >
              Book an Appointment
            </Link>
            <a
              href={`tel:${clinicConfig.emergencyPhone.replace(/\s+/g, "")}`}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-pine-700 hover:bg-pine-800 text-ivory-200 transition-colors text-center text-sm font-medium"
            >
              Call Concierge
            </a>
          </div>
        </div>

        {/* Main Footer Links Matrix */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-16 border-b border-pine-900/80">
          {/* Column 1: Brand Story — full width on mobile */}
          <div className="col-span-2 lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-pine-900 text-gold-300 flex items-center justify-center font-serif text-xl border border-gold-500/30">
                R
              </div>
              <div>
                <span className="font-serif text-2xl font-semibold text-ivory-50 tracking-tight block">
                  Revilen
                </span>
                <span className="text-[9px] tracking-[0.25em] uppercase font-semibold text-gold-400 font-sans block -mt-1">
                  Dental Studio
                </span>
              </div>
            </div>

            <p className="text-sm text-ivory-300 leading-relaxed font-light max-w-sm">
              Precision dentistry across Bengaluru, Mumbai & Gurugram. Hospital-grade sterilization, painless care, and 0% EMI.
            </p>

            {/* Quick Badges */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs text-gold-300">
                <Shield className="w-4 h-4 text-gold-400 shrink-0" />
                <span>German MELAG Class-B 7-Stage Sterilization</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-ivory-300">
                <Sparkles className="w-4 h-4 text-gold-400 shrink-0" />
                <span>AIIMS & Manipal Trained Super-Specialists</span>
              </div>
            </div>

            {/* Contact Details */}
            <div className="pt-2 text-xs text-ivory-300 space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gold-400" />
                <span>Emergency Hotline: {clinicConfig.emergencyPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gold-400" />
                <span>concierge@revilendental.com</span>
              </div>
            </div>
          </div>

          {/* Column 2: Treatments */}
          <div className="col-span-1">
            <h4 className="font-serif text-base text-ivory-50 font-semibold mb-4 tracking-wide">
              Treatments
            </h4>
            <ul className="space-y-2.5 text-xs text-ivory-300 font-light">
              {treatmentsData.slice(0, 7).map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/treatments/${t.slug}`}
                    className="hover:text-gold-300 transition-colors flex items-center justify-between group"
                  >
                    <span>{t.shortTitle}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-gold-400" />
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/treatments"
                  className="text-gold-400 font-medium hover:underline inline-block pt-1"
                >
                  View all 12 treatments &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: The Practice */}
          <div className="col-span-1">
            <h4 className="font-serif text-base text-ivory-50 font-semibold mb-4 tracking-wide">
              The Studio
            </h4>
            <ul className="space-y-2.5 text-xs text-ivory-300 font-light">
              <li>
                <Link href="/doctors" className="hover:text-gold-300 transition-colors">
                  Our Specialists
                </Link>
              </li>
              <li>
                <Link href="/technology" className="hover:text-gold-300 transition-colors">
                  3D Tech & Equipment
                </Link>
              </li>
              <li>
                <Link href="/smile-gallery" className="hover:text-gold-300 transition-colors">
                  Smile Gallery (Before & After)
                </Link>
              </li>
              <li>
                <Link href="/patient-experience" className="hover:text-gold-300 transition-colors">
                  Anxiety-Free Experience
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-gold-300 transition-colors">
                  Pricing & 0% EMI Calculator
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold-300 transition-colors">
                  Our Philosophy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold-300 transition-colors">
                  Locations & Valet Access
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Locations — hidden on mobile to keep footer short */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className="font-serif text-base text-ivory-50 font-semibold mb-4 tracking-wide">
              Studio Locations
            </h4>
            <div className="space-y-4 text-xs text-ivory-300 font-light">
              {clinicLocations.map((loc) => (
                <div key={loc.id} className="border-b border-pine-900 pb-3 last:border-0 last:pb-0">
                  <span className="font-medium text-ivory-100 block mb-0.5">{loc.city}</span>
                  <p className="text-[11px] text-ivory-400 line-clamp-2">{loc.address}</p>
                  <a
                    href={loc.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-gold-400 hover:underline mt-1"
                  >
                    <MapPin className="w-3 h-3" />
                    <span>Get Directions</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Medical Notice */}
        <div className="py-6 border-b border-pine-900/60 text-[11px] text-ivory-400 leading-relaxed font-light">
          <p>
            <strong>Medical Notice:</strong> Information provided on this website is for educational and illustrative purposes and should not be construed as specific medical diagnosis or treatment advice. Individual dental results may vary based on clinical diagnosis, bone health, and hygiene. Before & After images are sample case demonstrations.
          </p>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory-400">
          <p>© {new Date().getFullYear()} Revilen Dental Studio. All clinical rights reserved.</p>

          <div className="flex items-center gap-4 text-[11px]">
            <Link href="/contact" className="hover:text-ivory-200">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-ivory-200">
              Terms of Care
            </Link>
            <Link href="/contact" className="hover:text-ivory-200">
              Patient Rights
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
