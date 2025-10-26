import { useState, useEffect, useContext } from "react";
import authContext from "../contexts/AuthContext/context";
import { actionTypes } from "../contexts/AuthContext/reducer";
import {
  getUserToken,
  storeUserToken,
  clearStoreUser,
  setUser,
  removeUserToken,
} from "../utils/asyncStorage";
import { AuthResponsePayload, VerifyEmailPayload } from "@/apis/auth/types";
import User from "@/models/User";
import { getMe, verifyEmailApi } from "@/apis/auth";
import { parseError } from "@/apis/errorParser";
import { AxiosApiError } from "@/apis/types";
import { useMutation } from "@tanstack/react-query";

function useAuth() {
  const context = useContext(authContext);
  /**function that handle refetch user from api */
  const refetchUserFromApi = async () => {
    const mutation = useMutation({
      mutationFn: async () => {
        return getMe();
      },
      onSuccess: async (res) => {
        await saveUser(res.data.data);
      },
      onError: (err) => {
        //WILL LOOK INTO THIS LATER
        // console.log('Login successful:', res.data);
        console.log("error occurred in otp verify ", { err });
      },
    });
  };

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

  /** Logout user that only remove token*/
  async function handlePartialLogout() {
    try {
      await removeUserToken();
      dispatch({ type: actionTypes.REMOVE_TOKEN, payload: null });
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
  async function handleLogin(data: AuthResponsePayload) {
    saveAuthTokenToStorage(data.token);
    await saveUser(data.user);
    setLoginStatus(true);
  }

  return {
    currentUser: state.currentUser,
    refetchUser: refetchUserFromApi,
    isLoggedIn: state.isLoggedIn,
    loading,
    logout,
    handlePartialLogout,
    saveUser,
    handleLogin,
    setLoginStatus,
  };
}

export { useAuth };
