import { isISO8601 } from 'class-validator';
import * as dayjs from 'dayjs';

import { IntrinsicFailure } from '../errors/IntrinsicFailure';
import { FunctionAst } from '../types';

export function dateTime(...args: FunctionAst['args']) {
  const [dateTimeString, format] = args;

  if (typeof dateTimeString !== 'string') {
    throw new IntrinsicFailure('It is not a string in dateTime.');
  }

  if (!isISO8601(dateTimeString, { strict: true })) {
    throw new IntrinsicFailure(
      `It is not a ISO8601 standard in dateTime, like '2018-04-04T16:00:00.000Z'.`,
    );
  }

  const date = dayjs(dateTimeString);

  if (!format) {
    return date.toISOString();
  }

  if (typeof format !== 'string') {
    throw new IntrinsicFailure('The format is not valid in dateTime.');
  }

  return date.format(format);
}
