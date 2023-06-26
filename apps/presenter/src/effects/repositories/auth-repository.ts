import { AuthenticationToken } from '@shukun/schema';
import { IAuthRepository, AuthRepositoryStates } from '@shukun/widget';
import { Observable } from 'rxjs';

import { IAuthStorage } from '../storages/auth-storage.interface';

import { Store } from './store';

export class AuthRepository implements IAuthRepository {
  private state: Store<AuthRepositoryStates>;

  constructor(private readonly authStorage: IAuthStorage) {
    const auth = this.authStorage.get()?.current ?? null;
    this.state = new Store<AuthRepositoryStates>({
      current: auth,
    });
  }

  query(): Observable<AuthRepositoryStates> {
    return this.state.asObservable();
  }

  getValue(): AuthRepositoryStates {
    return this.state.getValue();
  }

  destroy(): void {
    this.state.unsubscribe();
  }

  signIn(token: AuthenticationToken): void {
    this.state.update((previous) => ({
      ...previous,
      current: token,
    }));
    // TODO refactor, remove authStorage, and change to subscribe
    this.authStorage.set({
      current: token,
    });
  }

  signOut(): void {
    this.state.update((previous) => ({
      ...previous,
      current: null,
    }));
    // TODO refactor, remove authStorage, and change to subscribe
    this.authStorage.remove();
  }
}
