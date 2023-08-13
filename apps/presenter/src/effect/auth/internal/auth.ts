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
    this.store.update(['auth', 'current'], () => ({
      current: token,
    }));
  }

  signOut(): void {
    this.store.update(['auth', 'current'], () => ({
      current: null,
    }));
  }

  private initialize() {
    this.store.update(['auth', 'current'], () => {
      return getAuthStorage();
    });
  }

  private listenStateChanged() {
    this.store
      .query(['auth', 'current'])
      .pipe(
        tap((value) => {
          setAuthStorage(value as unknown as requesterSessionPayload);
        }),
      )
      .subscribe();
  }
}
