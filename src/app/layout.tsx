import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, DM_Serif_Display } from "next/font/google";
import "@/app/globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloatingBtn } from "@/components/common/WhatsAppFloatingBtn";
import { AskOraModal } from "@/components/ai-assistant/AskOraModal";
import { ToastProvider } from "@/components/ui/Toast";
import { StructuredData } from "@/components/seo/StructuredData";
import { clinicConfig } from "@/data/clinicConfig";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0F382C",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: `${clinicConfig.name} | ${clinicConfig.brandTagline}`,
    template: `%s | ${clinicConfig.name}`,
  },
  description: `${clinicConfig.name} is India's premier digital dental practice across Bengaluru, Mumbai, and Gurugram. Specializing in guided dental implants, Invisalign aligners, porcelain veneers, and painless microscopic root canals.`,
  keywords: [
    "Dental Clinic India",
    "Dentist Bangalore",
    "Dentist Mumbai",
    "Dentist Gurgaon",
    "Dental Implants India",
    "Invisalign Provider India",
    "Porcelain Veneers Bangalore",
    "Painless Root Canal",
    "Smile Makeover India",
    "Luxury Dental Clinic",
  ],
  authors: [{ name: "Revilen Dental Studio" }, { name: "Revilen", url: "https://revilen.com" }],
  creator: "Revilen",
  publisher: "Revilen Dental Studio",
  metadataBase: new URL("https://revilendental.com"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://revilendental.com",
    title: `${clinicConfig.name} | ${clinicConfig.brandTagline}`,
    description: clinicConfig.subTagline,
    siteName: clinicConfig.name,
    images: [
      {
        url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Revilen Dental Studio Suite",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${clinicConfig.name} | ${clinicConfig.brandTagline}`,
    description: clinicConfig.subTagline,
    images: ["https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${cormorant.variable} ${inter.variable} ${dmSerif.variable}`}
    >
      <head>
        <StructuredData />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#121816] font-sans antialiased selection:bg-pine-900 selection:text-ivory-50">
        <ToastProvider>
          <AnnouncementBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFloatingBtn />
          <AskOraModal />
        </ToastProvider>
      </body>
    </html>
  );
}
