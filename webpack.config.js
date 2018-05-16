const path = require('path');

module.exports = {
  mode: 'development',
  entry: './client/index.js',
  devServer: { publicPath: '/build', port: 8080 },
  output: {
    path: path.resolve(__dirname, 'build/'),
    filename: 'webpack-bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: [
          path.resolve(__dirname, 'client/'),
        ],
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        },
      },
      // {
      //   test: /\.scss$/,
      //   include: [
      //     path.resolve(__dirname, 'client/'),
      //   ],
      //   use: ['style-loader', 'css-loader', 'sass-loader'],
      // },
    ],
  },
};
