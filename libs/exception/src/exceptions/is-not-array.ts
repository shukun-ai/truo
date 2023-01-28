import { ExceptionNames } from '@shukun/schema';

import { BaseException } from '../base-exception';
import { InterpolationMap } from '../base-exception.type';

export class IsNotArrayException extends BaseException {
  constructor(message = 'Is not a array', interpolationMap?: InterpolationMap) {
    super(ExceptionNames.IsNotArrayException, message, interpolationMap);
  }
}
