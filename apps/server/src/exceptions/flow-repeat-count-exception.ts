import { ExceptionNames } from '@shukun/schema';

import { BaseException, InterpolationMap } from './base-exception';

export class FlowRepeatCountException extends BaseException {
  constructor(message: string, interpolationMap?: InterpolationMap) {
    super(ExceptionNames.FlowRepeatCountException, message, interpolationMap);
  }
}
