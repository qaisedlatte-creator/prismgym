import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Born from iron, built for the streets. The story behind PRISM INDIA.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-28 pb-24">
      {/* Hero */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden mb-24">
        <Image
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80"
          alt="PRISM INDIA"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
        <div className="relative text-center px-4">
          <p className="text-[#888888] text-xs tracking-[0.4em] uppercase mb-6">OUR STORY</p>
          <h1
            className="text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(4rem, 14vw, 12rem)", lineHeight: 0.85 }}
          >
            PRISM
            <br />
            INDIA
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          <div>
            <h2
              className="text-white mb-6"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.5rem", lineHeight: 1 }}
            >
              BORN FROM IRON
            </h2>
            <p className="text-[#888888] leading-relaxed mb-4">
              Prism India wasn't built in a boardroom. It was built in the weight room, between sets, between failures, between the moments when most people quit and the rare few decide to go again.
            </p>
            <p className="text-[#888888] leading-relaxed">
              We saw a gap in the Indian market — between the corporate sportswear giants and the streets. Nobody was making gym wear that actually looked like it belonged outside the gym. Nobody was building for athletes who live and breathe their craft 24 hours a day.
            </p>
          </div>
          <div className="relative aspect-[3/4] bg-[#1a1a1a] rounded-sm overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80"
              alt="PRISM INDIA"
              fill
              className="object-cover opacity-60"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          <div className="relative aspect-[3/4] bg-[#1a1a1a] rounded-sm overflow-hidden order-2 md:order-1">
            <Image
              src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80"
              alt="Performance wear"
              fill
              className="object-cover opacity-60"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2
              className="text-white mb-6"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.5rem", lineHeight: 1 }}
            >
              BUILT FOR THE STREETS
            </h2>
            <p className="text-[#888888] leading-relaxed mb-4">
              We don't make clothes for selfies. We make armour for the ones who grind before the sun comes up and still show up harder the next day.
            </p>
            <p className="text-[#888888] leading-relaxed mb-4">
              Every piece in the Prism catalogue is engineered from the ground up — performance fabric that moves with your body, cuts that work in the squat rack and on the block, aesthetics that command respect whether you're coming out of the gym or walking into a room.
            </p>
            <p className="text-[#888888] leading-relaxed">
              We're from Kerala. We're from India. And we're building something the world hasn't seen yet.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="border-t border-[#2e2e2e] pt-16 mb-16">
          <h2
            className="text-white text-center mb-12"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "3rem", lineHeight: 1 }}
          >
            WHAT WE STAND FOR
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { title: "PERFORMANCE FIRST", text: "Every cut, every stitch, every fabric choice starts with one question: does it help you perform better?" },
              { title: "STREET READY", text: "Your gym wear shouldn't stop at the gym door. Prism pieces move with you from iron to street." },
              { title: "BUILT IN INDIA", text: "Made with pride in India. Supporting local manufacturing while delivering global-standard quality." },
            ].map(({ title, text }) => (
              <div key={title} className="text-center">
                <h3
                  className="text-white mb-4"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.25rem", letterSpacing: "0.1em" }}
                >
                  {title}
                </h3>
                <p className="text-[#888888] text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/catalog"
            className="inline-block bg-white text-[#0a0a0a] px-12 py-4 text-sm font-bold tracking-[0.2em] uppercase hover:bg-[#c0c0c0] transition-colors"
          >
            SHOP THE COLLECTION
          </Link>
        </div>
      </div>
    </div>
  );
}
