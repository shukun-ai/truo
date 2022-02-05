import randomstring from 'randomstring';

import { IntrinsicFailure } from '../errors/IntrinsicFailure';
import { FunctionAstArg } from '../types';

export function verifyCode(length?: FunctionAstArg) {
  if (typeof length !== 'number') {
    throw new IntrinsicFailure(`Must give verifyCode a numeric argument.`);
  }

  return randomstring.generate({
    length,
    capitalization: 'lowercase',
    charset: 'numeric',
  });
}
