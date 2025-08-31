import React, { useContext, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

import { authReducer } from "../reducers/authReducer";
import { removeTokenFromStorage } from "../helpers/asyncTokenManager";
//PLEASE I JUST COPIED THE CODE, NOTHING IS FUNCTIONAL
const UserContext = React.createContext();
const initialState = {
  token: "",
  errorMessage: "",
  loading: false,
};
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const trackerApi = createTrackApi(state.token);

  /**Sign Up function, it store token to local and async storage*/
  const signUp = async (data) => {
    try {
      const response = await trackerApi.post("/auth/signup", data);
      const token = response.data.token;
      await AsyncStorage.setItem("authToken", token);
      Alert.alert("success", response.data.message);
      dispatch({ type: "set_token", payload: token });
    } catch (error) {
      let message = "";
      if (error.response) {
        // if error response
        message =
          error.response.data?.message ||
          "An unknown error occurred from server.";
      } else {
        //if network from device is not available
        message = "Unable to connect. Please try again later.";
      }
      dispatch({ type: "set_error_message", payload: message });
    }
  };

  /**Sign In function, it store token to local and async storage*/
  const signIn = async ({ email, password }) => {
    try {
      const response = await trackerApi.post(`/auth/signin`, {
        email,
        password,
      });
      const data = response.data.data;

      const token = data.token;
      await AsyncStorage.setItem("authToken", token);
      Alert.alert("success", data.message);
      dispatch({ type: "set_token", payload: token });
      return true; //added for navigation purposes earlier
    } catch (error) {
      dispatch({ type: "set_token", payload: "TEST TOKEN" }); //ADDED TO TEST 

      // await AsyncStorage.setItem("authToken", 'token');
      // dispatch({ type: "set_token", payload: 'token' });

      console.log("error", error);
      let message = "";
      if (error.response) {
        // if error response
        message =
          error.response.data?.message ||
          "An unknown error occurred from server.";
      } else {
        //if network from device is not available
        message = "Unable to connect. Please try again later.";
      }
      dispatch({ type: "set_error_message", payload: message });
    }
    return false;
  };

  /**Function to store token locally */
  const setToken = (token) => {
    dispatch({ type: "set_token", payload: token });
  };

  /**Function to handle sign out it handles for local and async storage*/
  const clearToken = async (token) => {
    await removeTokenFromStorage();
    dispatch({ type: "clear_token", payload: token });
  };

  /**Function that handles dispatch to clear error message from the state */
  const clearErrorMessage = () => {
    dispatch({ type: "clear_error_message" });
  };
  return (
    <AuthContext.Provider
      value={{ state, signIn, signUp, setToken, clearToken, clearErrorMessage }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default UserProvider;

/**custom hook to access auth state  */
export const useAuthContext = () => useContext(AuthContext); // ✅ so I will just call useAuthContext() anywhere i
// need to access the state instead of useContext(AuthContext) everywhere

