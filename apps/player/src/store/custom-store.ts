import { Subscription } from 'rxjs';

import { IStore } from '../interface/store.interface';

export class CustomStore implements IStore {
  register(storeName: string): void {
    throw new Error();
  }
  subscribe(expression: string): Subscription {
    throw new Error();
  }
}
