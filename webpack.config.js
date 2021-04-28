/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: {
    main: "./src/view/index.tsx",
  },
  output: {
    path: path.resolve(__dirname, "out", "client"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: ["/node_modules/"],
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
      // 모든 '.js' 출력 파일은 'source-map-loader'에서 다시 처리한 소스 맵이 있습니다.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
    ],
  },
  performance: {
    hints: "warning",
  },
};
