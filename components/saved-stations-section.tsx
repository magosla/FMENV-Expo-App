import { StyleSheet } from "react-native";
import { CloudDecor } from "./ui/cloud-decor";
import { ThemedView } from "./ui/themed-view";
import { ThemedText } from "./ui/themed-text";

export function SavedStationsSection() {
    return (
        <ThemedView style={styles.container}>
            {/* Saved Station Card */}
            <ThemedView bgThemeColor="backgroundPrimary" style={styles.wrapper}>
                <ThemedView style={styles.textWrapper}>
                    <ThemedText themeColor="foregroundPrimary" style={styles.text}>
                        Keep up to date with outdoor air quality in different cities.
                    </ThemedText>
                    {/* Cloud decoration - using simple circles */}
                    <CloudDecor />
                </ThemedView>
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 24
    },
    wrapper: {
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative'
    },
    textWrapper: {
        paddingHorizontal: 24,
        paddingVertical: 20,
    },
    text: {
        fontSize: 14,
        lineHeight: 20,
    }
});