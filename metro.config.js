const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const {
  wrapWithReanimatedMetroConfig,
} = require("react-native-reanimated/metro-config");

// 1. Get Expo's default config
let config = getDefaultConfig(__dirname);

// 2. Apply NativeWind config
config = withNativeWind(config, { input: "./app/globals.css" });

// 3. Wrap with Reanimated's Metro config
module.exports = wrapWithReanimatedMetroConfig(config);
