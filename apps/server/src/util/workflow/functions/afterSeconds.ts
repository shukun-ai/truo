import * as dayjs from 'dayjs';

import { IntrinsicFailure } from '../errors/IntrinsicFailure';
import { FunctionAstArg } from '../types';

export function afterSeconds(seconds?: FunctionAstArg) {
  const date = dayjs();

  if (typeof seconds !== 'number') {
    throw new IntrinsicFailure('The first arg is not a number in afterSecond.');
  }

  return date.add(seconds, 'seconds').toISOString();
}
