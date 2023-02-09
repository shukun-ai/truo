import { resetStores } from '@datorama/akita';
import dayjs from 'dayjs';

import { publicRequester } from '../../apis/requester';

import { sessionStore } from './store';

class SessionService {
  async signIn(data: { orgName: string; username: string; password: string }) {
    const response = await publicRequester.signIn(data.orgName, {
      username: data.username,
      password: data.password,
    });

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

  // TODO: remove it, use query instead.
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
