import { MetadataFieldType, MetadataSchema } from '@shukun/schema';
import uniq from 'lodash/uniq';

import { UnknownSourceModel } from '../../../models/source';

import { ReferenceMap } from './ReferenceMap.interface';

export class ReferenceUtil {
  protected REFERENCE_TYPES = [
    MetadataFieldType.ManyToMany,
    MetadataFieldType.ManyToOne,
    MetadataFieldType.Owner,
  ];

  getReferenceMap(
    metadata: MetadataSchema,
    sources: UnknownSourceModel[],
  ): ReferenceMap[] {
    const initialReferenceMaps = this.getInitialReferenceMaps(metadata);

    const referenceMaps = sources.reduce(
      this.combineReferenceMaps,
      initialReferenceMaps,
    );

    return this.uniqueReferenceMaps(referenceMaps);
  }

  getInitialReferenceMaps(metadata: MetadataSchema) {
    const initialReferenceMaps: ReferenceMap[] = [];

    metadata.electrons.forEach((electron) => {
      if (
        this.REFERENCE_TYPES.includes(electron.fieldType) &&
        electron.referenceTo &&
        electron.foreignName
      ) {
        initialReferenceMaps.push({
          electronName: electron.name,
          referenceTo: electron.referenceTo,
          foreignName: electron.foreignName,
          ids: [],
        });
      }
    });

    return initialReferenceMaps;
  }

  combineReferenceMaps(
    accumulator: ReferenceMap[],
    source: UnknownSourceModel,
  ): ReferenceMap[] {
    return accumulator.map((referenceMap) => {
      let ids: string[] = referenceMap.ids;
      const value = source?.[referenceMap.electronName];

      if (typeof value === 'string') {
        ids.push(value);
      } else if (Array.isArray(value)) {
        ids = ids.concat(value);
      }

      return {
        ...referenceMap,
        ids,
      };
    });
  }

  uniqueReferenceMaps(referenceMaps: ReferenceMap[]): ReferenceMap[] {
    return referenceMaps.map((referenceMap) => {
      const ids = uniq(referenceMap.ids);

      return {
        ...referenceMap,
        ids,
      };
    });
  }
}
