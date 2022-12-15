import { BehaviorSubject } from 'rxjs';

export type SandboxStore = Record<string, unknown>;

export class ObservableStore {
  protected store = new BehaviorSubject<SandboxStore>({});

  getStore() {
    return this.store.getValue();
  }

  setStore(key: string, value: unknown) {
    this.store.next({
      ...this.store.getValue(),
      [key]: value,
    });
  }

  subscribe(observer: (value: SandboxStore) => void) {
    return this.store.subscribe(observer);
  }
}
