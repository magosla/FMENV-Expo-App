import { StyleSheet } from "react-native";
import { ThemedView } from "./ui/themed-view";
import { ThemedText } from "./ui/themed-text";
import { Header } from "./ui/header";

interface MonitorsListHeaderProps {
    readonly count: number;
}

export function MonitorsListHeader({ count }: MonitorsListHeaderProps) {
    return (
        <ThemedView style={styles.container}>
            <Header style={styles.header}>My Monitors</Header>
            <ThemedText themeColor="foregroundPrimary" style={styles.text}>
                {count} monitor{count === 1 ? '' : 's'} available
            </ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    header: {
        marginBottom: 8
    },
    text: {
        fontSize: 14,
    }
});