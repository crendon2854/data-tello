import type { Metadata } from "next";
import { Cinzel, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeShell } from "@/components/layout/ThemeShell";
import "@/styles/globals.css";
import "@/styles/landing.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "600"],
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "DataTello — Build Opportunity Decision Engine",
  description:
    "Evidence-backed decision engine for agencies, consultants, investors, and venture studios. Tells you what to build or act on first — with layered validation, role-aware output, and personalized recommendations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${cinzel.variable} min-h-screen bg-bg-primary font-sans text-text-primary antialiased`}
        style={{
          backgroundColor: "var(--dt-bg-primary)",
          color: "var(--dt-text-primary)",
        }}
      >
        <ThemeShell>{children}</ThemeShell>
      </body>
    </html>
  );
}
