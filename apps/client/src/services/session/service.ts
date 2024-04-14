import { resetStores } from '@datorama/akita';
import dayjs from 'dayjs';

import { publicRequester } from '../../apis/requester';

import { AuthModel } from '../../models/session';

import { sessionStore } from './store';
import { getAuth, removeAuth, setAuth } from './util';

class SessionService {
  async signIn(data: { orgName: string; username: string; password: string }) {
    const response = await publicRequester.signIn(data.orgName, {
      username: data.username,
      password: data.password,
    });

    const { userId, username, orgName, orgId, accessToken, expiresIn } =
      response.data.value;

    const auth: AuthModel = {
      userId,
      username,
      orgName,
      orgId,
      accessToken,
      expiresTimestamp: dayjs().add(expiresIn, 'ms').valueOf(),
    };

    sessionStore.update(({ auth }) => ({
      auth,
    }));

    setAuth(auth);
  }

  async signOut() {
    const { auth } = sessionStore.getValue();
    if (auth) {
      removeAuth(auth.orgName);
    }
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
    const { routerOrgName } = sessionStore.getValue();
    return routerOrgName;
  }

  setAuthByRouter(routerOrgName: string | null) {
    if (routerOrgName) {
      const auth = getAuth(routerOrgName);
      sessionStore.update(() => ({
        auth,
        routerOrgName,
      }));
    } else {
      sessionStore.update(() => ({
        auth: null,
        routerOrgName,
      }));
    }
  }
}

export const sessionService = new SessionService();
