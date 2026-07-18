// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ready Player Me avatars ship as .glb; glTF variants also reference .gltf/.bin.
// Metro treats unknown extensions as source, so these must be registered as assets.
config.resolver.assetExts.push('glb', 'gltf', 'bin');

module.exports = config;
