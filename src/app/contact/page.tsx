"use client";

import React, { useState } from "react";
import Link from "next/link";
import { clinicLocations, clinicConfig } from "@/data/clinicConfig";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Car,
  Train,
  MessageCircle,
  Calendar,
  Sparkles,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { getWhatsAppLink } from "@/lib/utils";

export default function ContactPage() {
  const [activeLocationId, setActiveLocationId] = useState<string>(clinicLocations[0].id);
  const activeLocation =
    clinicLocations.find((l) => l.id === activeLocationId) || clinicLocations[0];

  const whatsappUrl = getWhatsAppLink(
    activeLocation.whatsappPhone,
    `Hi Revilen Dental Studio, I would like to inquire about booking an appointment at the ${activeLocation.name} studio.`
  );

  return (
    <div className="py-12 sm:py-20 bg-stone-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="luxury" size="md" dot className="mb-3">
            Locations & Concierge
          </Badge>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal-950 font-normal tracking-tight">
            Flagship Dental Studios Across India
          </h1>
          <p className="mt-4 text-base sm:text-lg text-stone-600 font-light leading-relaxed">
            Conveniently located in premier metropolitan hubs in Bengaluru, Mumbai, and Gurugram with dedicated valet parking and metro proximity.
          </p>
        </div>

        {/* Location Selector Tabs */}
        <div className="flex items-center justify-center gap-3 flex-wrap mb-10">
          {clinicLocations.map((loc) => {
            const isSelected = activeLocationId === loc.id;
            return (
              <button
                key={loc.id}
                type="button"
                onClick={() => setActiveLocationId(loc.id)}
                className={`py-3 px-6 rounded-full font-serif text-base transition-all border ${
                  isSelected
                    ? "bg-pine-900 text-ivory-50 border-pine-900 shadow-elevated"
                    : "bg-white text-charcoal-800 border-stone-200 hover:bg-stone-100"
                }`}
              >
                {loc.city} ({loc.tag})
              </button>
            );
          })}
        </div>

        {/* Active Location Detail Card & Map Grid */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-soft mb-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Contact Dossier */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs uppercase font-semibold text-pine-800 tracking-wider font-sans block mb-1">
                {activeLocation.tag}
              </span>
              <h2 className="font-serif text-3xl font-medium text-charcoal-950">
                {activeLocation.name}
              </h2>
            </div>

            {/* Address */}
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/70 space-y-1">
              <div className="flex items-start gap-2.5 text-xs text-charcoal-800">
                <MapPin className="w-4 h-4 text-pine-800 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block">{activeLocation.address}</span>
                  <span className="text-stone-500 text-[11px] block mt-0.5">
                    Landmark: {activeLocation.landmark}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Channels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/70 space-y-1">
                <span className="text-[10px] text-stone-400 font-semibold uppercase block">
                  Studio Phone
                </span>
                <a
                  href={`tel:${activeLocation.phone.replace(/\s+/g, "")}`}
                  className="font-semibold text-pine-900 flex items-center gap-1.5 hover:underline"
                >
                  <Phone className="w-3.5 h-3.5 text-pine-700" />
                  <span>{activeLocation.phone}</span>
                </a>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/70 space-y-1">
                <span className="text-[10px] text-stone-400 font-semibold uppercase block">
                  Email Concierge
                </span>
                <a
                  href={`mailto:${activeLocation.email}`}
                  className="font-semibold text-pine-900 flex items-center gap-1.5 hover:underline truncate"
                >
                  <Mail className="w-3.5 h-3.5 text-pine-700 shrink-0" />
                  <span className="truncate">{activeLocation.email}</span>
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/70 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-semibold text-charcoal-900">
                <Clock className="w-4 h-4 text-pine-800" />
                <span>Operating Hours</span>
              </div>
              <div className="space-y-1 text-stone-600 pl-6">
                <div className="flex justify-between">
                  <span>Mon – Fri:</span>
                  <span className="font-medium text-charcoal-900">{activeLocation.hours.weekdays}</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="font-medium text-charcoal-900">{activeLocation.hours.saturday}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="font-medium text-charcoal-900">{activeLocation.hours.sunday}</span>
                </div>
              </div>
            </div>

            {/* Accessibility & Valet */}
            <div className="space-y-2 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-pine-800 shrink-0" />
                <span>{activeLocation.parkingInfo}</span>
              </div>
              <div className="flex items-center gap-2">
                <Train className="w-4 h-4 text-pine-800 shrink-0" />
                <span>{activeLocation.metroAccess}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Button
                href={`/book?location=${activeLocation.id}`}
                variant="primary"
                size="md"
                className="w-full sm:w-auto"
                leftIcon={<Calendar className="w-4 h-4 text-gold-400" />}
              >
                Book at {activeLocation.city}
              </Button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3 rounded-full bg-[#25D366] text-white text-xs font-semibold hover:bg-[#1EBE5D] transition-colors flex items-center justify-center gap-2 shadow-soft"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={activeLocation.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3 rounded-full border border-stone-300 hover:bg-stone-100 text-charcoal-800 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4 text-stone-500" />
                <span>Google Maps</span>
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps Interactive Embed Simulation */}
          <div className="lg:col-span-6 h-[400px] sm:h-[480px] w-full rounded-2xl overflow-hidden shadow-elevated border border-stone-200 bg-stone-100 relative">
            <iframe
              src={activeLocation.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map of ${activeLocation.name}`}
              className="w-full h-full"
            />
            {/* Map Overlay Badge */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-soft border border-stone-200 text-xs">
              <span className="font-semibold text-charcoal-900 block">{activeLocation.name}</span>
              <span className="text-[10px] text-stone-500">{activeLocation.city}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
