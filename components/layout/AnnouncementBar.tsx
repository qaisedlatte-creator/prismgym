"use client";

const ITEMS = "FREE SHIPPING ABOVE ₹999 · COD AVAILABLE · MADE IN INDIA · USE CODE PRISM10 FOR 10% OFF · ";
const REPEATED = ITEMS.repeat(10);

export function AnnouncementBar() {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 60,
        height: 36,
        background: "#1a1a1a",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="marquee-track">
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.58rem",
            fontWeight: 500,
            letterSpacing: "0.2em",
            color: "#ffffff",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          {REPEATED}
        </span>
      </div>
    </div>
  );
}
