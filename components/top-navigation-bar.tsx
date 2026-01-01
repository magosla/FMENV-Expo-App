import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { ThemedView } from "./ui/themed-view";
import { ThemedTouchableOpacity } from "./ui/themed-touchable-opacity";

export function TopNavigationBar() {
    const router = useRouter()

    const goBack = () => {
        if (router.canGoBack()) {
            return router.back()
        }
        router.replace({
            pathname: '..',
        })

    }

    return (
        <ThemedView bgThemeColor="backgroundPrimary"
            borderThemeColor="backgroundSecondary"
            style={style.container}>
            <ThemedTouchableOpacity onPress={goBack}>
                <MaterialCommunityIcons name="chevron-left" size={26} />
            </ThemedTouchableOpacity>
            <ThemedView style={style.title}>
                <Text style={style.titleText}>{process.env.EXPO_PUBLIC_APP_NAME}</Text>
            </ThemedView>
            <ThemedView style={style.extra} />
        </ThemedView>
    );
}

const style = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
    },
    titleText: {
        fontWeight: '600',
        fontSize: 18,
        lineHeight: 28,
    },
    extra: {
        width: 24,
    }
})

