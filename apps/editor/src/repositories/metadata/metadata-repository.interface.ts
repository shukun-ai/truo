import { MetadataElectron } from '@shukun/schema';
import { Observable } from 'rxjs';

import { MetadataEntity } from './metadata-ref';

export interface IMetadataRepository {
  all$: Observable<MetadataEntity[]>;
  count$: Observable<number>;
  allowedFieldType$: Observable<
    {
      type: MetadataElectron['fieldType'];
      deprecated?: boolean;
      system?: boolean;
    }[]
  >;

  initialize(): Promise<void>;
  create(metadataName: string): void;
  update(entity: MetadataEntity): void;
  remove(entityId: string): void;
}
