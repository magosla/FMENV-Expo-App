import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { ThemedText } from "./ui/themed-text";
import { ThemedView } from "./ui/themed-view";
import { ThemedTouchableOpacity } from "./ui/themed-touchable-opacity";

export function BottomNavigationBar() {
    return (
        <ThemedView bgThemeColor="backgroundSecondary" borderThemeColor="foregroundSecondary"
            style={styles.container}>
            <ThemedView style={styles.actions}>
                <ThemedTouchableOpacity style={styles.actionItem}>
                    <ThemedText themeColor="foregroundSecondary">
                        <Ionicons name="home" size={24} />
                    </ThemedText>
                </ThemedTouchableOpacity>
                <ThemedTouchableOpacity style={styles.actionItem}>
                    <ThemedText themeColor="foregroundSecondary">
                        <Ionicons name="location" size={24} />
                    </ThemedText>
                </ThemedTouchableOpacity>
                <ThemedView style={styles.spacer} />
                <ThemedTouchableOpacity style={styles.actionItem}>
                    <ThemedText themeColor="foregroundSecondary">
                        <MaterialCommunityIcons name="monitor-dashboard" size={24} />
                    </ThemedText>
                </ThemedTouchableOpacity>
                <ThemedTouchableOpacity style={styles.actionItem}>
                    <ThemedText themeColor="foregroundSecondary">
                        <Ionicons name="chatbubble-outline" size={24} />
                    </ThemedText>
                </ThemedTouchableOpacity>
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    spacer: {
        width: 64,
    },
    actions: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    actionItem: {
        alignItems: 'center',
    },
    container: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderTopWidth: 1,
    }
});
