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
        "first-green": ' #ccd5ae',
        "second-green": '#e9edc9',
        "first-beige": '#FEF7E1',
        "second-beige" : '#faedcd',
        "third-beige" : '#F1D8A2',
        "fourth-beige" : '#d4a373',
        "fifth-beige" : '#C3803C',
        "first-grey" : '#cdc5b4',
        "second-grey" : '#675E56',
        "third-grey" : '#48423C',
      }
    },
  },
  plugins: [],
};
export default config;
