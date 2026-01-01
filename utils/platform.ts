import { Platform } from "react-native";

export function getIOSVersion(): number | undefined {
    return (Platform.OS === 'ios') ? parseInt(Platform.Version as string, 10) : undefined
}

export function getAndroidVersion(): number | undefined {
    return (Platform.OS === 'android') ? Platform.Version : undefined
}

export function isIOS26OrLater(): boolean {
    return (getIOSVersion() ?? 0) >= 26;
}
