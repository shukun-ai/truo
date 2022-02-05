import dayjs from 'dayjs';
import {
  isNull as lodashIsNull,
  isNumber,
  isEmpty,
  isString as lodashIsString,
} from 'lodash';

export const booleanEquals = (a: unknown, b: unknown) => {
  if (typeof a !== 'boolean' || typeof b !== 'boolean') {
    return false;
  }
  return a === b;
};

export const isBoolean = (a: unknown, b: unknown) => {
  return !!(b === true && typeof a === 'boolean');
};

export const isNull = (a: unknown, b: unknown) => {
  return !!(b === true && lodashIsNull(a));
};

export const isNumeric = (a: unknown, b: unknown) => {
  return !!(b === true && isNumber(a));
};

export const isPresent = (a: unknown, b: unknown) => {
  return !!(b === true && !isEmpty(a));
};

export const isString = (a: unknown, b: unknown) => {
  return !!(b === true && lodashIsString(a));
};

export const numericEquals = (a: unknown, b: unknown) => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    return false;
  }
  return a === b;
};

export const numericGreaterThan = (a: unknown, b: unknown) => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    return false;
  }
  return a > b;
};

export const numericGreaterThanEquals = (a: unknown, b: unknown) => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    return false;
  }
  return a >= b;
};

export const numericLessThan = (a: unknown, b: unknown) => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    return false;
  }
  return a < b;
};

export const numericLessThanEquals = (a: unknown, b: unknown) => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    return false;
  }
  return a <= b;
};

export const stringEquals = (a: unknown, b: unknown) => {
  if (typeof a !== 'string' || typeof b !== 'string') {
    return false;
  }
  return a === b;
};

export const stringGreaterThan = (a: unknown, b: unknown) => {
  if (typeof a !== 'string' || typeof b !== 'string') {
    return false;
  }
  return a > b;
};

export const stringGreaterThanEquals = (a: unknown, b: unknown) => {
  if (typeof a !== 'string' || typeof b !== 'string') {
    return false;
  }
  return a >= b;
};

export const stringLessThan = (a: unknown, b: unknown) => {
  if (typeof a !== 'string' || typeof b !== 'string') {
    return false;
  }
  return a < b;
};

export const stringLessThanEquals = (a: unknown, b: unknown) => {
  if (typeof a !== 'string' || typeof b !== 'string') {
    return false;
  }
  return a >= b;
};

export const timestampEquals = (a: unknown, b: unknown) => {
  if (typeof a !== 'string' || typeof b !== 'string') {
    return false;
  }

  const dateA = dayjs(a);
  const dateB = dayjs(b);

  if (!dateA.isValid() || !dateB.isValid()) {
    return false;
  }

  return dateA.valueOf() === dateB.valueOf();
};

export const timestampGreaterThan = (a: unknown, b: unknown) => {
  if (typeof a !== 'string' || typeof b !== 'string') {
    return false;
  }

  const dateA = dayjs(a);
  const dateB = dayjs(b);

  if (!dateA.isValid() || !dateB.isValid()) {
    return false;
  }

  return dateA.valueOf() > dateB.valueOf();
};

export const timestampGreaterThanEquals = (a: unknown, b: unknown) => {
  if (typeof a !== 'string' || typeof b !== 'string') {
    return false;
  }

  const dateA = dayjs(a);
  const dateB = dayjs(b);

  if (!dateA.isValid() || !dateB.isValid()) {
    return false;
  }

  return dateA.valueOf() >= dateB.valueOf();
};

export const timestampLessThan = (a: unknown, b: unknown) => {
  if (typeof a !== 'string' || typeof b !== 'string') {
    return false;
  }

  const dateA = dayjs(a);
  const dateB = dayjs(b);

  if (!dateA.isValid() || !dateB.isValid()) {
    return false;
  }

  return dateA.valueOf() < dateB.valueOf();
};

export const timestampLessThanEquals = (a: unknown, b: unknown) => {
  if (typeof a !== 'string' || typeof b !== 'string') {
    return false;
  }

  const dateA = dayjs(a);
  const dateB = dayjs(b);

  if (!dateA.isValid() || !dateB.isValid()) {
    return false;
  }

  return dateA.valueOf() <= dateB.valueOf();
};
