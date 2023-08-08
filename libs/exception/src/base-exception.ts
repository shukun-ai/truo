import { ExceptionNames } from '@shukun/schema';

import { InterpolationMap } from './base-exception.type';

export abstract class BaseException extends Error {
  rawMessage: string;
  interpolationMap?: InterpolationMap;

  constructor(
    name: ExceptionNames,
    message: string,
    interpolationMap?: InterpolationMap,
  ) {
    const interpolation = interpolationMap
      ? ' -> ' + JSON.stringify(interpolationMap)
      : '';
    super(message + interpolation);
    this.name = name;
    this.interpolationMap = interpolationMap;
    this.rawMessage = message;
  }
}
