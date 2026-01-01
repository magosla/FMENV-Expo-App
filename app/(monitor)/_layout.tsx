import { useThemeColor } from "@/hooks/use-theme-color";
import { isIOS26OrLater } from "@/utils/platform";
import { Stack } from "expo-router";
import { Platform, StyleSheet } from "react-native";

export const unstable_settings = {
    anchor: 'index',
};

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    toast: {
        backgroundColor: '#0000FF00'
    },
    wrapper: {
        flex: 1,
        position: 'relative'
    },
    bgImage: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#0000FF00'
    },
    scrollContent: {
        flex: 1
    }
})

export default function MonitorLayout() {
    const color = useThemeColor({}, 'foregroundPrimary')

    return (
        <Stack
            screenOptions={{
                animation: 'fade_from_bottom',
                contentStyle: style.scrollContent,
                headerLargeTitleEnabled: true,
                headerLargeTitleShadowVisible: true,
                headerTransparent: Platform.OS === 'ios',
                headerBackButtonDisplayMode: 'minimal',
                headerBlurEffect: isIOS26OrLater() ? undefined : 'regular',
                headerStyle: {
                    backgroundColor: '#0000FF00',
                },
                headerLargeStyle: {
                    backgroundColor: '#0000FF00',
                },
                headerTitleStyle: {
                    fontWeight: '600',
                    color,
                },
                headerTintColor: color
            }}
        >
            <Stack.Screen name="index" options={{
                title: process.env.EXPO_PUBLIC_APP_NAME || 'Air Quality Monitors',
            }} />
            <Stack.Screen name="detail/[monitorId]" options={{
                // presentation: 'modal',
                title: 'Air Quality',
                headerTitleAlign: 'center',
            }} />
        </Stack>
    )
}

