import { TypeException } from '@shukun/exception';
import { AuthenticationToken } from '@shukun/schema';
import { IAuthRepository, AuthRepositoryStates } from '@shukun/widget';
import { BehaviorSubject, Observable } from 'rxjs';

import { IAuthStorage } from '../storages/auth-storage.interface';

export class AuthRepository implements IAuthRepository {
  readonly type = 'Auth';

  private states: BehaviorSubject<AuthRepositoryStates>;

  constructor(private readonly authStorage: IAuthStorage) {
    const auth = this.authStorage.get()?.current ?? null;
    this.states = new BehaviorSubject<AuthRepositoryStates>({
      current: auth,
    });
  }

  query(): Observable<AuthRepositoryStates> {
    return this.states;
  }

  getValue(): AuthRepositoryStates {
    return this.states.getValue();
  }

  setValue(): void {
    throw new TypeException(
      'We did not support setValue for UserRepository for Security.',
    );
  }

  resetValue(): void {
    throw new TypeException(
      'We did not support resetValue for UserRepository for Security.',
    );
  }

  destroy(): void {
    this.states.unsubscribe();
  }

  trigger(): void {
    throw new TypeException(
      'We did not support trigger for UserRepository for Security.',
    );
  }

  signIn(token: AuthenticationToken): void {
    this.states.next({
      ...this.states.getValue(),
      current: token,
    });
    this.authStorage.set({
      current: token,
    });
  }

  signOut(): void {
    this.states.next({
      ...this.states.getValue(),
      current: null,
    });
    this.authStorage.remove();
  }
}
