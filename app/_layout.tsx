import { useColorScheme } from "@/hooks/use-color-scheme";
import { useFetchConfig } from "@/hooks/use-fetch-config";
import { useFetchMonitors, useFetchMonitorsError } from "@/hooks/use-fetch-monitor";
import { useMonitorStore } from "@/hooks/use-monitor-store";
import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from "@react-navigation/native";
import { Slot, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
// import ToastManager from "toastify-react-native/components/ToastManager";
import SplashScreenController from "@/components/SplashScreenController";
import BackgroundImage from "@/components/ui/background-image";
import { ThemedText } from "@/components/ui/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { useFetchAirQualityError } from "@/hooks/use-fetch-air-quality";
import { useThemeColor } from "@/hooks/use-theme-color";
import { AuthError, NetworkError, NotFoundError, ServerError } from "@/types/error";
import { logError } from "@/utils/log-error";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export const unstable_settings = {
  initialRouteName: 'index'
}

const defaultTheme: Theme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: '#ffffff00' }
}
const darkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors, background: 'rgba(0, 0, 0, 0.44)',
    border: 'rgba(39, 39, 41, 0.24)',
  }
}

export default function RootLayout() {
  const { monitorId } = useLocalSearchParams<{ monitorId: string }>()
  useFetchMonitors()
  const { setActiveMonitorId } = useMonitorStore();

  useEffect(() => {
    setActiveMonitorId(monitorId)
  }, [monitorId, setActiveMonitorId])

  const colorScheme = useColorScheme()

  return (
    <ThemeProvider value={colorScheme === 'dark' ? darkTheme : defaultTheme}>
      <SafeArea />
      <StatusBar style="auto" animated={true} />
    </ThemeProvider>
  )
}

function SafeArea() {
  const { loaded } = useFetchConfig()
  const backgroundColor = useThemeColor({}, 'background')
  return (<SafeAreaProvider>
    <SafeAreaView
      style={[styles.wrapper, { backgroundColor }]}
      edges={['left', 'right']}
    >
      <SplashScreenController />
      {loaded && <RootLayoutA />}
      <FetchErrorView />
    </SafeAreaView>
  </SafeAreaProvider>)
}

function RootLayoutA() {
  return (
    <ThemedView style={styles.container}>
      <BackgroundImage>
        <Slot />
        {/* <ToastManager style={style.toast} /> */}
      </BackgroundImage>
    </ThemedView>)
}

function FetchErrorView() {
  const { monitorId } = useGlobalSearchParams<{ monitorId: string }>()

  const { fetchError } = useFetchAirQualityError(monitorId)
  const { fetchError: monitorFetchError } = useFetchMonitorsError()

  logError('FetchErrorView fetchError:', fetchError, monitorId)
  if (!fetchError) {
    return null
  }
  let error = fetchError.message

  const errorObject = monitorFetchError || fetchError

  switch (true) {
    case errorObject instanceof NetworkError:
      error = "There was a network error."
      break;
    case errorObject instanceof NotFoundError:
      error = "The requested resource was not found."
      break;
    case errorObject instanceof AuthError:
      error = "You are not authorized to access this resource."
      break;
    case errorObject instanceof ServerError:
      error = "A server error occurred. Will keep trying."
      break;
    default:
      error = errorObject.message || "An unknown error occurred."
      break;
  }

  return (
    <ThemedView bgThemeColor="backgroundError" style={[styles.errorContainer, { justifyContent: 'center', alignItems: 'center' }]}>
      <ThemedText themeColor="foregroundError">
        <Ionicons name="alert-circle-outline" size={14} />
      </ThemedText>
      <ThemedText type="small" themeColor="foregroundError" style={styles.errorText}>{error}</ThemedText>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  errorContainer: {
    flexShrink: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 14,
    paddingVertical: 3,
    columnGap: 3,
    paddingHorizontal: 2,
  },
  container: {
    flex: 1
  },
  toast: {
    backgroundColor: '#0000FF00'
  },
  wrapper: {
    flex: 1,
    position: 'relative'
  }
})