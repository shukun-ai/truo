import { createStore } from '@datorama/akita';
import { RoleSchema } from '@shukun/schema';
import { produce } from 'immer';

import { StoreNames } from '../../utils/store-names';

export interface SecurityState {
  grantList: RoleSchema[];
  grantRoles: string[];
}

const initialState: SecurityState = {
  grantList: [],
  grantRoles: [],
};

export const securityStore = createStore<SecurityState>(initialState, {
  name: StoreNames.Security,
  idKey: '_id',
  producerFn: produce,
});
