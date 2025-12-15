import { useThemeColor } from "@/hooks/use-theme-color";
import { ImageBackground } from "expo-image";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

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
                    headerShown: false,
                }} />
                <Stack.Screen name="detail/[monitorId]" options={{
                    presentation: 'modal',
                    title: 'Air Quality',
                    headerTitleAlign:'center',
                }} />
            </Stack>
        </ImageBackground>
    )
}

