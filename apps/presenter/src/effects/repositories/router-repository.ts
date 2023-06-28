import { TypeException } from '@shukun/exception';
import {
  AppRepositoryContext,
  RouterMode,
  RouterRepositoryStates,
} from '@shukun/widget';
import { History, Location } from 'history';

import { AppRepository } from './abstract/app-repository';

export class RouterRepository extends AppRepository<RouterRepositoryStates> {
  constructor(
    override readonly context: AppRepositoryContext,
    private readonly history: History,
  ) {
    super(context);
    const state = this.parseLocation(this.history.location);
    this.initializeValue(state);
    this.listenHistoryChanges();
  }

  getValue(): RouterRepositoryStates {
    return this.getState();
  }

  trigger(payload: {
    action?: 'push' | 'pop' | 'replace';
    page?: string;
    search?: Record<string, unknown>;
  }): void {
    const { action, page, search } = payload;
    const pathname = page ? this.buildPathname(page) : undefined;
    const historySearch = search ? this.buildSearch(search) : undefined;

    switch (action) {
      case 'pop':
        this.history.go(-1);
        break;
      case 'replace':
        this.history.replace({ pathname, search: historySearch });
        break;
      case 'push':
      default:
        this.history.push({ pathname, search: historySearch });
        break;
    }
  }

  private listenHistoryChanges() {
    this.history.listen(({ location }) => {
      const state = this.parseLocation(location);
      this.initializeValue(state);
    });
  }

  private parseLocation(location: Location): RouterRepositoryStates {
    const { appName, orgName, pageName } = this.parsePathname(
      location.pathname,
    );
    return {
      app: appName,
      orgName: orgName,
      page: pageName,
      search: this.parseHistorySearch(location.search),
      mode: this.parseHistoryMode(location.search),
    };
  }

  private parsePathname(pathname: string) {
    if (!pathname.startsWith('/presenter/')) {
      throw new TypeException('The pathname should be starts with /presenter/');
    }
    const [, , orgName, appName, pageName] = pathname.split('/');

    if (!orgName || !appName) {
      throw new TypeException('The orgName or appName is not includes in url.');
    }

    const computedPageName = pageName ? pageName : 'home';

    return {
      orgName,
      appName,
      pageName: computedPageName,
    };
  }

  private parseHistorySearch(search: string): Record<string, unknown> {
    const params = new URLSearchParams(search);
    const json = params.get('s');
    if (!json) {
      return {};
    }
    try {
      return JSON.parse(json);
    } catch {
      console.error('search JSON parse wrong.');
      return {};
    }
  }

  private parseHistoryMode(search: string): RouterMode {
    const params = new URLSearchParams(search);
    const mode = params.get('mode') as unknown as RouterMode;

    if (Object.values(RouterMode).includes(mode)) {
      return mode;
    } else {
      return RouterMode.Server;
    }
  }

  private stringifyHistorySearch(search: Record<string, unknown>): string {
    const json = JSON.stringify(search);
    const params = new URLSearchParams();
    params.append('s', json);
    return params.toString();
  }

  private buildPathname(page: string): string {
    const value = this.getValue();
    return `/presenter/${value.orgName}/${value.app}/${page}`;
  }

  private buildSearch(search: Record<string, unknown>): string {
    return this.stringifyHistorySearch(search);
  }
}
