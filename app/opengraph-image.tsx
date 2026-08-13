import { ImageResponse } from "next/og";

export const alt = "Sharjeel — Full-stack developer and growth engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0A0A",
          color: "#FAFAF8",
          padding: "72px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#8A8A85",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          }}
        >
          SHARJEEL
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 88,
            lineHeight: 0.9,
            fontWeight: 900,
            letterSpacing: "-0.04em",
            textTransform: "uppercase",
          }}
        >
          <div>Build.</div>
          <div>Deploy.</div>
          <div style={{ color: "#FF4D2E" }}>Scale.</div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#8A8A85",
          }}
        >
          Full-stack developer and growth engineer
        </div>
      </div>
    ),
    { ...size }
  );
}
