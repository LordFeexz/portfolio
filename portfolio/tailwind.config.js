const withMt = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
export default withMt({
  content: ["./src/**/*.{astro,html,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
});
