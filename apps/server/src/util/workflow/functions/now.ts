import * as dayjs from 'dayjs';

import { IntrinsicFailure } from '../errors/IntrinsicFailure';
import { FunctionAstArg } from '../types';

export function now(format?: FunctionAstArg) {
  const date = dayjs();

  if (!format) {
    return date.toISOString();
  }

  if (typeof format === 'string') {
    return date.format(format);
  }

  throw new IntrinsicFailure();
}
