const path = require("path");
const HelloPlugin = require("./src/index");
const htmlWebpackPlugin = require("./src/html-webpack-plugin/index");
module.exports = {
  mode: "none",
  entry: "./test/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [new HelloPlugin()],
};
