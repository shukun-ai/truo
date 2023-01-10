import { inspectTestingValidate } from '../../testing/testing-validate-inspector';
import { HttpQuerySchema } from '../../types/http-query';

import { validateHttpQuerySchema } from './validate';

describe('validateHttpQuerySchema', () => {
  it('should pass when simple filter', () => {
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

  it('should pass when simple filter', () => {
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

  it('should pass when top or filter', () => {
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

  it('should pass when top or filter', () => {
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

  it('should pass when top or filter', () => {
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
