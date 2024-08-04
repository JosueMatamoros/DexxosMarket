const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    // ...
    "./index.html", "./src/**/*.{js,ts,jsx,tsx}","./api/**/*.{js,jsx,ts,tsx}",
    flowbite.content(),
  ],
  plugins: [
    // ...
    flowbite.plugin(),
  ],
};