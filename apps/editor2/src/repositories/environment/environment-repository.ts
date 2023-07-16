import { setProps } from '@ngneat/elf';
import {
  addEntities,
  deleteEntities,
  selectAllEntities,
  setEntities,
  updateEntities,
} from '@ngneat/elf-entities';

import { Observable } from 'rxjs';

import { ApiRequester } from '../../apis/requester';

import {
  EnvironmentEntity,
  environmentRef,
  createEnvironmentEntityId,
} from './environment-ref';
import { IEnvironmentRepository } from './environment-repository.interface';
import { environmentStore } from './environment-store';

export class EnvironmentRepository implements IEnvironmentRepository {
  private readonly environmentStore = environmentStore;

  all$: Observable<EnvironmentEntity[]> = this.environmentStore.pipe(
    selectAllEntities({ ref: environmentRef }),
  );

  constructor(private readonly apiRequester: ApiRequester) {}

  async initialize() {
    const response =
      await this.apiRequester.developerRequester.pullEnvironments();

    const entities: EnvironmentEntity[] = Object.entries(
      response.data.value,
    ).map(([environmentName, environment]) => ({
      id: createEnvironmentEntityId(environmentName),
      environmentName,
      ...environment,
    }));
    this.environmentStore.update(
      setEntities(entities, { ref: environmentRef }),
      setProps(() => ({
        initialized: true,
      })),
    );
  }

  create(environmentName: string): void {
    const entity: EnvironmentEntity = {
      id: createEnvironmentEntityId(environmentName),
      environmentName,
      name: environmentName,
      value: '',
      isPublic: false,
    };
    this.environmentStore.update(addEntities(entity, { ref: environmentRef }));
  }

  update(entity: EnvironmentEntity): void {
    this.environmentStore.update(
      updateEntities(
        entity.id,
        {
          ...entity,
        },
        { ref: environmentRef },
      ),
    );
  }

  remove(entityId: string): void {
    this.environmentStore.update(
      deleteEntities(entityId, { ref: environmentRef }),
    );
  }
}
