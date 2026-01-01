import type { Monitor } from "@/types/air-quality";
import { FlatList, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { MonitorListItem } from "./monitor-list-item";

interface MonitorsListProps {
    readonly monitors: Monitor[];
    readonly style?: StyleProp<ViewStyle>
}

export function MonitorsList({ monitors, style }: MonitorsListProps) {

    return (
        <FlatList
            style={style}
            data={monitors.toSorted((a, b) => a.name?.localeCompare(b.name ?? ''))}
            renderItem={({ item }) => (
                <MonitorListItem
                    monitor={item}
                />
            )}
            scrollEnabled={false}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
        />
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 20,
        rowGap: 4,
    }
});

