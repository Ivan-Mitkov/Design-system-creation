const fs = require("fs");
const path = require("path");
const Sass = require("node-sass");

const result = Sass.renderSync({
  data: fs.readFileSync(path.resolve(__dirname, "../global.scss")).toString(),
  outputStyle: "expanded",
  outFile: "global.css",
  includePaths: [path.resolve("src")],
});

fs.writeFileSync(
  path.resolve(__dirname, "../lib", "global.css"),
  result.css.toString()
);
