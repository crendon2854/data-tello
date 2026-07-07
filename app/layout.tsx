import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import "@/styles/globals.css";

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
        className={`${inter.variable} ${jetbrainsMono.variable} min-h-screen bg-bg-primary font-sans antialiased`}
      >
        <div className="pointer-events-none fixed inset-0 grid-bg" aria-hidden />
        <div className="relative z-10">
          <Navbar />
          <main className="pt-14">{children}</main>
        </div>
      </body>
    </html>
  );
}
