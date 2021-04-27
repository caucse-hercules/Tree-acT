/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

module.exports = {
  entry: {
    out: "./src/view/app/index.tsx",
  },
  output: {
    path: path.resolve(__dirname, "out"),
    filename: "[name].js",
  },
  devtool: "eval-source-map",
  resolve: {
    extension: [".js", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
        options: {},
      },
    ],
  },
  performance: {
    hints: "warning",
  },
};
