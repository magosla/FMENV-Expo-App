import { useConfigFetchError, useFetchConfig } from "@/hooks/use-fetch-config";
import { logger } from "@/utils/logger";
import { RequestErrorView } from "@/views/request-error-view";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from "react";
import { Status } from "./status";
import { ThemedText } from "./ui/themed-text";

// Set the animation options. This is optional.
SplashScreen.setOptions({
    duration: 1000,
    fade: true,
});

SplashScreen.preventAutoHideAsync()

export default function SplashScreenController() {
    const { fetchData, isFetching, fetchFailed, loaded } = useFetchConfig()
    const [onceFailed, setOnceFailed] = useState(false);

    useEffect(() => {
        logger.log('SplashScreenController: fetchData ')
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        if (fetchFailed) {
            setOnceFailed(true);
        }
    }, [fetchFailed])

    if (loaded || onceFailed || fetchFailed) {
        SplashScreen.hide()
    }

    if (loaded) return null

    if (isFetching && onceFailed) {
        return (<Status title="Status" showLogo={true}>
            <ThemedText themeColor="foregroundSecondary">
                Loading...
            </ThemedText>
        </Status>)
    }

    if (fetchFailed) {
        return (<Status title="Status" showLogo={true} onReload={fetchData}
            footer={<ConfigFetchErrorView />}
        >
            <ThemedText themeColor="foregroundWarning">
                Error starting up
            </ThemedText>
        </Status>)
    }

    return null;
}

function ConfigFetchErrorView() {
    const { fetchError } = useConfigFetchError()

    return (
        <RequestErrorView errorObject={fetchError} />
    )
}