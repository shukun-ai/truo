import { createStore, withProps, Store, StoreDef } from '@ngneat/elf';
import { persistState, localStorageStrategy } from '@ngneat/elf-persist-state';
import { AuthenticationToken } from '@shukun/schema';

import { environment } from '../../environments/environment';

export type AuthProps = {
  currentUser: AuthenticationToken | null;
};

export type AuthStore = Store<StoreDef<AuthProps>, AuthProps>;

export const authStore: AuthStore = createStore(
  { name: 'auth' },
  withProps<AuthProps>({ currentUser: null }),
);

export const persist = persistState(authStore, {
  key: environment.authPersistKey,
  storage: localStorageStrategy,
});
