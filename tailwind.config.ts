import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#064BFF",
          hover: "#0039DE",
          light: "#EFF5FF",
          border: "#D6E4FF",
        },
        navy: {
          DEFAULT: "#080D26",
          muted: "#182042",
        },
        secondary: "#606879",
        border: "#E0E6EF",
        cardBg: "#FFFFFF",
        surface: "#F8FAFD",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 2px 8px -2px rgba(8, 13, 38, 0.05), 0 1px 3px -1px rgba(8, 13, 38, 0.03)",
        cardHover: "0 10px 25px -5px rgba(6, 75, 255, 0.08), 0 8px 10px -6px rgba(8, 13, 38, 0.03)",
        nav: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;

