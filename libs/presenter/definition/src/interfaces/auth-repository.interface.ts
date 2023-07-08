import { AuthenticationToken } from '@shukun/schema';

import { IRepository } from './repository.interface';

export interface IAuthRepository extends IRepository {
  getValue(): AuthRepositoryStates;
  signIn(auth: AuthenticationToken): void;
  signOut(): void;
}

export type AuthRepositoryStates = {
  current: Partial<AuthenticationToken> | null;
};
