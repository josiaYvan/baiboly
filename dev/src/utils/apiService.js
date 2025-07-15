/**
 * @name Bus'nay
 * @author Mr. Josia Yvan
 * @description System API and Management System Software ~ Developed By Mr. Josia Yvan
 * @copyright ©2024 ― Mr. Josia Yvan.  All rights reserved.
 * @version v0.0.1
 *
 */
import axios from 'axios';
import { getSessionToken, removeSessionAndLogoutUser } from './authentication';

const ApiService = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
});

/**
 * Interceptor for all requests.
 */
ApiService.interceptors.request.use(
  (config) => {
    /**
     * Add your request interceptor logic here: setting headers, authorization etc.
     */
    // console.log('Request Interceptor:', config); // Debug log for request config

    config.headers['Content-Type'] = 'application/json';

    if (!config?.noAuth) {
      const token = getSessionToken();
      // console.log('Token:', token); // Debug log for token
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Interceptor for all responses
 */
ApiService.interceptors.response.use(
  /**
  * Add logic for successful response
  */
  (response) => response?.data || {},
  // console.log('Response Interceptor:', response); // Debug log for response

  /**
  * Add logic for any error from backend
  */
  async (error) => {
    const originalRequest = error.config;

    if (error?.response?.data?.result_code === 11) {
      // if authorized to logout user and redirect login page
      removeSessionAndLogoutUser();
    }

    // eslint-disable-next-line no-underscore-dangle
    if (error.response.status === 401 && !originalRequest._retry) {
      // if authorized to logout user and redirect login page
      removeSessionAndLogoutUser();
    }

    // Handle other error cases
    return Promise.reject(error);
  }
);

export default ApiService;
