import { akitaDevtools, akitaConfig, persistState } from '@datorama/akita';

import { StoreNames } from '../store-names';

akitaDevtools();

akitaConfig({ resettable: true });

persistState({
  include: [StoreNames.Session],
});
