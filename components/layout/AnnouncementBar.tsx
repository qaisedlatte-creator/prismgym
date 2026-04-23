"use client";

import { useEffect, useState } from "react";

export function AnnouncementBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => setHidden(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.3s ease",
      }}
      className="bg-white text-[#0a0a0a] text-xs text-center py-2 px-4 font-medium tracking-widest uppercase"
    >
      FREE SHIPPING ON ORDERS ABOVE ₹999 · COD AVAILABLE · MADE IN INDIA 🇮🇳
    </div>
  );
}
