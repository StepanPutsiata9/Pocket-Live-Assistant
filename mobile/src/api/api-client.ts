import { getAuth, getIdToken } from '@react-native-firebase/auth';
import axios from 'axios';
import { Platform } from 'react-native';

const LOCAL_URL = Platform.select({
  ios: 'http://localhost:5001',
  // NOTE: For physical Android devices via USB (or when using `adb reverse`), use `localhost`.
  // If testing on Android Emulator WITHOUT `adb reverse`, run:
  // `adb -s <emulator-id> reverse tcp:5001 tcp:5001` or switch back to 'http://10.0.2.2:5001'.
  android: 'http://localhost:5001',
  default: 'http://localhost:5001',
});

const PROD_URL = 'https://api.pla-app.com';

const BASE_URL = __DEV__ ? LOCAL_URL : PROD_URL;

const apiClient = axios.create({
  baseURL: `${LOCAL_URL}/api`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async config => {
    try {
      const currentUser = getAuth().currentUser;

      if (currentUser) {
        const token = await getIdToken(currentUser);

        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Failed to fetch auth token from storage:', error);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  response => response,
  async error => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        console.warn(
          'Token expired or invalid. TODO: Clear storage and redirect to Login.',
        );
      }

      if (status === 403) {
        console.error(
          'Access denied: You do not have permission to access this resource.',
        );
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
