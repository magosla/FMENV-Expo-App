import { ConfigType } from "@/types/config";
import { Observable, ObservableBoolean } from "@legendapp/state";
import { fetchData } from "./fetch-data";

export const getConfig = async (isFetching?: ObservableBoolean, error?: Observable<Error | undefined>): Promise<ConfigType> => {
    let endpoint: URL
    try {
        endpoint = new URL(process.env.EXPO_PUBLIC_CONFIG_ENDPOINT || '')
    } catch {
        throw Error("Configure environment with valid config endpoint URL");
    }

    return fetchData<{ data: ConfigType }>(endpoint.toString(), isFetching, error)
        .then(data => data?.data)
        .catch((error) => {
            throw error;
        })
}