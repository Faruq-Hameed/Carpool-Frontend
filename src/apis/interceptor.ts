import axios from 'axios';
import { API_BASE_URL, UNAUTHORIZED_ERROR_CODE } from '@/utils/constants/apiConstants';
import { clearStoreUser, getUserToken } from '@/utils/asyncStorage';

const request = axios.create({ baseURL: API_BASE_URL });
console.log(API_BASE_URL)
// 🔐 Request Interceptor: Attach token if needed
request.interceptors.request.use(async (config) => {
  const token = await getUserToken();
  const noToken = config.headers?.noToken;

  if (noToken || !token) return config;

  config.headers.Authorization = `Bearer ${token}`;
  delete config.headers.noToken;

  return config;
});

// 🚫 Response Interceptor: Handle unauthorized errors
request.interceptors.response.use(
  (res) => res,
  async (err) => {
    const token = await getUserToken();
    const status = err?.response?.status;

    if (status === UNAUTHORIZED_ERROR_CODE && token) {
      clearStoreUser();
    }

    return Promise.reject(err);
  }
);

export default request;

