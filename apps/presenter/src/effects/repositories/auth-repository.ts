import { AuthenticationToken } from '@shukun/schema';
import { AuthRepositoryStates, AppRepositoryContext } from '@shukun/widget';

import { IAuthStorage } from '../storages/auth-storage.interface';

import { AppRepository } from './abstract/app-repository';

export class AuthRepository extends AppRepository<AuthRepositoryStates> {
  constructor(
    override readonly context: AppRepositoryContext,
    private readonly authStorage: IAuthStorage,
  ) {
    super(context);
    const auth = this.authStorage.get()?.current ?? null;
    this.initializeValue({
      current: auth,
    });
  }

  getValue(): AuthRepositoryStates {
    return this.getState();
  }

  signIn(token: AuthenticationToken): void {
    this.updateValue((draft) => (draft.current = token));
    // TODO refactor, remove authStorage, and change to subscribe
    this.authStorage.set({
      current: token,
    });
  }

  signOut(): void {
    this.updateValue((draft) => (draft.current = null));
    // TODO refactor, remove authStorage, and change to subscribe
    this.authStorage.remove();
  }
}
