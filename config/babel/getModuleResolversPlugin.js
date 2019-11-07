const path = require("path");
const tsconfig = require("../../tsconfig.json");

const DIST_PATH = "./build/dist"; // This is relative to root of project

const getAliasNamesWithoutAsteriskFromTsConfig = () => {
  if (!tsconfig || !tsconfig.compilerOptions || !tsconfig.compilerOptions.paths)
    return [];

  const aliasNames = Object.keys(tsconfig.compilerOptions.paths);
  const aliasNamesWithoutAsterisk = aliasNames.filter(
    aliasName => !aliasName.match(/\*/g)
  );

  return aliasNamesWithoutAsterisk;
};

const genResolvedRelativePathToRootOf = aliasName => {
  const aliasPathInTsConfig = tsconfig.compilerOptions.paths[aliasName][0];
  const resolvedPath = `./${path.join(DIST_PATH, aliasPathInTsConfig)}`;
  return resolvedPath;
};

const getModuleResolversPlugin = () => {
  const alias = {};

  const aliasNames = getAliasNamesWithoutAsteriskFromTsConfig();

  aliasNames.forEach(aliasName => {
    const resolvedPath = genResolvedRelativePathToRootOf(aliasName);
    alias[aliasName] = resolvedPath;
  });

  const moduleResolversPlugin = [
    "module-resolver",
    {
      root: [DIST_PATH],
      alias
    }
  ];

  return moduleResolversPlugin;
};

module.exports = getModuleResolversPlugin;
