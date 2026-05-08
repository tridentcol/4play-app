// Learn more https://docs.expo.dev/guides/customizing-metro/
// and https://www.nativewind.dev/getting-started/expo
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('node:path');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Watch the entire monorepo so changes in packages/* trigger a rebuild.
config.watchFolders = [monorepoRoot];

// Resolve modules from both the app's node_modules and the workspace root,
// so workspace deps (@4play/*) and hoisted packages are found.
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];
config.resolver.disableHierarchicalLookup = true;

module.exports = withNativeWind(config, { input: './global.css' });
