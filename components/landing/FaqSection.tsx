"use client";

import { useState } from "react";
import { cn } from "@/lib/helpers";

const faqs = [
  {
    q: "What makes DataTello different from trend tools?",
    a: "Trend tools show attention spikes. DataTello validates pressure, demand, wedge, and friction — then recommends the best first asset to build, not just a category to chase.",
  },
  {
    q: "Are these only SaaS ideas?",
    a: "No. Opportunities may start as templates, automations, dashboards, internal tools, or service + tool hybrids. We recommend the fastest path to value for each market.",
  },
  {
    q: "Who is this for?",
    a: "Indie hackers, technical founders, agencies, consultants, and product studios who want evidence-backed build opportunities — not recycled startup lists.",
  },
  {
    q: "How often are opportunities updated?",
    a: "Signals are monitored continuously. New briefs and dossier updates roll out on a regular cadence as market conditions shift.",
  },
  {
    q: "Can I download dossiers as PDFs?",
    a: "Yes. Full opportunity dossiers can be exported as PDFs for sharing, client work, or internal review.",
  },
  {
    q: "Do I need to be technical?",
    a: "Not necessarily. Dossiers are written for builders and operators alike. Technical depth varies by opportunity and recommended asset path.",
  },
  {
    q: "Can agencies use this for clients?",
    a: "Absolutely. Many agencies use dossiers to productize offers, build client dashboards, and spot emerging markets before competitors do.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl space-y-2">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={faq.q}
            className={cn(
              "overflow-hidden rounded-xl border transition-all",
              isOpen ? "border-accent-blue/30 bg-accent-blue/5" : "border-border-subtle bg-bg-elevated/40"
            )}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="text-sm font-medium text-text-primary">{faq.q}</span>
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border-subtle text-text-muted transition-transform",
                  isOpen && "rotate-45 border-accent-blue/30 text-accent-blue"
                )}
              >
                +
              </span>
            </button>
            {isOpen && (
              <div className="border-t border-border-subtle/50 px-5 pb-4 pt-3">
                <p className="text-sm leading-relaxed text-text-secondary">{faq.a}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
