import { ExceptionNames } from '@shukun/schema';

import { BaseException, InterpolationMap } from '../base-exception';

export class TypeException extends BaseException {
  constructor(message: string, interpolationMap?: InterpolationMap) {
    super(ExceptionNames.TypeException, message, interpolationMap);
  }
}
