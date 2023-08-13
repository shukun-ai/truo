import { Injector } from '@shukun/presenter/definition';
import { AuthenticationToken } from '@shukun/schema';

import { tap } from 'rxjs';

import {
  getAuthStorage,
  requesterSessionPayload,
  setAuthStorage,
} from './auth-storage';

export class Auth {
  constructor(private readonly store: Injector['store']) {
    this.initialize();
    this.listenStateChanged();
  }

  signIn(token: AuthenticationToken): void {
    this.store.update(['router'], () => ({
      current: token,
    }));
  }

  signOut(): void {
    this.store.update(['router'], () => ({
      current: null,
    }));
  }

  private initialize() {
    this.store.update(['router'], () => {
      return getAuthStorage();
    });
  }

  private listenStateChanged() {
    this.store
      .query(['router'])
      .pipe(
        tap((value) => {
          setAuthStorage(value as unknown as requesterSessionPayload);
        }),
      )
      .subscribe();
  }
}
