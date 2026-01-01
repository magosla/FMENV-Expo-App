import { DateTime } from "luxon";
import type { ItemType } from "./core";
import type { DynamicRecord } from "./dynamicRecord";

export type MetaType = { value: string, last_checked_at: string }

export interface Monitor {
    id: string;
    deviceId: string;
    name: string;
    address: string;
    province: string;
    longitude: string;
    latitude: string;
    battery?: MetaType
}

interface AirQualityItemBase extends ItemType {
    id: string | number,
    monitor_id: number,
    captureTime?: DateTime,
    captured_at: string,
    fetchedAt?: DateTime,
}

export type AirQualityItem = DynamicRecord<AirQualityItemBase, string, string | number>;
