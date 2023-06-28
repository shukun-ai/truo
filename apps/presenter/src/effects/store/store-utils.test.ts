import { getByScope, setByScope } from './store-utils';

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

  describe('getByScope', () => {
    it('should return about when getByScope app.router.page', () => {
      const value = getByScope(
        state,
        { type: 'app', containerId: null, repositoryId: 'router' },
        ['page'],
      );
      expect(value).toEqual('about');
    });

    it('should return undefined when getByScope app.context.page', () => {
      const value = getByScope(
        state,
        { type: 'app', containerId: null, repositoryId: 'context' },
        ['page'],
      );
      expect(value).toEqual(undefined);
    });

    it('should return undefined when getByScope app.auth.userId', () => {
      const value = getByScope(
        state,
        { type: 'app', containerId: null, repositoryId: 'auth' },
        ['userId'],
      );
      expect(value).toEqual(undefined);
    });

    it('should return "Please search" when getByScope container.about.searchForm.title', () => {
      const value = getByScope(
        state,
        { type: 'container', containerId: 'about', repositoryId: 'searchForm' },
        ['title'],
      );
      expect(value).toEqual('Please search');
    });

    it('should return "Number" when getByScope container.about.searchList.0.label', () => {
      const value = getByScope(
        state,
        { type: 'container', containerId: 'about', repositoryId: 'searchList' },
        ['0', 'label'],
      );
      expect(value).toEqual('Number');
    });
  });

  describe('setByScope', () => {
    it('should setByScope home when setByScope app.router.page', () => {
      setByScope(
        state,
        { type: 'app', containerId: null, repositoryId: 'router' },
        ['page'],
        'home',
      );
      const value = getByScope(
        state,
        { type: 'app', containerId: null, repositoryId: 'router' },
        ['page'],
      );
      expect(value).toEqual('home');
    });

    it('should return undefined when getByScope app.context.page', () => {
      setByScope(
        state,
        { type: 'app', containerId: null, repositoryId: 'context' },
        ['page'],
        'mock',
      );
      const value = getByScope(
        state,
        { type: 'app', containerId: null, repositoryId: 'context' },
        ['page'],
      );
      expect(value).toEqual('mock');
    });

    it('should return undefined when getByScope app.auth.userId', () => {
      setByScope(
        state,
        { type: 'app', containerId: null, repositoryId: 'auth' },
        ['userId'],
        'U001',
      );
      const value = getByScope(
        state,
        { type: 'app', containerId: null, repositoryId: 'auth' },
        ['userId'],
      );
      expect(value).toEqual('U001');
    });

    it('should return "Please search" when getByScope container.about.searchForm.title', () => {
      setByScope(
        state,
        { type: 'container', containerId: 'about', repositoryId: 'searchForm' },
        ['title'],
        'Please subscribe',
      );
      const value = getByScope(
        state,
        { type: 'container', containerId: 'about', repositoryId: 'searchForm' },
        ['title'],
      );
      expect(value).toEqual('Please subscribe');
    });

    it('should return "Number" when getByScope container.about.searchList.0.label', () => {
      setByScope(
        state,
        { type: 'container', containerId: 'about', repositoryId: 'searchList' },
        ['0', 'label'],
        'Code',
      );
      const value = getByScope(
        state,
        { type: 'container', containerId: 'about', repositoryId: 'searchList' },
        ['0', 'label'],
      );
      expect(value).toEqual('Code');
    });
  });
});
