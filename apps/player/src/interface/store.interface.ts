import { Subscription } from 'rxjs';

export interface IStore {
  register(storeName: string): void;
  subscribe(expression: string): Subscription;
}
