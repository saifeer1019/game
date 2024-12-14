const { fontFamily } = require('tailwindcss/defaultTheme'); // Add this line

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        'bebas': ['var(--font-bebas-neue)', ...fontFamily.sans],
        'orbitron': ['var(--font-orbitron)', ...fontFamily.sans],
        'inter': ['var(--font-inter)', ...fontFamily.sans],
        'roboto-condensed': ['var(--font-roboto-condensed)', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};