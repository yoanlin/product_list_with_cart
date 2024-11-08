import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [`var(--font-red-hat)`],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        theme_red: "#bd0b0b",
      },
    },
  },
  plugins: [],
};
export default config;
