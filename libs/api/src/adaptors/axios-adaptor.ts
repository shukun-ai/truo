import axios from 'axios';
import axiosRetry from 'axios-retry';

import { IRequestAdaptor } from '../request-adaptor/request-adaptor.interface';
import {
  ApiRequesterMethods,
  ApiRequesterOptions,
  ApiRequestPayload,
  ApiResponse,
} from '../request-adaptor/request-adaptor.type';

export class AxiosAdaptor implements IRequestAdaptor {
  constructor(private readonly options: ApiRequesterOptions) {}

  async fetch<Model>(
    method: ApiRequesterMethods,
    uri: string,
    payload?: ApiRequestPayload | undefined,
  ): Promise<ApiResponse<Model>> {
    const axios = this.createAxiosInstance(this.options);

    const response = await axios.request<ApiResponse<Model>['data']>({
      url: uri,
      method: method,
      params: payload?.params,
      data: payload?.body,
      headers: payload?.headers,
    });

    return {
      data: response.data,
    };
  }

  createAxiosInstance({
    baseUrl,
    timeout,
    retries,
    onOrgName,
    onAccessToken,
  }: ApiRequesterOptions) {
    const httpRequestInstance = axios.create({
      baseURL: baseUrl,
      timeout,
    });

    axiosRetry(httpRequestInstance, { retries });

    httpRequestInstance.interceptors.request.use(
      (config) => {
        if (config.url && config.url.includes('/:orgName')) {
          const orgName = onOrgName();

          if (orgName === null) {
            throw new axios.Cancel('No valid orgName.');
          }

          config.url = config.url.replace('/:orgName', `/${orgName}`);
        }

        const accessToken = onAccessToken();

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

    return httpRequestInstance;
  }
}
