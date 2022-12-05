import { formatSort } from './helper';

describe('helper.test.ts', () => {
  it('formatSort descend', () => {
    const output = formatSort({
      name: 'descend',
    });
    expect(output).toEqual({
      name: 'desc',
    });
  });

  it('formatSort ascend', () => {
    const output = formatSort({
      name: 'ascend',
    });
    expect(output).toEqual({
      name: 'asc',
    });
  });
});
