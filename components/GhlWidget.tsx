"use client";

import Script from "next/script";

const FORM_SRC =
  "https://links.s1mplesolutions.cc/widget/form/Uz2HqJA1sQk9EC6LTcHV";
const BOOKING_SRC =
  "https://links.s1mplesolutions.cc/widget/booking/6MeULKb9URhRkDsOtCPi";
const EMBED_SCRIPT = "https://links.s1mplesolutions.cc/js/form_embed.js";

export function GhlFormWidget({ lazy = false }: { lazy?: boolean }) {
  return (
    <div className="w-full max-w-[960px] mx-auto mt-14 overflow-hidden rounded-2xl border border-line bg-bg-raised">
      <iframe
        src={FORM_SRC}
        id="ghl-form-Uz2HqJA1sQk9EC6LTcHV"
        title="Contact Sharjeel"
        loading={lazy ? "lazy" : "eager"}
        referrerPolicy="strict-origin-when-cross-origin"
        className="block w-full border-0 bg-bg-raised"
        style={{ minHeight: 720, height: 780 }}
      />
      <Script src={EMBED_SCRIPT} strategy="afterInteractive" />
    </div>
  );
}

export function GhlBookingWidget() {
  return (
    <div className="w-full max-w-[1100px] mx-auto mt-14 overflow-hidden rounded-2xl border border-line bg-bg-raised">
      <iframe
        src={BOOKING_SRC}
        id="ghl-booking-6MeULKb9URhRkDsOtCPi"
        title="Book a call with Sharjeel"
        referrerPolicy="strict-origin-when-cross-origin"
        className="block w-full border-0 bg-bg-raised"
        style={{ minHeight: 880, height: 880 }}
      />
      <Script src={EMBED_SCRIPT} strategy="afterInteractive" />
    </div>
  );
}
