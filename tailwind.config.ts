import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          bg: "#121212",
          surface: "#1E1E1E",
          card: "#252525",
          border: "#2E2E2E",
          rust: "#C05640",
          "rust-hover": "#A8432E",
          teal: "#469E99",
          "teal-dim": "#2D6E6A",
          gold: "#F4B942",
        },
      },
    },
  },
  plugins: [],
};
export default config;
