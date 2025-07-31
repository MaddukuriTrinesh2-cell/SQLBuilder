import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-code)', 'sans-serif'],
      },
      colors: {
        'background': '#0A0A0A',
        'panel': '#1A1A1A',
        'border': '#262626',
        'text-primary': '#FAFAFA',
        'text-secondary': '#A3A3A3',
        'accent': '#00E599',
        'accent-hover': '#33FFB5',
      }
    },
  },
  plugins: [],
};
export default config;