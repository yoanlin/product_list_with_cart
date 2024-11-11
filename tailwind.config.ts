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
        theme_red: "#c73a0f",
        rose: {
          50: "#fcf9f7",
          100: "#f4edeb",
          300: "#c9aea6",
          400: "#ad8985",
          500: "#87635a",
          900: "#260f08",
        },
      },
    },
  },
  plugins: [],
};
export default config;
