import { ExceptionNames } from '@shukun/schema';

import { BaseException } from '../base-exception';
import { InterpolationMap } from '../base-exception.type';

export class ApiResponseException extends BaseException {
  constructor(message: string, interpolationMap?: InterpolationMap) {
    super(ExceptionNames.ApiResponseException, message, interpolationMap);
    throw new Error('This Exception is not ready, please do not use it.');
  }
}
