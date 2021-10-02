const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./src/index.ts",
  mode: "development",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "server"),
  },
  externals: [nodeExternals()], // extrenal libs like fs are all used to bundle
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js"], // resolves ts file also, by default webpack will not take ts
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" }, // module to compile the ts file and bundle
    ],
  },
};
