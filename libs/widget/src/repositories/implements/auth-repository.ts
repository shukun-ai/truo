import { AuthenticationToken } from '@shukun/schema';

import { AuthRepositoryStates } from '../../interfaces/auth-repository.interface';
import { RepositoryContext } from '../../interfaces/repository.interface';
import { BaseRepository } from '../abstracts/base-repository';

export class AuthRepository extends BaseRepository<AuthRepositoryStates> {
  constructor(override readonly context: RepositoryContext) {
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
