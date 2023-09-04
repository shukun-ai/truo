import { select, setProps } from '@ngneat/elf';
import {
  addEntities,
  deleteEntities,
  setEntities,
  updateEntities,
} from '@ngneat/elf-entities';

import { IApiRequester } from '../../apis/requester.interface';

import {
  EnvironmentEntity,
  environmentRef,
  createEnvironmentEntityId,
} from './environment-ref';
import { environmentStore } from './environment-store';

export const environmentRepository = {
  all$: environmentStore.pipe(select((state) => state.environmentEntities)),

  initialize: async (apiRequester: IApiRequester) => {
    const response = await apiRequester.developerRequester.pullEnvironments();

    const entities: EnvironmentEntity[] = Object.entries(
      response.data.value,
    ).map(([environmentName, environment]) => ({
      id: createEnvironmentEntityId(environmentName),
      environmentName,
      ...environment,
    }));
    environmentStore.update(
      setEntities(entities, { ref: environmentRef }),
      setProps(() => ({
        initialized: true,
      })),
    );
  },

  create: (environmentName: string): void => {
    const entity: EnvironmentEntity = {
      id: createEnvironmentEntityId(environmentName),
      environmentName,
      name: environmentName,
      value: '',
      isPublic: false,
    };
    environmentStore.update(addEntities(entity, { ref: environmentRef }));
  },

  update: (entity: EnvironmentEntity): void => {
    environmentStore.update(
      updateEntities(
        entity.id,
        {
          ...entity,
        },
        { ref: environmentRef },
      ),
    );
  },

  remove: (entityId: string): void => {
    environmentStore.update(deleteEntities(entityId, { ref: environmentRef }));
  },
};
