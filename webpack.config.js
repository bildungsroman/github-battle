const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },  // to translate ES6 to old JS, and JSX to JS
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }  // changes @import to require statements
    ]
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'app/index.html'
    })
  ],
  mode: "development",
};
