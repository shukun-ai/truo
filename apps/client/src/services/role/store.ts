import { EntityState, createEntityStore } from '@datorama/akita';
import { RoleSchema } from '@shukun/schema';
import { produce } from 'immer';

import { StoreNames } from '../../utils/store-names';

export interface RoleState extends EntityState<RoleSchema, string> {}

const initialState: RoleState = {};

export const roleStore = createEntityStore<RoleState>(initialState, {
  name: StoreNames.Role,
  idKey: 'name',
  producerFn: produce,
});
