const path = require("path");
const tsconfig = require("../../tsconfig.json");

const isTesting = process.env.NODE_ENV === "test";

const baseUrlInTsConfig = (function() {
  if (
    !tsconfig ||
    !tsconfig.compilerOptions ||
    !tsconfig.compilerOptions.baseUrl
  )
    return ".";
  return tsconfig.compilerOptions.baseUrl;
})();

// This is relative to root of project
const resolvedRootPath = isTesting ? baseUrlInTsConfig : "./build/dist";

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
  const resolvedPath = `./${path.join(resolvedRootPath, aliasPathInTsConfig)}`;
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
      root: [resolvedRootPath],
      alias
    }
  ];

  return moduleResolversPlugin;
};

module.exports = getModuleResolversPlugin;
