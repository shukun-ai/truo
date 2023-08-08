import { StoreScope } from '@shukun/presenter/definition';

export const scopes: Record<ScopeKey, StoreScope> = {
  router: {
    type: 'app',
    containerId: null,
    repositoryId: 'router',
  },
  auth: {
    type: 'app',
    containerId: null,
    repositoryId: 'auth',
  },
} as const;

type ScopeKey = 'router' | 'auth';
