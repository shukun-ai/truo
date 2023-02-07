import { ExceptionNames } from '@shukun/schema';

import { BaseException } from '../base-exception';
import { InterpolationMap } from '../base-exception.type';

export class GatewayUnauthorizedException extends BaseException {
  constructor(message: string, interpolationMap?: InterpolationMap) {
    super(
      ExceptionNames.GatewayUnauthorizedException,
      message,
      interpolationMap,
    );
  }
}
