import { formatSortToQueryString } from './helper';

describe('helper.test.ts', () => {
  it('formatSortToQueryString descend', () => {
    const output = formatSortToQueryString({
      name: 'descend',
    });
    expect(output).toEqual('-name');
  });

  it('formatSortToQueryString ascend', () => {
    const output = formatSortToQueryString({
      name: 'ascend',
    });
    expect(output).toEqual('name');
  });
});
