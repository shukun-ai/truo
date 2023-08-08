import {
  AuthRepositoryStates,
  RepositoryContext,
} from '@shukun/presenter/definition';
import { AuthenticationToken } from '@shukun/schema';

import { BaseRepository } from '../base-repository';

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
    this.context.store.update(this.getScope(), [], () => ({
      current: token,
    }));
  }

  signOut(): void {
    this.context.store.update(this.getScope(), [], () => ({
      current: null,
    }));
  }
}
