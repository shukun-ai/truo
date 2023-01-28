import { InterpolationMap, TypeException } from '@shukun/exception';
import axios, { AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';

import { IRequestAdaptor } from '../request-adaptor/request-adaptor.interface';
import {
  ApiRequesterMethods,
  ApiRequesterOptions,
  ApiRequestPayload,
  ApiResponse,
} from '../request-adaptor/request-adaptor.type';
import { ApiResponseException } from '../response-exception/response-exception';

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
      status: response.status,
    };
  }

  createAxiosInstance({
    baseUrl,
    timeout,
    retries,
    debug,
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
        // TODO use new exception to wrap.
        return Promise.reject(error);
      },
    );

    httpRequestInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        this.consoleWarnLog(error.config, debug);
        if (error.response) {
          this.consoleWarnLog(error.request, debug);
          this.consoleWarnLog(error.response, debug);
          return Promise.reject(
            this.prepareServerRespondedException(error.response),
          );
        } else if (error.request) {
          this.consoleWarnLog(error.request, debug);
          return Promise.reject(
            new TypeException(
              'The request was made but no response was received.',
            ),
          );
        } else {
          return Promise.reject(error);
        }
      },
    );

    return httpRequestInstance;
  }

  private consoleWarnLog(content: unknown, debug?: boolean) {
    if (debug) {
      console.warn(content);
    }
  }

  private prepareServerRespondedException(
    response: AxiosResponse<{
      message: unknown;
      interpolationMap: unknown;
      internalServerCode: unknown;
    }>,
  ) {
    return new ApiResponseException(
      response.status,
      this.prepareResponseMessage(response.data.message),
      this.prepareInterpolationMap(response.data.interpolationMap),
      this.prepareInternalServerCode(response.data.internalServerCode),
    );
  }

  private prepareResponseMessage(message: unknown) {
    if (!message) {
      return 'Unknown errors happened, we did not find error message.';
    } else if (typeof message === 'string') {
      return message;
    } else if (Array.isArray(message)) {
      return message.join(',');
    } else {
      return JSON.stringify(message);
    }
  }

  private prepareInterpolationMap(
    interpolationMap: unknown,
  ): InterpolationMap | undefined {
    if (!interpolationMap) {
      return undefined;
    } else if (typeof interpolationMap === 'object') {
      return interpolationMap as InterpolationMap;
    } else {
      return undefined;
    }
  }

  private prepareInternalServerCode(
    internalServerCode: unknown,
  ): string | undefined {
    return typeof internalServerCode === 'string'
      ? internalServerCode
      : undefined;
  }
}
