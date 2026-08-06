"use client";

import { useState } from "react";
import { siteContent } from "@/content/site-content";

const { serviceOptions, budgetOptions, timelineOptions } = siteContent.form;

interface FormData {
  name: string;
  email: string;
  business_name: string;
  business_type: string;
  service_interest: string;
  budget_range: string;
  timeline: string;
  project_details: string;
}

const INITIAL_FORM: FormData = {
  name: "",
  email: "",
  business_name: "",
  business_type: "",
  service_interest: "",
  budget_range: "",
  timeline: "",
  project_details: "",
};

const inputClasses =
  "w-full rounded-lg border border-border-subtle bg-bg-base px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted/50 focus:border-accent-cyan/40 focus:outline-none";
const selectClasses =
  "w-full rounded-lg border border-border-subtle bg-bg-base px-4 py-2.5 text-sm text-text-primary focus:border-accent-cyan/40 focus:outline-none appearance-none";
const labelClasses = "block text-sm font-medium text-text-primary mb-1.5";

export default function IntakeFormBottom(): React.ReactElement {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function update(field: keyof FormData, value: string): void {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "bottom_form" }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setStatus("success");
      setForm(INITIAL_FORM);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-accent-cyan/30 bg-bg-elevated p-8 text-center">
        <h3 className="text-xl font-bold text-text-primary">
          Thanks for reaching out!
        </h3>
        <p className="mt-2 text-text-muted">
          I&apos;ll get back to you within 24 hours — usually much sooner.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border-subtle bg-bg-elevated p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>Name</label>
          <input
            id="name"
            type="text"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Your name"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>Email</label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@company.com"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="business_name" className={labelClasses}>Business name</label>
          <input
            id="business_name"
            type="text"
            value={form.business_name}
            onChange={(e) => update("business_name", e.target.value)}
            placeholder="Your business"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="business_type" className={labelClasses}>Business type</label>
          <input
            id="business_type"
            type="text"
            value={form.business_type}
            onChange={(e) => update("business_type", e.target.value)}
            placeholder="e.g. Restaurant, Real estate, SaaS"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="service_interest" className={labelClasses}>What do you need?</label>
          <select
            id="service_interest"
            value={form.service_interest}
            onChange={(e) => update("service_interest", e.target.value)}
            className={selectClasses}
          >
            <option value="">Select...</option>
            {serviceOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="budget_range" className={labelClasses}>Budget range</label>
          <select
            id="budget_range"
            value={form.budget_range}
            onChange={(e) => update("budget_range", e.target.value)}
            className={selectClasses}
          >
            <option value="">Select...</option>
            {budgetOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="timeline" className={labelClasses}>Timeline</label>
          <select
            id="timeline"
            value={form.timeline}
            onChange={(e) => update("timeline", e.target.value)}
            className={selectClasses}
          >
            <option value="">Select...</option>
            {timelineOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="project_details" className={labelClasses}>Tell me about your project</label>
        <textarea
          id="project_details"
          rows={4}
          value={form.project_details}
          onChange={(e) => update("project_details", e.target.value)}
          placeholder="What are you looking to build? Any goals, pain points, or ideas..."
          className={`${inputClasses} resize-none`}
        />
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-full bg-gradient-to-r from-accent-cyan to-accent-purple px-8 py-3 text-sm font-medium text-bg-base transition-all hover:scale-[1.03] hover:shadow-[0_0_24px_rgba(34,211,238,0.3)] disabled:opacity-50"
        >
          {status === "submitting" ? "Sending..." : "Send it"}
        </button>
        {status === "error" && (
          <p className="text-sm text-red-400">Something went wrong. Try again.</p>
        )}
      </div>
    </form>
  );
}
