/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/ui/**/*.{js,ts,jsx,tsx}", // Include only files in the src/ui directory
    "./src/lib/**/*.{js,ts,jsx,tsx}", // Include only files in the src/ui directory
    "./src/layouts/**/*.{js,ts,jsx,tsx}", // Include only files in the src/ui directory
    "./src/components/**/*.{js,ts,jsx,tsx}", // Include only files in the src/ui directory
  ],
  corePlugins: {
    preflight: false, // Disable default CSS
  },
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
}
