"use client";

import { useState } from "react";
import { cn } from "@/lib/helpers";
import { faqs } from "./landing-data";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={faq.q}
            className={cn(
              "overflow-hidden rounded-xl border transition-all duration-300",
              isOpen
                ? "border-accent-blue/30 bg-accent-blue/5"
                : "border-border-subtle bg-bg-elevated/40 hover:border-border-hover"
            )}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
            >
              <span className="text-sm font-semibold text-text-primary sm:text-base">{faq.q}</span>
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-lg leading-none transition-all",
                  isOpen
                    ? "rotate-45 border-accent-blue/30 bg-accent-blue/10 text-accent-blue"
                    : "border-border-subtle bg-bg-surface text-text-muted"
                )}
              >
                +
              </span>
            </button>
            {isOpen && (
              <div className="border-t border-border-subtle px-5 pb-5 pt-3 sm:px-6">
                <p className="text-sm leading-relaxed text-text-secondary">{faq.a}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
