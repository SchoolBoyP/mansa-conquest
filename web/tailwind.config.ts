import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#0B0B0C",
        onyx: "#141416",
        graphite: "#1E1E22",
        gold: { DEFAULT: "#D4AF37", bright: "#E8C658", deep: "#A8842A" },
        emerald: { DEFAULT: "#0F5132", light: "#1A7A4E" },
        ivory: "#F5F1E6",
        sand: "#A89F8C",
        line: "#2A2A2E",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: { content: "1240px" },
      keyframes: {
        shine: { to: { backgroundPosition: "200% center" } },
        drop: { "0%,100%": { opacity: "0.3", transform: "scaleY(.6)" }, "50%": { opacity: "1", transform: "scaleY(1)" } },
      },
      animation: {
        shine: "shine 6s linear infinite",
        drop: "drop 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
