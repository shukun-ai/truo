import { validateQueryFilter } from './validate-query-filter';

describe('validateHttpQuerySchema', () => {
  it('should pass when simple filter.', () => {
    const filter = {
      name: {
        $eq: 'system',
      },
    };

    expect(validateQueryFilter(filter)).toEqual(undefined);
  });

  it('should pass when $or under electron name.', () => {
    const filter = {
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
    };

    expect(validateQueryFilter(filter)).toEqual(undefined);
  });

  it('should pass when $or in top level.', () => {
    const filter = {
      $or: [
        {
          name: 'system',
        },
        {
          age: 30,
        },
      ],
    };

    expect(validateQueryFilter(filter)).toEqual(undefined);
  });

  it('should pass when $or in top level and name and vehicle combined structure.', () => {
    const filter = {
      $or: [
        {
          name: 'system',
          vehicle: {
            $eq: 's',
          },
        },
      ],
    };

    expect(validateQueryFilter(filter)).toEqual(undefined);
  });

  it('should pass when complex or.', () => {
    const filter = {
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
    };

    expect(validateQueryFilter(filter)).toEqual(undefined);
  });

  it('should throw error, when use $set not allowed character.', () => {
    const filter = {
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
    };

    expect(() => validateQueryFilter(filter)).toThrow(
      new Error(`The key is not allowed: $set.`),
    );
  });

  it('should throw error, when the value of $and is not a array.', () => {
    const filter = {
      $and: {
        name: 'system',
        vehicle: {
          $eq: 's',
          $in: ['hi'],
        },
      },
    };

    expect(() => validateQueryFilter(filter)).toThrow(
      new Error(`The value should be a array after '$and' or '$or'.`),
    );
  });
});
