import { MonitorInfo } from "@/components/monitor-info";
import { MonitorSection } from "@/components/monitor-section";
import { PollutionColorMap } from "@/components/pollution-color-map";
import { ThemedLink } from "@/components/ui/themed-link";
import { useMonitorStore } from "@/hooks/use-monitor-store";
import { useThemeColor } from "@/hooks/use-theme-color";
import { MaterialIcons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

export default function MonitorDetailPage() {
    const { monitorId } = useLocalSearchParams<{ monitorId: string }>()
    const { monitors } = useMonitorStore()

    const secondaryColor = useThemeColor({}, 'foregroundSecondary');

    const backgroundColor = '#0000FF00'
    const monitor = monitors?.[monitorId]
    // const { setActiveMonitorId } = useMonitorStore();

    // useEffect(() => {
    //     setActiveMonitorId(monitorId)
    // }, [monitorId, setActiveMonitorId])

    const mapUrl = `https://www.openstreetmap.org/?mlat=${encodeURIComponent(
        monitor.latitude
    )}&mlon=${encodeURIComponent(monitor.longitude)}#map=15/${encodeURIComponent(
        monitor.latitude
    )}/${encodeURIComponent(monitor.longitude)}`

    return (
        <>
            <Stack.Screen
                getId={() => String(monitorId)}
            />
            <ScrollView
                alwaysBounceVertical={true}
                contentInsetAdjustmentBehavior="automatic"
                contentContainerStyle={styles.scrollViewContent}
                style={[styles.scrollView, { backgroundColor }]}
            >
                <MonitorInfo monitor={monitor} style={styles.monitorInfo} />
                <MonitorSection monitorId={monitorId} style={styles.monitorSection} />
                <PollutionColorMap style={styles.pollutionColor} />
                <View style={styles.spacer} />
            </ScrollView>

            <ThemedLink
                asChild={true}
                href={mapUrl || ''}
                external={true}
                bgThemeColor="backgroundSecondary"
                themeColor="foregroundSecondary"
                borderThemeColor="foregroundSecondary"
                style={styles.link}
            >
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.8}>
                    <MaterialIcons
                        name="map"
                        size={30}
                        color={secondaryColor}
                        weight="medium"
                    />
                </TouchableOpacity>
            </ThemedLink>
        </>
    );
}

const styles = StyleSheet.create({
    scrollView: { flex: 1, opacity: 0.8, margin: 0 },
    scrollViewContent: { flex: 1, padding: 8, backgroundColor: '#0000FF00' },
    monitorInfo: {
        margin: 8,
    },
    monitorSection: {
        margin: 8,
    },
    pollutionColor: {
        margin: 8,
    },
    spacer: {
        height: 60,
    },
    button: {
        margin:0,
        padding: 10,
    },
    link: {
        position: 'absolute',
        bottom: 16,
        left: 16,
        zIndex: 10,
        flexGrow: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        elevation: 8,
        opacity: 0.9,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3.84,
        shadowOpacity: 0.25,
        margin: 0,
        padding:0,
    }
});
