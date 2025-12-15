import { EmptyMonitorsState } from "@/components/empty-monitors-state";
import { MonitorsList } from "@/components/monitors-list";
import { ExternalLink } from "@/components/ui/external-link";
import { Header } from "@/components/ui/header";
import { ThemedText } from "@/components/ui/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { useMonitorStore } from "@/hooks/use-monitor-store";
import { Image } from "expo-image";
import { ScrollView, StyleSheet } from "react-native";


export default function Index() {
  const { monitors, activeMonitorId } = useMonitorStore();
  // Convert Map to Array for FlatList
  const monitorsArray = Object.values(monitors);

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}
    >
      <ThemedView style={styles.container}>
        <Header style={styles.header} >
          {process.env.EXPO_PUBLIC_APP_NAME || 'Air Quality Monitors'}
        </Header>
        {monitorsArray.length === 0 ? (
          <EmptyMonitorsState />
        ) : (
          <MonitorsList
            style={styles.list}
            monitors={monitorsArray}
            activeMonitorId={activeMonitorId}
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
        borderThemeColor="tint"
        shadowThemeColor="tint">
        <Image style={styles.footerImage} contentFit="contain" source={require('@/assets/images/logo.png')} />
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: { backgroundColor: '#0000FF00', opacity: 0.8 },
  scrollViewContent: { backgroundColor: '#0000FF00' },
  container: {
    flex: 1,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 22,
  },
  header: {
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
    shadowRadius: 8,
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