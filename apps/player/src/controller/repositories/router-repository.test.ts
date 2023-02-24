import { createMemoryHistory } from 'history';

import { RouterRepository } from './router-repository';

describe('RouterRepository', () => {
  describe('Constructor', () => {
    it('should return page home, when /', () => {
      const history = createMemoryHistory({
        initialEntries: ['/'],
      });
      const routerRepository = new RouterRepository(history);
      const value = routerRepository.getValue();
      expect(value).toEqual({ page: 'home', search: {} });
    });

    it('should return page home, when /home/', () => {
      const history = createMemoryHistory({
        initialEntries: ['/home/'],
      });
      const routerRepository = new RouterRepository(history);
      const value = routerRepository.getValue();
      expect(value).toEqual({ page: 'home', search: {} });
    });

    it('should return page home, when  string', () => {
      const history = createMemoryHistory({
        initialEntries: [''],
      });
      const routerRepository = new RouterRepository(history);
      const value = routerRepository.getValue();
      expect(value).toEqual({ page: 'home', search: {} });
    });

    it('should return page home, when empty with search', () => {
      const history = createMemoryHistory({
        initialEntries: [
          `?s=${encodeURIComponent(JSON.stringify({ id: 'mock' }))}`,
        ],
      });
      const routerRepository = new RouterRepository(history);
      const value = routerRepository.getValue();
      expect(value).toEqual({ page: 'home', search: { id: 'mock' } });
    });
  });

  describe('Listen changes', () => {
    it('User can trigger routerRepository to change page.', () => {
      const history = createMemoryHistory({
        initialEntries: ['/'],
      });
      const routerRepository = new RouterRepository(history);
      routerRepository.trigger({ page: 'about', search: { id: 'mock' } });
      expect(history.location.pathname).toEqual('/about');
      expect(history.location.search).toEqual(
        `s=${encodeURIComponent(JSON.stringify({ id: 'mock' }))}`,
      );
      const value = routerRepository.getValue();
      expect(value).toEqual({ page: 'about', search: { id: 'mock' } });
    });

    it('replace page', () => {
      const history = createMemoryHistory({
        initialEntries: ['/'],
      });
      const routerRepository = new RouterRepository(history);
      routerRepository.trigger({
        action: 'replace',
        page: 'about',
        search: { id: 'mock' },
      });
      expect(history.location.pathname).toEqual('/about');
      expect(history.location.search).toEqual(
        `s=${encodeURIComponent(JSON.stringify({ id: 'mock' }))}`,
      );
      const value = routerRepository.getValue();
      expect(value).toEqual({ page: 'about', search: { id: 'mock' } });
    });

    it('go back', () => {
      const history = createMemoryHistory({
        initialEntries: ['/', '/profile'],
      });
      const routerRepository = new RouterRepository(history);
      routerRepository.trigger({
        action: 'pop',
        page: 'about',
        search: { id: 'mock' },
      });
      expect(history.location.pathname).toEqual('/');
      expect(history.location.search).toEqual('');
      const value = routerRepository.getValue();
      expect(value).toEqual({ page: 'home', search: {} });
    });
  });

  describe('baseUrl', () => {
    it('go back', () => {
      const history = createMemoryHistory({
        initialEntries: ['/shukun/'],
      });
      const routerRepository = new RouterRepository(history, {
        baseUrl: '/shukun',
      });
      routerRepository.trigger({ page: 'about', search: { id: 'mock' } });
      expect(history.location.pathname).toEqual('/shukun/about');
      expect(history.location.search).toEqual(
        `s=${encodeURIComponent(JSON.stringify({ id: 'mock' }))}`,
      );
      const value = routerRepository.getValue();
      expect(value).toEqual({ page: 'about', search: { id: 'mock' } });
    });
  });

  describe('Listen changes', () => {
    it('When the browser change url.', () => {
      const history = createMemoryHistory({
        initialEntries: ['/'],
      });
      const routerRepository = new RouterRepository(history);
      history.push({
        pathname: '/about',
        search: `s=${encodeURIComponent(JSON.stringify({ id: 'mock' }))}`,
      });
      expect(history.location.pathname).toEqual('/about');
      expect(history.location.search).toEqual(
        `s=${encodeURIComponent(JSON.stringify({ id: 'mock' }))}`,
      );
      const value = routerRepository.getValue();
      expect(value).toEqual({ page: 'about', search: { id: 'mock' } });
    });
  });
});
