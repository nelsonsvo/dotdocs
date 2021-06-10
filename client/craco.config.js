// craco.config.js
module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
    plugins: [require("@tailwindcss/forms")],
  },
};
