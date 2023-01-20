import { publicRequester } from '../../apis/requester';

import { globalStore } from './store';

class GlobalService {
  async fetchOrg(orgName: string | null) {
    const response = await publicRequester.getOrg(orgName ?? undefined);

    globalStore.update(() => ({
      org: response.data.value,
    }));
  }
}

export const globalService = new GlobalService();
