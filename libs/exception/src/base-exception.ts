import { ExceptionNames } from '@shukun/schema';

import { InterpolationMap } from './base-exception.type';

export abstract class BaseException extends Error {
  interpolationMap?: InterpolationMap;

  constructor(
    name: ExceptionNames,
    message: string,
    interpolationMap?: InterpolationMap,
  ) {
    super(message);
    this.name = name;
    this.interpolationMap = interpolationMap;
  }
}
