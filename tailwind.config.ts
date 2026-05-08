import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#03060c",
        muted: "#9aa7bc",
        neonRed: "#ff2638",
        neonCyan: "#19e6ff",
        neonGreen: "#52ff9c"
      },
      boxShadow: {
        neon: "0 0 42px rgba(25,230,255,.22)"
      }
    }
  },
  plugins: []
};

export default config;