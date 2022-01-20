import { JSONPath } from 'jsonpath-plus';
import { toNumber, trim } from 'lodash';

import { IntrinsicFailure } from '../errors/IntrinsicFailure';
import { FunctionAst } from '../types';

export const convertToAst = (
  value: string,
  json: Record<string, unknown>,
): FunctionAst => {
  return {
    method: matchMethod(value),
    args: matchArgs(value, json),
  };
};

function matchMethod(value: string): string {
  const startReg = /^States.[a-zA-Z0-9]{1,}\(/;
  const matched = value.match(startReg);

  if (!matched) {
    throw new IntrinsicFailure();
  }

  const name = matched[0];
  const method = name.slice(0, -1);
  return method;
}

export function matchArgs(
  value: string,
  json: Record<string, unknown>,
): FunctionAst['args'] {
  const argsReg = /\(.*\)$/;
  const matched = value.match(argsReg);

  if (!matched) {
    throw new IntrinsicFailure();
  }

  const argsValue = matched[0];
  const trim = argsValue.slice(1, argsValue.length - 1);

  if (trim === '') {
    return [];
  }

  const rawArgs = trim.split(',');

  const args = rawArgs.map((item) => parseArg(item, json));

  return args;
}

function parseArg(
  value: string,
  json: Record<string, unknown>,
): FunctionAst['args'][number] {
  value = trim(value);

  if (value === 'null') {
    return null;
  }

  if (value.startsWith('$.')) {
    const [parsed] = JSONPath({
      path: value,
      json: json,
    });
    return parsed;
  }

  if (isNumeric(value)) {
    return toNumber(value);
  }

  if (value.startsWith("'") && value.endsWith("'")) {
    return value.slice(1, -1);
  }

  throw new IntrinsicFailure();
}

function isNumeric(value: any) {
  return !isNaN(toNumber(value)) && isFinite(value);
}
