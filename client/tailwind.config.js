/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', '@modules/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: [
        'martel-sans',
        'Helvetica',
        'Arial',
        'sans-serif',
        'ui-sans-serif',
        'system-ui',
      ],
    },
    extend: {
      height: {
        // Complex site-specific row configuration
        h90: '95%',
        h500: '500px',
        h300: '300px',
      },
      width: {
        // Complex site-specific row configuration
        wl: '3000px',
      },
      top: {
        // Complex site-specific row configuration
        '3/5': '60%',
      },
    },
  },
  plugins: [],
};
