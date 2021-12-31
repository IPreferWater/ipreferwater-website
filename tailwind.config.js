module.exports = {
  //mode: 'jit',
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'cel-marker': '#5D5555',
        'cel-orange': '#E59A67',
      },
      fontFamily: {
        marker: ['marker']
      },
    },
  },
  variants: {
    extend: {
      // https://dev.to/mtownsend5512/revealing-hidden-elements-when-hovering-a-parent-with-tailwind-css-159a
      visibility: ["group-hover"]
    },
  },
  plugins: [],
}
