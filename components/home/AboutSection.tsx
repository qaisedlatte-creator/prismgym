"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function AboutSection() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[#888888] text-xs tracking-[0.3em] uppercase mb-6">ABOUT PRISM</p>
          <h2
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 0.9 }}
            className="text-white mb-8"
          >
            BORN FROM IRON. BUILT FOR THE STREETS.
          </h2>
          <p className="text-[#888888] text-sm sm:text-base leading-relaxed mb-6">
            Prism India was built in the weight room and designed for the world outside it. We don't make clothes for gym selfies. We make armour for the ones who grind before the sun comes up and still show up harder the next day.
          </p>
          <p className="text-[#888888] text-sm sm:text-base leading-relaxed mb-10">
            Every stitch is performance-first. Every cut is street-ready. Because real athletes don't choose between looking good and performing better — they demand both.
          </p>
          <Link
            href="/about"
            className="inline-flex border border-white text-white px-8 py-3 text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-[#0a0a0a] transition-colors duration-200"
          >
            OUR STORY →
          </Link>
        </motion.div>

        {/* Image */}
        <motion.div
          className="relative aspect-[4/5] bg-[#1a1a1a] rounded-sm overflow-hidden"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Image
            src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80"
            alt="PRISM INDIA — Built Different"
            fill
            className="object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0a0a]/60 to-transparent" />
          <div className="absolute bottom-6 right-6">
            <p
              className="text-white text-4xl tracking-widest opacity-30"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              PRISM
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
