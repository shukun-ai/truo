import { AuthenticationToken } from '@shukun/schema';

import { Observable } from 'rxjs';

export interface IAuthRepository {
  currentUser$: Observable<AuthenticationToken | null>;
  signIn(payload: {
    orgName: string;
    username: string;
    password: string;
  }): Promise<void>;
}
