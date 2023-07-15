import { MetadataElectron } from '@shukun/schema';
import { Observable } from 'rxjs';

import { MetadataEntity } from './metadata-ref';

export interface IMetadataRepository {
  all$: Observable<MetadataEntity[]>;
  allowedFieldType$: Observable<MetadataElectron['fieldType'][]>;

  initialize(): Promise<void>;
  create(metadataName: string): void;
  update(entity: MetadataEntity): void;
  remove(entityId: string): void;
}
