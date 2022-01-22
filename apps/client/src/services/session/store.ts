import { createStore } from '@datorama/akita';
import { produce } from 'immer';

import { AuthModel } from '../../models/session';
import { StoreNames } from '../../utils/store-names';

export interface SessionState {
  auth: AuthModel | null;
  freshedAt: Date;
}

const initialState: SessionState = {
  auth: null,
  freshedAt: new Date(),
};

export const sessionStore = createStore<SessionState>(initialState, {
  name: StoreNames.Session,
  producerFn: produce,
});
