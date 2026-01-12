import { ThemedText } from "@/components/ui/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { useThemeColor } from "@/hooks/use-theme-color";
import { isIOS26OrLater } from "@/utils/platform";
import { Stack } from "expo-router";
import { ExtendedStackNavigationOptions } from "expo-router/build/layouts/StackClient";
import { ReactNode } from "react";
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
    content: {
        flex: 1,
    }
})

export default function MonitorLayout() {
    const colorScheme = useColorScheme()
    const color = useThemeColor({}, 'foregroundPrimary')
    const isIOS = Platform.OS === 'ios'
    const headerBackgroundColor = colorScheme === 'dark' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.04)'

    return (
        <Stack
            screenOptions={{
                animation: 'fade_from_bottom',
                contentStyle: style.content,
                headerLargeTitleEnabled: true,
                headerLargeTitleShadowVisible: true,
                headerTransparent: isIOS,
                headerBackButtonDisplayMode: 'minimal',
                headerBlurEffect: isIOS26OrLater() ? undefined : 'regular',
                headerStyle: {
                    backgroundColor: isIOS ? undefined : headerBackgroundColor,
                },
                headerShadowVisible: false,
                headerLargeStyle: {
                    backgroundColor: isIOS ? undefined : headerBackgroundColor,
                },
                headerTitleStyle: {
                    fontWeight: '600',
                    color,
                },
                headerTintColor: color,
            }}
        >
            <Stack.Screen name="index" options={{
                title: process.env.EXPO_PUBLIC_APP_NAME || 'Air Quality Monitors',
                headerLeft: isIOS ? undefined : HeaderLeft,
            }} />
            <Stack.Screen name="detail/[monitorId]" options={{
                // presentation: 'modal',
                title: 'Air Quality',
                headerTitleAlign: 'center',
            }} />
        </Stack>
    )
}

type HeaderLeftProp = Parameters<NonNullable<ExtendedStackNavigationOptions['headerLeft']>>[0]

function HeaderLeft(props: HeaderLeftProp): ReactNode {
    return <ThemedView borderThemeColor="backgroundSecondary" bgThemeColor="backgroundMuted" style={headerLeftStyles.iconWrap}>
        <ThemedText style={[headerLeftStyles.iconText, { color: props.tintColor }]}>📡</ThemedText>
    </ThemedView>
}

const headerLeftStyles = StyleSheet.create({
    iconWrap: {
        opacity:0.5,
        borderWidth: 1,
        width: 'auto',
        height: 'auto',
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 8

    },
    iconText: {
        paddingVertical: 1,
        paddingHorizontal: 3,
    },
});