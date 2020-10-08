module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      fontFamily: {
        display: ['Nunito'],
      },
      rotate: {
        '-6': '-6deg',
      },
      animation: {
        'spin-reverse': 'spin-reverse 1s linear infinite',
      },
      keyframes: {
        'spin-reverse': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(-360deg)' },
        },
      },
    },
  },
  variants: {
    margin: ['responsive', 'first'],
    borderColor: ['group-hover'],
  },
  plugins: [],
};
