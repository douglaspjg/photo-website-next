import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      cabinet: ["var(--font-cabinet)"],
      generalSans: ["var(--font-general-sans)"],
      ranade: ["var(--font-ranade)"],
      satoshi: ["var(--font-satoshi)"],
      sourceCodePro: ["var(--font-source-code-pro)"],
    },
    extend: {
      colors: {
        "primary": ' #FAFAF9',
        "main-black": '#262626',
        "main-grey": '#666666',
        "accent" : '#B6D89B'
      }
    },
  },
  plugins: [],
};
export default config;
