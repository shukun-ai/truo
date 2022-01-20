import { States } from '../constants';
import { IntrinsicFailure } from '../errors/IntrinsicFailure';

import { afterSeconds } from './afterSeconds';
import { convertToAst } from './convert';
import { cryptoPassword } from './cryptoPassword';
import { dateTime } from './dateTime';
import { now } from './now';
import { verifyCode } from './verifyCode';

export function dispatchFunction(value: string, json: Record<string, unknown>) {
  const ast = convertToAst(value, json);

  switch (ast.method) {
    case States.now:
      return now(...ast.args);
    case States.dateTime:
      return dateTime(...ast.args);
    case States.afterSeconds:
      return afterSeconds(...ast.args);
    case States.verifyCode:
      return verifyCode(...ast.args);
    case States.cryptoPassword:
      return cryptoPassword(...ast.args);
    default:
      throw new IntrinsicFailure();
  }
}
