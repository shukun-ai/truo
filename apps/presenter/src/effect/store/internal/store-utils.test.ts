import { get, set } from './store-utils';

describe('store-util', () => {
  let state: unknown = {};

  beforeEach(() => {
    state = {
      router: {
        page: 'about',
      },
      auth: null,
      searchForm: {
        title: 'Please search',
      },
      searchList: [
        {
          label: 'Number',
        },
      ],
    };
  });

  describe('get', () => {
    it('should return about when get router.page', () => {
      const value = get(state, ['router', 'page']);
      expect(value).toEqual('about');
    });

    it('should return undefined when get context.page', () => {
      const value = get(state, ['context', 'page']);
      expect(value).toEqual(undefined);
    });
  });

  describe('set', () => {
    it('should setByScope home when set router.page', () => {
      const newState = set(state, ['router', 'page'], 'home');
      const value = get(newState, ['router', 'page']);
      expect(value).toEqual('home');
    });

    it('should return undefined when set context.page', () => {
      const newState = set(state, ['context', 'page'], 'mock');
      const value = get(newState, ['context', 'page']);
      expect(value).toEqual('mock');
    });
  });
});
