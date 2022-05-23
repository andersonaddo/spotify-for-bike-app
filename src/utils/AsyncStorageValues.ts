import AsyncStorage from "@react-native-async-storage/async-storage"
import dotEnvConfig from "react-native-ultimate-config";

export enum connectionSettings {
    SPOTIFY_CLIENT_ID,
    SPOTIFY_REDIRECT_URL,
    SPOTIFY_TOKEN_REFRESH_URL,
    SPOTIFY_TOKEN_SWAP_URL,
}

export const getSetting = async (setting: connectionSettings): Promise<string> => {
    let val: string;
    switch (setting) {
        case connectionSettings.SPOTIFY_CLIENT_ID:
            val = await AsyncStorage.getItem("clientID") || "";
            return val
        case connectionSettings.SPOTIFY_REDIRECT_URL:
            val = await AsyncStorage.getItem("redirectURL") || "";
            return val
        case connectionSettings.SPOTIFY_TOKEN_REFRESH_URL:
            val = await AsyncStorage.getItem("refreshURL") || "";
            return val
        case connectionSettings.SPOTIFY_TOKEN_SWAP_URL:
            val = await AsyncStorage.getItem("swapURL") || "";
            return val
    }
}

export const setSetting = async (setting: connectionSettings, newVal: string): Promise<void> => {
    switch (setting) {
        case connectionSettings.SPOTIFY_CLIENT_ID:
            await AsyncStorage.setItem("clientID", newVal);
            break
        case connectionSettings.SPOTIFY_REDIRECT_URL:
            await AsyncStorage.setItem("redirectURL", newVal);
            break
        case connectionSettings.SPOTIFY_TOKEN_REFRESH_URL:
            await AsyncStorage.setItem("refreshURL", newVal);
            break
        case connectionSettings.SPOTIFY_TOKEN_SWAP_URL:
            await AsyncStorage.setItem("swapURL", newVal);
            break
    }
}

export const resetSetting = async (setting: connectionSettings): Promise<void> => {
    switch (setting) {
        case connectionSettings.SPOTIFY_CLIENT_ID:
            await AsyncStorage.setItem("clientID", dotEnvConfig.SPOTIFY_CLIENT_ID);
            break
        case connectionSettings.SPOTIFY_REDIRECT_URL:
            await AsyncStorage.setItem("redirectURL", dotEnvConfig.SPOTIFY_REDIRECT_URL);
            break
        case connectionSettings.SPOTIFY_TOKEN_REFRESH_URL:
            await AsyncStorage.setItem("refreshURL", dotEnvConfig.SPOTIFY_TOKEN_REFRESH_URL);
            break
        case connectionSettings.SPOTIFY_TOKEN_SWAP_URL:
            await AsyncStorage.setItem("swapURL", dotEnvConfig.SPOTIFY_TOKEN_SWAP_URL);
            break
    }
}