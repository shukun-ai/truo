import { get, set } from './store-utils';

describe('store-util', () => {
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
          searchList: [
            {
              label: 'Number',
            },
          ],
        },
      },
    };
  });

  describe('get', () => {
    it('should return about when get app.router.page', () => {
      const value = get(
        state,
        { type: 'app', containerId: null, repositoryId: 'router' },
        ['page'],
      );
      expect(value).toEqual('about');
    });

    it('should return undefined when get app.context.page', () => {
      const value = get(
        state,
        { type: 'app', containerId: null, repositoryId: 'context' },
        ['page'],
      );
      expect(value).toEqual(undefined);
    });

    it('should return undefined when get app.auth.userId', () => {
      const value = get(
        state,
        { type: 'app', containerId: null, repositoryId: 'auth' },
        ['userId'],
      );
      expect(value).toEqual(undefined);
    });

    it('should return "Please search" when get container.about.searchForm.title', () => {
      const value = get(
        state,
        { type: 'container', containerId: 'about', repositoryId: 'searchForm' },
        ['title'],
      );
      expect(value).toEqual('Please search');
    });

    it('should return "Number" when get container.about.searchList.0.label', () => {
      const value = get(
        state,
        { type: 'container', containerId: 'about', repositoryId: 'searchList' },
        ['0', 'label'],
      );
      expect(value).toEqual('Number');
    });
  });

  describe('set', () => {
    it('should set home when set app.router.page', () => {
      set(
        state,
        { type: 'app', containerId: null, repositoryId: 'router' },
        ['page'],
        'home',
      );
      const value = get(
        state,
        { type: 'app', containerId: null, repositoryId: 'router' },
        ['page'],
      );
      expect(value).toEqual('home');
    });

    it('should return undefined when get app.context.page', () => {
      set(
        state,
        { type: 'app', containerId: null, repositoryId: 'context' },
        ['page'],
        'mock',
      );
      const value = get(
        state,
        { type: 'app', containerId: null, repositoryId: 'context' },
        ['page'],
      );
      expect(value).toEqual('mock');
    });

    it('should return undefined when get app.auth.userId', () => {
      set(
        state,
        { type: 'app', containerId: null, repositoryId: 'auth' },
        ['userId'],
        'U001',
      );
      const value = get(
        state,
        { type: 'app', containerId: null, repositoryId: 'auth' },
        ['userId'],
      );
      expect(value).toEqual('U001');
    });

    it('should return "Please search" when get container.about.searchForm.title', () => {
      set(
        state,
        { type: 'container', containerId: 'about', repositoryId: 'searchForm' },
        ['title'],
        'Please subscribe',
      );
      const value = get(
        state,
        { type: 'container', containerId: 'about', repositoryId: 'searchForm' },
        ['title'],
      );
      expect(value).toEqual('Please subscribe');
    });

    it('should return "Number" when get container.about.searchList.0.label', () => {
      set(
        state,
        { type: 'container', containerId: 'about', repositoryId: 'searchList' },
        ['0', 'label'],
        'Code',
      );
      const value = get(
        state,
        { type: 'container', containerId: 'about', repositoryId: 'searchList' },
        ['0', 'label'],
      );
      expect(value).toEqual('Code');
    });
  });
});
