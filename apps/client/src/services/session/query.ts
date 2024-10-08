import { createQuery } from '@datorama/akita';
import dayjs from 'dayjs';

import { AuthModel } from '../../models/session';

import { SessionState, sessionStore } from './store';

export const sessionQuery = createQuery<SessionState>(sessionStore);

export const session$ = sessionQuery.select((state) => state);

export const authStatus$ = sessionQuery.select<{
  auth: AuthModel | null;
  expired: boolean;
}>((state) => {
  if (!state.auth) {
    return {
      auth: null,
      expired: true,
    };
  }

  if (dayjs().valueOf() > state.auth.expiresTimestamp) {
    return {
      auth: state.auth,
      expired: true,
    };
  }

  return {
    auth: state.auth,
    expired: false,
  };
});

export const validAuth$ = sessionQuery.select((state) => {
  if (!state.auth) {
    return null;
  }

  if (dayjs().valueOf() > state.auth.expiresTimestamp) {
    return null;
  }

  return state.auth;
});

export const expiresDateTime$ = sessionQuery.select((state) => {
  const expiresTimestamp = state.auth?.expiresTimestamp;

  if (!expiresTimestamp) {
    return null;
  }

  const dateTime = dayjs(expiresTimestamp);

  if (!dateTime.isValid()) {
    return null;
  }

  return dateTime.toDate();
});
