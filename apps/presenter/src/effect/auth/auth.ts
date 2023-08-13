import { Injector } from '../../interfaces/injector';

import { Auth } from './internal/auth';

export const initializeAuth = (
  environments: Injector['environments'],
  devtool: Injector['devtool'],
  store: Injector['store'],
): Injector['auth'] => {
  const auth = new Auth(store);
  return auth;
};
