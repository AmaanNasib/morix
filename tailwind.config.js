import { heroui } from "@heroui/theme";
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        // Brand Palette
        primary: "#CD1E2F",
        secondary: "#FFB457",
        accent: "#5EA2EF",

        // Semantic Colors
        success: "#12B76A",
        warning: "#F79009",
        danger: "#CD1E2F",
        neutral: "#0F172A0D",

        // Custom Named Groups (optional clarity)
        green: {
          600: "#12B76A",
        },
        gray: {
          200: "#0F172A0D",
        },
        orange: {
          500: "#F79009",
          600: "#F04438",
        },
      },

      fontFamily: {
        montserrat: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },

      boxShadow: {
        "2xl":
          "0 35px 60px -15px rgba(0, 0, 0, 0.1), 0 12px 35px -5px rgba(0, 0, 0, 0.05)",
      },

      borderRadius: {
        "2xl": "20px",
      },

      spacing: {
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        7: "1.75rem",
        8: "2rem",
        9: "2.25rem",
        10: "2.5rem",
        11: "2.75rem",
        12: "3rem",
        14: "3.5rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
        28: "7rem",
        32: "8rem",
        36: "9rem",
        40: "10rem",
        44: "11rem",
        48: "12rem",
        52: "13rem",
        56: "14rem",
        60: "15rem",
        64: "16rem",
        72: "18rem",
        80: "20rem",
        96: "24rem",
      },

      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },

  darkMode: "class",

  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: "#CD1E2F",
            secondary: "#FFB457",
            success: "#12B76A",
            warning: "#F79009",
            danger: "#CD1E2F",
            background: "#F8F9FE",
            foreground: "#0F0F0F",
            card: "#FFFFFF",
            border: "#E4E4E7",
            input: "#F4F4F5",
            muted: "#0F172A0D",
          },
        },
        dark: {
          colors: {
            primary: "#FF6B6B",
            secondary: "#F5A524",
            background: "#0F0F0F",
            foreground: "#FFFFFF",
            border: "#27272A",
            card: "#18181B",
          },
        },
      },
      defaultTheme: "light",
    }),
  ],
};
