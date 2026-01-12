import { Slot } from "expo-router";
import React from "react";
import RootLayoutView from "@/views/root-layout-view";
import { StatusBar } from "expo-status-bar";
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://b22ecbdbe227311c3ab7658fa17d8bdb@o4510694897418240.ingest.us.sentry.io/4510694929989632',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export const unstable_settings = {
  initialRouteName: '(monitor)'
}

export default Sentry.wrap(function RootLayout() {
  return (
    <RootLayoutView>
      <Slot />
      <StatusBar style="auto" animated />
    </RootLayoutView>
  )
});