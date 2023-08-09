import { IAuth, IStore, StoreScope } from '@shukun/presenter/definition';
import { AuthenticationToken } from '@shukun/schema';

import { tap } from 'rxjs';

import {
  getAuthStorage,
  requesterSessionPayload,
  setAuthStorage,
} from './auth-storage';

export class Auth implements IAuth {
  constructor(private readonly store: IStore) {
    this.initialize();
    this.listenStateChanged();
  }

  signIn(token: AuthenticationToken): void {
    this.store.update(this.getScope(), [], () => ({
      current: token,
    }));
  }

  signOut(): void {
    this.store.update(this.getScope(), [], () => ({
      current: null,
    }));
  }

  private getScope(): StoreScope {
    return {
      type: 'app',
      containerId: null,
      repositoryId: 'auth',
    };
  }

  private initialize() {
    this.store.update(this.getScope(), [], () => {
      return getAuthStorage();
    });
  }

  private listenStateChanged() {
    this.store
      .query(this.getScope(), [])
      .pipe(
        tap((value) => {
          setAuthStorage(value as unknown as requesterSessionPayload);
        }),
      )
      .subscribe();
  }
}
