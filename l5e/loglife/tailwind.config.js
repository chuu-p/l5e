/** @type {import('tailwindcss').Config} */
module.exports = {
  // We include your specific folder structure here
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./app/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        void: "#050505", // Deep black
        neon: "#CCFF00", // Edgy yellow
        zinc: {
          900: "#18181b",
          800: "#27272a",
        },
      },
    },
  },
  plugins: [],
};
