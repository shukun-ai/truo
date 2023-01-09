import { ExceptionNames } from '@shukun/schema';

import { BaseException, InterpolationMap } from '../base-exception';

export class FlowBadCompileException extends BaseException {
  constructor(message: string, interpolationMap?: InterpolationMap) {
    super(ExceptionNames.FlowBadCompileException, message, interpolationMap);
  }
}
