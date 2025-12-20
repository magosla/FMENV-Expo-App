import { useThemeColor } from "@/hooks/use-theme-color";
import { isIOS26OrLater } from "@/utils/platform";
import { ImageBackground } from "expo-image";
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
    }
})

export default function MonitorLayout() {
    const color = useThemeColor({}, 'foregroundPrimary')

    return (
        <ImageBackground
            style={style.bgImage}
            contentFit="cover"
            contentPosition="top right"
            imageStyle={{ backgroundColor: '#0000FF00' }}
            source={require('@/assets/images/cloud_bg.png')} >
            <Stack
                screenOptions={{
                    headerLargeTitleEnabled: true,
                    headerTransparent: Platform.OS === 'ios',
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
        </ImageBackground>
    )
}

