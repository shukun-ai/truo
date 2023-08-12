import { AuthenticationToken } from '@shukun/schema';

export interface IAuthRepository {
  getValue(): AuthRepositoryStates;
  signIn(auth: AuthenticationToken): void;
  signOut(): void;
}

export type AuthRepositoryStates = {
  current: Partial<AuthenticationToken> | null;
};
