module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors:{
        primary: '#1b4965',
        offwhite: '#eceff1',
        secondary: '#eff6fb'
      }
    },
  },
  variants: {
    extend: {
      borderWidth: ['hover', 'focus'],
    }
  },
  plugins: [],
}
