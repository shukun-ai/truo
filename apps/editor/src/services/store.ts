import { akitaDevtools, akitaConfig, persistState } from '@datorama/akita';

import { StoreNames } from './names';

export function configureStore() {
  akitaDevtools();

  akitaConfig({ resettable: true });

  persistState({
    key: 'SHUKUN_EDITOR',
    include: [StoreNames.Metadata],
    preStorageUpdate(storeName, state) {
      if (state.ids) {
        return {
          entities: state.entities,
          ids: state.ids,
        };
      }
      return state;
    },
  });
}
