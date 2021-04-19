const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const devBabelConfig = require("./babel.config");

const src = path.resolve(__dirname, "src");
const pub = path.resolve(__dirname, "public");

module.exports = {
  mode: "development",
  entry: `${src}/index.ts`,

  output: {
    path: pub,
    filename: "bundle.js",
  },

  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: devBabelConfig,
      },
      {
        test: /\.scss/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { url: false },
          },
          "sass-loader",
        ],
      },
    ],
  },

  devServer: {
    host: "0.0.0.0",
    port: 3000,
    contentBase: pub,
    historyApiFallback: true,
  },

  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: `${pub}/index.base.html`,
      filename: "index.html",
    }),
  ],
};
