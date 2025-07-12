const path = require('path');

const config = {
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'VisitTracker',
    libraryTarget: 'umd',
    globalObject: 'this',
    clean: true 
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

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    // Development-specific config
    config.devtool = 'inline-source-map';
    config.devServer = {
      static: {
        directory: path.join(__dirname, 'test-public'),
      },
      hot: true,
      port: 3000,
      open: true,
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
      },
    };
  }

  return config;
};