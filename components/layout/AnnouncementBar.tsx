"use client";

const TEXT = "FREE SHIPPING ON ORDERS ABOVE ₹999 · COD AVAILABLE · MADE IN INDIA 🇮🇳 · ";
const REPEATED = TEXT.repeat(6);

export function AnnouncementBar() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        height: 32,
        background: "#ffffff",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          animation: "marquee 20s linear infinite",
        }}
      >
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.62rem",
            letterSpacing: "0.15em",
            color: "#000000",
            textTransform: "uppercase",
            paddingRight: 0,
          }}
        >
          {REPEATED}
        </span>
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.62rem",
            letterSpacing: "0.15em",
            color: "#000000",
            textTransform: "uppercase",
          }}
          aria-hidden
        >
          {REPEATED}
        </span>
      </div>
    </div>
  );
}
