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
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.04), 0 4px 6px -2px rgba(0, 0, 0, 0.02)",
        subtle: "0 4px 20px -2px rgba(15, 56, 44, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03)",
        elevated: "0 12px 36px -4px rgba(15, 56, 44, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)",
        float: "0 20px 48px -6px rgba(15, 56, 44, 0.12), 0 8px 16px -4px rgba(0, 0, 0, 0.06)",
        gold: "0 8px 24px -4px rgba(197, 168, 128, 0.25)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-slow": "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
