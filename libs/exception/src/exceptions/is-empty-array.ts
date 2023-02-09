import { ExceptionNames } from '@shukun/schema';

import { BaseException } from '../base-exception';
import { InterpolationMap } from '../base-exception.type';

export class IsEmptyArrayException extends BaseException {
  constructor(
    message = 'Is empty array.',
    interpolationMap?: InterpolationMap,
  ) {
    super(ExceptionNames.IsEmptyArrayException, message, interpolationMap);
  }
}
