import { akitaDevtools, akitaConfig, persistState } from '@datorama/akita';

export function configureStore() {
  akitaDevtools();

  akitaConfig({ resettable: true });

  persistState({
    key: 'SHUKUN_EDITOR',
    // include: [StoreNames.Metadata, StoreNames.Flow],
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
