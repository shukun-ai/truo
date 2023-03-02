import { createMemoryHistory } from 'history';

import { RouterRepository } from './router-repository';

describe('RouterRepository', () => {
  describe('Constructor', () => {
    it('should return page home, when /', () => {
      const history = createMemoryHistory({
        initialEntries: ['/player/shukun/pda/'],
      });
      const routerRepository = new RouterRepository(history);
      const value = routerRepository.getValue();
      expect(value).toEqual({
        app: 'pda',
        orgName: 'shukun',
        page: 'home',
        search: {},
      });
    });

    it('should return page home, when empty', () => {
      const history = createMemoryHistory({
        initialEntries: ['/player/shukun/pda'],
      });
      const routerRepository = new RouterRepository(history);
      const value = routerRepository.getValue();
      expect(value).toEqual({
        app: 'pda',
        orgName: 'shukun',
        page: 'home',
        search: {},
      });
    });

    it('should return page home, when /home/', () => {
      const history = createMemoryHistory({
        initialEntries: ['/player/shukun/pda/home/'],
      });
      const routerRepository = new RouterRepository(history);
      const value = routerRepository.getValue();
      expect(value).toEqual({
        app: 'pda',
        orgName: 'shukun',
        page: 'home',
        search: {},
      });
    });

    it('should return page home, when empty with search', () => {
      const history = createMemoryHistory({
        initialEntries: [
          `/player/shukun/pda?s=${encodeURIComponent(
            JSON.stringify({ id: 'mock' }),
          )}`,
        ],
      });
      const routerRepository = new RouterRepository(history);
      const value = routerRepository.getValue();
      expect(value).toEqual({
        app: 'pda',
        orgName: 'shukun',
        page: 'home',
        search: { id: 'mock' },
      });
    });
  });

  describe('Listen changes', () => {
    it('User can trigger routerRepository to change page.', () => {
      const history = createMemoryHistory({
        initialEntries: ['/player/shukun/pda'],
      });
      const routerRepository = new RouterRepository(history);
      routerRepository.trigger({ page: 'about', search: { id: 'mock' } });
      expect(history.location.pathname).toEqual('/player/shukun/pda/about');
      expect(history.location.search).toEqual(
        `s=${encodeURIComponent(JSON.stringify({ id: 'mock' }))}`,
      );
      const value = routerRepository.getValue();
      expect(value).toEqual({
        app: 'pda',
        orgName: 'shukun',
        page: 'about',
        search: { id: 'mock' },
      });
    });

    it('replace page', () => {
      const history = createMemoryHistory({
        initialEntries: ['/player/shukun/pda'],
      });
      const routerRepository = new RouterRepository(history);
      routerRepository.trigger({
        action: 'replace',
        page: 'about',
        search: { id: 'mock' },
      });
      expect(history.location.pathname).toEqual('/player/shukun/pda/about');
      expect(history.location.search).toEqual(
        `s=${encodeURIComponent(JSON.stringify({ id: 'mock' }))}`,
      );
      const value = routerRepository.getValue();
      expect(value).toEqual({
        app: 'pda',
        orgName: 'shukun',
        page: 'about',
        search: { id: 'mock' },
      });
    });

    it('go back', () => {
      const history = createMemoryHistory({
        initialEntries: ['/player/shukun/pda/', '/player/shukun/pda/profile'],
      });
      const routerRepository = new RouterRepository(history);
      routerRepository.trigger({
        action: 'pop',
        page: 'about',
        search: { id: 'mock' },
      });
      expect(history.location.pathname).toEqual('/player/shukun/pda/');
      expect(history.location.search).toEqual('');
      const value = routerRepository.getValue();
      expect(value).toEqual({
        app: 'pda',
        orgName: 'shukun',
        page: 'home',
        search: {},
      });
    });
  });

  describe('baseUrl', () => {
    it('baseUrl without tail /', () => {
      const history = createMemoryHistory({
        initialEntries: ['/player/shukun/pda'],
      });
      const routerRepository = new RouterRepository(history);
      expect(routerRepository.getValue()).toEqual({
        orgName: 'shukun',
        app: 'pda',
        page: 'home',
        search: {},
      });

      routerRepository.trigger({ page: 'about' });
      expect(history.location.pathname).toEqual('/player/shukun/pda/about');
      expect(routerRepository.getValue()).toEqual({
        orgName: 'shukun',
        app: 'pda',
        page: 'about',
        search: {},
      });
    });
  });

  describe('Listen changes', () => {
    it('When the browser change url.', () => {
      const history = createMemoryHistory({
        initialEntries: ['/player/shukun/pda'],
      });
      const routerRepository = new RouterRepository(history);
      history.push({
        pathname: '/player/shukun/pda/about',
        search: `s=${encodeURIComponent(JSON.stringify({ id: 'mock' }))}`,
      });
      expect(history.location.pathname).toEqual('/player/shukun/pda/about');
      expect(history.location.search).toEqual(
        `s=${encodeURIComponent(JSON.stringify({ id: 'mock' }))}`,
      );
      const value = routerRepository.getValue();
      expect(value).toEqual({
        orgName: 'shukun',
        app: 'pda',
        page: 'about',
        search: { id: 'mock' },
      });
    });
  });
});
