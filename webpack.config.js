// import path from "path";
// import HtmlWebpackPlugin from "html-webpack-plugin";
// import webpack from "webpack";  // for production

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");  // for production
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


const config = {
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


if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.DefinePlugin({
      // sets production env in webpack
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new UglifyJsPlugin()
  );
}


module.exports = config;