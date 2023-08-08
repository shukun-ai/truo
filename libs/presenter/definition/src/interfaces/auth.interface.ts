import { AuthenticationToken } from '@shukun/schema';

export interface IAuth {
  signIn(auth: AuthenticationToken): void;
  signOut(): void;
}

export type AuthStates = {
  current: Partial<AuthenticationToken> | null;
};
