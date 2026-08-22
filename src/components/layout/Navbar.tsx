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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTreatmentsOpen, setIsTreatmentsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
          "sticky top-0 z-40 transition-all duration-300 w-full",
          isScrolled
            ? "bg-ivory-100/90 backdrop-blur-md shadow-soft border-b border-stone-200/60 py-3.5"
            : "bg-ivory-100/80 backdrop-blur-sm border-b border-stone-200/30 py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-10 h-10 rounded-2xl bg-pine-900 text-gold-300 flex items-center justify-center font-serif text-xl tracking-tighter shadow-subtle group-hover:bg-pine-800 transition-colors border border-gold-500/20">
              R
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-charcoal-950 group-hover:text-pine-900 transition-colors">
                Revilen
              </span>
              <span className="text-[9px] tracking-[0.25em] uppercase font-semibold text-stone-500 -mt-1 font-sans">
                Dental Studio
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {/* Treatments Mega Trigger */}
            <div
              className="relative"
              onMouseEnter={() => setIsTreatmentsOpen(true)}
              onMouseLeave={() => setIsTreatmentsOpen(false)}
            >
              <Link
                href="/treatments"
                className={cn(
                  "px-3.5 py-2 text-sm font-medium rounded-full flex items-center gap-1.5 transition-colors focus:outline-none",
                  pathname.startsWith("/treatments")
                    ? "text-pine-900 font-semibold bg-stone-200/50"
                    : "text-charcoal-800 hover:text-pine-900 hover:bg-stone-200/40"
                )}
              >
                <span>Treatments</span>
                <ChevronDown
                  className={cn(
                    "w-3.5 h-3.5 text-stone-400 transition-transform duration-200",
                    isTreatmentsOpen && "rotate-180 text-pine-900"
                  )}
                />
              </Link>

              {/* Treatments Dropdown Menu */}
              {isTreatmentsOpen && (
                <div className="absolute top-full left-0 mt-1 w-[560px] bg-white rounded-3xl shadow-float border border-stone-200 p-5 grid grid-cols-2 gap-3 z-50 animate-fade-in">
                  <div className="col-span-2 pb-2 border-b border-stone-100 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                      Featured Clinical Procedures
                    </span>
                    <Link
                      href="/treatments"
                      className="text-xs text-pine-800 font-semibold hover:underline flex items-center gap-1"
                    >
                      <span>View all 12 treatments</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                  {treatmentsData.slice(0, 6).map((treatment) => (
                    <Link
                      key={treatment.slug}
                      href={`/treatments/${treatment.slug}`}
                      className="p-2.5 rounded-2xl hover:bg-stone-50 transition-colors flex items-start gap-3 group"
                    >
                      <div className="w-8 h-8 rounded-xl bg-pine-50 text-pine-800 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-pine-800 group-hover:text-ivory-50 transition-colors">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-charcoal-900 group-hover:text-pine-900 transition-colors">
                          {treatment.shortTitle}
                        </h4>
                        <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                          {treatment.tag}
                        </p>
                      </div>
                    </Link>
                  ))}
                  <div className="col-span-2 pt-2 border-t border-stone-100 bg-stone-50/70 -mx-5 -mb-5 p-4 rounded-b-3xl flex items-center justify-between">
                    <span className="text-xs text-stone-600">
                      Not sure which procedure is right for you?
                    </span>
                    <Link
                      href="/book"
                      className="text-xs font-semibold text-pine-900 hover:text-pine-950 underline"
                    >
                      Book 3D Smile Scan &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Standard Nav Links */}
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3.5 py-2 text-sm font-medium rounded-full transition-colors focus:outline-none",
                    isActive
                      ? "text-pine-900 font-semibold bg-stone-200/50"
                      : "text-charcoal-800 hover:text-pine-900 hover:bg-stone-200/40"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${clinicConfig.emergencyPhone.replace(/\s+/g, "")}`}
              className="hidden sm:flex items-center gap-2 p-2.5 rounded-full text-charcoal-800 hover:text-pine-900 hover:bg-stone-200/50 transition-colors"
              title="Call Clinic Concierge"
              aria-label="Call clinic"
            >
              <Phone className="w-4 h-4 text-pine-800" />
            </a>

            <Button
              href="/book"
              variant="primary"
              size="md"
              className="hidden sm:inline-flex"
            >
              Book Appointment
            </Button>

            {/* Mobile Hamburger Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 rounded-2xl text-charcoal-900 hover:bg-stone-200/60 lg:hidden focus:outline-none"
              aria-label="Open mobile navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
