import { AppRepositoryContext } from '@shukun/widget';
import { createMemoryHistory } from 'history';

import { Store } from '../store/store';

import { RouterRepository } from './router-repository';

describe('RouterRepository', () => {
  const context: AppRepositoryContext = {
    type: 'app',
    repositoryId: 'router',
    store: new Store(),
  };

  describe('Constructor', () => {
    it('should return page home, when /', () => {
      const history = createMemoryHistory({
        initialEntries: ['/presenter/shukun/pda/'],
      });
      const routerRepository = new RouterRepository(context, history);
      const value = routerRepository.getValue();
      expect(value).toEqual({
        app: 'pda',
        orgName: 'shukun',
        page: 'home',
        search: {},
        mode: 'server',
      });
    });

    it('should return page home, when empty', () => {
      const history = createMemoryHistory({
        initialEntries: ['/presenter/shukun/pda'],
      });
      const routerRepository = new RouterRepository(context, history);
      const value = routerRepository.getValue();
      expect(value).toEqual({
        app: 'pda',
        orgName: 'shukun',
        page: 'home',
        search: {},
        mode: 'server',
      });
    });

    it('should return page home, when /home/', () => {
      const history = createMemoryHistory({
        initialEntries: ['/presenter/shukun/pda/home/'],
      });
      const routerRepository = new RouterRepository(context, history);
      const value = routerRepository.getValue();
      expect(value).toEqual({
        app: 'pda',
        orgName: 'shukun',
        page: 'home',
        search: {},
        mode: 'server',
      });
    });

    it('should return page home, when empty with search', () => {
      const history = createMemoryHistory({
        initialEntries: [
          `/presenter/shukun/pda?s=${encodeURIComponent(
            JSON.stringify({ id: 'mock' }),
          )}`,
        ],
      });
      const routerRepository = new RouterRepository(context, history);
      const value = routerRepository.getValue();
      expect(value).toEqual({
        app: 'pda',
        orgName: 'shukun',
        page: 'home',
        search: { id: 'mock' },
        mode: 'server',
      });
    });
  });

  describe('Listen changes', () => {
    it('User can trigger routerRepository to change page.', () => {
      const history = createMemoryHistory({
        initialEntries: ['/presenter/shukun/pda'],
      });
      const routerRepository = new RouterRepository(context, history);
      routerRepository.trigger({ page: 'about', search: { id: 'mock' } });
      expect(history.location.pathname).toEqual('/presenter/shukun/pda/about');
      expect(history.location.search).toEqual(
        `s=${encodeURIComponent(JSON.stringify({ id: 'mock' }))}`,
      );
      const value = routerRepository.getValue();
      expect(value).toEqual({
        app: 'pda',
        orgName: 'shukun',
        page: 'about',
        search: { id: 'mock' },
        mode: 'server',
      });
    });

    it('replace page', () => {
      const history = createMemoryHistory({
        initialEntries: ['/presenter/shukun/pda'],
      });
      const routerRepository = new RouterRepository(context, history);
      routerRepository.trigger({
        action: 'replace',
        page: 'about',
        search: { id: 'mock' },
      });
      expect(history.location.pathname).toEqual('/presenter/shukun/pda/about');
      expect(history.location.search).toEqual(
        `s=${encodeURIComponent(JSON.stringify({ id: 'mock' }))}`,
      );
      const value = routerRepository.getValue();
      expect(value).toEqual({
        app: 'pda',
        orgName: 'shukun',
        page: 'about',
        search: { id: 'mock' },
        mode: 'server',
      });
    });

    it('go back', () => {
      const history = createMemoryHistory({
        initialEntries: [
          '/presenter/shukun/pda/',
          '/presenter/shukun/pda/profile',
        ],
      });
      const routerRepository = new RouterRepository(context, history);
      routerRepository.trigger({
        action: 'pop',
        page: 'about',
        search: { id: 'mock' },
      });
      expect(history.location.pathname).toEqual('/presenter/shukun/pda/');
      expect(history.location.search).toEqual('');
      const value = routerRepository.getValue();
      expect(value).toEqual({
        app: 'pda',
        orgName: 'shukun',
        page: 'home',
        search: {},
        mode: 'server',
      });
    });
  });

  describe('baseUrl', () => {
    it('baseUrl without tail /', () => {
      const history = createMemoryHistory({
        initialEntries: ['/presenter/shukun/pda'],
      });
      const routerRepository = new RouterRepository(context, history);
      expect(routerRepository.getValue()).toEqual({
        orgName: 'shukun',
        app: 'pda',
        page: 'home',
        search: {},
        mode: 'server',
      });

      routerRepository.trigger({ page: 'about' });
      expect(history.location.pathname).toEqual('/presenter/shukun/pda/about');
      expect(routerRepository.getValue()).toEqual({
        orgName: 'shukun',
        app: 'pda',
        page: 'about',
        search: {},
        mode: 'server',
      });
    });
  });

  describe('Listen changes', () => {
    it('When the browser change url.', () => {
      const history = createMemoryHistory({
        initialEntries: ['/presenter/shukun/pda'],
      });
      const routerRepository = new RouterRepository(context, history);
      history.push({
        pathname: '/presenter/shukun/pda/about',
        search: `s=${encodeURIComponent(JSON.stringify({ id: 'mock' }))}`,
      });
      expect(history.location.pathname).toEqual('/presenter/shukun/pda/about');
      expect(history.location.search).toEqual(
        `s=${encodeURIComponent(JSON.stringify({ id: 'mock' }))}`,
      );
      const value = routerRepository.getValue();
      expect(value).toEqual({
        orgName: 'shukun',
        app: 'pda',
        page: 'about',
        search: { id: 'mock' },
        mode: 'server',
      });
    });
  });

  describe('Parse mode', () => {
    it('when mode is local.', () => {
      const history = createMemoryHistory({
        initialEntries: ['/presenter/shukun/pda?mode=local'],
      });
      const routerRepository = new RouterRepository(context, history);
      const value = routerRepository.getValue();
      expect(value).toEqual({
        orgName: 'shukun',
        app: 'pda',
        page: 'home',
        search: {},
        mode: 'local',
      });
    });

    it('when mode is unrecognized.', () => {
      const history = createMemoryHistory({
        initialEntries: ['/presenter/shukun/pda?mode=mock'],
      });
      const routerRepository = new RouterRepository(context, history);
      const value = routerRepository.getValue();
      expect(value).toEqual({
        orgName: 'shukun',
        app: 'pda',
        page: 'home',
        search: {},
        mode: 'server',
      });
    });
  });
});
