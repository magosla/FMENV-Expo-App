import type { GasProperty, URL_TPL } from "./core";
import type { User } from "./user";

export interface ConfigType {
    version: string;
    timezone: string;
    history: number,
    endpoints: {
        csrf: string;
        login: string;
        logout: string;
        forgot_password: string;
        change_password: string;
        user: string;
        today_reading: URL_TPL;
        reading: URL_TPL;
        location_readings: URL_TPL;
        location: URL_TPL;
        monitor: URL_TPL;
        recent_air_quality: URL_TPL;
    }
    gases: {
        [key: string]: GasProperty
    }
    user?: User;
}