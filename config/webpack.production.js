const path = require('path')
const webpack = require('webpack')

module.exports = function (/* env */) {
  return {
    context: path.join(__dirname, '..', 'src'),
    entry: [
      './index.js'
    ],
    output: {
      path: path.join(__dirname, '..', 'dist'),
      filename: 'dartboard.min.js',
      sourceMapFilename: '[name].map',
    },
    devtool: 'eval-source-map',
    devServer: {
      contentBase: path.join(__dirname, '..', 'dist'),
      overlay: true,
    },
    module: {
      rules: [
        { test: /\.(js|jsx)$/, use: 'babel-loader' },
      ]
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
          screw_ie8: true,
          keep_fnames: true
        },
        compress: {
          screw_ie8: true
        },
        comments: false
      })
    ],
  }
}
