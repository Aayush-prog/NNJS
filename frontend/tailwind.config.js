const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        primary: ['"Lato', ...defaultTheme.fontFamily.sans],
        secondary: ['"Merriweather"', ...defaultTheme.fontFamily.serif],
      },
    },
  },
};
