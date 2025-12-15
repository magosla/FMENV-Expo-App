import { Observable, ObservableBoolean } from "@legendapp/state";
import { fetchData } from "./fetch-data";
import type { User } from "@/types/user";

export const getAuthUser = async (endpoint: string, isFetching?: ObservableBoolean, error?: Observable<unknown>): Promise<User> => {
    return fetchData<User>(endpoint, isFetching, error)
}