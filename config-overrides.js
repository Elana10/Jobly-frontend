const webpack = require('webpack');

module.exports = function override(config, env) {
  // Add polyfills for the missing Node.js core modules
  config.resolve.fallback = {
    ...config.resolve.fallback, // Retain existing fallbacks
    stream: require.resolve('stream-browserify'),
    crypto: require.resolve('crypto-browserify'),
    util: require.resolve('util/'),
    process: require.resolve('process/browser'),
  };

  // Add plugins for additional global shims, if needed
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    })
  );

  return config;
};
