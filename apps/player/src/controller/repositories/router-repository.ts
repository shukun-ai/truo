import { TypeException } from '@shukun/exception';
import { History, Location } from 'history';
import { BehaviorSubject, Observable } from 'rxjs';

import { IRepository } from '../../repository/repository.interface';

export type RouterField = {
  page: string;
  search: Record<string, unknown>;
};

export type RouterRepositoryOptions = {
  baseUrl: string;
};

export class RouterRepository implements IRepository {
  private HOME_PAGE = 'home';

  private internalStates: BehaviorSubject<RouterField>;

  private options: RouterRepositoryOptions = {
    baseUrl: '',
  };

  constructor(
    private readonly history: History,
    readonly configOptions?: Partial<RouterRepositoryOptions>,
  ) {
    Object.assign(this.options, configOptions);
    this.internalStates = new BehaviorSubject<RouterField>(
      this.parseLocation(this.history.location),
    );
    this.listenHistoryChanges();
  }

  query(): Observable<RouterField> {
    return this.internalStates;
  }

  getValue(): unknown {
    return this.internalStates.getValue();
  }

  setValue(): void {
    throw new TypeException('Did not support update value');
  }

  resetValue(): void {
    throw new TypeException('Did not support reset value');
  }

  destroy(): void {
    this.internalStates.unsubscribe();
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
      this.internalStates.next(this.parseLocation(location));
    });
  }

  private parseLocation(location: Location): RouterField {
    return {
      page: this.parsePathname(location.pathname),
      search: this.parseHistorySearch(location.search),
    };
  }

  private parsePathname(pathname: string) {
    if (pathname === `${this.options.baseUrl}/`) {
      return this.HOME_PAGE;
    }
    if (pathname.startsWith(`${this.options.baseUrl}/`)) {
      const end = pathname.endsWith('/')
        ? pathname.length - 1
        : pathname.length;
      return pathname.substring(this.options.baseUrl.length + 1, end);
    }
    throw new TypeException(
      'Did not support this pathname to page: {{pathname}}',
      { pathname },
    );
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

  private stringifyHistorySearch(search: Record<string, unknown>): string {
    const json = JSON.stringify(search);
    const params = new URLSearchParams();
    params.append('s', json);
    return params.toString();
  }

  private buildPathname(page: string): string {
    return `${this.options.baseUrl}/${page}`;
  }

  private buildSearch(search: Record<string, unknown>): string {
    return this.stringifyHistorySearch(search);
  }
}
