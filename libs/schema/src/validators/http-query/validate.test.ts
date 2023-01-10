import { inspectTestingValidate } from '../../testing/testing-validate-inspector';
import { HttpQuerySchema } from '../../types/http-query-override';

import { validateHttpQuerySchema, validateQueryFilter } from './validate';

describe('validateHttpQuerySchema', () => {
  it('should pass when simple filter.', () => {
    const query: HttpQuerySchema = {
      filter: {
        name: {
          $eq: 'system',
        },
      },
      limit: 10,
    };
    const result = validateHttpQuerySchema(query);
    expect(result).toEqual(true);

    expect(validateQueryFilter(query)).toEqual(undefined);
  });

  it('should pass when $or under electron name.', () => {
    const query: HttpQuerySchema = {
      filter: {
        name: {
          $or: [
            {
              name: { $eq: 'system' },
            },
            {
              label: { $eq: 'hello' },
            },
          ],
        },
      },
      limit: 10,
    };
    const result = validateHttpQuerySchema(query);
    expect(result).toEqual(true);

    expect(validateQueryFilter(query)).toEqual(undefined);
  });

  it('should pass when $or in top level.', () => {
    const query: HttpQuerySchema = {
      filter: {
        $or: [
          {
            name: 'system',
          },
          {
            age: 30,
          },
        ],
      },
      limit: 10,
    };
    const result = validateHttpQuerySchema(query);
    inspectTestingValidate(result, validateHttpQuerySchema);
    expect(result).toEqual(true);

    expect(validateQueryFilter(query)).toEqual(undefined);
  });

  it('should pass when $or in top level and name and vehicle combined structure.', () => {
    const query: HttpQuerySchema = {
      filter: {
        $or: [
          {
            name: 'system',
            vehicle: {
              $eq: 's',
            },
          },
        ],
      },
      limit: 10,
    };

    const result = validateHttpQuerySchema(query);
    inspectTestingValidate(result, validateHttpQuerySchema);
    expect(result).toEqual(true);

    expect(validateQueryFilter(query)).toEqual(undefined);
  });

  it('should pass when complex or.', () => {
    const query: HttpQuerySchema = {
      filter: {
        $or: [
          {
            name: 'system',
            vehicle: {
              $eq: 's',
              $in: ['hi'],
            },
          },
          {
            age: 30,
          },
        ],
      },
      limit: 10,
    };

    const result = validateHttpQuerySchema(query);
    inspectTestingValidate(result, validateHttpQuerySchema);
    expect(result).toEqual(true);

    expect(validateQueryFilter(query)).toEqual(undefined);
  });

  it('should throw error, when use $set not allowed character.', () => {
    const query: HttpQuerySchema = {
      filter: {
        $set: [
          {
            name: 'system',
            vehicle: {
              $eq: 's',
              $in: ['hi'],
            },
          },
          {
            age: 30,
          },
        ],
      },
      limit: 10,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    expect(() => validateQueryFilter(query)).toThrow(
      new Error(`The key is not allowed: $set.`),
    );
  });

  it('should throw error, when the value of $and is not a array.', () => {
    const query: HttpQuerySchema = {
      filter: {
        $and: {
          name: 'system',
          vehicle: {
            $eq: 's',
            $in: ['hi'],
          },
        },
      },
      limit: 10,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    expect(() => validateQueryFilter(query)).toThrow(
      new Error(`The value should be a array after '$and' or '$or'.`),
    );
  });
});
