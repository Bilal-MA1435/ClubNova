import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        canvas: "rgb(var(--color-canvas) / <alpha-value>)",
        panel: "rgb(var(--color-panel) / <alpha-value>)",
        panelAlt: "rgb(var(--color-panel-alt) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)",
        text: "rgb(var(--color-text) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        brand: {
          DEFAULT: "rgb(var(--color-brand) / <alpha-value>)",
          strong: "rgb(var(--color-brand-strong) / <alpha-value>)",
          soft: "rgb(var(--color-brand-soft) / <alpha-value>)"
        },
        accent: {
          DEFAULT: "rgb(var(--color-accent) / <alpha-value>)",
          soft: "rgb(var(--color-accent-soft) / <alpha-value>)"
        }
      },
      fontFamily: {
        sans: ["Avenir Next", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
        display: ["Avenir Next", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"]
      },
      borderRadius: {
        sm: "0.75rem",
        md: "1rem",
        lg: "1.5rem"
      },
      boxShadow: {
        card: "0 16px 40px rgba(3, 10, 22, 0.10)",
        focus: "0 0 0 4px rgba(15, 118, 110, 0.16)"
      },
      transitionTimingFunction: {
        emphasis: "cubic-bezier(0.22, 1, 0.36, 1)"
      },
      maxWidth: {
        content: "78rem"
      }
    }
  },
  plugins: []
};

export default config;
