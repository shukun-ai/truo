import { InterpolationMap } from '@shukun/exception';
import { ExceptionNames } from '@shukun/schema';

import { HttpStatusCode } from '../request-adaptor/request-adaptor.type';

import { IApiResponseException } from './response-exception.interface';

export class ApiResponseException
  extends Error
  implements IApiResponseException
{
  status: HttpStatusCode;
  interpolationMap?: InterpolationMap;
  internalServerCode?: string;

  constructor(
    status: HttpStatusCode,
    message: string,
    interpolationMap?: InterpolationMap,
    internalServerCode?: string,
  ) {
    super(message);
    this.name = ExceptionNames.ApiResponseException;
    this.status = status;
    this.interpolationMap = interpolationMap;
    this.internalServerCode = internalServerCode;
  }
}
