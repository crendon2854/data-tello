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
              "overflow-hidden rounded-2xl border transition-all duration-300",
              isOpen
                ? "border-blue-200 bg-blue-50/40 shadow-sm"
                : "border-slate-200 bg-white hover:border-slate-300"
            )}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
            >
              <span className="text-sm font-semibold text-slate-900 sm:text-base">{faq.q}</span>
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-lg leading-none transition-all",
                  isOpen
                    ? "rotate-45 border-blue-200 bg-blue-100 text-blue-600"
                    : "border-slate-200 bg-slate-50 text-slate-500"
                )}
              >
                +
              </span>
            </button>
            {isOpen && (
              <div className="border-t border-blue-100/80 px-5 pb-5 pt-3 sm:px-6">
                <p className="text-sm leading-relaxed text-slate-600">{faq.a}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
