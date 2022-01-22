import { findOneMetadata } from '../../models/metadata';

import { metadataStore } from './store';

class MetadataService {
  async fetchOneIfNull(atomName: string) {
    const { entities } = metadataStore.getValue();

    if (!entities || !entities[atomName]) {
      const response = await findOneMetadata(atomName);
      metadataStore.upsert(response.data.value.name, response.data.value);
    }
  }
}

export const metadataService = new MetadataService();
