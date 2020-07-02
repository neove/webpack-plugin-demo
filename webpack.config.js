const path = require("path");
const HelloPlugin = require("./src/index");
module.exports = {
  mode: "none",
  entry: "./test/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [new HelloPlugin()],
};
