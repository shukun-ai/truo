import { AuthenticationToken } from '@shukun/schema';
import { Observable } from 'rxjs';

import { IRepository } from './repository.interface';

export interface IAuthRepository extends IRepository {
  query(): Observable<AuthRepositoryStates>;
  getValue(): AuthRepositoryStates;
  trigger(): void;
  signIn(auth: AuthenticationToken): void;
  signOut(): void;
}

export type AuthRepositoryStates = {
  current: Partial<AuthenticationToken> | null;
};
