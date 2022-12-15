import { ExceptionNames } from '@shukun/schema';

import { BaseException, InterpolationMap } from './base-exception';

export class IsNotArrayException extends BaseException {
  constructor(message = 'Is not a array', interpolationMap?: InterpolationMap) {
    super(ExceptionNames.IsNotArrayException, message, interpolationMap);
  }
}
