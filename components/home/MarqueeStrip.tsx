const ITEMS = "STREETWEAR TEES · COMPRESSION TOPS · RIBBED VESTS · GYM BASICS · MADE IN INDIA · FREE SHIPPING ₹999+ · NEW SEASON DROP · ";
const REPEATED = ITEMS.repeat(6);

export function MarqueeStrip() {
  return (
    <div
      style={{
        borderTop: "2px solid #000",
        borderBottom: "2px solid #000",
        overflow: "hidden",
        padding: "14px 0",
        background: "#fff",
      }}
    >
      <div className="marquee-track">
        <span
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "0.85rem",
            letterSpacing: "0.2em",
            color: "#bbb",
            whiteSpace: "nowrap",
          }}
        >
          {REPEATED}
        </span>
      </div>
    </div>
  );
}
