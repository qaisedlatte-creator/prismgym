"use client";

const TEXT = "FREE SHIPPING ON ORDERS ABOVE ₹999 · COD AVAILABLE · MADE IN INDIA 🇮🇳 · ";
const REPEATED = TEXT.repeat(8);

export function AnnouncementBar() {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 60,
        height: 32,
        background: "#ffffff",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="marquee-track">
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.6rem",
            letterSpacing: "0.15em",
            color: "#000000",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            paddingRight: 0,
          }}
        >
          {REPEATED}
        </span>
      </div>
    </div>
  );
}
