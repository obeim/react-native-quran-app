const { getDefaultConfig } = require("expo/metro-config");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  config.resolver.assetExts.push("db");

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  };
  config.resolver = {
    ...resolver,
    assetExts: [
      ...resolver.assetExts.filter((ext) => ext !== "svg"),
      "db",
      "sqlite",
    ],
    sourceExts: [...resolver.sourceExts, "svg"],
  };

  return config;
})();
