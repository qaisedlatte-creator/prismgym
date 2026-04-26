import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bebas: ["var(--font-bebas)", "sans-serif"],
        dm: ["var(--font-dm)", "sans-serif"],
      },
      colors: {
        background: "#ffffff",
        foreground: "#000000",
        "near-black": "#1a1a1a",
        "grey-1": "#666666",
        "grey-2": "#777777",
        "grey-3": "#888888",
        "grey-4": "#999999",
        "grey-5": "#cccccc",
        "off-white": "#f4f4f4",
        "border-light": "#e8e8e8",
      },
      animation: {
        marquee: "marquee 30s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
