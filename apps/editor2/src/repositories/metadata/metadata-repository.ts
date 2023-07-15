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
  MetadataEntity,
  metadataRef,
  createMetadataEntityId,
} from './metadata-ref';
import { IMetadataRepository } from './metadata-repository.interface';
import { metadataStore } from './metadata-store';

export class MetadataRepository implements IMetadataRepository {
  private readonly metadataStore = metadataStore;

  all$: Observable<MetadataEntity[]> = this.metadataStore.pipe(
    selectAllEntities({ ref: metadataRef }),
  );

  constructor(private readonly apiRequester: ApiRequester) {}

  async initialize() {
    const response = await this.apiRequester.developerRequester.pullMetadatas();

    const entities: MetadataEntity[] = Object.entries(response.data.value).map(
      ([metadataName, metadata]) => ({
        id: createMetadataEntityId(metadataName),
        metadataName,
        ...metadata,
      }),
    );
    this.metadataStore.update(
      setEntities(entities, { ref: metadataRef }),
      setProps(() => ({
        initialized: true,
      })),
    );
  }

  create(metadataName: string): void {
    const entity: MetadataEntity = {
      id: createMetadataEntityId(metadataName),
      name: metadataName,
      label: metadataName,
      electrons: [],
    };
    this.metadataStore.update(addEntities(entity, { ref: metadataRef }));
  }

  update(entity: MetadataEntity): void {
    this.metadataStore.update(
      updateEntities(
        entity.id,
        {
          ...entity,
        },
        { ref: metadataRef },
      ),
    );
  }

  remove(entityId: string): void {
    this.metadataStore.update(deleteEntities(entityId, { ref: metadataRef }));
  }
}
