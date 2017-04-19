function buildConfig (env) {
  if (env === 'production') {
    return require('./config/webpack.production.js')(env)
  }
  return require('./config/webpack.dev.js')(env)
}

module.exports = buildConfig;
