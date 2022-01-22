import { resetStores } from '@datorama/akita';
import dayjs from 'dayjs';

import { signIn, SignInData } from '../../models/session';

import { sessionStore } from './store';

class SessionService {
  async signIn(data: SignInData) {
    const response = await signIn(data);

    const { userId, username, orgName, orgId, accessToken, expiresIn } =
      response.data.value;

    sessionStore.update(({ auth }) => ({
      auth: {
        ...auth,
        userId,
        username,
        orgName,
        orgId,
        accessToken,
        expiresTimestamp: dayjs().add(expiresIn, 'ms').valueOf(),
      },
    }));
  }

  async signOut() {
    resetStores();
  }

  getSessionValidAuth() {
    const session = sessionStore.getValue();

    if (!session.auth) {
      return null;
    }

    if (dayjs().valueOf() > session.auth.expiresTimestamp) {
      return null;
    }

    return session.auth;
  }

  getOrgName(): string | null {
    const auth = this.getSessionValidAuth();

    if (!auth) {
      sessionStore.update(({ freshedAt }) => {
        new Date();
      });
      return null;
    } else {
      return auth.orgName;
    }
  }
}

export const sessionService = new SessionService();
