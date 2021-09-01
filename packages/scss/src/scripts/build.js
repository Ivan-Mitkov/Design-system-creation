const fs = require("fs");
const path = require("path");
const Sass = require("node-sass");

const getComponents = () => {
  let allComponents = [];
  let types = ["atoms", "molecules", "organisms"];
  types.forEach((comp) => {
    const allFiles = fs.readdirSync(`src/${comp}`).map((file) => {
      return {
        input: path.resolve(__dirname, `../${comp}`, `${file}`),
        output: path.resolve(
          __dirname,
          `../../lib/${file.slice(0, -4) + "css"}`
        ),
      };
    });

    allComponents = [...allComponents, ...allFiles];
  });
  return allComponents;
};

const compile = (pathToCompile, fileName) => {
  const result = Sass.renderSync({
    data: fs.readFileSync(pathToCompile).toString(),
    outputStyle: "expanded",
    outFile: "global.css",
    includePaths: [path.resolve("src")],
  });
  fs.writeFileSync(path.resolve(fileName), result.css.toString());
};

const pathToCompile = path.resolve(__dirname, "../global.scss");
compile(pathToCompile, path.resolve(__dirname, "../../lib", "global.css"));
console.log(getComponents());
getComponents().forEach((comp) => compile(comp.input, comp.output));
