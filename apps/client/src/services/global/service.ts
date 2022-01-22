import { findOneOrg } from '../../models/org';

import { globalStore } from './store';

class GlobalService {
  async fetchOrg(orgName: string | null) {
    const response = await findOneOrg(orgName);

    globalStore.update(() => ({
      org: response.data.value,
    }));
  }
}

export const globalService = new GlobalService();
