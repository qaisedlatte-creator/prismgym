"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const words = ["BUILT", "DIFFERENT."];

export function Hero() {
  return (
    <section className="relative min-h-screen bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80"
          alt="PRISM INDIA Hero"
          fill
          priority
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/40 via-transparent to-[#0a0a0a]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center pt-24">
        {/* Eyebrow */}
        <motion.p
          className="text-[#888888] text-xs tracking-[0.4em] uppercase mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          PRISM INDIA · STREETWEAR × GYM WEAR
        </motion.p>

        {/* Main headline */}
        <div className="overflow-hidden">
          <div className="flex flex-wrap justify-center gap-x-6">
            {words.map((word, i) => (
              <motion.span
                key={word}
                className="text-white block"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(5rem, 18vw, 18rem)",
                  lineHeight: 0.9,
                  letterSpacing: "0.02em",
                }}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Subtitle */}
        <motion.p
          className="text-[#888888] text-sm sm:text-base max-w-md mx-auto mt-8 mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          Forged in iron. Worn on the streets. Performance gym wear built for those who don't stop.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <Link
            href="/catalog"
            className="bg-white text-[#0a0a0a] px-10 py-4 text-sm font-bold tracking-[0.2em] uppercase hover:bg-[#c0c0c0] transition-colors duration-200"
          >
            SHOP NOW
          </Link>
          <Link
            href="/about"
            className="border border-white text-white px-10 py-4 text-sm font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-[#0a0a0a] transition-colors duration-200"
          >
            OUR STORY
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="w-px h-16 bg-gradient-to-b from-white to-transparent mx-auto"
            animate={{ scaleY: [0, 1, 0], originY: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
