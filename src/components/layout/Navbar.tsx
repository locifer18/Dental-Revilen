"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Phone, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { treatmentsData } from "@/data/treatmentsData";
import { clinicConfig } from "@/data/clinicConfig";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTreatmentsOpen, setIsTreatmentsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Doctors", href: "/doctors" },
    { label: "Technology", href: "/technology" },
    { label: "Smile Gallery", href: "/smile-gallery" },
    { label: "Experience", href: "/patient-experience" },
    { label: "Pricing & EMI", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full py-3.5",
          "transition-[background-color,border-color,box-shadow,backdrop-filter] duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
          scrolled ? "glass-nav-dark" : "glass-nav-light"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <div className={cn(
              "w-10 h-10 rounded-2xl flex items-center justify-center font-serif text-xl tracking-tighter transition-all duration-500 border",
              scrolled
                ? "bg-gold-400/12 border-gold-400/30 text-gold-300"
                : "bg-pine-900 border-gold-500/20 text-gold-300"
            )}>
              R
            </div>
            <div className="flex flex-col leading-none">
              <span className={cn(
                "font-serif text-xl sm:text-2xl font-semibold tracking-tight transition-colors duration-500",
                scrolled ? "text-ivory-50" : "text-charcoal-950"
              )}>
                Revilen
              </span>
              <span className={cn(
                "text-[9px] tracking-[0.28em] uppercase font-semibold font-sans transition-colors duration-500",
                scrolled ? "text-gold-400/60" : "text-stone-400"
              )}>
                Dental Studio
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {/* Treatments dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsTreatmentsOpen(true)}
              onMouseLeave={() => setIsTreatmentsOpen(false)}
            >
              <Link
                href="/treatments"
                className={cn(
                  "px-3.5 py-2 text-sm font-medium rounded-full flex items-center gap-1.5 transition-all duration-300 focus:outline-none",
                  pathname.startsWith("/treatments")
                    ? scrolled ? "text-gold-300 font-semibold" : "text-pine-900 font-semibold bg-stone-200/50"
                    : scrolled ? "text-ivory-200 hover:text-gold-300 hover:bg-white/8" : "text-charcoal-700 hover:text-pine-900 hover:bg-stone-200/40"
                )}
              >
                Treatments
                <ChevronDown className={cn(
                  "w-3.5 h-3.5 transition-all duration-300",
                  isTreatmentsOpen ? "rotate-180" : "",
                  scrolled ? "text-gold-400/50" : "text-stone-400"
                )} />
              </Link>

              {isTreatmentsOpen && (
                <div className="absolute top-full left-0 mt-0 pt-2 w-[540px] z-50 animate-fade-in">
                  {/* invisible bridge — fills the gap so cursor moving down doesn't close dropdown */}
                  <div className="absolute top-0 left-0 right-0 h-2" />
                  <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.18)] border border-stone-200 p-5 grid grid-cols-2 gap-2.5">
                    <div className="col-span-2 pb-2.5 border-b border-stone-100 flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-widest text-stone-400 font-sans">Clinical Procedures</span>
                      <Link href="/treatments" className="text-xs text-pine-800 font-semibold hover:underline flex items-center gap-1 font-sans">
                        View all 12 <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                    {treatmentsData.slice(0, 6).map((t) => (
                      <Link
                        key={t.slug}
                        href={`/treatments/${t.slug}`}
                        className="p-2.5 rounded-2xl hover:bg-stone-100 transition-colors flex items-start gap-3 group"
                      >
                        <div className="w-8 h-8 rounded-xl bg-pine-50 text-pine-800 flex items-center justify-center shrink-0 group-hover:bg-pine-800 group-hover:text-ivory-50 transition-colors">
                          <Sparkles className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-charcoal-900 group-hover:text-pine-900 transition-colors font-sans">{t.shortTitle}</p>
                          <p className="text-[11px] text-stone-400 mt-0.5 font-sans">{t.tag}</p>
                        </div>
                      </Link>
                    ))}
                    <div className="col-span-2 pt-2.5 border-t border-stone-100 bg-stone-50 -mx-5 -mb-5 px-5 py-3.5 rounded-b-3xl flex items-center justify-between">
                      <span className="text-xs text-stone-500 font-sans">Not sure which treatment?</span>
                      <Link href="/book" className="text-xs font-semibold text-pine-900 hover:underline font-sans">Book Free Scan →</Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3.5 py-2 text-sm font-medium rounded-full transition-all duration-300 focus:outline-none font-sans",
                  pathname === link.href
                    ? scrolled ? "text-gold-300 font-semibold" : "text-pine-900 font-semibold bg-stone-200/50"
                    : scrolled ? "text-ivory-200 hover:text-gold-300 hover:bg-white/8" : "text-charcoal-700 hover:text-pine-900 hover:bg-stone-200/40"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <a
              href={`tel:${clinicConfig.emergencyPhone.replace(/\s+/g, "")}`}
              className={cn(
                "hidden sm:flex items-center gap-2 p-2.5 rounded-full transition-all duration-300",
                scrolled ? "text-ivory-300 hover:text-gold-300 hover:bg-white/8" : "text-charcoal-700 hover:text-pine-900 hover:bg-stone-200/50"
              )}
              aria-label="Call clinic"
            >
              <Phone className={cn("w-4 h-4 transition-colors duration-300", scrolled ? "text-gold-400" : "text-pine-800")} />
            </a>

            <Button href="/book" variant={scrolled ? "gold" : "primary"} size="md" className="hidden sm:inline-flex">
              Book Appointment
            </Button>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={cn(
                "p-2 rounded-xl lg:hidden focus:outline-none transition-all duration-300",
                scrolled ? "text-ivory-100 hover:bg-white/10" : "text-charcoal-900 hover:bg-stone-200/60"
              )}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
