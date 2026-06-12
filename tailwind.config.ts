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
      colors: {
        primary: {
          50:  "#eef5ff",
          100: "#d9e9ff",
          200: "#bcd6ff",
          300: "#8ebcff",
          400: "#5a97ff",
          500: "#3b82f6",  // Main blue
          600: "#1d6ef5",
          700: "#1558e1",
          800: "#1746b6",
          900: "#1a3d8f",
          950: "#142757",
        },
        accent: {
          50:  "#fff8eb",
          100: "#ffefc6",
          200: "#ffdc88",
          300: "#ffc34a",
          400: "#ffab20",
          500: "#f98c07",  // Gold amber
          600: "#dd6a02",
          700: "#b74a06",
          800: "#94390c",
          900: "#7a300d",
          950: "#461704",
        },
        dark: {
          900: "#0a0f1e",
          800: "#0d1526",
          700: "#111d33",
          600: "#162040",
        },
        surface: {
          light: "#f8faff",
          DEFAULT: "#f0f4ff",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-plus-jakarta)", "system-ui", "sans-serif"],
        heading: ["var(--font-plus-jakarta)", "var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-gradient": "linear-gradient(135deg, #0a0f1e 0%, #1a3d8f 50%, #142757 100%)",
        "card-gradient": "linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(249,140,7,0.05) 100%)",
        "glass": "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "shimmer": "shimmer 2.5s linear infinite",
        "fade-up": "fadeUp 0.6s ease-out",
        "slide-in": "slideIn 0.5s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(59,130,246,0.5), 0 0 20px rgba(59,130,246,0.3)" },
          "100%": { boxShadow: "0 0 20px rgba(59,130,246,0.8), 0 0 60px rgba(59,130,246,0.4)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "glow-blue": "0 0 30px rgba(59,130,246,0.35)",
        "glow-gold": "0 0 30px rgba(249,140,7,0.35)",
        "card": "0 4px 24px rgba(10,15,30,0.12)",
        "card-hover": "0 8px 40px rgba(10,15,30,0.2)",
        "glass": "0 8px 32px rgba(10,15,30,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
