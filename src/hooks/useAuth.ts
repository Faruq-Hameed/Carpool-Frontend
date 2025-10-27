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

  const { state, dispatch } = context;
  const [loading, setLoading] = useState(false);

  /**function that handle refetch user from api */

   const refetchUserMutation = useMutation({
    mutationFn: getMe,
    onSuccess: async (res) => {
      console.log("fetch user successful");
      await saveUser(res.data.data);
    },
    onError: (err) => {
      console.log("Error occurred while refetching user:", err);
    },
  });

  /** Trigger refetch user manually if not it will violate hook rules and lead to error */
  const refetchUser = () => {
    refetchUserMutation.mutate();
  };

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
    refetchUser,
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
