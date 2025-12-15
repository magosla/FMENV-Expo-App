import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedView } from "./ui/themed-view";
import { ThemedText } from "./ui/themed-text";

export function BottomNavigationBar() {
    return (
        <ThemedView bgThemeColor="backgroundSecondary" borderThemeColor="foregroundSecondary"
            style={styles.container}>
            <ThemedView style={styles.actions}>
                <TouchableOpacity style={styles.actionItem}>
                    <ThemedText themeColor="foregroundSecondary">
                        <Ionicons name="home" size={24} />
                    </ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionItem}>
                    <ThemedText themeColor="foregroundSecondary">
                        <Ionicons name="location" size={24} />
                    </ThemedText>
                </TouchableOpacity>
                <ThemedView style={styles.spacer} />
                <TouchableOpacity style={styles.actionItem}>
                    <ThemedText themeColor="foregroundSecondary">
                        <MaterialCommunityIcons name="monitor-dashboard" size={24} />
                    </ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionItem}>
                    <ThemedText themeColor="foregroundSecondary">
                        <Ionicons name="chatbubble-outline" size={24} />
                    </ThemedText>
                </TouchableOpacity>
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
