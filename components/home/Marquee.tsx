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
    <div className="bg-[#0a0a0a] border-y border-[#2e2e2e] py-5 overflow-hidden">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center flex-shrink-0">
            <span
              className="text-white text-sm sm:text-base tracking-[0.3em] uppercase px-8 whitespace-nowrap"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {item}
            </span>
            <span className="text-[#2e2e2e] text-xl">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
