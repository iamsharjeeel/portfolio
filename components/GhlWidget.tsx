"use client";

import Script from "next/script";

const FORM_SRC =
  "https://links.s1mplesolutions.cc/widget/form/Uz2HqJA1sQk9EC6LTcHV";
const BOOKING_SRC =
  "https://links.s1mplesolutions.cc/widget/booking/6MeULKb9URhRkDsOtCPi";
const EMBED_SCRIPT = "https://links.s1mplesolutions.cc/js/form_embed.js";

export function GhlFormWidget({ lazy = false }: { lazy?: boolean }) {
  return (
    <div className="ghl-shell w-full max-w-[640px] mx-auto mt-14 overflow-hidden rounded-2xl border border-line bg-bg-raised">
      <iframe
        src={FORM_SRC}
        id="ghl-form-Uz2HqJA1sQk9EC6LTcHV"
        title="Contact Sharjeel"
        loading={lazy ? "lazy" : "eager"}
        className="block w-full border-0 bg-bg-raised"
        style={{ minHeight: 720, height: 720 }}
      />
      <Script src={EMBED_SCRIPT} strategy="afterInteractive" />
    </div>
  );
}

export function GhlBookingWidget() {
  return (
    <div className="ghl-shell w-full max-w-[880px] mx-auto mt-14 overflow-hidden rounded-2xl border border-line bg-bg-raised">
      <iframe
        src={BOOKING_SRC}
        id="ghl-booking-6MeULKb9URhRkDsOtCPi"
        title="Book a call with Sharjeel"
        className="block w-full border-0 bg-bg-raised"
        style={{ minHeight: 900, height: 900 }}
      />
      <Script src={EMBED_SCRIPT} strategy="afterInteractive" />
    </div>
  );
}
