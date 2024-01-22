import { nextui } from "@nextui-org/react";

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#FFE0E0",
          200: "#DE5353",
        },
        text: "#3B5079",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: "#DE5353",
            text: "#3B5079",
          },
        },
        dark: {
          colors: { primary: "#DE5353", text: "#3B5079" },
        },
      },
    }),
  ],
};
