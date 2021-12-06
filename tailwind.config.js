module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
        spacing: {
            '4.5': '18px',
            '5.5': '23px',
            '6.6': '26px',
            '6.7': '27px',
            '7.5': '29px',
            '12.5': '50px',
            '13': '52px',
            '15': '60px',
            '17': '70px',
            '19': '77px',
            '22': '88px',
            '26': '108px',
            '32.5': '130px',
            '45': '180px',
            '49': '196px',
            '73.5': '304px',
            '100': '430px',
            'pop': '628px',
            'etri_w1': '1280px'
        }
    },

     textColor: theme => theme('colors'),
     textColor: {
      'etri_light_gray': '#EFF0F2',
      'etri_gray': '#D9D9D9',
      'etri_dark_gray': '#C4C4C4',
      'etri_dark_gray-m': '#7C7C7C',
      'etri_primary': '#1672AB',
      'etri_linear': '#4E94BF',
      'etri_secondary': '#F15A22',
      'etri_text': '#333333',
      'white': '#FFFFFF'
     },

    backgroundColor: theme => ({
     ...theme('colors'),
     'etri_light_gray': '#EFF0F2',
     'etri_gray': '#D9D9D9',
     'etri_dark_gray': '#C4C4C4',
     'etri_dark_gray-m': '#7C7C7C',
     'etri_primary': '#1672AB',
     'etri_linear': '#4E94BF',
     'etri_secondary': '#F15A22',
     'etri_text': '#333333'
    }),

    borderColor: theme => ({
     ...theme('colors'),
      'etri_light_gray': '#EFF0F2',
      'etri_gray': '#D9D9D9',
      'etri_dark_gray': '#C4C4C4',
      'etri_primary': '#1672AB',
      'etri_linear': '#4E94BF',
      'etri_secondary': '#F15A22',
      'etri_text': '#333333'
    }),

    gradientColorStops: theme => ({
     ...theme('colors'),
     'etri_primary': '#1672AB',
     'etri_linear': '#4E94BF',
    }),

    fontSize: {
     'etri_h1': ['70px', '87px'],
     'etri_h2': ['60px', '75px'],
     'etri_h3': ['50px', '62px'],
     'etri_h4': ['40px', '50px'],
     'etri_h5': ['32px', '40px'],
     'etri_h6': ['18px', '22px'],
     'etri_largeB': ['18px', '22px'],
     'etri_mediumB': ['16px', '20px'],
     'etri_smallB': ['14px', '17px'],
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/custom-forms')
  ],
}
