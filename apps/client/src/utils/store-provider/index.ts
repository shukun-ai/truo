import { akitaDevtools, akitaConfig, persistState } from '@datorama/akita';

import { StoreNames } from '../store-names';

akitaDevtools();

akitaConfig({ resettable: true });

persistState({
  // TODO: should add a specific STORAGE_NAME
  include: [StoreNames.Session],
});
