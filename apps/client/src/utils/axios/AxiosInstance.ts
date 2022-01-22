import axios, { AxiosInstance } from 'axios';

import { sessionService } from '../../services/session';

let createdAxiosInstance: AxiosInstance | null = null;

export function createAxios(): AxiosInstance {
  if (createdAxiosInstance) {
    return createdAxiosInstance;
  }

  const axiosInstance = axios.create({
    baseURL: `${process.env?.['NX_CLIENT_BASE_URL'] ?? ''}/apis/v1`,
    timeout: 1000 * 30,
  });

  // Add a request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      if (config.url && config.url.includes('/:orgName')) {
        // @todo there will throw a error when the token is expired and we don't change page route.
        // Should fix it, avoid it throw a error.
        const orgName = sessionService.getOrgName();

        if (orgName === null) {
          throw new axios.Cancel('No valid orgName.');
        }

        config.url = config.url.replace('/:orgName', `/${orgName}`);
      }

      const auth = sessionService.getSessionValidAuth();

      if (auth) {
        config.headers.Authorization = `bearer ${auth.accessToken}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  createdAxiosInstance = axiosInstance;
  return createdAxiosInstance;
}
