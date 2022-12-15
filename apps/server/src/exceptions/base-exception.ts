import { ExceptionNames } from '@shukun/schema';

export type InterpolationMap = Record<string, unknown>;

export class BaseException extends Error {
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
