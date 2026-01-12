import { StyleSheet } from "react-native";
import { ThemedText } from "./ui/themed-text";
import { ThemedView } from "./ui/themed-view";
import { useMonitorsFetchState } from "@/hooks/use-fetch-monitor";
import Animated, { CSSAnimationKeyframes } from "react-native-reanimated";

const pulse: CSSAnimationKeyframes = {
    '0%': { transform: [{ scale: 1 }, { rotateZ: '-25deg' }] },
    '50%': { transform: [{ scale: 1.2 }, { rotateZ: '25deg' }] },
    '100%': { transform: [{ scale: 0.8 }, { rotateZ: '-50deg' }] },
};

export function LoadingMonitorsState() {
    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.wrapper}>
                <ThemedView bgThemeColor="backgroundSecondary" style={styles.iconWrap}>
                    <Animated.Text
                        style={[styles.iconText, {
                            animationName: pulse,
                            animationIterationCount: "infinite",
                            animationDuration: '1500ms',
                        }]}>
                        📡
                    </Animated.Text>
                </ThemedView>
            </ThemedView>
        </ThemedView>
    );
}

export function EmptyMonitorsState() {
    const { isFetching } = useMonitorsFetchState()

    if (isFetching) {
        return <LoadingMonitorsState />
    }

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.wrapper}>
                <ThemedView bgThemeColor="backgroundSecondary" style={styles.iconWrap}>
                    <ThemedText style={styles.iconText}>📡</ThemedText>
                </ThemedView>
                <ThemedText themeColor="foregroundPrimary" style={styles.text1}>
                    No Monitors Found
                </ThemedText>
                <ThemedText themeColor="foregroundSecondary" style={styles.text2}>
                    Add monitors to start tracking air quality data
                </ThemedText>
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
    },
    wrapper: {
        alignItems: 'center',
    },
    iconWrap: {
        width: 80,
        height: 80,
        borderRadius: 9999,
        marginBottom: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    iconText: {
        fontSize: 36,
        lineHeight: 40,
    },
    text1: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },
    text2: {
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'center',
        paddingHorizontal: 32,
    }
});