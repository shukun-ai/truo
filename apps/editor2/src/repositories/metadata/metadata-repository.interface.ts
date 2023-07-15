import { Observable } from 'rxjs';

import { MetadataEntity } from './metadata-ref';

export interface IMetadataRepository {
  all$: Observable<MetadataEntity[]>;

  initialize(): Promise<void>;
  create(metadataName: string): void;
  update(entity: MetadataEntity): void;
  remove(entityId: string): void;
}
