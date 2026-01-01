import { useThemeColor } from "@/hooks/use-theme-color";
import { Monitor } from "@/types/air-quality";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { CloudDecor } from "./ui/cloud-decor";
import { Header } from "./ui/header";
import { ThemedText } from "./ui/themed-text";
import { ThemedView, ThemedViewProps } from "./ui/themed-view";

type Props = ThemedViewProps & {
    monitor?: Monitor
}

export function MonitorInfo({ monitor, style }: Props) {
    const mutedColor = useThemeColor({}, 'foregroundMuted')
    return (
        <ThemedView style={[styles.container, style]}>
            <ThemedView bgThemeColor="backgroundPrimary" style={styles.wrapper}>
                <Header style={styles.header}>{monitor?.name}</Header>
                <ThemedView style={styles.body}>
                    <Ionicons style={[styles.icon, { color: mutedColor }]} size={14} name="location" />
                    <ThemedText themeColor="foregroundPrimary" style={styles.bodyText}>
                        {[monitor?.address, monitor?.province].join(' ')}
                    </ThemedText>
                    <CloudDecor />
                </ThemedView>
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    wrapper: {
        borderRadius: 8,
        overflow: 'hidden',
        position: 'relative',
        shadowColor: "rgba(0, 0, 0, 0.35)",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingVertical: 8,
    },
    header: {
        marginLeft: 10,
    },
    icon: {
        display: 'flex',
    },
    body: {
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'baseline',
    }
    , bodyText: {
        fontSize: 14,
    }
});
