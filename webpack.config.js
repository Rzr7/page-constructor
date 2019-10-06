const path = require('path');

module.exports = {
  // entry: './assets/js/constructor/builder.js',
  entry: "./js/constructor/index.js",
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};