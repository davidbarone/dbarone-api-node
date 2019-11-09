const path = require("path");
const webpack = require("webpack");
var nodeExternals = require("webpack-node-externals");

module.exports = env => {
  return {
    target: "node",
    externals: nodeExternals(),
    entry: { server: ["./index.js"] },
    output: {
      filename: "api-bundle.js",
      path: path.resolve(__dirname, "./build")
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [{ loader: "babel-loader" }]
        }
      ]
    }
  };
};
