import axios, { AxiosInstance } from 'axios';

export interface HttpRequestServiceOptions {
  baseUrl?: string;
  timeout?: number;
  getOrgNameFunction: () => string | null;
  getAccessTokenFunction: () => string | null;
}

export class HttpRequestService {
  protected httpRequestInstance: AxiosInstance;

  constructor({
    baseUrl = '/apis/v1',
    timeout = 1000 * 30,
    getOrgNameFunction,
    getAccessTokenFunction,
  }: HttpRequestServiceOptions) {
    const httpRequestInstance = axios.create({
      baseURL: baseUrl,
      timeout,
    });

    httpRequestInstance.interceptors.request.use(
      (config) => {
        if (config.url && config.url.includes('/:orgName')) {
          const orgName = getOrgNameFunction();

          if (orgName === null) {
            throw new axios.Cancel('No valid orgName.');
          }

          config.url = config.url.replace('/:orgName', `/${orgName}`);
        }

        const accessToken = getAccessTokenFunction();

        if (accessToken) {
          config.headers = {
            ...config.headers,
            Authorization: `bearer ${accessToken}`,
          };
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    httpRequestInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    this.httpRequestInstance = httpRequestInstance;
  }

  createAxios() {
    return this.httpRequestInstance;
  }
}
