const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'VisitTracker',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@core': path.resolve(__dirname, 'src/core'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@dashboard': path.resolve(__dirname, 'src/dashboard')
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  externals: {
    '@fingerprintjs/fingerprintjs': {
      commonjs: '@fingerprintjs/fingerprintjs',
      commonjs2: '@fingerprintjs/fingerprintjs',
      amd: '@fingerprintjs/fingerprintjs',
      root: 'FingerprintJS'
    },
    'pusher-js': {
      commonjs: 'pusher-js',
      commonjs2: 'pusher-js',
      amd: 'Pusher',
      root: 'Pusher'
    },
    axios: 'axios',
    uuid: 'uuid'
  }
};