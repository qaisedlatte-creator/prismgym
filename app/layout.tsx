import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    default: "PRISM INDIA — Built Different",
    template: "%s | PRISM INDIA",
  },
  description: "Premium gymwear engineered for the Indian athlete. Second-skin compression, ribbed vests, and performance basics. Made in India.",
  keywords: ["gym wear india", "compression wear india", "prism india", "premium gym clothes", "athletic wear india"],
  metadataBase: new URL("https://prismindia.co"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://prismindia.co",
    siteName: "PRISM INDIA",
    title: "PRISM INDIA — Built Different",
    description: "Premium gymwear engineered for the Indian athlete.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "PRISM INDIA" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PRISM INDIA — Built Different",
    description: "Premium gymwear engineered for the Indian athlete.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <AnnouncementBar />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
