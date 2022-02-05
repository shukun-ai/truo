import { WorkflowComparison } from '@shukun/schema';

import { NoChoiceMatched } from '../errors/NoChoiceMatched';
import { parseByPath } from '../parser';
import { InputOrOutput } from '../types';

import {
  booleanEquals,
  isBoolean,
  isNull,
  isNumeric,
  isPresent,
  isString,
  numericEquals,
  numericGreaterThan,
  numericGreaterThanEquals,
  numericLessThan,
  numericLessThanEquals,
  stringEquals,
  stringGreaterThan,
  stringGreaterThanEquals,
  stringLessThan,
  stringLessThanEquals,
  timestampEquals,
  timestampGreaterThan,
  timestampGreaterThanEquals,
  timestampLessThan,
  timestampLessThanEquals,
} from './formulas';

const PATH_SUFFIX_NAME = 'Path';

const formulaHelpers = {
  booleanEquals,
  isBoolean,
  isNull,
  isNumeric,
  isPresent,
  isString,
  numericEquals,
  numericGreaterThan,
  numericGreaterThanEquals,
  numericLessThan,
  numericLessThanEquals,
  stringEquals,
  stringGreaterThan,
  stringGreaterThanEquals,
  stringLessThan,
  stringLessThanEquals,
  timestampEquals,
  timestampGreaterThan,
  timestampGreaterThanEquals,
  timestampLessThan,
  timestampLessThanEquals,
};

export function compareVariables(
  comparison: WorkflowComparison,
  input: InputOrOutput,
): boolean {
  if (comparison.and) {
    return comparison.and.every((item) => compareVariables(item, input));
  }

  if (comparison.or) {
    return comparison.or.some((item) => compareVariables(item, input));
  }

  if (comparison.not) {
    return !compareVariables(comparison.not, input);
  }

  if (!comparison.variable) {
    throw new NoChoiceMatched('No comparison variable.');
  }

  const parsedVariable = parseByPath(comparison.variable, input);

  const key = Object.keys(comparison).find((key) => {
    const keyWithoutPath = key.slice(0, key.length - PATH_SUFFIX_NAME.length);
    return (
      Object.keys(formulaHelpers).includes(key) ||
      Object.keys(formulaHelpers).includes(keyWithoutPath)
    );
  });

  if (!key) {
    throw new NoChoiceMatched('We did not find the supported formula.');
  }

  const value = comparison[key];

  const endWithPath = key.endsWith(PATH_SUFFIX_NAME);

  if (endWithPath && typeof value !== 'string') {
    throw new NoChoiceMatched('No endWithPath or value is not string.');
  }

  const functionName = endWithPath
    ? key.slice(0, key.length - PATH_SUFFIX_NAME.length)
    : key;

  const functionValue = endWithPath
    ? parseByPath(value as string, input)
    : value;

  const func = (formulaHelpers as any)[functionName];

  if (!func) {
    throw new NoChoiceMatched('No found function.');
  }

  return func(parsedVariable, functionValue);
}
