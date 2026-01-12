
const BUILD_PROFILE = process.env.APP_VARIANT || process.env.EAS_BUILD_PROFILE || process.env.EXPO_PUBLIC_APP_VARIANT;

const IS_DEV = BUILD_PROFILE === "development";
const IS_PREVIEW = BUILD_PROFILE === "preview";

const getPackageSuffix = () => {
  if (IS_DEV) return ".dev";
  if (IS_PREVIEW) return ".preview";
  return "";
};

const packageIdentifier = `ng.fmenv.fmenvairquality${getPackageSuffix()}`;

const getAppNameSuffix = () => {
  if (IS_DEV) return " Dev";
  if (IS_PREVIEW) return " Preview";
  return "";
};

const appName = `FMENV-AirQuality${getAppNameSuffix()}`;

export default {
  name: appName,
  slug: "FMENV-AirQuality",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "fmenvairquality",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  jsEngine: "hermes",
  ios: {
    supportsTablet: true,
    bundleIdentifier: packageIdentifier,
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    adaptiveIcon: {
      backgroundColor: "#E6F4FE",
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundImage: "./assets/images/android-icon-background.png",
      monochromeImage: "./assets/images/android-icon-monochrome.png",
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    package: packageIdentifier,
  },
  web: {
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
        dark: {
          backgroundColor: "#000000",
        },
      },
    ],
    [
      "expo-asset",
      {
        assets: [
          "./assets/json/color_map.json",
          "./assets/images/cloud_bg.png",
          "./assets/images/icon.png",
          "./assets/images/icon-circle.png",
          "./assets/images/logo.png",
          "./assets/images/logo-dark.png",
        ],
      },
    ],
    [
      "expo-build-properties",
      {
        android: {
          compileSdkVersion: 36,
          targetSdkVersion: 36,
          buildToolsVersion: "36.0.0",
        },
        ios: {
          deploymentTarget: "15.1",
        },
      },
    ],
    [
      "@sentry/react-native/expo",
      {
        "url": "https://sentry.io/",
        "project": "fmenv-airquality",
        "organization": "magnus-x0"
      }
    ],
    "expo-maps",
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
  extra: {
    router: {},
    eas: {
      projectId: "ac698fd9-3697-437f-a393-16666213f5aa",
    },
  },
  owner: "magnusl",
  runtimeVersion: {
    policy: "appVersion",
  },
  updates: {
    url: "https://u.expo.dev/ac698fd9-3697-437f-a393-16666213f5aa",
  },
};
