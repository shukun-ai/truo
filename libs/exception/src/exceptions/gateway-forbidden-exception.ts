import { ExceptionNames } from '@shukun/schema';

import { BaseException } from '../base-exception';
import { InterpolationMap } from '../base-exception.type';

export class GatewayForbiddenException extends BaseException {
  constructor(message: string, interpolationMap?: InterpolationMap) {
    super(ExceptionNames.GatewayForbiddenException, message, interpolationMap);
  }
}
