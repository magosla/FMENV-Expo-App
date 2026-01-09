import { ThemedText } from "@/components/ui/themed-text"
import { ThemedView } from "@/components/ui/themed-view"
import { useFetchAirQualityError } from "@/hooks/use-fetch-air-quality"
import { useFetchMonitorsError } from "@/hooks/use-fetch-monitor"
import { useGlobalSearchParams } from "expo-router";
import { AuthError, NetworkError, NotFoundError, ServerError } from "@/types/error"
import { logger } from "@/utils/logger"
import { Ionicons } from "@expo/vector-icons"
import { StyleSheet } from "react-native"


export function FetchErrorView() {
    const { monitorId } = useGlobalSearchParams<{ monitorId?: string }>()
    const { fetchError } = useFetchAirQualityError(monitorId)
    const { fetchError: monitorFetchError } = useFetchMonitorsError()

    logger.log('FetchErrorView fetchError:', fetchError, monitorFetchError, monitorId)

    const errorObject = monitorFetchError ?? fetchError
    if (!errorObject) {
        return null
    }
    let error = ''

    switch (true) {
        case errorObject instanceof NetworkError:
            error = "There was a network error."
            break;
        case errorObject instanceof NotFoundError:
            error = "The requested resource was not found."
            break;
        case errorObject instanceof AuthError:
            error = "You are not authorized to access this resource."
            break;
        case errorObject instanceof ServerError:
            error = "A server error occurred. Will keep trying."
            break;
        default:
            error = errorObject.message || "An unknown error occurred."
            break;
    }

    return (
        <ThemedView bgThemeColor="backgroundError" style={styles.errorContainer}>
            <ThemedText themeColor="foregroundError">
                <Ionicons name="alert-circle-outline" size={14} />
            </ThemedText>
            <ThemedText type="small" themeColor="foregroundError" style={styles.errorText}>
                {error}
            </ThemedText>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    errorContainer: {
        flexShrink: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 2,
        paddingVertical: 5,
    },
    errorText: {
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 14,
        columnGap: 3,
    },
})