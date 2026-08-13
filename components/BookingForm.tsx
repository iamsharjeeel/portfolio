"use client";

import { useMemo, useState, type FormEvent } from "react";
import { trackEvent } from "@/lib/analytics";

type Status = "idle" | "sending" | "sent" | "error";

const TIMES = Array.from({ length: 24 * 2 }, (_, i) => {
  const hour = Math.floor(i / 2);
  const minute = i % 2 === 0 ? "00" : "30";
  return `${String(hour).padStart(2, "0")}:${minute}`;
});

function timezone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
}

function todayIso() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

export default function BookingForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const zone = useMemo(() => timezone(), []);
  const minDate = useMemo(() => todayIso(), []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      project: String(data.get("project") || ""),
      date: String(data.get("date") || ""),
      time: String(data.get("time") || ""),
      timezone: String(data.get("timezone") || zone),
      notes: String(data.get("notes") || ""),
      website: String(data.get("website") || ""),
    };

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/book", {
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
      trackEvent("booking_submit");
    } catch {
      setStatus("error");
      setError("Network error. Try again in a moment.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-[640px] mx-auto mt-14 text-left"
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <label className="block">
          <span className="font-mono text-[10px] tracking-widest uppercase text-text-faint">
            Phone
          </span>
          <input
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className="mt-2 w-full bg-transparent border-b border-line focus:border-accent outline-none py-3 text-[15px] text-text placeholder:text-text-faint"
            placeholder="+1 555 123 4567"
          />
        </label>
        <label className="block">
          <span className="font-mono text-[10px] tracking-widest uppercase text-text-faint">
            Project type
          </span>
          <input
            name="project"
            className="mt-2 w-full bg-transparent border-b border-line focus:border-accent outline-none py-3 text-[15px] text-text placeholder:text-text-faint"
            placeholder="Build, campaign, or both"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <label className="block">
          <span className="font-mono text-[10px] tracking-widest uppercase text-text-faint">
            Date
          </span>
          <input
            name="date"
            type="date"
            required
            min={minDate}
            className="mt-2 w-full bg-transparent border-b border-line focus:border-accent outline-none py-3 text-[15px] text-text"
          />
        </label>
        <label className="block">
          <span className="font-mono text-[10px] tracking-widest uppercase text-text-faint">
            Time
          </span>
          <select
            name="time"
            required
            defaultValue=""
            className="mt-2 w-full bg-transparent border-b border-line focus:border-accent outline-none py-3 text-[15px] text-text"
          >
            <option value="" disabled>
              Choose a time
            </option>
            {TIMES.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-3 font-mono text-[10px] tracking-widest uppercase text-text-faint">
        Timezone · {zone}
      </p>
      <input type="hidden" name="timezone" value={zone} />

      <label className="block mt-4">
        <span className="font-mono text-[10px] tracking-widest uppercase text-text-faint">
          Notes
        </span>
        <textarea
          name="notes"
          rows={4}
          className="mt-2 w-full bg-transparent border-b border-line focus:border-accent outline-none py-3 text-[15px] text-text placeholder:text-text-faint resize-y min-h-[120px]"
          placeholder="What should we cover?"
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
          className="inline-flex items-center justify-center min-h-11 px-6 bg-accent text-bg font-mono text-xs tracking-wider uppercase hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {status === "sending" ? "Sending…" : "Request this time"}
        </button>
        {status === "sent" && (
          <span
            role="status"
            aria-live="polite"
            className="font-mono text-xs text-accent-green uppercase tracking-wide"
          >
            Requested — I&apos;ll confirm the time.
          </span>
        )}
        {status === "error" && (
          <span
            role="alert"
            aria-live="assertive"
            className="font-mono text-xs text-accent uppercase tracking-wide"
          >
            {error}
          </span>
        )}
      </div>
    </form>
  );
}
