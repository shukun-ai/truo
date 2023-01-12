export const QUERY_FILTER_ALLOWED_KEYS = [
  '$eq',
  '$ne',
  '$gt',
  '$gte',
  '$lt',
  '$lte',
  '$in',
  '$nin',
  '$and',
  '$or',
  '$foreign',
  '$like',
];

export const validateQueryFilter = (filter: unknown): void => {
  if (typeof filter === 'string') {
    return;
  }

  if (typeof filter === 'number') {
    return;
  }

  if (typeof filter === 'boolean') {
    return;
  }

  if (filter === undefined) {
    return;
  }

  if (filter === null) {
    return;
  }

  if (Array.isArray(filter)) {
    filter.forEach((item) => validateQueryFilter(item));
    return;
  }

  if (typeof filter === 'object') {
    for (const [key, value] of Object.entries(filter as object)) {
      validateAllowedQueryKey(key);
      validateAllowedValue(key, value);
      validateQueryFilter(value);
    }
  }
};

export const validateAllowedQueryKey = (key: string) => {
  if (key.startsWith('$') && !QUERY_FILTER_ALLOWED_KEYS.includes(key)) {
    throw new Error(`The key is not allowed: ${key}.`);
  }
};

export const validateAllowedValue = (key: string, value: unknown) => {
  if (key === '$and' || key === '$or') {
    if (!Array.isArray(value)) {
      throw new Error(`The value should be a array after '$and' or '$or'.`);
    }
  }
};
