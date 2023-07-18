import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { uglify } from "rollup-plugin-uglify";
import bannerPlugin from "rollup-plugin-banner";
import banner from "./banner";

const input = "src/index.js";
const pathPrefix = "dist/index.";
export default [
  {
    input,
    output: [
      {
        file: pathPrefix + "cjs.js",
        format: "cjs",
      },
      {
        file: pathPrefix + "es.js",
        format: "esm",
      },
    ],
    plugins: [resolve(), commonjs(), bannerPlugin(banner)],
  },
  {
    input,
    output: [
      {
        file: pathPrefix + "min.js",
        format: "umd",
        name: "Currency",
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      uglify({
        compress: {
          pure_getters: true,
        },
      }),
      bannerPlugin(banner),
    ],
  },
];
