import { HttpQuerySchema } from '@shukun/schema';

import { inspectTestingValidate } from '../../testing-helpers/testing-validate-inspector';

import { validateHttpQuerySchema } from './validate-http-query-schema';

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
  });
});
