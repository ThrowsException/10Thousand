const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./react/index.js",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  mode: process.env.NODE_ENV || "development",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 3001,
    proxy: {
      context: () => true,
      "/": "http://localhost:3000"
    }
  },
  module: {
    rules: [
      {
        // this is so that we can compile any React,
        // ES6 and above into normal ES5 syntax
        test: /\.(js|jsx)$/,
        // we do not want anything from node_modules to be compiled
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./react/index.html",
      filename: "./index.html"
    })
  ]
};
