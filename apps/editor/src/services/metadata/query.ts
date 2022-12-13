import { QueryEntity } from '@datorama/akita';

import { MetadataState } from './store';

export class MetadataQuery extends QueryEntity<MetadataState> {
  getAtom(atomName: string) {
    const { entities } = this.store.getValue();

    if (!entities) {
      throw new Error();
    }

    const entity = entities[atomName];

    if (!entity) {
      throw new Error();
    }

    return entity;
  }
}
