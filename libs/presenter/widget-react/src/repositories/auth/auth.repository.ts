import { RepositoryContext } from '@shukun/presenter/definition';

export class AuthRepository {
  constructor(private readonly context: RepositoryContext) {}

  signOut(): void {
    this.context.auth.signOut();
  }
}
