const path = require("path");

module.exports = {
  entry: [
    "./js/util.js",
    "./js/load.js",
    "./js/pin.js",
    "./js/ad-card.js",
    "./js/ads-filters.js",
    "./js/ads.js",
    "./js/ad-form-validity.js",
    "./js/active-mode.js",
    "./js/ad-form-status-message.js",
    "./js/ad-form.js",
    "./js/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
