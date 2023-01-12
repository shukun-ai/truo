import { isQueryFilter } from './is-query-filter';

describe('isQueryFilter', () => {
  it('should return true', () => {
    const filter = {
      name: {
        $eq: 'system',
      },
    };

    expect(isQueryFilter(filter)).toEqual(true);
  });

  it('should return false', () => {
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

    expect(isQueryFilter(filter)).toEqual(false);
  });
});
