import SplashScreenController from "@/components/SplashScreenController";
import BackgroundImage from "@/components/ui/background-image";
import { ThemedView } from "@/components/ui/themed-view";
import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { PropsWithChildren } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { FetchErrorView } from "./fetch-error-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useFetchMonitors } from "@/hooks/use-fetch-monitor";
import { useAppStore } from "@/hooks/use-app-store";

type RootLayoutViewProps = PropsWithChildren

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

export default function RootLayoutView({ children }: Readonly<RootLayoutViewProps>) {
    const colorScheme = useColorScheme()

    return (
        <>
            <ThemeProvider value={colorScheme === 'dark' ? darkTheme : defaultTheme}>
                <SafeArea>
                    {children}
                </SafeArea>
                <StatusBar style="auto" animated={true} />
            </ThemeProvider>
            <MonitorsInit />
        </>
    )
}

function MonitorsInit() {
    useFetchMonitors()
    return null
}

function SafeArea({ children }: Readonly<PropsWithChildren>) {
    const backgroundColor = useThemeColor({}, 'background')
    return (
        <SafeAreaProvider>
            <SafeAreaView
                style={[styles.wrapper, { backgroundColor }]}
                edges={['left', 'right']}
            >
                <SplashScreenController />
                <RootLayoutA>{children}</RootLayoutA>
                <FetchErrorView />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

function RootLayoutA({ children }: Readonly<PropsWithChildren>) {

    const { config } = useAppStore()

    if (!config?.endpoints) return undefined

    return (
        <ThemedView style={styles.container}>
            <BackgroundImage>
                {children}
                {/* <ToastManager style={style.toast} /> */}
            </BackgroundImage>
        </ThemedView>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    wrapper: {
        flex: 1,
        position: 'relative'
    }
})