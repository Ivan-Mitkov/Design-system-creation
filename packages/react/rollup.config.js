import Ts from "rollup-plugin-typescript2";
//https://rollupjs.org/guide/en/#configuration-files
// in package.json "build":"rollup -c" to use this configuration
export default {
  input: [
    "src/index.ts",
    //user will be able to import just this files
    "src/atoms/Color/index.ts",
  ],
  output: {
    dir: "lib",
    format: "esm",
    sourcemap: true,
  },
  plugins: [Ts()],
  //preserve structure of src folder
  preserveModules: true,
  external: ["react"],
};
