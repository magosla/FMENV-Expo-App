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

                {/* <MapLink monitorId={monitorId} /> */}


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

    const mapUrl = monitor === undefined ? undefined : getMapLink({ latitude: monitor.latitude, longitude: monitor.longitude })


    return mapUrl && (<ThemedLink
        asChild={true}
        href={mapUrl || ''}
        external={true}
        bgThemeColor="backgroundSecondary"
        themeColor="foregroundSecondary"
        borderThemeColor="foregroundSecondary"
        style={styles.floatButton}
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

// type MapLinkProp = {
//     monitorId: string
// }
// function MapLink({ monitorId }: MapLinkProp) {
//     const monitor = useValue(monitorStore$.monitor(monitorId))

//     const secondaryColor = useThemeColor({}, 'foregroundSecondary');

//     const mapUrl = monitor === undefined ? undefined : getMapLink({ latitude: monitor.latitude, longitude: monitor.longitude })


//     return mapUrl && (<ThemedLink
//         href={mapUrl || ''}
//         external={true}
//         borderDarkColor=""
//         themeColor="foregroundSecondary"
//         bgThemeColor="backgroundMuted"
//         borderThemeColor="foregroundMuted"
//         style={styles.link}
//     >
//         <View style={styles.linkItem}>
//             <ThemedText themeColor="foregroundSecondary">Open in Maps</ThemedText>
//             <EvilIcons
//                 name="external-link"
//                 size={16}
//                 color={secondaryColor}
//                 weight="medium"
//             />
//         </View>
//     </ThemedLink>)

// }

const styles = StyleSheet.create({
    scrollView: { opacity: 0.8, },
    scrollViewContent: { padding: 8, backgroundColor: '#0000FF00' },
    monitorInfo: {
        margin: 8,
    },
    monitorSection: {
        marginTop: 0,
        margin: 8,
    },
    pollutionColor: {
        margin: 8,
    },
    spacer: {
        height: 80,
    },
    button: {
        margin: 0,
        padding: 10,
    },
    // link: {
    //     borderWidth: 1,
    //     borderLeftWidth: 0,
    //     padding: 0,
    //     borderRightWidth: 0,
    //     marginHorizontal: 8,
    //     flex: 1,
    //     display: 'flex',
    // },
    // linkItem: {
    //     paddingHorizontal: 8,
    //     paddingVertical: 4,
    //     flex: 1,
    //     display: 'flex',
    //     alignItems: 'center',
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    // },
    // linkIcon: {
    //     display: 'flex',
    //     justifyContent: 'flex-end',
    // },
    floatButton: {
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




function getMapLink({ latitude, longitude }: { latitude: string, longitude: string }) {
    return `https://www.openstreetmap.org/?mlat=${encodeURIComponent(
        latitude
    )}&mlon=${encodeURIComponent(longitude)}#map=15/${encodeURIComponent(
        latitude
    )}/${encodeURIComponent(longitude)}`
}