import { publicRequester } from '../../apis/requester';

import { securityStore } from './store';

export class SecurityService {
  async fetchGrantList() {
    const response = await publicRequester.getGrantList();

    securityStore.update(() => ({
      grantList: response.data.value,
    }));
  }

  async fetchGrantRoles() {
    const response = await publicRequester.getGrantRoles();

    securityStore.update(() => ({
      grantRoles: response.data.value,
    }));
  }
}

export const securityService = new SecurityService();
