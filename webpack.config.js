const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  entry: './client/index.js',
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    publicPath: 'http://localhost:8080/build/',
    compress: true,
    port: 8080,
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.s(a|c)ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
