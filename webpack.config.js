const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./web/braintreeReact.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, "web")],
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "env",
                {
                  targets: {
                    browsers: ["last 2 versions", "safari >= 7"]
                  }
                }
              ],
              "react",
              "stage-2"
            ],
            plugins: ["babel-plugin-transform-object-rest-spread"],
            babelrc: false
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./web/braintreeReact.html",
      inject: "body"
    })
  ]
};
