import { createQuery } from '@datorama/akita';

import { SecurityState, securityStore } from './store';

export const securityQuery = createQuery<SecurityState>(securityStore);

export const grantList$ = securityQuery.select((state) => state.grantList);

export const grantRoles$ = securityQuery.select((state) => state.grantRoles);
