import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    './svg/**/*.{js,ts,jsx,tsx,mdx}',
    './articles/**/*.{js,ts,jsx,tsx,mdx}',
    './articles/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      layout: {
        dividerWeight: "1px", // h-divider the default height applied to the divider component
        disabledOpacity: 0.5, // this value is applied as opacity-[value] when the component is disabled
        fontSize: {
          tiny: "0.75rem", // text-tiny
          small: "0.875rem", // text-small
          medium: "1rem", // text-medium
          large: "1.125rem", // text-large
        },
        lineHeight: {
          tiny: "1rem", // text-tiny
          small: "1.25rem", // text-small
          medium: "1.5rem", // text-medium
          large: "1.75rem", // text-large
        },
        radius: {
          small: "4px", // rounded-small
          medium: "8px", // rounded-medium
          large: "8px", // rounded-large
        },
        borderWidth: {
          small: "1px", // border-small
          medium: "2px", // border-medium (default)
          large: "3px", // border-large
        },
      },

      themes: {
        light: {
          colors: {
            primary: "#FFA31A",
            secondary: "#141414",
            background: "#FFFFFF",
            text: "#000000",
          }
        },
        dark: {
          colors: {
            primary: "#FFA31A",
            secondary: "#FFFFFF",
            background: "#141414",
            text: "#FFFFFF",
          }
        },
      }
    })
  ],
}

module.exports = tailwindConfig;
