import { getStorePath, setStorePath } from './store-path';

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
      const value = getStorePath(state, ['router', 'page']);
      expect(value).toEqual('about');
    });

    it('should return undefined when get context.page', () => {
      const value = getStorePath(state, ['context', 'page']);
      expect(value).toEqual(undefined);
    });
  });

  describe('set', () => {
    it('should setByScope home when set router.page', () => {
      const newState = setStorePath(state, ['router', 'page'], 'home');
      const value = getStorePath(newState, ['router', 'page']);
      expect(value).toEqual('home');
    });

    it('should return undefined when set context.page', () => {
      const newState = setStorePath(state, ['context', 'page'], 'mock');
      const value = getStorePath(newState, ['context', 'page']);
      expect(value).toEqual('mock');
    });
  });
});
