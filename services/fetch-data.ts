import { AuthError, NetworkError, NotFoundError, ServerError } from "@/types/error";
import { logger } from "@/utils/logger";
import { Observable, ObservableBoolean } from "@legendapp/state";
import axios from 'axios';

export const fetchData = async <T>(endpoint: string, isFetching?: ObservableBoolean, error?: Observable<Error | undefined>): Promise<T> => {
    isFetching?.set(true)

    return axios
        .get(endpoint, {
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json',
            }
        })
        .then((response) => {
            error?.set(undefined)
            return response.data
        })
        .catch((error_) => {
            throwError(error_, error)
        })
        .finally(() => {
            isFetching?.set(false)
        })
}

function throwError(e: unknown, errorBag?: Observable<Error | undefined>): never {
    const _e = e as undefined | TypeError;
    let err: undefined | Error = undefined
    switch (_e?.status || _e?.code) {
        case 'ERR_NETWORK':
            err = new NetworkError(_e?.response?.statusText || _e?.message);
            break;
        case 500:
        case 'ERR_BAD_RESPONSE':
            err = new ServerError(_e?.response?.statusText || _e?.message);
            break;
        case 404:
        case 'ERR_BAD_REQUEST':
            err = new NotFoundError(_e?.response?.statusText || _e?.message);
            break;
        case 401:
            err = new AuthError(_e?.response?.statusText || _e?.message);
    }

    errorBag?.set((err || e) as Error);
    logger.log('Fetch data error now:', errorBag?.peek())

    throw err || e;
}

type TypeError = { code: string, status?: number, message: string, response?: { statusText?: string } }