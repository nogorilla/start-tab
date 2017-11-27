module.exports = require('./webpack.config-helper')({
  isProduction: false,
  devtool: 'eval-source-map',
  port: 8080
});