import { EmptyMonitorsState } from "@/components/empty-monitors-state";
import { MonitorsList } from "@/components/monitors-list";
import { ExternalLink } from "@/components/ui/external-link";
import Logo from "@/components/ui/logo";
import { ThemedText } from "@/components/ui/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { useMonitorStore } from "@/hooks/use-monitor-store";
import { ScrollView, StyleSheet } from "react-native";


export default function MonitorsView() {
    const { monitors } = useMonitorStore();
    // Convert Map to Array for FlatList
    const monitorsArray = Object.values(monitors);

    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
        >
            <ThemedView style={styles.container}>
                {monitorsArray.length === 0 ? (
                    <EmptyMonitorsState />
                ) : (
                    <MonitorsList
                        style={styles.list}
                        monitors={monitorsArray}
                    />
                )}
            </ThemedView>

            <ThemedView style={styles.meta}>
                <ExternalLink href={process.env.EXPO_PUBLIC_ORGANIZATION_URL ?? ''}>
                    <ThemedText type="link" themeColor="foregroundSecondary">Federal Ministry of Environment, Nigeria.</ThemedText>
                </ExternalLink>
                <ThemedText type="small" themeColor="foregroundSecondary" style={{ textAlign: 'center' }}>Department of pollution control and environmental health.</ThemedText>
            </ThemedView>

            <ThemedView style={styles.footer} bgThemeColor="backgroundPrimary"
            // borderThemeColor="tint"
            // shadowThemeColor="tint"
            >
                <Logo style={styles.footerImage} />
            </ThemedView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: { backgroundColor: '#0000FF00', opacity: 0.8 },
    scrollViewContent: { backgroundColor: '#0000FF00', padding: 4 },
    container: {
        flex: 1,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 22,
    },
    header: {
        marginTop: 20,
        padding: 8,
        marginBottom: 8,
        borderRadius: 4,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    list: {
        borderRadius: 8,
        backgroundColor: '#0000FF00'
    },
    footer: {
        marginHorizontal: 'auto',
        marginVertical: 16,
        paddingRight: 16,
        borderRadius: 50,
        // shadowRadius: 8,
    },
    footerImage: {
        width: 150,
        height: 40,
    },
    meta: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginHorizontal: 'auto',
        marginVertical: 16,
    },
});