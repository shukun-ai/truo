import {
  ApiRequesterMethods,
  ApiRequestPayload,
  ApiResponse,
} from './request-adaptor.type';

export interface IRequestAdaptor {
  fetch<Model>(
    method: ApiRequesterMethods,
    uri: string,
    payload?: ApiRequestPayload,
  ): Promise<ApiResponse<Model>>;
}
