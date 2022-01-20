import { cryptoPassword as baseCryptoPassword } from '../../../identity/utils/password.utils';
import { IntrinsicFailure } from '../errors/IntrinsicFailure';
import { FunctionAstArg } from '../types';

export function cryptoPassword(value?: FunctionAstArg) {
  if (typeof value === 'string') {
    return baseCryptoPassword(value);
  }

  throw new IntrinsicFailure();
}
