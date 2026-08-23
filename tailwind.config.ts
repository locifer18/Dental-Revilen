import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FBF9F5",
        foreground: "#121816",
        ivory: {
          50: "#FCFBF9",
          100: "#FBF9F5",
          200: "#F5F1E8",
          300: "#EFE8DA",
          400: "#E5DAC5",
          500: "#D8C9AD",
        },
        stone: {
          50: "#FAF9F6",
          100: "#F4F1EB",
          200: "#E8E4DC",
          300: "#D6D0C4",
          400: "#B8B0A2",
          500: "#968E80",
          600: "#6F685D",
          700: "#524C44",
          800: "#36322C",
          900: "#1C1A17",
        },
        pine: {
          50: "#F0F5F2",
          100: "#DFEDE5",
          200: "#BDDACB",
          300: "#8FC0A9",
          400: "#4D9A7A",
          500: "#2B6854",
          600: "#1E5443",
          700: "#164536",
          800: "#0F382C",
          900: "#09261E",
          950: "#051611",
        },
        gold: {
          50: "#FAF7F2",
          100: "#F4EDE1",
          200: "#E9DCBF",
          300: "#D9C3A3",
          400: "#C5A880",
          500: "#B39265",
          600: "#9F8157",
          700: "#7E6643",
          800: "#5D4B31",
          900: "#3E3220",
        },
        charcoal: {
          50: "#F7F8F8",
          100: "#EDEFF0",
          200: "#D8DCDE",
          300: "#B4BCC1",
          400: "#85939A",
          500: "#5E6C74",
          600: "#475258",
          700: "#333C40",
          800: "#202629",
          900: "#121816",
          950: "#0A0D0C",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      fontSize: {
        "2xs": ["0.65rem", { lineHeight: "1rem" }],
      },
      letterSpacing: {
        widest2: "0.3em",
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.04), 0 4px 6px -2px rgba(0, 0, 0, 0.02)",
        subtle: "0 4px 20px -2px rgba(15, 56, 44, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03)",
        elevated: "0 12px 36px -4px rgba(15, 56, 44, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)",
        float: "0 20px 48px -6px rgba(15, 56, 44, 0.12), 0 8px 16px -4px rgba(0, 0, 0, 0.06)",
        gold: "0 8px 24px -4px rgba(197, 168, 128, 0.35)",
        "gold-lg": "0 16px 48px -8px rgba(197, 168, 128, 0.4)",
        glass: "0 8px 32px rgba(15, 56, 44, 0.08), inset 0 1px 0 rgba(255,255,255,0.6)",
        "glass-dark": "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
        "inner-glow": "inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.1)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #C5A880 0%, #E8D5B0 40%, #C5A880 70%, #A8895F 100%)",
        "pine-gradient": "linear-gradient(135deg, #051611 0%, #0F382C 50%, #164536 100%)",
        "hero-radial": "radial-gradient(ellipse at 60% 50%, rgba(197,168,128,0.08) 0%, transparent 70%)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "fade-in-up": "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 7s ease-in-out infinite",
        "float-delay": "float 7s ease-in-out 1.5s infinite",
        "shimmer": "shimmer 3s linear infinite",
        "gold-pulse": "goldPulse 3s ease-in-out infinite",
        "gradient-shift": "gradientShift 12s ease infinite",
        "border-glow": "borderGlow 3s ease-in-out infinite",
        "scale-in": "scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-8px) rotate(0.5deg)" },
          "66%": { transform: "translateY(-4px) rotate(-0.5deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        goldPulse: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(197, 168, 128, 0)" },
          "50%": { boxShadow: "0 0 0 8px rgba(197, 168, 128, 0.15)" },
        },
        gradientShift: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        borderGlow: {
          "0%, 100%": { borderColor: "rgba(197, 168, 128, 0.3)" },
          "50%": { borderColor: "rgba(197, 168, 128, 0.7)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.94)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
