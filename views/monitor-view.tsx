import { MonitorInfo } from "@/components/monitor-info";
import { MonitorSection } from "@/components/monitor-section";
import { PollutionColorMap } from "@/components/pollution-color-map";
import { ThemedLink } from "@/components/ui/themed-link";
import { ThemedTouchableOpacity } from "@/components/ui/themed-touchable-opacity";
import { useThemeColor } from "@/hooks/use-theme-color";
import { monitorStore$ } from "@/stores/monitor";
import { MaterialIcons } from "@expo/vector-icons";
import { useValue } from "@legendapp/state/react";
import { ScrollView, StyleSheet, View } from "react-native";

type MonitorViewProp = {
    monitorId: string
}

export default function MonitorView({ monitorId }: Readonly<MonitorViewProp>) {
    const backgroundColor = '#0000FF00'

    return (
        <>
            <ScrollView
                alwaysBounceVertical={true}
                contentInsetAdjustmentBehavior="automatic"
                contentContainerStyle={styles.scrollViewContent}
                style={[styles.scrollView, { backgroundColor }]}
            >
                <MonitorInfo monitorId={monitorId} style={styles.monitorInfo} />
                <MonitorSection monitorId={monitorId} style={styles.monitorSection} />
                <PollutionColorMap style={styles.pollutionColor} />
                <View style={styles.spacer} />
            </ScrollView>

            <MapFloatButton monitorId={monitorId} />
        </>
    );
}

type MapFloatButtonProp = {
    monitorId: string
}
function MapFloatButton({ monitorId }: MapFloatButtonProp) {
    const monitor = useValue(monitorStore$.monitor(monitorId))

    const secondaryColor = useThemeColor({}, 'foregroundSecondary');

    const mapUrl = monitor === undefined ? undefined : `https://www.openstreetmap.org/?mlat=${encodeURIComponent(
        monitor.latitude
    )}&mlon=${encodeURIComponent(monitor.longitude)}#map=15/${encodeURIComponent(
        monitor.latitude
    )}/${encodeURIComponent(monitor.longitude)}`


    return mapUrl && (<ThemedLink
        asChild={true}
        href={mapUrl || ''}
        external={true}
        bgThemeColor="backgroundSecondary"
        themeColor="foregroundSecondary"
        borderThemeColor="foregroundSecondary"
        style={styles.link}
    >
        <ThemedTouchableOpacity
            style={styles.button}
            activeOpacity={0.8}>
            <MaterialIcons
                name="map"
                size={30}
                color={secondaryColor}
                weight="medium"
            />
        </ThemedTouchableOpacity>
    </ThemedLink>)

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
        margin: 0,
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
        padding: 0,
    }
});
