import { applyTransaction } from '@datorama/akita';
import { UnknownSourceModel } from '@shukun/schema';

import { IDString } from '../../../utils/model-helpers';
import { getMetadataName, getUniqueId, metadataOrName } from '../helpers';
import { sourcesStore } from '../store';

export class SourceService {
  add(metadata: metadataOrName, sources: UnknownSourceModel[]) {
    applyTransaction(() => {
      sources.forEach((source) => {
        const uniqueId = getUniqueId(metadata, source._id);

        sourcesStore.upsert(uniqueId, (entity) => {
          const oldSource: UnknownSourceModel | undefined = (entity as any)?.[
            'source'
          ];

          return {
            atomName: getMetadataName(metadata),
            source: { ...oldSource, ...source },
          };
        });
      });
    });
  }

  remove(metadata: metadataOrName, sourceId: string) {
    const uniqueId = getUniqueId(metadata, sourceId);
    sourcesStore.remove(uniqueId);
  }

  update(
    metadata: metadataOrName,
    sourceId: IDString,
    source: UnknownSourceModel,
  ) {
    const uniqueId = getUniqueId(metadata, sourceId);
    sourcesStore.update(uniqueId, (entity) => {
      return {
        ...entity,
        source: {
          ...entity.source,
          ...source,
          _id: sourceId,
        },
      };
    });
  }

  setActive(metadata: metadataOrName, sourceId: string) {
    const uniqueId = getUniqueId(metadata, sourceId);
    sourcesStore.setActive(uniqueId);
  }

  resetActive() {
    sourcesStore.setActive(null);
  }

  reset() {
    sourcesStore.reset();
  }
}
