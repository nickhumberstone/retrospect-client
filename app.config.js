const IS_DEV = process.env.APP_VARIANT === "development";

export default {
  name: IS_DEV ? "*Retrospect App" : "Retrospect App",
  slug: "retrospectapp",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./src/assets/icons/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./src/assets/icons/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: IS_DEV
      ? "com.nickhumberstone.retrospectappdev"
      : "com.nickhumberstone.retrospectapp",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./src/assets/icons/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: IS_DEV
      ? "com.nickhumberstone.retrospectappdev"
      : "com.nickhumberstone.retrospectapp",
    googleServicesFile: IS_DEV
      ? process.env.GOOGLE_SERVICES_DEV_JSON
      : process.env.GOOGLE_SERVICES_JSON,
  },
  web: {
    favicon: "./src/assets/icons/favicon.png",
  },
  extra: {
    eas: {
      projectId: "10ae2907-876f-4704-843c-f9fba4384d1d",
    },
  },
  plugins: [
    [
      "react-native-auth0",
      {
        domain: "dev-questionanswer.uk.auth0.com",
      },
    ],
  ],
  runtimeVersion: "1.0.0",
  updates: {
    url: "https://u.expo.dev/10ae2907-876f-4704-843c-f9fba4384d1d",
  },
};
