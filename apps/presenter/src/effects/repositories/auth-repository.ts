import { AuthenticationToken } from '@shukun/schema';
import { AuthRepositoryStates, AppRepositoryContext } from '@shukun/widget';

import { AppRepository } from './abstract/app-repository';

export class AuthRepository extends AppRepository<AuthRepositoryStates> {
  constructor(override readonly context: AppRepositoryContext) {
    super(context);
    this.initializeValue({
      current: null,
    });
  }

  getValue(): AuthRepositoryStates {
    return this.getState();
  }

  signIn(token: AuthenticationToken): void {
    this.updateValue((draft) => (draft.current = token));
  }

  signOut(): void {
    this.updateValue((draft) => (draft.current = null));
  }
}
