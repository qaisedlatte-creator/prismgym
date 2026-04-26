"use client";

import Link from "next/link";
import Image from "next/image";

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);

const shopLinks = [
  { href: "/catalog?category=COMPRESSION", label: "Compression" },
  { href: "/catalog?category=VESTS", label: "Vests" },
  { href: "/catalog", label: "All Products" },
];

const helpLinks = [
  { href: "/about", label: "Our Story" },
  { href: "/account", label: "My Account" },
  { href: "/account/orders", label: "Track Order" },
];

const companyLinks = [
  { href: "/about", label: "About Prism" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export function Footer() {
  return (
    <footer style={{ background: "#fff", borderTop: "2px solid #000" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "clamp(3rem, 6vw, 5rem) clamp(1rem, 4vw, 3rem)" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
            gap: 40,
          }}
          className="grid-cols-2 md:grid-cols-4"
        >
          {/* Brand column */}
          <div>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 16 }}>
              <Image src="/logo.svg" alt="PRISM INDIA" width={28} height={28} style={{ height: 28, width: "auto" }} />
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.2rem", letterSpacing: "0.22em", color: "#000" }}>
                PRISM INDIA
              </span>
            </Link>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#999", lineHeight: 1.7, maxWidth: 220, marginBottom: 24 }}>
              Precision-built for the Indian athlete. Made in India.
            </p>
            <a
              href="https://instagram.com/prismindia.in"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#888", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", letterSpacing: "0.1em", transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#000")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#888")}
            >
              <InstagramIcon size={16} />
              @prismindia.in
            </a>
          </div>

          {/* Shop */}
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#000", marginBottom: 16 }}>
              SHOP
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {shopLinks.map((l) => (
                <Link key={l.href} href={l.href}
                  style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#999", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#000")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#999")}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Help */}
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#000", marginBottom: 16 }}>
              HELP
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {helpLinks.map((l) => (
                <Link key={l.href} href={l.href}
                  style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#999", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#000")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#999")}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#000", marginBottom: 16 }}>
              COMPANY
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {companyLinks.map((l) => (
                <Link key={l.href} href={l.href}
                  style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#999", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#000")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#999")}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid #e0e0e0", marginTop: 48, paddingTop: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "#999", letterSpacing: "0.1em" }}>
            © 2025 PRISM INDIA. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            {["VISA", "MC", "UPI", "COD"].map((p) => (
              <span key={p} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.12em", color: "#bbb", border: "1px solid #e0e0e0", padding: "3px 8px" }}>
                {p}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <Link href="/privacy" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: "#999", textDecoration: "none", letterSpacing: "0.1em" }}>Privacy</Link>
            <Link href="/terms" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: "#999", textDecoration: "none", letterSpacing: "0.1em" }}>Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
