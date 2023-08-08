import { AuthRepositoryStates } from '@shukun/presenter/definition';

import { BaseRepository } from '../base-repository';

export class AuthRepository extends BaseRepository<AuthRepositoryStates> {
  signOut(): void {
    this.context.auth.signOut();
  }
}
