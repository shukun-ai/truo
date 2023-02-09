import { EntityState, createEntityStore } from '@datorama/akita';
import { produce } from 'immer';

import { StoreNames } from '../../utils/store-names';

export interface RoleState
  extends EntityState<{ name: string; label: string }, string> {}

const initialState: RoleState = {};

export const roleStore = createEntityStore<RoleState>(initialState, {
  name: StoreNames.Role,
  idKey: 'name',
  producerFn: produce,
});
