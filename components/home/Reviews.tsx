"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Arjun Menon",
    location: "Mumbai",
    rating: 5,
    text: "The Heavyweight Hoodie is insane. 500GSM is no joke — this thing is built like armour. Wore it to every morning session this winter. Zero regrets.",
    product: "Heavyweight Hoodie",
  },
  {
    id: 2,
    name: "Rahul Krishnan",
    location: "Bangalore",
    rating: 5,
    text: "Finally a gym wear brand from India that gets the aesthetic right. The Stringer Vest fits perfectly, fabric quality is premium, and it actually looks like something I'd wear outside the gym.",
    product: "Stringer Vest",
  },
  {
    id: 3,
    name: "Siddharth V.",
    location: "Hyderabad",
    rating: 5,
    text: "Ordered the Cargo Track Pants and they exceeded expectations. The quality rivals international brands but at a fraction of the price. Prism is the real deal.",
    product: "Cargo Track Pants",
  },
  {
    id: 4,
    name: "Dev Nair",
    location: "Kochi",
    rating: 5,
    text: "Been training for 8 years and these are the best compression shorts I've ever worn. The fit is perfect, recovery feels faster. Already ordered two more pairs.",
    product: "Compression Shorts",
  },
];

export function Reviews() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + reviews.length) % reviews.length);
  const next = () => setCurrent((c) => (c + 1) % reviews.length);

  return (
    <section className="py-24 bg-[#0f0f0f] border-y border-[#2e2e2e]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.p
          className="text-[#888888] text-xs tracking-[0.3em] uppercase mb-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          WHAT THEY SAY
        </motion.p>
        <motion.h2
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1 }}
          className="text-white tracking-wide mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          THE PRISM VERDICT
        </motion.h2>

        <div className="relative min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="px-4 sm:px-16"
            >
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: reviews[current].rating }).map((_, i) => (
                  <Star key={i} size={14} className="fill-white text-white" />
                ))}
              </div>
              <blockquote className="text-white text-lg sm:text-xl leading-relaxed mb-8 italic">
                &ldquo;{reviews[current].text}&rdquo;
              </blockquote>
              <div>
                <p className="text-white font-medium text-sm">{reviews[current].name}</p>
                <p className="text-[#888888] text-xs mt-1">
                  {reviews[current].location} · {reviews[current].product}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={prev}
            className="w-10 h-10 border border-[#2e2e2e] flex items-center justify-center text-[#888888] hover:text-white hover:border-white transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  i === current ? "bg-white" : "bg-[#2e2e2e]"
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 border border-[#2e2e2e] flex items-center justify-center text-[#888888] hover:text-white hover:border-white transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
