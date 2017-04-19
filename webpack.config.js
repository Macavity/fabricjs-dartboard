const path = require('path')
const webpack = require('webpack')

let config = {
  context: path.join(__dirname, 'src'),
  entry: [
    './index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'dartboard.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    overlay: true,
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader' },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
}
module.exports = config
