import { MetadataSchema } from '@shukun/schema';

import { IDString } from '../../utils/model-helpers';

export type metadataOrName = MetadataSchema | string;

export function getUniqueId(
  metadata: metadataOrName,
  sourceId: IDString,
): string {
  if (!sourceId) {
    throw new Error('sourceId is undefined or falsy.');
  }

  const atomName = getMetadataName(metadata);
  return `${atomName}_${sourceId}`;
}

export function getMetadataName(metadata: metadataOrName): string {
  return typeof metadata === 'string' ? metadata : metadata.name;
}
