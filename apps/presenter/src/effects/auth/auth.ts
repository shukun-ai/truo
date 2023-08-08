import { IAuth, IStore, StoreScope } from '@shukun/presenter/definition';
import { AuthenticationToken } from '@shukun/schema';

export class Auth implements IAuth {
  constructor(private readonly store: IStore) {}

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
}
