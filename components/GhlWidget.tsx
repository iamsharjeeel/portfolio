"use client";

import Script from "next/script";

const FORM_SRC =
  "https://links.s1mplesolutions.cc/widget/form/Uz2HqJA1sQk9EC6LTcHV";
const BOOKING_SRC =
  "https://links.s1mplesolutions.cc/widget/booking/6MeULKb9URhRkDsOtCPi";
const EMBED_SCRIPT = "https://links.s1mplesolutions.cc/js/form_embed.js";

function ScaledFrame({
  src,
  title,
  id,
  lazy,
  variant,
}: {
  src: string;
  title: string;
  id: string;
  lazy?: boolean;
  variant: "form" | "booking";
}) {
  return (
    <div className={`ghl-scale ghl-scale-${variant}`}>
      <div className="ghl-scale-inner">
        <iframe
          src={src}
          id={id}
          title={title}
          loading={lazy ? "lazy" : "eager"}
          className="ghl-scale-frame"
        />
      </div>
      <Script src={EMBED_SCRIPT} strategy="afterInteractive" />
    </div>
  );
}

export function GhlFormWidget({ lazy = false }: { lazy?: boolean }) {
  return (
    <ScaledFrame
      src={FORM_SRC}
      title="Contact Sharjeel"
      id="ghl-form-Uz2HqJA1sQk9EC6LTcHV"
      lazy={lazy}
      variant="form"
    />
  );
}

export function GhlBookingWidget() {
  return (
    <ScaledFrame
      src={BOOKING_SRC}
      title="Book a call with Sharjeel"
      id="ghl-booking-6MeULKb9URhRkDsOtCPi"
      variant="booking"
    />
  );
}
