import { useState, useEffect, useContext } from "react";
import authContext from "../contexts/AuthContext/context";
import { actionTypes } from "../contexts/AuthContext/reducer";
import {
  getUserToken,
  storeUserToken,
  clearStoreUser,
  setUser,
} from "../utils/asyncStorage";
import { User } from "../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { useProfileNavigation } from "./useTypedNavigation";

function useAuth() {
  const context = useContext(authContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { state, dispatch } = context;
  const [loading, setLoading] = useState(false);

  /** Update current user in context */
  function setCurrentUser(user: User) {
    dispatch({ type: actionTypes.SET_CURRENT_USER, payload: user });
  }

  /** Update login status in context */
  function setLoginStatus(status: boolean) {
    dispatch({ type: actionTypes.SET_LOGIN_STATUS, payload: status });
  }

  /** Check if a token exists when hook mounts */
  useEffect(() => {
    fetchUserToken();
  }, []);

  //fetch user token from AsyncStorage and set login status
  async function fetchUserToken() {
    setLoading(true);
    const userToken = await getUserToken();

    if (userToken) {
      setLoginStatus(true);
    } else {
      setLoginStatus(false);
    }

    setLoading(false);
  }

  /** Save token to AsyncStorage */
  function saveAuthTokenToStorage(token: string) {
    storeUserToken(token);
  }

  /** Logout user */
  async function logout() {
    try {
      await clearStoreUser();
      dispatch({ type: actionTypes.LOGOUT, payload: null });
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  /** Save user data to storage + context */
  async function saveUser(user: User) {
    await setUser(user);
    setCurrentUser(user);
  }

  /** Handle login success (save token + mark logged in) */
 async function handleLogin(data: string) {
    saveAuthTokenToStorage(token);
    await saveUser({
      id: "1",
      firstName: "Faruq",
      lastName: "Abdullahi",
      isVerified: false,
    })
    setLoginStatus(true);
  }

  return {
    currentUser: state.currentUser,
    isLoggedIn: state.isLoggedIn,
    loading,
    logout,
    saveUser,
    handleLogin,
    setLoginStatus,
  };
}

export { useAuth };
