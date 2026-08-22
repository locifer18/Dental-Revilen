import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Sparkles, ArrowRight, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4">
      <div className="text-center max-w-md mx-auto space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-pine-100 text-pine-900 mx-auto flex items-center justify-center font-serif text-2xl font-bold shadow-soft border border-pine-200">
          404
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl text-charcoal-950 font-normal">
          Page Not Found
        </h1>

        <p className="text-sm text-stone-600 font-light leading-relaxed">
          The page you are looking for might have been moved or does not exist. Let us guide you back to our dental studio.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button href="/" variant="primary" size="md" leftIcon={<Home className="w-4 h-4" />}>
            Back to Homepage
          </Button>

          <Button href="/treatments" variant="secondary" size="md">
            Explore Treatments
          </Button>
        </div>
      </div>
    </div>
  );
}
