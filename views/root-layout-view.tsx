import SplashScreenController from "@/components/SplashScreenController";
import BackgroundImage from "@/components/ui/background-image";
import { ThemedView } from "@/components/ui/themed-view";
import { useFetchConfig } from "@/hooks/use-fetch-config";
import { useFetchMonitors } from "@/hooks/use-fetch-monitor";
import { useMonitorStore } from "@/hooks/use-monitor-store";
import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { PropsWithChildren, useEffect } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { FetchErrorView } from "./fetch-error-view";
import { useThemeColor } from "@/hooks/use-theme-color";

type RootLayoutViewProps = {
    monitorId?: string
} & PropsWithChildren

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


export default function RootLayoutView({ monitorId, children }: Readonly<RootLayoutViewProps>) {
    useFetchMonitors()
    const { setActiveMonitorId } = useMonitorStore();

    useEffect(() => {
        setActiveMonitorId(monitorId)
    }, [monitorId, setActiveMonitorId])

    const colorScheme = useColorScheme()

    return (
        <ThemeProvider value={colorScheme === 'dark' ? darkTheme : defaultTheme}>
            <SafeArea monitorId={monitorId}>{children}</SafeArea>
            <StatusBar style="auto" animated={true} />
        </ThemeProvider>
    )
}


function SafeArea({ monitorId, children }: Readonly<{ monitorId?: string } & PropsWithChildren>) {
    const { loaded } = useFetchConfig()
    const backgroundColor = useThemeColor({}, 'background')
    return (<SafeAreaProvider>
        <SafeAreaView
            style={[styles.wrapper, { backgroundColor }]}
            edges={['left', 'right']}
        >
            <SplashScreenController />
            {loaded && <RootLayoutA>{children}</RootLayoutA>}
            <FetchErrorView monitorId={monitorId} />
        </SafeAreaView>
    </SafeAreaProvider>)
}

function RootLayoutA({ children }: Readonly<PropsWithChildren>) {
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