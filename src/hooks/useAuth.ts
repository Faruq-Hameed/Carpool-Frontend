import { useState, useEffect, useContext } from 'react';

import authContext from '../contexts/AuthContext/context';
import { actionTypes } from '../contexts/AuthContext/reducer';
import { getUser, getUserToken, storeUserToken, clearStoreUser, setUser, storeAsyncStorage } from '../utils/asyncStorage';
import { User } from '../contexts/AuthContext';

function useAuth() {
  const context = useContext(authContext);
  const state = context?.state;
  const dispatch = context?.dispatch;
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState('');

  function setCurrentUser(user: User) {
    dispatch({ type: actionTypes.SET_CURRENT_USER, payload: user });
  }

  function setUserSession(status: boolean) {
    dispatch({ type: actionTypes.UPDATE_USER_SESSION, payload: status });
  }

  useEffect(() => {
    userToken();
  }, []);

  async function userToken() {
    setLoading(true);
    const uData = await getUser();
    const userToken = await getUserToken();
    setToken(userToken!);
    setUserData(uData);
    setCurrentUser(uData);
    setLoading(false);
  }


  function saveAuthTokenToStorage(token: string) {
    storeUserToken(token);
  }

  async function logout() {
    try {
      await clearStoreUser();
      // await AsyncStorage.removeItem('isLoggedIn');
      dispatch({ type: actionTypes.LOGOUT, payload: null });
    } catch (error) {
      return error;
    }
  }

  /**Save user data after login, when user data is fetched from api and other time when anything change in */
  const saveUser = async (user: User) => {
    await setUser(user);
    setCurrentUser(user);
  };

  function handleLogin(result: any) {
    const { user, token } = result || {};
    storeAsyncStorage('email', user?.email); // storage
    saveAuthTokenToStorage(token?.access_token); // storage
    saveUser(user); // react state

    // if (user?.is_phone_verified && user?.access_code) {
    //   // return storeAsyncStorage('isLoggedIn', 'true');
    //   return setUserSession(true);
    // }

    return;
  }

  return {
    currentUser: state.currentUser,
    isLoggedIn: state.isLoggedIn,
    saveAuthTokenToStorage,
    token,
    loading,
    logout,
    saveUser,
    handleLogin,
    setUserSession,
  };
}

export { useAuth };
