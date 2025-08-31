import { Dimensions } from "react-native";

/**Device screen dimension */
export const width  =  Dimensions.get("window").width; // Get the width of the device screen

export const ACCESS_TOKEN_STORAGE_KEY = 'access-token';
export const REFRESH_TOKEN_STORAGE_KEY = "refresh-token";
export const USER_STORAGE_KEY = "carpool-user";