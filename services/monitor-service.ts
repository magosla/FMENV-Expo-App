import { fetchData } from "./fetch-data";
import type { Monitor } from "../types/air-quality";
import { Observable, ObservableBoolean } from "@legendapp/state";

export const getMonitor = async (endpoint: string, isFetching?: ObservableBoolean, error?: Observable<Error | undefined>): Promise<Monitor> => {
    return fetchData<Monitor>(endpoint, isFetching, error)
}

export const getMonitors = async (endpoint: string, isFetching?: ObservableBoolean, error?: Observable<Error | undefined>): Promise<Monitor[]> => {
    return fetchData<Monitor[]>(endpoint, isFetching, error)
}