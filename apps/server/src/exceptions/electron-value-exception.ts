import { ExceptionNames } from '@shukun/schema';

import { BaseException, InterpolationMap } from './base-exception';

export class ElectronValueException extends BaseException {
  constructor(message: string, interpolationMap?: InterpolationMap) {
    super(ExceptionNames.ElectronValueException, message, interpolationMap);
  }
}
