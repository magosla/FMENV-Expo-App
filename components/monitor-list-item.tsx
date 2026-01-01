import type { Monitor } from "@/types/air-quality";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { ThemedView } from "./ui/themed-view";
import { ThemedText } from "./ui/themed-text";
import { CloudDecor } from "./ui/cloud-decor";
import { StyleSheet, View } from "react-native";

interface MonitorListItemProps {
    readonly monitor: Monitor;
}

export function MonitorListItem({ monitor }: MonitorListItemProps) {

    return (
        <Link href={{
            pathname: '/detail/[monitorId]',
            params: { monitorId: monitor.id }
        }}>
            <Link.Trigger>
                <ThemedView bgThemeColor="backgroundPrimary" style={styles.container}
                >
                    <View style={styles.clip}>
                        <CloudDecor />
                    </View>
                    <ThemedView style={styles.pointer}>
                        <ThemedText themeColor="foregroundMuted">
                            <MaterialCommunityIcons name="chevron-right" size={18} style={styles.pointerIcon} />
                        </ThemedText>
                    </ThemedView>
                    <ThemedView style={styles.wrapper}>
                        <ThemedView style={styles.body}>
                            <ThemedView style={styles.title}>
                                <ThemedText themeColor="tint">
                                    <MaterialCommunityIcons name="access-point" size={16} style={styles.titleIcon} />
                                </ThemedText>
                                <ThemedText type="title" style={styles.titleText} numberOfLines={2}>
                                    {monitor.name}
                                </ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.locationWrapper}>
                                <ThemedText type="small" themeColor="foregroundMuted">
                                    <Ionicons name="location" size={14} />
                                </ThemedText>
                                <ThemedText type="default" themeColor="foregroundSecondary" style={styles.province}
                                    numberOfLines={1} ellipsizeMode="clip">
                                    {monitor.province}
                                </ThemedText>
                            </ThemedView>
                        </ThemedView>
                    </ThemedView>
                </ThemedView>
            </Link.Trigger>
        </Link>
    );
}

const styles = StyleSheet.create({
    clip: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        overflow: 'hidden',
        opacity:0.8,
    },
    title: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        columnGap: 4,
    },
    titleIcon: {
        color: 'currentColor',
        fontWeight: '600',
    },
    titleText: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '600',
    },
    body: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        alignItems: 'flex-start',
    },
    locationWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 4,
    },
    province: {
        fontSize: 12,
        lineHeight: 16,
        opacity: 0.9,
    },
    wrapper: {
        padding: 8,
        paddingHorizontal: 16,
        position: 'relative',
    },
    container: {
        borderRadius: 8,
        width: '100%',
        position: 'relative'
    },
    pointer: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        right: 8,
        top: 0,
        bottom: 0,
    },
    pointerIcon: {
        color: 'currentColor',
        fontWeight: '600',
    }
});