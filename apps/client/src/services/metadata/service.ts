import { SourceRequester } from '@shukun/api';

import { axiosAdaptor } from '../../apis/requester';

import { metadataStore } from './store';

class MetadataService {
  async fetchOneIfNull(atomName: string) {
    const { entities } = metadataStore.getValue();

    if (!entities || !entities[atomName]) {
      const sourceRequester = new SourceRequester(axiosAdaptor, atomName);
      const response = await sourceRequester.metadata();
      metadataStore.upsert(response.data.value.name, response.data.value);
    }
  }
}

export const metadataService = new MetadataService();
