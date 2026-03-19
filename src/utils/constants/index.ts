import { Dimensions } from "react-native";

/**Device screen dimension */
export const width  =  Dimensions.get("window").width; // Get the width of the device screen

export const ACCESS_TOKEN_STORAGE_KEY = 'access-token';
export const REFRESH_TOKEN_STORAGE_KEY = "refresh-token";
export const USER_STORAGE_KEY = "kajolo-user";
export const USER_KYC_STATUS_STORAGE_KEY = "kajolo-user-kyc-status";
export const PUSH_TOKEN_KEY = "kajolo-push-token";
