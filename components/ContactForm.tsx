"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      project: String(data.get("project") || ""),
      message: String(data.get("message") || ""),
      website: String(data.get("website") || ""),
    };

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus("error");
        setError(json.error || "Something went wrong. Try again.");
        return;
      }
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setError("Network error. Try again in a moment.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-[560px] mx-auto mt-14 text-left"
      noValidate
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="font-mono text-[10px] tracking-widest uppercase text-text-faint">
            Name
          </span>
          <input
            name="name"
            required
            autoComplete="name"
            className="mt-2 w-full bg-transparent border-b border-line focus:border-accent outline-none py-3 text-[15px] text-text placeholder:text-text-faint"
            placeholder="Your name"
          />
        </label>
        <label className="block">
          <span className="font-mono text-[10px] tracking-widest uppercase text-text-faint">
            Email
          </span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-2 w-full bg-transparent border-b border-line focus:border-accent outline-none py-3 text-[15px] text-text placeholder:text-text-faint"
            placeholder="you@company.com"
          />
        </label>
      </div>

      <label className="block mt-4">
        <span className="font-mono text-[10px] tracking-widest uppercase text-text-faint">
          Project type
        </span>
        <input
          name="project"
          className="mt-2 w-full bg-transparent border-b border-line focus:border-accent outline-none py-3 text-[15px] text-text placeholder:text-text-faint"
          placeholder="Build, campaign, or both"
        />
      </label>

      <label className="block mt-4">
        <span className="font-mono text-[10px] tracking-widest uppercase text-text-faint">
          Message
        </span>
        <textarea
          name="message"
          required
          rows={4}
          className="mt-2 w-full bg-transparent border-b border-line focus:border-accent outline-none py-3 text-[15px] text-text placeholder:text-text-faint resize-y min-h-[120px]"
          placeholder="What are you trying to ship?"
        />
      </label>

      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />

      <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center min-h-11 px-6 border border-text font-mono text-xs tracking-wider uppercase hover:bg-text hover:text-bg transition-colors disabled:opacity-50"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        {status === "sent" && (
          <span className="font-mono text-xs text-accent-green uppercase tracking-wide">
            Sent — I&apos;ll get back to you.
          </span>
        )}
        {status === "error" && (
          <span className="font-mono text-xs text-accent uppercase tracking-wide">
            {error}
          </span>
        )}
      </div>
    </form>
  );
}
