import { TypeException } from '@shukun/exception';
import { Injector, RouterState } from '@shukun/presenter/definition';

import { IHistory } from './history.interface';
import { parseLocation } from './parse-location';

export class Router {
  SEARCH_PREFIX = 's';

  constructor(
    private readonly store: Injector['store'],
    private readonly history: IHistory,
  ) {
    this.initialize();
    this.listenHistoryChanged();
  }

  private initialize(): void {
    const state = parseLocation(this.history.location);
    this.updateStore(state);
  }

  private listenHistoryChanged(): void {
    this.history.listen(({ location }) => {
      const state = parseLocation(location);
      this.updateStore(state);
    });
  }

  private updateStore(state: RouterState): void {
    this.store.update(['router'], () => state);
  }

  go(payload: { page?: string; search?: Record<string, unknown> }): void {
    const { page, search } = payload;
    const pathname = page ? this.buildPathname(page) : undefined;
    const historySearch = search ? this.buildSearch(search) : undefined;
    this.history.push({ pathname, search: historySearch });
  }

  replace(payload: { page?: string; search?: Record<string, unknown> }): void {
    const { page, search } = payload;
    const pathname = page ? this.buildPathname(page) : undefined;
    const historySearch = search ? this.buildSearch(search) : undefined;
    this.history.replace({ pathname, search: historySearch });
  }

  back(): void {
    this.history.go(-1);
  }

  private stringifyHistorySearch(search: Record<string, unknown>): string {
    const json = JSON.stringify(search);
    const params = new URLSearchParams();
    params.append(this.SEARCH_PREFIX, json);
    return params.toString();
  }

  private buildPathname(page: string): string {
    const value = this.store.getValue(['router']) as RouterState | undefined;
    if (!value) {
      throw new TypeException('The router state is not found.');
    }
    return `/presenter/${value.orgName}/${value.app}/${page}`;
  }

  private buildSearch(search: Record<string, unknown>): string {
    return this.stringifyHistorySearch(search);
  }
}
