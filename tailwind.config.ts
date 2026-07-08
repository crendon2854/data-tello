import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#171717",
          secondary: "#0f0f0f",
          tertiary: "#1a1a1a",
          elevated: "#292929",
          surface: "#333333",
          glass: "rgba(41, 41, 41, 0.84)",
        },
        accent: {
          brand: "#3ecf8e",
          "brand-glow": "#2eb574",
          "brand-dim": "rgba(62, 207, 142, 0.15)",
          // Legacy aliases — existing components use accent-blue
          blue: "#3ecf8e",
          "blue-glow": "#2eb574",
          "blue-dim": "rgba(62, 207, 142, 0.15)",
          success: "#00c573",
          crimson: "#ef4444",
          orange: "#f97316",
          "orange-glow": "rgba(249, 115, 22, 0.2)",
          green: "#00c573",
        },
        text: {
          primary: "#fafafa",
          secondary: "#b4b4b4",
          muted: "#898989",
          dim: "#6b6b6b",
        },
        border: {
          DEFAULT: "#2e2e2e",
          subtle: "#262626",
          hover: "#363636",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        "glow-brand": "0 0 0 1px rgba(62, 207, 142, 0.25)",
        "glow-blue": "0 0 0 1px rgba(62, 207, 142, 0.25)",
        "glow-orange": "0 0 0 1px rgba(249, 115, 22, 0.25)",
        "glow-crimson": "0 0 0 1px rgba(239, 68, 68, 0.25)",
        "glow-green": "0 0 6px rgba(0, 197, 115, 0.4)",
      },
      animation: {
        "slide-in": "slide-in 0.4s ease-out forwards",
        "fade-up": "fade-up 0.7s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "pulse-glow-fast": "pulse-glow-fast 1.5s ease-in-out infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
        "scan-line": "scan-line 4s linear infinite",
      },
      keyframes: {
        "slide-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "pulse-glow-fast": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
      backgroundImage: {
        "gradient-brand-area":
          "linear-gradient(180deg, rgba(62,207,142,0.08) 0%, rgba(62,207,142,0) 100%)",
        "gradient-blue-area":
          "linear-gradient(180deg, rgba(62,207,142,0.08) 0%, rgba(62,207,142,0) 100%)",
        "gradient-orange-area":
          "linear-gradient(180deg, rgba(249,115,22,0.12) 0%, rgba(249,115,22,0) 100%)",
        "gradient-logo": "linear-gradient(135deg, #3ecf8e 0%, #2eb574 100%)",
        "gradient-shimmer":
          "linear-gradient(90deg, #3ecf8e 0%, #5eead4 50%, #3ecf8e 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
