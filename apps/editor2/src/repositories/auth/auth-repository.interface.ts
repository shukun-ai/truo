import { AuthenticationToken } from '@shukun/schema';

import { Observable } from 'rxjs';

export interface IAuthRepository {
  currentUser$: Observable<AuthenticationToken | null>;
  getOrgName(): string | null;
  signIn(payload: {
    orgName: string;
    username: string;
    password: string;
  }): Promise<void>;
  signOut(): void;
}
