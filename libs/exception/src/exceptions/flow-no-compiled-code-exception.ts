import { ExceptionNames } from '@shukun/schema';

import { BaseException, InterpolationMap } from '../base-exception';

export class FlowNoCompiledCodeException extends BaseException {
  constructor(message: string, interpolationMap?: InterpolationMap) {
    super(
      ExceptionNames.FlowNoCompiledCodeException,
      message,
      interpolationMap,
    );
  }
}
