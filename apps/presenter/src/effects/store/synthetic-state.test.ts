import { getSyntheticState } from './synthetic-state';

describe('synthetic-state', () => {
  let state: unknown = {};

  beforeEach(() => {
    state = {
      app: {
        router: {
          page: 'about',
        },
        auth: null,
      },
      container: {
        about: {
          searchForm: {
            title: 'Please search',
          },
        },
        home: {
          searchList: [
            {
              label: 'Number',
            },
          ],
        },
      },
    };
  });

  it('should ', () => {
    const syntheticState = getSyntheticState(state, 'about');
    expect(syntheticState).toEqual({
      router: {
        page: 'about',
      },
      auth: null,
      searchForm: {
        title: 'Please search',
      },
    });
  });
});
