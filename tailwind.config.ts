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
          primary: "#0b0b0f",
          secondary: "#111118",
          tertiary: "#16161e",
          elevated: "#1a1a24",
          surface: "#1e1e2a",
        },
        accent: {
          blue: "#3b82f6",
          "blue-glow": "#2563eb",
          "blue-dim": "rgba(59, 130, 246, 0.15)",
          crimson: "#ef4444",
          orange: "#f97316",
          "orange-glow": "rgba(249, 115, 22, 0.2)",
          green: "#22c55e",
        },
        text: {
          primary: "#f8fafc",
          secondary: "#94a3b8",
          muted: "#64748b",
          dim: "#475569",
        },
        border: {
          DEFAULT: "#1e1e2a",
          subtle: "#252532",
          hover: "#2a2a3a",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        "glow-blue":
          "0 0 20px rgba(59,130,246,0.3), 0 0 60px rgba(59,130,246,0.1)",
        "glow-orange":
          "0 0 20px rgba(249,115,22,0.3), 0 0 60px rgba(249,115,22,0.1)",
        "glow-crimson": "0 0 20px rgba(239,68,68,0.3)",
        "glow-green": "0 0 8px rgba(34,197,94,0.6)",
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
        "gradient-blue-area":
          "linear-gradient(180deg, rgba(59,130,246,0.3) 0%, rgba(59,130,246,0) 100%)",
        "gradient-orange-area":
          "linear-gradient(180deg, rgba(249,115,22,0.3) 0%, rgba(249,115,22,0) 100%)",
        "gradient-logo": "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
        "gradient-shimmer":
          "linear-gradient(90deg, #3b82f6 0%, #60a5fa 50%, #3b82f6 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
