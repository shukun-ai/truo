import { QueryEntity } from '@datorama/akita';

import { MetadataState } from './store';

export class MetadataQuery extends QueryEntity<MetadataState> {
  metadata$ = this.selectAll();

  activeMetadata$ = this.selectActive();
}
