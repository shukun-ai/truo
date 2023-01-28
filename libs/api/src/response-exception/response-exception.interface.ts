import { InterpolationMap } from '@shukun/exception';

import { HttpStatusCode } from '../request-adaptor/request-adaptor.type';

export interface IApiResponseException {
  status: HttpStatusCode;
  message: string;
  interpolationMap?: InterpolationMap;
  internalServerCode?: string;
}
