import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Born from iron, built for the streets. The story behind PRISM INDIA.",
};

export default function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", paddingTop: 100, paddingBottom: 80, background: "#fff" }}>
      {/* Hero */}
      <div style={{ position: "relative", height: "60vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", marginBottom: 80 }}>
        <Image src="/products/compression_half_black.png" alt="PRISM INDIA" fill style={{ objectFit: "cover", objectPosition: "center 10%", opacity: 0.25 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #fff 0%, transparent 30%, transparent 70%, #fff 100%)" }} />
        <div style={{ position: "relative", textAlign: "center", padding: "0 1rem" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.4em", textTransform: "uppercase", color: "#888", marginBottom: 20 }}>
            OUR STORY
          </p>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(4rem, 14vw, 10rem)", lineHeight: 0.85, color: "#000" }}>
            PRISM<br />INDIA
          </h1>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 clamp(1rem, 4vw, 3rem)" }}>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, marginBottom: 80, alignItems: "center" }} className="grid-cols-1 md:grid-cols-2">
          <div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.5rem", lineHeight: 1, color: "#000", marginBottom: 20 }}>BORN FROM IRON</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#666", lineHeight: 1.75, marginBottom: 16, fontSize: "0.9rem" }}>
              Prism India wasn&apos;t built in a boardroom. It was built in the weight room — between sets, between failures, between the moments when most people quit and the rare few decide to go again.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#666", lineHeight: 1.75, fontSize: "0.9rem" }}>
              We saw a gap in the Indian market. Nobody was making gym wear that actually looked like it belonged outside the gym. Nobody was building for athletes who live and breathe their craft 24 hours a day.
            </p>
          </div>
          <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", border: "1px solid #e8e8e8" }}>
            <Image src="/products/compression_full_black.png" alt="PRISM INDIA" fill style={{ objectFit: "cover", objectPosition: "50% 8%" }} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, marginBottom: 80, alignItems: "center" }} className="grid-cols-1 md:grid-cols-2">
          <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", border: "1px solid #e8e8e8", order: 2 }} className="order-2 md:order-1">
            <Image src="/products/ribbed_vest_maroon.png" alt="PRISM INDIA" fill style={{ objectFit: "cover", objectPosition: "50% 8%" }} />
          </div>
          <div style={{ order: 1 }} className="order-1 md:order-2">
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.5rem", lineHeight: 1, color: "#000", marginBottom: 20 }}>BUILT FOR THE STREETS</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#666", lineHeight: 1.75, marginBottom: 16, fontSize: "0.9rem" }}>
              We don&apos;t make clothes for selfies. We make armour for the ones who grind before the sun comes up and still show up harder the next day.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#666", lineHeight: 1.75, marginBottom: 16, fontSize: "0.9rem" }}>
              Every piece is engineered from the ground up — performance fabric that moves with your body, cuts that work in the squat rack and on the block.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#666", lineHeight: 1.75, fontSize: "0.9rem" }}>
              We&apos;re from Kerala. We&apos;re from India. And we&apos;re building something the world hasn&apos;t seen yet.
            </p>
          </div>
        </div>

        {/* Follow us on Instagram note */}
        <div style={{ border: "1px solid #e8e8e8", padding: 32, textAlign: "center", marginBottom: 64, background: "#f8f8f8" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "#888", marginBottom: 8 }}>FOLLOW THE JOURNEY</p>
          <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", color: "#000", marginBottom: 12 }}>@PRISMINDIA.IN</h3>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#999", marginBottom: 20 }}>See drops, athlete features, and behind-the-scenes on Instagram.</p>
          <a href="https://www.instagram.com/prismindia.in" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-block", background: "#000", color: "#fff", padding: "12px 32px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>
            FOLLOW ON INSTAGRAM
          </a>
        </div>

        {/* Values */}
        <div style={{ borderTop: "2px solid #000", paddingTop: 60, marginBottom: 60 }}>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#000", textAlign: "center", marginBottom: 48 }}>WHAT WE STAND FOR</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }} className="grid-cols-1 sm:grid-cols-3">
            {[
              { title: "PERFORMANCE FIRST", text: "Every cut, stitch, and fabric choice starts with one question: does it help you perform better?" },
              { title: "STREET READY", text: "Your gym wear shouldn't stop at the gym door. Prism pieces move with you from iron to street." },
              { title: "BUILT IN INDIA", text: "Made with pride in India — supporting local manufacturing while delivering global-standard quality." },
            ].map(({ title, text }) => (
              <div key={title} style={{ textAlign: "center", padding: "0 8px" }}>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.2rem", color: "#000", letterSpacing: "0.08em", marginBottom: 12 }}>{title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "#777", lineHeight: 1.7 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <Link href="/catalog" style={{ display: "inline-block", background: "#000", color: "#fff", padding: "14px 48px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>
            SHOP THE COLLECTION
          </Link>
        </div>
      </div>
    </div>
  );
}
