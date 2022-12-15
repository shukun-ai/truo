import { ExceptionNames } from '@shukun/schema';

import { BaseException, InterpolationMap } from './base-exception';

export class FlowDefinitionException extends BaseException {
  constructor(message: string, interpolationMap?: InterpolationMap) {
    super(ExceptionNames.FlowDefinitionException, message, interpolationMap);
  }
}
