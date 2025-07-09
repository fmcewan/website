/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gruvbox: {
          dark0_hard: '#1d2021',  // very dark background
          dark0: '#282828',       // dark background
          dark1: '#3c3836',
          dark2: '#504945',
          dark3: '#665c54',
          dark4: '#7c6f64',
          gray: '#928374',
          light0_hard: '#f9f5d7',
          light0: '#fbf1c7',      // light background
          light1: '#ebdbb2',      // light beige (text)
          light2: '#d5c4a1',
          light3: '#bdae93',
          light4: '#a89984',
          bright_red: '#fb4934',
          bright_green: '#b8bb26',
          bright_yellow: '#fabd2f',
          bright_blue: '#83a598',
          bright_purple: '#d3869b',
          bright_aqua: '#8ec07c',
          bright_orange: '#fe8019',
        }
      }
    }
  },  
  plugins: [],
}
