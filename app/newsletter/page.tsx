"use client";

import { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageContainer className="max-w-lg py-16">
      <h1 className="page-title mb-2">Newsletter</h1>
      <p className="mb-8 text-body text-text-secondary">
        Get the latest market opportunities delivered to your inbox.
      </p>

      {submitted ? (
        <div className="glass-card flex items-center gap-2 border-accent-green/30">
          <span className="status-dot-live" />
          <p className="text-sm text-accent-green">
            Thanks for subscribing! We&apos;ll be in touch.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field flex-1"
          />
          <button type="submit" className="btn-primary">
            Subscribe
          </button>
        </form>
      )}
    </PageContainer>
  );
}
