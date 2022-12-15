import { ExceptionNames } from '@shukun/schema';

import { BaseException, InterpolationMap } from './base-exception';

export class IsEmptyArrayException extends BaseException {
  constructor(
    message = 'Is empty array.',
    interpolationMap?: InterpolationMap,
  ) {
    super(ExceptionNames.IsEmptyArrayException, message, interpolationMap);
  }
}
