import { useFetchConfig } from "@/hooks/use-fetch-config";
import { useEffect, useState } from "react";
import { Status } from "./status";
import * as SplashScreen from 'expo-splash-screen';
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
        if (loaded) return;
        fetchData();
    }, [fetchData, loaded]);

    useEffect(() => {
        if (fetchFailed) {
            setOnceFailed(true);
        }
    }, [fetchFailed])

    if (loaded || onceFailed || fetchFailed) {
        SplashScreen.hide()
    }

    if (isFetching && onceFailed) {
        return (<Status title="Status" showLogo={true}>
            <ThemedText themeColor="foregroundSecondary">
                Loading...
            </ThemedText>
        </Status>)
    }

    if (!loaded && fetchFailed) {
        return (<Status title="Status" showLogo={true} onReload={fetchData}>
            <ThemedText themeColor="foregroundWarning">
                Error starting up
            </ThemedText>
        </Status>)
    }

    return null;
}
