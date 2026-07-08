import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "DataTello — Evidence-Backed Build Opportunities",
  description:
    "Discover evidence-backed build opportunities from real market signals. SaaS, automations, templates, dashboards, and workflow tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} min-h-screen bg-bg-primary font-sans text-text-primary antialiased`}
      >
        <ThemeShell>{children}</ThemeShell>
      </body>
    </html>
  );
}
