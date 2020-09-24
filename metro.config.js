module.exports = {
  transformer: {
    assetPlugins: ["expo-asset/tools/hashAssetFiles"],
  },
  minifierConfig: {
    keep_classnames: true, // Preserve class names
    keep_fnames: true, // Preserve function names
    mangle: {
      keep_classnames: true, // Preserve class names
      keep_fnames: true, // Preserve function names
    },
  },
};
