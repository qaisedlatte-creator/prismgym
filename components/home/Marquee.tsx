"use client";

const items = [
  "NEW DROP",
  "BUILT DIFFERENT",
  "PRISM INDIA",
  "GYM WEAR",
  "WEAR THE GRIND",
  "FORGED IN IRON",
  "STREETWEAR × PERFORMANCE",
  "MADE IN INDIA",
];

export function Marquee() {
  const doubled = [...items, ...items];

  return (
    <div className="bg-[#0a0a0a] py-4 overflow-hidden">
      {/* Row 1 — left */}
      <div className="marquee-track mb-2">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center flex-shrink-0">
            <span
              className="text-white tracking-[0.05em] uppercase px-6 whitespace-nowrap"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(1.5rem, 4vw, 3rem)",
              }}
            >
              {item}
            </span>
            <span className="text-[#2a2a2a] mx-2" style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)" }}>·</span>
          </span>
        ))}
      </div>

      {/* Row 2 — right */}
      <div className="marquee-track-reverse">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center flex-shrink-0">
            <span
              className="text-[#2a2a2a] tracking-[0.05em] uppercase px-6 whitespace-nowrap"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(1.5rem, 4vw, 3rem)",
              }}
            >
              {item}
            </span>
            <span className="text-[#2a2a2a] mx-2" style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)" }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
