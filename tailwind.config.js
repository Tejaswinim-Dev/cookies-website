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
        cream: {
          50: "#FCFAF6",
          100: "#F8F5EE",
          200: "#F2ECE0",
          300: "#EDE7DA",
        },
        beige: {
          DEFAULT: "#EDE7DA",
          dark: "#E3DAC9",
          light: "#F5F1E8",
        },
        sage: {
          DEFAULT: "#66745A",
          light: "#7B8B6D",
          dark: "#525E48",
          muted: "#EBF0E6",
        },
        olive: {
          DEFAULT: "#3F4A36",
          dark: "#2F3828",
          light: "#4E5C43",
        },
        charcoal: {
          DEFAULT: "#24241F",
          light: "#3A3A34",
          muted: "#6B6A63",
        },
        terracotta: {
          DEFAULT: "#C98F72",
          dark: "#B87B5E",
          light: "#D8A48B",
          subtle: "#F9F1ED",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "Plus Jakarta Sans", "Inter", "sans-serif"],
        handwriting: ["var(--font-caveat)", "Caveat", "cursive"],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(36, 36, 31, 0.05)',
        'lift': '0 12px 30px -4px rgba(36, 36, 31, 0.08)',
        'elevated': '0 20px 40px -10px rgba(36, 36, 31, 0.12)',
      },
    },
  },
  plugins: [],
};
