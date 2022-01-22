import { createStore } from '@datorama/akita';
import { produce } from 'immer';

import { GrantList, GrantRoles } from '../../models/security';
import { StoreNames } from '../../utils/store-names';

export interface SecurityState {
  grantList: GrantList | null;
  grantRoles: GrantRoles | null;
}

const initialState: SecurityState = {
  grantList: null,
  grantRoles: null,
};

export const securityStore = createStore<SecurityState>(initialState, {
  name: StoreNames.Security,
  idKey: '_id',
  producerFn: produce,
});
