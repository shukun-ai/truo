import { get } from 'lodash';
import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';

import { ElementRegister } from './element-register';
import { LowCodeRegister } from './low-code-register';

export class StoreRegister {
  stores = new BehaviorSubject<Record<string, any>>({});

  constructor(
    private readonly lowCodeRegister: LowCodeRegister,
    private readonly elementRegister: ElementRegister,
  ) {
    this.stores.subscribe((value) => {
      // eslint-disable-next-line no-console
      console.log('[store logger]', value);
    });
  }

  public createPageStore(pageName: string) {
    const page = this.lowCodeRegister.getPage(pageName);
    const store: any = {};

    for (const [elementName, element] of Object.entries(page.elements)) {
      //   const elementDefinition = this.elementRegister.getDefinition(elementName);
      store[elementName] = {};
    }

    this.update(store);
  }

  public createSelector(paths: string[]): Observable<any[]> {
    return this.stores.pipe(
      map((state) => {
        return paths.map((path) => get(state, path));
      }, distinctUntilChanged()),
    );
  }

  private update(newValue: any) {
    this.stores.next({
      ...this.stores.getValue(),
      ...newValue,
    });
  }
}
