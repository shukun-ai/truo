import { Injector } from '@shukun/presenter/definition';
import { AuthenticationToken } from '@shukun/schema';

import { tap } from 'rxjs';

import { getAuthStorage, setAuthStorage } from './auth-storage';

export class Auth {
  constructor(private readonly store: Injector['store']) {
    this.initialize();
    this.listenStateChanged();
  }

  signIn(token: AuthenticationToken): void {
    this.store.update(['auth', 'current'], () => token);
  }

  signOut(): void {
    this.store.update(['auth', 'current'], () => null);
  }

  private initialize() {
    const storage = getAuthStorage();
    this.store.update(['auth', 'current'], () => storage?.current ?? null);
  }

  private listenStateChanged() {
    this.store
      .query(['auth', 'current'])
      .pipe(
        tap((value) => {
          const token = value as unknown as AuthenticationToken;
          setAuthStorage({ current: token });
        }),
      )
      .subscribe();
  }
}
