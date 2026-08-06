"use client";

import { useState } from "react";
import { siteContent } from "@/content/site-content";

export default function IntakeFormTop(): React.ReactElement {
  const [email, setEmail] = useState("");
  const [idea, setIdea] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    if (!email) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          project_idea: idea,
          source: "hero_hook",
        }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setStatus("success");
      setEmail("");
      setIdea("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="text-sm text-accent-cyan">
        Thanks! We&apos;ll be in touch soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-lg flex-col gap-3 sm:flex-row">
      <input
        type="text"
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder={siteContent.hero.hookPlaceholder}
        className="flex-1 rounded-full border border-border-subtle bg-bg-elevated px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted/60 focus:border-accent-cyan/40 focus:outline-none"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        required
        className="rounded-full border border-border-subtle bg-bg-elevated px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted/60 focus:border-accent-cyan/40 focus:outline-none sm:w-48"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-full bg-gradient-to-r from-accent-cyan to-accent-purple px-6 py-2.5 text-sm font-medium text-bg-base transition-all hover:scale-[1.03] hover:shadow-[0_0_24px_rgba(34,211,238,0.3)] disabled:opacity-50"
      >
        {status === "submitting" ? "Sending..." : "Go"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-400">Something went wrong. Try again.</p>
      )}
    </form>
  );
}
