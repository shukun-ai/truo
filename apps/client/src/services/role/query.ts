import { createEntityQuery } from '@datorama/akita';

import { RoleState, roleStore } from './store';

export const roleQuery = createEntityQuery<RoleState>(roleStore);

export const roles$ = roleQuery.selectAll();
