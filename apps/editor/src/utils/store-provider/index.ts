import { akitaDevtools, akitaConfig, persistState } from '@datorama/akita';

akitaDevtools();

akitaConfig({ resettable: true });

persistState({
  key: 'SHUKUN_EDITOR',
  include: [],
});
